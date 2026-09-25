-- Public schedules are only reachable by id through get_public_schedule();
-- nobody should be able to list them straight from the table.
DROP POLICY IF EXISTS "Public schedules readable" ON public.schedules;
REVOKE SELECT ON public.schedules FROM anon;

-- Tie rows to real users and clean up when an account is deleted.
DELETE FROM public.schedules s WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = s.user_id);
DELETE FROM public.profiles p WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.id);
ALTER TABLE public.schedules
  ADD CONSTRAINT schedules_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;

-- Bound what a client can store.
UPDATE public.schedules
SET name = left(btrim(name), 80), session_ids = session_ids[1:64]
WHERE char_length(name) > 80 OR name <> btrim(name) OR cardinality(session_ids) > 64;
UPDATE public.schedules SET name = 'My schedule' WHERE name = '';
UPDATE public.profiles SET display_name = left(btrim(display_name), 60) WHERE char_length(display_name) > 60;

ALTER TABLE public.schedules
  ADD CONSTRAINT schedules_name_length CHECK (char_length(name) BETWEEN 1 AND 80),
  ADD CONSTRAINT schedules_session_ids_count CHECK (cardinality(session_ids) <= 64),
  ADD CONSTRAINT schedules_answers_shape CHECK (
    jsonb_typeof(answers) = 'object' AND pg_column_size(answers) <= 4096
  );
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_display_name_length CHECK (char_length(display_name) <= 60);

-- updated_at is set by the database, not by the client.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END; $$;
CREATE TRIGGER schedules_set_updated_at BEFORE INSERT OR UPDATE ON public.schedules
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Shared links show the display name, so never default it to the email prefix.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, left(btrim(COALESCE(NEW.raw_user_meta_data->>'display_name', '')), 60));
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

UPDATE public.profiles p
SET display_name = ''
FROM auth.users u
WHERE u.id = p.id
  AND COALESCE(NULLIF(btrim(u.raw_user_meta_data->>'display_name'), ''), '') = ''
  AND p.display_name = split_part(u.email, '@', 1);
