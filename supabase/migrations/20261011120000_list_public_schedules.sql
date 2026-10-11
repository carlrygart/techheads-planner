-- Owners opt in separately to having a public schedule listed for browsing;
-- a listed schedule must also be public.
ALTER TABLE public.schedules
  ADD COLUMN is_listed boolean NOT NULL DEFAULT false;
ALTER TABLE public.schedules
  ADD CONSTRAINT schedules_listed_requires_public CHECK (NOT is_listed OR is_public);

-- Making a schedule private (e.g. `update({ is_public: false })` from the
-- planner) must not trip the CHECK above, so unlist it automatically. The
-- CHECK stays as a backstop.
CREATE OR REPLACE FUNCTION public.unlist_private_schedule()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NOT NEW.is_public THEN
    NEW.is_listed := false;
  END IF;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.unlist_private_schedule() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER schedules_unlist_private BEFORE INSERT OR UPDATE ON public.schedules
FOR EACH ROW EXECUTE FUNCTION public.unlist_private_schedule();

-- Listed schedules are browsable only through this function, which never
-- exposes user_id. The table itself stays unlistable (no SELECT policy).
CREATE OR REPLACE FUNCTION public.list_public_schedules(_limit int DEFAULT 50, _offset int DEFAULT 0)
RETURNS TABLE (id uuid, name text, display_name text, session_ids text[], updated_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT s.id, s.name, p.display_name, s.session_ids, s.updated_at
  FROM public.schedules s LEFT JOIN public.profiles p ON p.id = s.user_id
  WHERE s.is_public = true AND s.is_listed = true
  ORDER BY s.updated_at DESC, s.id
  LIMIT least(greatest(coalesce(_limit, 50), 1), 100)
  OFFSET greatest(coalesce(_offset, 0), 0)
$$;
REVOKE EXECUTE ON FUNCTION public.list_public_schedules(int, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_public_schedules(int, int) TO anon, authenticated;
