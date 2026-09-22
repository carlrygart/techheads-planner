export type Session = {
  id: string;
  title: string;
  speaker: string;
  description: string;
  time: string;
  location: string;
  company: string;
  category: string;
  keywords: string[];
};

export const sessions: Session[] = [
  {
    "id": "s1",
    "title": "The future engineer in the age of AI",
    "speaker": "Tony Gorschek",
    "description": "Skills, hiring and upskilling in a GenAI boom\n\nWe’re excited to welcome Prof. Dr. Dr. Tony Gorschek as a speaker at TechHeads 2026. Tony is a Professor of Software Engineering at Blekinge Institute of Technology and a senior guest researcher at Fortiss (Germany). With extensive industry experience as a CTO, consultant, engineer, chief architect, and product manager, he bridges cutting-edge research with the realities of building software-intensive products and services.\n\nIn his session, Tony will share his perspective on the future skills landscape for engineers. What changes when GenAI becomes part of everyday engineering? What are the biggest challenges and blind spots for companies and education, and what practical steps can we take to avoid falling behind?",
    "time": "09:00-10:00",
    "location": "Gröna salen",
    "company": "BTH",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Upskilling",
      "Leadership",
      "Business",
      "Why"
    ]
  },
  {
    "id": "s2",
    "title": "The Skills of Tomorrow: Upskilling in a GenAI Boom",
    "speaker": "Tony Gorschek  - BTH, Stefan Rasmussen - Ericsson, Maria Verbitskaya - Budbee, Linus Diestelkamp, Sourcicle (kolla stavningen) Moderator: Sanas Fritz",
    "description": "As generative AI reshapes everyday engineering, how do organizations ensure their workforce doesn't fall behind? In this panel, industry experts and talent leaders discuss the realities of the future skills landscape. What happens when AI becomes a standard workflow rather than an experiment? How do we identify the biggest blind spots in hiring and people management, and what practical steps are required to upskill teams at scale? Join Tony Gorschek (BTH), Stefan Rasmussen (Ericsson), Maria Verbitskaya (Budbee), and Linus Diestelkamp (Sourcicle) as they explore how to build and future-proof the next generation of tech talent.",
    "time": "10:00-10:30",
    "location": "Gröna salen",
    "company": "",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Upskilling",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s3",
    "title": "Sweden Rock as an Energy Lab",
    "speaker": "Fredrik Andrén",
    "description": "A Live Energy Experiment from Techtank\n\nMost organizations do not lack technology, they lack a way to start when complexity takes over.\n\nAt Tech Heads 2026, Fredrik Andrén shares a practical approach tested in real environments, from an advanced energy hub in Lilla Älghult to a live experiment at Sweden Rock Festival. Expect real data, real constraints, and step-by-step learning that turns complexity into progress.\n\nIf you work with energy, infrastructure, or complex operations, this is a session you do not want to miss.",
    "time": "11:00-11:15",
    "location": "Borgstugan",
    "company": "Vera Energy",
    "category": "Smart Cities",
    "keywords": [
      "Energy",
      "IoT",
      "Resilience",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s4",
    "title": "FROM HEALTH DATA TO INNOVATION",
    "speaker": "Tora Hammar",
    "description": "Connecting healthcare, academia and industry.\n\nWe're excited to welcome Tora Hammar as a speaker at Techheads 2026. Tora is an Associate Professor in Health Informatics and Managing Director of the eHealth Institute at Linnaeus University. Her research focuses on how health data, AI and digital technologies can improve healthcare, with a particular focus on medication safety.\n\nIn this session, Tora will explore the opportunities of using health data and AI in healthcare, with examples from current research and an overview of the health data landscape. She'll introduce Health Data Sweden (HDS), a national ecosystem connecting leading actors across Sweden to support SMEs and the public sector in making better use of health data. A key focus will be on collaboration: how academia, healthcare and the tech sector can combine their strengths to drive innovation and address major challenges facing healthcare today.",
    "time": "11:00-11:30",
    "location": "Sturesalen",
    "company": "Linneuniversitetet",
    "category": "Smart Cities",
    "keywords": [
      "eHealth",
      "Public Sector",
      "Business",
      "Leadership"
    ]
  },
  {
    "id": "s5",
    "title": "AI as a force for the future",
    "speaker": "Johan Ripåsen",
    "description": "What defines the organizations that succeed with AI.\n\nWe're excited to welcome Johan Ripgården as a speaker at Techheads 2026. Johan is Concept Manager at Atea, one of Northern Europe's leading IT infrastructure companies, with deep expertise in AI maturity assessments and organizational AI readiness.\n\nIn this session, Johan will draw on insights from AI maturity assessments across organizations and the latest global AI reports to show what successful leadership teams do differently. He'll explain how they create direction, governance, and long-term AI capability that delivers real business value – and what truly defines the organizations that succeed with AI.",
    "time": "11:00-11:30",
    "location": "Sven Månsson",
    "company": "Atea",
    "category": "Data & Business Strategy",
    "keywords": [
      "AI",
      "Leadership",
      "Business",
      "Why",
      "How"
    ]
  },
  {
    "id": "s6",
    "title": "A new operating system for knowledge work",
    "speaker": "Jesper Bleeke",
    "description": "Beyond automation and augmentation\n\nJesper Bleeke is a Creative Technologist in the Intelligence Age and Course Director of Speculative Design at Berghs School of communication. At Techheads, he will cover More Than Human organizations and introduce a third path for AI transformation: ensembling, where human and non-human knowledge workers co-produce outcomes without being confined to separate lanes.",
    "time": "11:00-11:45",
    "location": "Gröna salen",
    "company": "",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Future Tech",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s7",
    "title": "Live hack - see the world through the eyes of an attacker",
    "speaker": "Mikael Svall",
    "description": "Proactive cybersecurity and hands-on hacking.\n\nWe’re thrilled to welcome the experts from Outpost24 to the stage at TechHeads 2026. In an era where cyberattacks are no longer a question of \"if\" but \"when,\" Outpost24 specializes in finding your vulnerabilities before the bad guys do. They help organizations move from reactive panic to proactive control by mastering the art of Exposure Management.\n\nIn this high-stakes session, you’ll witness a Live Hack in real-time. You’ll see exactly how an attacker identifies an entry point, escalates privileges, and takes control of a system. But we don’t stop at watching—after the keynote, you’re invited to the Green Room. There, you’ll get hands-on experience at our hacking station, where you can test your own skills and try to breach a controlled environment under expert guidance. Whether you're a developer, a CISO, or just curious about the dark side of the web, this session will give you the tools to understand the threat and the strategy to defend against it.",
    "time": "11:00-12:30",
    "location": "Källaren",
    "company": "Outpost",
    "category": "Security & Resilience",
    "keywords": [
      "Cybersecurity",
      "Resilience",
      "Hands-on",
      "How"
    ]
  },
  {
    "id": "s8",
    "title": "Modern Guru and the Path to Artificial Happiness",
    "speaker": "",
    "description": "",
    "time": "11:00-11:45",
    "location": "",
    "company": "",
    "category": "Other",
    "keywords": []
  },
  {
    "id": "s9",
    "title": "Digitalizing and securing the modern power grid",
    "speaker": "Liv Åsenius",
    "description": "Building a resilient, future-proof power distribution network.\n\nWe're excited to welcome Liv Åsenius as a speaker at Techheads 2026. Liv is an Technical investigation engineer at Kalmar Energi.\n\n\n\nElectric grids are undergoing rapid transformation, with an increasing share of renewable generation, more connected devices, and higher demands for real-time information and automation. In this presentation, Liv will explore how a Distribution Management System (DMS) can support a more efficient, resilient, and digitalized power distribution network. She'll look at concrete functionalities such as real-time situational awareness, outage management, and automated fault location, and their impact on operations, quality, and ways of working. Ultimately, this is not just about efficiency and digitalization: it is equally about how we build a secure and future-proof power grid.",
    "time": "11:15-11:30",
    "location": "Borgstugan",
    "company": "Kalmar Energi",
    "category": "Smart Cities",
    "keywords": [
      "Energy",
      "Platforms",
      "Resilience",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s10",
    "title": "How AI can run the pipes that keep cities warm.",
    "speaker": "Fredrik Svensson and Alexander Wallin",
    "description": "Real-time optimisation for the infrastructure you never think about.\n\nWe're excited to welcome Fredrik Svensson and Alexander Wallin from Glaze as speakers at Techheads 2026. Glaze is a Malmö-based company building real-time optimisation for district heating networks, the vast thermal systems that heat much of Sweden and Denmark but are still run on static schedules and gut feeling.\n\nIn this session, Fredrik and Alexander will show what it takes to put AI in control of physical infrastructure. Combining demand forecasting, a digital twin, and real-time optimisation, they shift production in time, ride through peaks, and cut cost and emissions without compromising delivery. You'll see why physics rules out brute-force approaches, where the value actually comes from, and what it takes to move from research to the real world.",
    "time": "11:30-11:45",
    "location": "Borgstugan",
    "company": "Glaze",
    "category": "Smart Cities",
    "keywords": [
      "AI",
      "Energy",
      "IoT",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s11",
    "title": "IoT in the public sector: The bridge starts with people.",
    "speaker": "Simon Hillfors",
    "description": "Building lasting digital capability where it matters most.\n\nWe're excited to welcome Simon Hillfors as a speaker at Techheads 2026. Simon is a development lead for regional digitalisation in Jönköping County and the host of IoT-dagen 2026. He has driven innovation in Vinnova-funded IoT projects, co-created IoT-puben (a digital meeting place by municipalities, for municipalities), and helped build networks where public sector, academia, and industry come together around IoT, data, and real societal impact.\n\nIn this session, Simon will share lessons from Jönköping County's collaborative IoT journey. You'll hear how IoT can be built as a long-term capability in the public sector, with real operational needs as the starting point. He'll show concrete examples of how sensor data, satellite data, and generative AI can create new insights, and explain why the campfires and the people who tend them are what make it all work.",
    "time": "11:30-12:00",
    "location": "Sturesalen",
    "company": "IoT world",
    "category": "Smart Cities",
    "keywords": [
      "IoT",
      "Public Sector",
      "Leadership",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s12",
    "title": "The internet of cheese",
    "speaker": "Nils Sjöström och Claire Sjöström",
    "description": "AI and automation for small-scale farming.\n\nWe’re excited to welcome Claire and Nils Sjöström from Framtida Bruk Gårdsmejeri as speakers at TechHeads 2026. Goat farmers and artisan cheese makers with a tech background, they’ve spent the last decade building a farm and a business where innovation is part of the daily workflow, from hands-on automation to projects like “Internet of Cheese” and “Getflix.”\n\n In their session, they’ll share real-world lessons on AI and automation in small-scale agriculture, food processing, and animal husbandry, plus the pros and cons of building “homemade IT” when you just need something that works.\n\nExpect practical inspiration, a little bit of McGyver energy, and a perspective on how tech can create return not only in money, but also in cultural and social capital.",
    "time": "11:30-12:00",
    "location": "Sven Månsson",
    "company": "Framtida Bruk",
    "category": "Data & Business Strategy",
    "keywords": [
      "AI",
      "IoT",
      "Business",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s13",
    "title": "From traffic data to destination intelligence",
    "speaker": "David Eskilsson",
    "description": "What happens when traffic data becomes a tool for tourism and smarter destinations.\n\nWe're excited to welcome David Eskilsson as a speaker at Techheads 2026. David is CEO of Edeva AB, a Linköping-based technology company developing intelligent solutions for traffic, mobility data and smart city applications.\n\nIn this session, David will present the real-world case of Edeva's collaboration with Öland & Co, where real-time traffic data from the Öland Bridge is being used to understand visitor flows, travel patterns and destination pressure. He'll show how technology developed for traffic analysis and mobility can create value in destination development: turning raw data into useful dashboards, identifying the needs of tourism businesses, and demonstrating how real-time insights can support better planning, marketing and visitor experiences. The core message is simple: when data is made understandable and actionable, it helps destinations move from guesswork to smarter decisions in real time.\"",
    "time": "11:45-12:00",
    "location": "Borgstugan",
    "company": "Edeva",
    "category": "Smart Cities",
    "keywords": [
      "IoT",
      "Platforms",
      "Public Sector",
      "Business",
      "Case Study"
    ]
  },
  {
    "id": "s14",
    "title": "AI gör dig inte dummare, om du vet var gränsen går",
    "speaker": "Jörg Teichgraeber",
    "description": "Kort beskrivning: Passet utgår från forskning om cognitive offloading, det vill säga när det är rationellt att låta AI ta över delar av tänkandet och när det istället urholkar den djupbearbetning som krävs för faktisk inlärning. Jag kopplar detta till konkreta iakttagelser från min tid som skolchef på Hyper Island, till aktuell forskning inom lärande och vad det betyder för mitt arbete med AI-kompetensbehov, där frågan om vad man ska lära sig själv och vad man kan delegera till AI återkommer.",
    "time": "11:45-12:10",
    "location": "Gröna salen",
    "company": "Techtank",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Upskilling",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s15",
    "title": "Powering Smart Cities: The Future of Energy & IoT",
    "speaker": "Fredrik Andrén, Vera Energy\nMathias Hagelin, Kalmar Energi\nJonas Axelsson, Fredrik Svensson - Glaze\nSourceful - Johan Leitet \n30 min Moderator Eddie Freij",
    "description": "Discussion panel",
    "time": "12:00-12:30",
    "location": "Borgstugan",
    "company": "",
    "category": "Smart Cities",
    "keywords": [
      "Energy",
      "IoT",
      "Public Sector",
      "Future Tech",
      "Leadership"
    ]
  },
  {
    "id": "s16",
    "title": "FROM LEGAL STOP TO A COMMON PATH FORWARD",
    "speaker": "Niklas Hörling",
    "description": "AI in social services – navigating privacy, law and innovation together.\n\nWe're excited to welcome Niklas Hörling and Mirelle Mård as speakers at Techheads 2026. Niklas is Head of Digitalisation (CDO) at Kalmar kommun, where he leads the municipality's digital transformation efforts. Mirelle is Innovation Leader (Innovationsledare) at Kalmar kommun.\n\nIn this session, Niklas and Mirelle will share the story of how Kalmar kommun explored AI-based speech-to-text in social services – and the regulatory sandbox they conducted together with the Swedish Authority for Privacy Protection (IMY). But more than a tech case, this is a talk about what happens when operational needs, law, technology and innovation collide. By bringing together lawyers, tech specialists, vendors, authorities and practitioners around the same table, they found a path forward where many only saw obstacles. A story about the courage to try something new, the power of cross-professional collaboration, and why the future of innovation is built together.",
    "time": "12:00-12:30",
    "location": "Sturesalen",
    "company": "Kalmar Kommun",
    "category": "Other",
    "keywords": []
  },
  {
    "id": "s17",
    "title": "From Karlskrona to accra: a payments journey",
    "speaker": "Kenny Stridh",
    "description": "How do we bring everyone along as the world goes cashless?\n\nMeet Kenny Stridh, Head of Technology and Evolution at Ericsson Mobile Financial Services and one of our speakers at Techheads 2026. Over 17 years, Kenny has built — and now leads the technology evolution of — a platform that today gives around 130 million people across Africa and the Middle East access to basic financial services everyday, the kind of thing most of Europe takes for granted.\n\nIn this session, Kenny will share the story of how a team in Karlskrona set out to bank the unbanked, and how that original vision has since evolved into Buy Now Pay Later, offline payments, cross-border remittance, CBDC and stablecoins, and Digital Identity. You'll hear what it takes to make financial inclusion real, at scale, in some of the world's most challenging markets.",
    "time": "12:00-12:30",
    "location": "Sven Månsson",
    "company": "Ericsson",
    "category": "Emerging Tech",
    "keywords": [
      "Platforms",
      "Software",
      "Business",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s18",
    "title": "Navigating the AI Paradox: Leading a \"More Than Human\" Organization",
    "speaker": "Jesper Bleeke, Maria Koblanck, Anders Wangelin, Jörg Teichgraber. Moderator: Louise Östlund",
    "description": "",
    "time": "12:10-12:30",
    "location": "Gröna salen",
    "company": "",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Leadership",
      "Business",
      "Why"
    ]
  },
  {
    "id": "s19",
    "title": "AI in software development",
    "speaker": "Katerina Doneva and Noman Latif",
    "description": "From experiment to everyday: how one team made it real.\n\nWhat happens when an engineering team stops treating AI as a side project and starts building through it?\n\nKaterina Doneva, System Manager at Ericsson, led exactly that shift. Her team integrated AI agents, Model Context Protocols and knowledge graphs into their daily workflow, not as an experiment, but as the actual way they build and ship software products today.\n\nAt Techheads 2026, she'll share what worked, what failed, and the real impact on productivity and delivery. No buzzwords, no theory. Just lessons from the messy middle between \"let's try ChatGPT\" and a fully AI-native engineering practice.\n\nWhether you're skeptical of the hype or already deep in it, you'll leave with concrete takeaways you can use tomorrow. The presentation will be delivered by two speakers: Software Architect Noman Latif, present on site in Kalmar, and Katerina Doneva, joining remotely from another location.",
    "time": "13:30-14:00",
    "location": "Gröna salen",
    "company": "Ericsson",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Automation",
      "Software",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s20",
    "title": "What is quantum computing, really?",
    "speaker": "Pontus Vikstål",
    "description": "Why nature is the ultimate computer.\n\nMeet Pontus Vikstål, Quantum Applications Scientist at Chalmers Next Labs and one of our speakers at Techheads 2026. With a doctorate in quantum computing and over seven years in the field, Pontus works to take quantum computing from research to industry, with a focus on solving real-world problems like aircraft scheduling.\n\nIn this session, Pontus will explain what quantum computing actually is, why nature itself is the ultimate computer, and what aircraft scheduling and magnets have in common. You'll also learn where the technology stands today, and how your organization can become \"quantum ready\".",
    "time": "13:30-14:00",
    "location": "Sturesalen",
    "company": "Chalmers Next Labs",
    "category": "Emerging Tech",
    "keywords": [
      "Quantum",
      "Future Tech",
      "Hardware",
      "How",
      "Why"
    ]
  },
  {
    "id": "s21",
    "title": "Digital twin",
    "speaker": "Christoffer Schört/Meg Nömgard",
    "description": "A 3D model with real impact.\n\nWe’re excited to welcome Christoffer Carlsson Schött and Meg Nömgård as speakers at Techheads 2026. Christoffer is a Digitalisation Leader at Kalmar Municipality, and Meg is the Castle Manager of Kalmar Castle, awarded the Swedish UNESCO Prize for her work with storytelling. In their joint session, they’ll share Kalmar Castle’s journey of creating a 3D model and digital twin, what they discovered along the way, how the castle benefits from it today, and what they believe is next for digital heritage and storytelling.",
    "time": "13:30-14:00",
    "location": "Sven Månsson",
    "company": "Destination Kalmar",
    "category": "Smart Cities",
    "keywords": [
      "Case Study",
      "Public Sector",
      "Future Tech",
      "How"
    ]
  },
  {
    "id": "s22",
    "title": "The AI Paradox in organisations",
    "speaker": "Anders Wangelin",
    "description": "You can't plan your way into AI. But you can't wing it either.\n\nTwo truths are canceling each other out in organizations right now. You need to move fast with AI or get left behind. But you also need a clear strategy before investing, or you'll waste time solving the wrong problems.\n\nSo which is it? Plan for months, or just run and hope for the best?\n\nAnders Wengelin, partner at Friktion, says neither. At Techheads 2026 he'll share a third route: how to move forward while you're still figuring it out. Small bets, fast learning, and enough clarity to outweigh the anxiety of not having all the answers.\n\n This one's for leaders who are tired of waiting for the perfect map.",
    "time": "13:30-14:30",
    "location": "Borgstugan",
    "company": "Friktion",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Business",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s23",
    "title": "Build a talking sensor in 60 minutes",
    "speaker": "Raj Nakarja",
    "description": "From zero to live IoT in one hour.\nWe’re excited to welcome Raj Nakarja as a speaker at Techheads 2026. Raj spent a decade building IoT the hard way, custom hardware, bespoke firmware, wrestling with wireless connectivity, and stitching together cloud infrastructure before a single line of application logic could be written. So he built Silicon Witchery to collapse all of that into one system. Connect a sensor and, instead of a dashboard, just talk to it in plain English.\nIn this hands-on session, you’ll build a connected IoT sensor from scratch. No prior hardware experience needed, just basic programming knowledge and a laptop. You’ll be given a Silicon Witchery S2 Module and a handful of sensors. By the end of the hour, your device will be live on a cellular network, collecting real data, and responding to questions in plain English, all from a web browser, no toolchains, no cloud setup, no infrastructure to wrestle with.",
    "time": "13:30-15:00",
    "location": "Källaren",
    "company": "Silicon Witchery",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "IoT",
      "Hardware",
      "Hands-on",
      "Workshop",
      "How"
    ]
  },
  {
    "id": "s24",
    "title": "Is your data ready for the future?",
    "speaker": "Henrik Sjöstrand",
    "description": "The threat you can't see yet, but need to act on now.\n\nHenrik Sjöstrand is both a solution architect in the Data & AI domain and a Quantum Ambassador at IBM. In his role as Quantum Ambassador he helps organisations understand the use cases and benefits of Quantum computing and assists them in their Quantum journey.\n\nIn this session Henrik will explain why we need Quantum computers and what problems they can solve, and why classical computers are simply not enough. He will also give an overview of IBM’s latest developments in Quantum computing and explain how fast this evolution is going now, and why it is important for your organization (and for our country) that we start learning this new technology now.\n\nAnd while Quantum computing is a great tool, it may also one day be used to crack the encryption algorithms we use to protect most of our data today, which may render extremely sensitive information visible - such as information about yourself!\n\nIn this session you will get a good overview and learn how to prepare for what is around the corner!",
    "time": "14:00-14:30",
    "location": "Sturesalen",
    "company": "IBM",
    "category": "Data & Business Strategy",
    "keywords": [
      "Quantum",
      "Resilience",
      "Future Tech",
      "Business",
      "Why"
    ]
  },
  {
    "id": "s25",
    "title": "",
    "speaker": "Maria Koblanck",
    "description": "",
    "time": "",
    "location": "",
    "company": "Region Kalmar",
    "category": "Smart Cities",
    "keywords": [
      "Public Sector",
      "Leadership",
      "eHealth",
      "Why"
    ]
  },
  {
    "id": "s26",
    "title": "How do you connect products locally and globally without months of infrastructure work?",
    "speaker": "Johan Svensson",
    "description": "Meet Johan Svensson, Head of Development for IoT Complete at Telenor Connexion, with more than 30 years of industry experience. He was among the pioneers who brought fixed-line phone numbers to mobile devices, and he continues to drive innovation at the intersection of IoT and AI.\n\nIn this session, you’ll learn how to connect your products locally and globally using the right technology. Johan will introduce IoT Complete, a new concept designed to give you a fast, seamless path from idea to reality, including ready-to-deploy devices, rapid application setup, and a way to move from prototype to deployed product in days, with no coding required.",
    "time": "14:00-14:30",
    "location": "Sven Månsson",
    "company": "Telenor Connexion",
    "category": "Data & Business Strategy",
    "keywords": [
      "IoT",
      "Platforms",
      "Hardware",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s27",
    "title": "Modern Guru and the Path to Artificial Happiness",
    "speaker": "",
    "description": "",
    "time": "14:15-15:00",
    "location": "",
    "company": "",
    "category": "Other",
    "keywords": []
  },
  {
    "id": "s28",
    "title": "YOUR ENCRYPTION HAS AN EXPIRY DATE",
    "speaker": "Måns Sandsjö, Frode Langemoen",
    "description": "The quantum satisfont is 2030. Act now or lose everything.\n\nWhat happens to your most sensitive health data when quantum computers render today's encryption obsolete? Meet Frode Langmoen and Måns Sandsjö from IBM, working at the intersection of quantum computing and cybersecurity. They're part of a 40+ actor consortium racing to quantum-proof Sweden's entire health data ecosystem before the EU deadline in 2030.\n\nIn this session, you'll learn why the threat isn't theoretical: adversaries are already harvesting encrypted data today, waiting for quantum to crack it open. Frode and Måns will break down what crypto-agility means in practice, why healthcare is the highest-priority sector, and how Sweden can turn early action into a global competitive edge.",
    "time": "14:30-15:00",
    "location": "Sturesalen",
    "company": "IBM",
    "category": "Data & Business Strategy",
    "keywords": [
      "Quantum",
      "eHealth",
      "Public Sector",
      "Resilience",
      "How"
    ]
  },
  {
    "id": "s29",
    "title": "Connectivity changes everything",
    "speaker": "Andreas Kristensson",
    "description": "The operating system for modern innovation.\n\nConnectivity is no longer background infrastructure, it is the operating system for modern innovation.\n\nAt TechHeads 2026, we’re excited to welcome Andreas Kristensson, Head of Enterprise at Telenor. With more than 30 years in telecom, Andreas has worked where technology, commercial reality, and innovation collide, and where resilience has become a competitive advantage.\n\nIn this session, Andreas takes you into the intersection of innovation, resilience, and dual-use scenarios, and explains what it means when connectivity becomes a strategic leadership question, not just a technical one. Expect perspectives on how connectivity is reshaping industries, and what leaders need to prioritize to create value, reduce risk, and stay ahead in the next wave of transformation.\n\nIf you want a sharper view of what is coming next, and what it demands from leadership, this is a talk you do not want to miss.",
    "time": "15:30-16:00",
    "location": "Gröna salen",
    "company": "Telenor",
    "category": "The Big Picture",
    "keywords": [
      "IoT",
      "Resilience",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s30",
    "title": "Exponential value from every line of code",
    "speaker": "Marcus Holgersson",
    "description": "The AI paradigm shift is here. See how it creates real business value at scale.\n\nWhat does it actually look like when AI moves from buzzword to bottom line? Meet Marcus Holgersson from Softhouse, who's been at the frontlines of the AI paradigm shift in software engineering.\n\nIn this session, Marcus goes beyond theory to show how AI-powered software fundamentally changes the way we create business value. Through real-world cases and a live demo of Softhouse's proprietary AI code-analysis tool, you'll see how AI-supported engineering solves complex business problems at exponential scale, while maintaining absolute control, stability and trust.",
    "time": "15:30-16:00",
    "location": "Sturesalen",
    "company": "Soft house",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Software",
      "Business",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s31",
    "title": "WHEN AI DOES ALL THE TALKING",
    "speaker": "Maria Verbitskaya",
    "description": "How automation can undermine feedback, trust, and growth.\n\nCaption:\nWe're excited to welcome Maria Verbitskaya as a speaker at Techheads 2026. Maria is an Engineering Manager at Instabee, leading software engineers working on consumer-facing products. With several years of experience leading teams in Stockholm tech, she has a particular interest in leadership, team dynamics, feedback, and creating environments where people can grow and do their best work. Maria is also an active supporter and volunteer with Women in Tech Sweden.\n\nIn this session, Maria will explore what happens when AI-generated content enters the processes meant to build trust and support development, like performance reviews and feedback. When AI can write self-evaluations, summarize feedback, and suggest what to say, what happens to the value of those conversations? You'll leave with a deeper understanding of what's worth keeping human, and why honest feedback and real conversations may become even more valuable as AI becomes part of how we work.",
    "time": "15:30-16:00",
    "location": "Sven Månsson",
    "company": "Instabee",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Leadership",
      "Upskilling",
      "Business",
      "Why"
    ]
  },
  {
    "id": "s32",
    "title": "A new operating system for knowledge work",
    "speaker": "Jesper Bleeke",
    "description": "Beyond automation and augmentation\n\nJesper Bleeke is a Creative Technologist in the Intelligence Age and Course Director of Speculative Design at Berghs School of communication. At Techheads, he will cover More Than Human organizations and introduce a third path for AI transformation: ensembling, where human and non-human knowledge workers co-produce outcomes without being confined to separate lanes.",
    "time": "15:30-16:15",
    "location": "Borgstugan",
    "company": "",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Future Tech",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s33",
    "title": "The AI Paradox in organisations",
    "speaker": "Anders Wangelin",
    "description": "You can't plan your way into AI. But you can't wing it either.\n\nTwo truths are canceling each other out in organizations right now. You need to move fast with AI or get left behind. But you also need a clear strategy before investing, or you'll waste time solving the wrong problems.\n\nSo which is it? Plan for months, or just run and hope for the best?\n\nAnders Wengelin, partner at Friktion, says neither. At Techheads 2026 he'll share a third route: how to move forward while you're still figuring it out. Small bets, fast learning, and enough clarity to outweigh the anxiety of not having all the answers.\n\n This one's for leaders who are tired of waiting for the perfect map.",
    "time": "15:30-16:30",
    "location": "Källaren",
    "company": "Friktion",
    "category": "The Big Picture",
    "keywords": [
      "AI",
      "Business",
      "Leadership",
      "Why"
    ]
  },
  {
    "id": "s34",
    "title": "Law firm as a system",
    "speaker": "Jonas Axelson och Polina Beloglazova",
    "description": "They didn't add AI to a law firm. They built the firm for it.\n\nMost organizations try to bolt AI onto broken processes and wonder why it doesn't deliver. LEAD Legal did the opposite: they built the entire firm as a system from scratch, with structured data, own workflows, and a custom system of record. Not because AI told them to, but because they knew it was coming.\n\nNow that wave is here. And they're ready.\n\nAt Techheads 2026, co-founders Jonas Axelson and Kerstin Eifrém share how they designed a law firm where AI can actually think, not just autocomplete. What worked, what didn't, and a conviction other organizations can steal: runtime is commodity, knowledge is the moat.\n\nYou don't need to be a law firm to learn from this. You just need to ask yourself: is your organization built for what's coming, or are you still patching?",
    "time": "16:00-16:30",
    "location": "Sturesalen",
    "company": "Lead legal",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Platforms",
      "Business",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s35",
    "title": "AI beyond code: smarter decisions, less admin",
    "speaker": "Afaf Adawi",
    "description": "How project leaders can let AI do the heavy lifting.\n\nWith 25+ years in the tech industry and leadership roles at Ericsson, Sinch and Malvacom, Afaf Adawi knows what it takes to drive complex programs and organizational change. Now she's bringing that experience to Techheads 2026.\n\nWhile most of the AI conversation revolves around coding assistants, Afaf will show how AI can be just as powerful for everyone else. In this session, she shares practical examples of connecting AI to existing project tools, planning systems and budgets to automate reporting, surface insights and support better decisions. You'll see how project and program leaders can spend less time collecting information and more time actually leading, solving problems and delivering value.",
    "time": "16:00-16:30",
    "location": "Sven Månsson",
    "company": "",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Automation",
      "Leadership",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s36",
    "title": "Total Resilience in a Volatile World",
    "speaker": "Panel Säkerhet\nCarl-Johan Ekelund, Atea\nMikael Svall, Outpost\nMåns Sandsjö, Frode Langemoen, IBM\nAndreas Kristiansson, Telenor\nMattias Hagelin, Kalmar Energi\nAnna Flinck, Kalmar Kommun\n45 min\nModerator: Louise Östlund",
    "description": "Security in a volatile world is no longer just about firewalls - it requires total resilience. In this panel, experts from IT, emerging tech, and critical infrastructure come together to discuss how we build comprehensive defense. How do we tackle everything from offensive cyberattacks and future quantum threats to securing connectivity, power grids, and local preparedness? Join representatives from Atea, Outpost24, IBM, Telenor, Kalmar Energi, and Kalmar Municipality as they explore how to shift from reactive crisis management to proactive security.",
    "time": "16:00-16:45",
    "location": "Gröna salen",
    "company": "",
    "category": "Security & Resilience",
    "keywords": [
      "Cybersecurity",
      "Resilience",
      "Leadership",
      "Business",
      "Why"
    ]
  },
  {
    "id": "s37",
    "title": "Modern Guru and the Path to Artificial Happiness",
    "speaker": "",
    "description": "",
    "time": "16:15-17:00",
    "location": "",
    "company": "",
    "category": "Other",
    "keywords": []
  },
  {
    "id": "s38",
    "title": "Stand out or blend in",
    "speaker": "Josefin Rennemark\nGustav Mattsson",
    "description": "When everyone has AI, creativity becomes your only competitive edge.\n\nAI has made it easier than ever to create content, campaigns, visuals and concepts. But when everyone has access to the same technology, standing out becomes the real challenge. What was once a production advantage quickly becomes table stakes.\n\nIn this session, Milou explores why creativity is becoming more important, not less, in the AI era. You'll learn how to use AI to strengthen your ideation process rather than replace it, and why the ability to think differently, find unexpected angles and create ideas people actually remember is now the defining competitive advantage.",
    "time": "16:30-17:00",
    "location": "Borgstugan",
    "company": "Milou",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Design",
      "Upskilling",
      "Why"
    ]
  },
  {
    "id": "s39",
    "title": "Don´t outsource your brain",
    "speaker": "",
    "description": "How law firms stay in control while scaling with AI.\n\nOur partner Yellow Elk is taking the stage at Techheads 2026 with their own session. AI platforms promise efficiency and scale, but they also come with trade-offs around data ownership, process control and where the value actually ends up.\n\nIn this session, Yellow Elk explores how to build the infrastructure and integrations that let you move fast with AI, without losing control of your business. A practical look at how knowledge-intensive organizations can stay in the driver's seat while still reaping the benefits of automation.",
    "time": "16:30-17:00",
    "location": "Sturesalen",
    "company": "Yellow Elk",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Platforms",
      "Business",
      "Case Study",
      "How"
    ]
  },
  {
    "id": "s40",
    "title": "Modern Guru and the Path to Artificial Happiness",
    "speaker": "",
    "description": "",
    "time": "",
    "location": "",
    "company": "",
    "category": "Other",
    "keywords": []
  },
  {
    "id": "s41",
    "title": "Who's driving (Vem är det som kör)?",
    "speaker": "Jonas Axelson, Lead Legal        \nMarcus Holgersson, Softhouse        \nMartin Wass, Yellow Elk        \nJosefin Rennemark, Milou        \nNoman Latif, Ericsson 30 min Moderator: TBA",
    "description": "Everyone can demo an agent. Far fewer run several of them on real work, in production, with someone accountable for what comes out. Six people who do — in software delivery, in a law firm built from scratch for it, in creative work and at enterprise scale — compare what they actually run, what supervises it, and where they stopped. They do not agree about where the human stays.",
    "time": "15:30-16:00",
    "location": "Källaren",
    "company": "",
    "category": "Emerging Tech",
    "keywords": [
      "AI",
      "Automation",
      "Software",
      "Platforms",
      "Future Tech",
      "Upskilling",
      "How"
    ]
  }
];
