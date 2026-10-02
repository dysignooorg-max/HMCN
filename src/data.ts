export type Service = {
  slug: string;
  emoji: string;
  title: string;
  short: string;
  hero: string;
  about: string[];
  howWeHelp: string[];
  faqs: { q: string; a: string }[];
  popular?: boolean;
};

export const services: Service[] = [
  {
    slug: "proctored-exam-help",
    emoji: "🎯",
    title: "Proctored Exam Help",
    short:
      "Our #1 most requested service. Experts handle your online proctored exam securely.",
    hero:
      "Pass Your Online Proctored Exam — Expert Help Available Right Now",
    about: [
      "Online proctored exams use software like ProctorU, Honorlock, Examity, Proctorio, LockDown Browser and Examplify to monitor you through your webcam, microphone and screen during the test.",
      "These exams can feel impossibly stressful — one technical glitch, one camera flag, or one missed concept can cost you months of work. Our team has years of experience navigating every major proctoring platform safely.",
    ],
    howWeHelp: [
      "We assign a subject-matter expert who has already taken and passed exams on your specific platform.",
      "We use secure remote-access methods that bypass detection while keeping your camera natural and your environment unflagged.",
      "We handle Canvas, Blackboard, Moodle, D2L Brightspace and every major university LMS portal.",
      "100% money-back guarantee if we don't deliver the agreed grade.",
    ],
    faqs: [
      {
        q: "Can you help with proctored exams that require my camera and microphone on?",
        a: "Yes. Our proctored exam specialists have safe, tested methods for camera-on, microphone-on, and full screen-share exams across all major proctoring services.",
      },
      {
        q: "Will the proctoring software detect anything?",
        a: "Our team has a 99.6% non-detection rate across thousands of completed proctored exams. We continuously update our methods as proctoring software evolves.",
      },
    ],
    popular: true,
  },
  {
    slug: "ged-exam-help",
    emoji: "📋",
    title: "GED Exam Help",
    short:
      "Pass your GED with a qualified expert by your side. Serving students nationwide.",
    hero: "Pass Your GED Exam — Expert Help Available Right Now",
    about: [
      "The GED (General Educational Development) test is a high school equivalency credential that opens the door to college, better jobs, and military service. It covers four subjects: Mathematical Reasoning, Reasoning Through Language Arts, Science, and Social Studies.",
      "Many adult learners juggle work, family and the GED at the same time — and it can feel overwhelming. We specialize in helping busy adults across the USA pass the GED quickly and confidentially.",
    ],
    howWeHelp: [
      "Full GED test help — all four subjects, online or at-home proctored versions (GED Online).",
      "Subject-specific tutoring for Math, RLA, Science and Social Studies if you only need help in one area.",
      "Specialized experience helping students in Georgia, Texas, Florida, Maryland, Alabama, Mississippi, Louisiana and North Carolina.",
      "Discreet, confidential service — your information is never shared.",
    ],
    faqs: [
      {
        q: "Can you help me with the GED Online (at-home) test?",
        a: "Absolutely. The at-home GED uses online proctoring, and our team has extensive experience with this exact format.",
      },
      {
        q: "How fast can you help me pass the GED?",
        a: "Many of our students complete all four subjects within 2–3 weeks from first contact, depending on test scheduling.",
      },
    ],
  },
  {
    slug: "teas-hesi-exam-help",
    emoji: "🏥",
    title: "TEAS & HESI Exam Help",
    short:
      "Nursing school entrance exams handled by healthcare-specialized experts.",
    hero: "TEAS & HESI Exam Help — Pass Your Nursing Entrance Test",
    about: [
      "The TEAS (Test of Essential Academic Skills) and HESI A2 are the two most common nursing school entrance exams in the United States. A weak score can keep you out of your dream nursing program.",
      "Our healthcare-specialized experts include licensed nurses, biology professionals, and former nursing-school admissions tutors.",
    ],
    howWeHelp: [
      "Full TEAS 7 and HESI A2 test help — online or at testing center variants.",
      "Subject coaching for Reading, Math, Science, English & Language Usage.",
      "Score targeting — tell us your program's required score and we hit it.",
      "ATI TEAS, HESI Evolve and Kaplan platform familiarity.",
    ],
    faqs: [
      {
        q: "Do you guarantee a passing score for nursing school?",
        a: "Yes. We work to your program's specific cutoff score (e.g., 70+ Adjusted Individual or 80+ Composite) and back it with a money-back guarantee.",
      },
    ],
  },
  {
    slug: "wgu-online-course-help",
    emoji: "💻",
    title: "WGU & Online Course Help",
    short:
      "Full course management for WGU, Sophia, Study.com, Straighterline and more.",
    hero: "WGU & Online College Course Help — We Handle Your Whole Class",
    about: [
      "Western Governors University (WGU), Sophia Learning, Study.com, Straighterline, Penn Foster, Capella, Strayer, SNHU, Walden, Liberty, University of Phoenix, Grand Canyon University, Purdue Global, Colorado Tech and more — we cover every major online program in the USA.",
      "Whether you need a single objective assessment passed or your entire term completed, we have a dedicated expert ready.",
    ],
    howWeHelp: [
      "Full course management — assignments, quizzes, discussions, OAs, and final projects.",
      "Performance Assessments (PAs) and Objective Assessments (OAs) for WGU.",
      "Sophia, Study.com and Straighterline accelerated transfer credit completion.",
      "Weekly progress updates so you always know where your course stands.",
    ],
    faqs: [
      {
        q: "Can you finish a WGU term in under 4 weeks?",
        a: "Yes. Many students use us to accelerate WGU terms and complete 8–12 competency units in a single term.",
      },
    ],
  },
  {
    slug: "certifications-help",
    emoji: "🏆",
    title: "Certifications (CompTIA / AWS / PMP)",
    short:
      "Professional certification exams handled by certified industry experts.",
    hero: "CompTIA, AWS, PMP & IT Certification Help — Pass The First Time",
    about: [
      "Professional certifications can transform your career — but the exams are expensive, time-pressured, and unforgiving. We have certified industry experts who hold the exact credentials you're after.",
      "From CompTIA A+, Network+, Security+, CySA+ and PenTest+ to AWS Solutions Architect, AWS Developer, Azure, PMP, ITIL and Cisco — we cover them all.",
    ],
    howWeHelp: [
      "Full exam taking via Pearson VUE OnVUE and PSI online proctoring.",
      "PMP, AWS, Azure, GCP, CompTIA, Cisco, Salesforce certifications.",
      "Pre-exam prep & post-exam credential verification support.",
      "Money-back guarantee if you don't pass.",
    ],
    faqs: [
      {
        q: "Can you take a Pearson VUE OnVUE proctored exam for me?",
        a: "Yes. Our certification team takes Pearson VUE OnVUE and PSI online-proctored exams every single day for clients across the USA.",
      },
    ],
  },
  {
    slug: "gre-gmat-nclex-hiset-help",
    emoji: "🎯",
    title: "GRE / GMAT / NCLEX / HiSET",
    short:
      "Graduate and professional exam help for students advancing their careers.",
    hero: "GRE, GMAT, NCLEX & HiSET — Expert Exam Help For Your Next Step",
    about: [
      "Graduate school admissions and licensure exams are some of the highest-stakes tests of your career. A bad score can cost you admission, licensure, or your dream job.",
      "Our specialized teams cover the GRE, GMAT (including the new GMAT Focus Edition), NCLEX-RN, NCLEX-PN, and the HiSET high school equivalency exam.",
    ],
    howWeHelp: [
      "GRE & GMAT — at-home and test-center versions both supported.",
      "NCLEX-RN & NCLEX-PN — Pearson VUE proctored, by licensed nurses.",
      "HiSET — online and in-person testing supported.",
      "Score-targeted plans (e.g., GRE 320+, GMAT 700+).",
    ],
    faqs: [
      {
        q: "Can you guarantee an NCLEX pass?",
        a: "Yes. Our NCLEX team is built of practicing RNs and includes a money-back pass guarantee.",
      },
    ],
  },
];

export const examOptions = [
  "GED",
  "TEAS",
  "HESI",
  "HiSET",
  "CompTIA",
  "NCLEX",
  "WGU",
  "Sophia",
  "AWS",
  "PMP",
  "GRE",
  "GMAT",
  "Online Course",
  "Proctored Exam",
  "Other",
];

export const platforms = [
  "GED", "HiSET", "TEAS", "HESI", "CompTIA", "WGU", "Sophia", "Study.com",
  "Straighterline", "AWS", "Coursera", "PMP", "ATI", "GRE", "GMAT", "NCLEX",
  "ProctorU", "Proctorio", "Honorlock", "Examity", "LockDown Browser", "Canvas",
  "Blackboard", "Moodle", "Penn Foster", "Strayer", "Walden", "U. of Phoenix",
  "Grand Canyon", "SNHU", "Liberty", "American Public", "Colorado Tech",
  "Capella", "Purdue Global", "National U.", "Western Governors", "Full Sail",
  "Herzing", "Keiser", "Rasmussen", "Chamberlain", "CNA", "PSI", "ETS",
  "Kaplan", "Examplify", "Accuplacer",
];

export const testimonials = [
  {
    name: "Tasha M.",
    location: "Atlanta, GA",
    course: "GED Exam",
    quote:
      "I had failed my GED twice. HelpMyCourseNow matched me with an expert that same day, and I passed all four subjects within two weeks. I cried tears of joy.",
    initial: "T",
    color: "#3D348B",
  },
  {
    name: "Marcus J.",
    location: "Houston, TX",
    course: "WGU IT Course",
    quote:
      "I'm working full time with two kids. They handled my entire WGU term — 9 OAs and 4 PAs — while I focused on my family. Worth every dollar.",
    initial: "M",
    color: "#F35B04",
  },
  {
    name: "Jasmine R.",
    location: "Charlotte, NC",
    course: "NCLEX-RN",
    quote:
      "I was terrified of the NCLEX. They walked me through everything, took the proctored exam, and I am now a licensed RN. Thank you forever.",
    initial: "J",
    color: "#7678ED",
  },
  {
    name: "Devon W.",
    location: "Birmingham, AL",
    course: "CompTIA Security+",
    quote:
      "Passed Security+ first try with their help. Already booked Network+ with them. Real, certified people who actually know IT.",
    initial: "D",
    color: "#F18701",
  },
  {
    name: "Aisha B.",
    location: "Baltimore, MD",
    course: "TEAS Nursing Exam",
    quote:
      "I needed an 80 to get into my nursing program. They got me an 86. I'm starting nursing school this fall thanks to them.",
    initial: "A",
    color: "#3D348B",
  },
  {
    name: "Robert C.",
    location: "Jackson, MS",
    course: "HiSET",
    quote:
      "Took my HiSET online from home. Confidential, fast, and I passed. Best decision I made this year.",
    initial: "R",
    color: "#F35B04",
  },
];

export const homeFaqs = [
  {
    q: "Is it safe to use your service?",
    a: "Absolutely. We use secure remote-access methods, encrypted communication, and our experts have a 99.6% non-detection rate across all major proctoring platforms. Your privacy is protected at every step.",
  },
  {
    q: "Will anyone find out I used your help?",
    a: "No. We have never compromised a student's privacy in our entire history. All communication is encrypted, payment is private, and no record of our involvement is ever stored on your school's systems.",
  },
  {
    q: "How fast can you get me an expert?",
    a: "Most students are matched with a qualified expert within 5 to 30 minutes of submitting the form or messaging us on WhatsApp.",
  },
  {
    q: "Do you cover my specific exam or platform?",
    a: "We cover GED, HiSET, TEAS, HESI, NCLEX, CompTIA, AWS, PMP, GRE, GMAT, WGU, Sophia, Study.com, Straighterline, and every major US online university — Penn Foster, Capella, Strayer, SNHU, Walden, Liberty, University of Phoenix, Grand Canyon, Purdue Global and many more.",
  },
  {
    q: "What if I'm not satisfied with the results?",
    a: "We offer a money-back guarantee. If we don't deliver the agreed grade or score, you get a full refund or a free retake handled by a senior expert.",
  },
  {
    q: "How do I make payment?",
    a: "We accept secure SSL-encrypted payment via Zelle, Cash App, PayPal, Apple Pay, debit card and crypto. All transactions are private and discreet.",
  },
  {
    q: "Can you help with proctored exams with cameras on?",
    a: "Yes. Camera-on, microphone-on and full screen-share exams are our specialty across ProctorU, Honorlock, Examity, Proctorio, LockDown Browser and Pearson VUE OnVUE.",
  },
  {
    q: "Do you work with my specific school's portal?",
    a: "Yes. Canvas, Blackboard, Moodle, D2L Brightspace, Pearson MyLab, McGraw-Hill Connect, ALEKS, Cengage MindTap, WileyPlus — we work with every major online learning portal.",
  },
  {
    q: "What age groups do you help?",
    a: "We help students aged 16 and up, with a special focus on adult learners (25–55) returning to school while working and raising a family.",
  },
  {
    q: "Is your service legal?",
    a: "Our service is a private academic assistance service. We provide expert tutoring, study assistance, and exam preparation. How clients use our services is their own personal responsibility.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: { heading?: string; paragraph?: string; list?: string[] }[];
};

export const blogCategories = [
  "GED Exam Help & Tips",
  "Online Proctored Exam Guide",
  "TEAS Exam Preparation",
  "WGU Student Resources",
  "CompTIA & IT Certifications",
  "NCLEX Nursing Exam Tips",
  "Online College Course Help",
  "Student Success Stories",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-pass-ged-exam",
    title: "How to Pass Your GED Exam in 2026: Complete Guide for Adult Learners",
    category: "GED Exam Help & Tips",
    excerpt:
      "A complete, no-fluff guide to passing the GED in 2026 — including study schedule, GED Online testing, scoring, and where to get expert help.",
    date: "Apr 14, 2026",
    readTime: "9 min read",
    body: [
      { paragraph: "If you're searching for how to pass your GED exam in 2026, you're in the right place. The GED (General Educational Development) is the most widely recognized high school equivalency credential in the United States, accepted by 98% of US colleges and employers." },
      { heading: "What Is The GED Exam?" },
      { paragraph: "The GED is a four-subject test that proves you have high-school level academic skills. Subjects: Mathematical Reasoning, Reasoning Through Language Arts (RLA), Science, and Social Studies." },
      { heading: "GED Online vs. Test-Center GED" },
      { paragraph: "Since 2020, the GED can be taken online from home using OnVUE proctoring software. You'll need a quiet room, a webcam, a microphone, and a stable internet connection." },
      { heading: "GED Passing Score In 2026" },
      { paragraph: "You need a 145 on each of the four subject tests to pass. A 165–174 earns 'College Ready' status, and 175+ earns 'College Ready + Credit'." },
      { heading: "How To Study For The GED" },
      { list: [
          "Take a free diagnostic to see which subject is weakest.",
          "Spend 60–90 minutes per day on the subject you scored lowest in.",
          "Use GED Ready (the official practice test) before scheduling.",
          "Don't burn out — take one subject at a time, not all four in a week.",
        ] },
      { heading: "When To Get Expert Help" },
      { paragraph: "If you've already failed once, are running out of time, or just don't have hours every day to study while working and raising a family — you don't have to do this alone. Our GED experts have helped over 3,000 adult learners pass the GED, often within 2–3 weeks." },
    ],
  },
  {
    slug: "what-is-proctored-exam",
    title: "What Is a Proctored Exam and How Does Online Proctoring Work? (Student Guide)",
    category: "Online Proctored Exam Guide",
    excerpt:
      "Online proctored exams use AI and live monitors to watch you while you test. Here's everything you need to know — and how to pass without stress.",
    date: "May 06, 2026",
    readTime: "8 min read",
    body: [
      { paragraph: "An online proctored exam is a test you take from home while being monitored through your webcam, microphone and screen. Common platforms include ProctorU, Honorlock, Examity, Proctorio, Respondus LockDown Browser, and Pearson VUE OnVUE." },
      { heading: "How Does Online Proctoring Work?" },
      { paragraph: "When you start a proctored exam, the software typically: scans your room with the webcam, locks your browser, records your face and audio, and either uses AI flags or a live human proctor to monitor you in real time." },
      { heading: "What Triggers A Flag?" },
      { list: [
          "Looking away from the screen for too long",
          "Multiple faces or voices detected",
          "Background noise or movement",
          "Switching tabs or opening other apps",
          "Slow eye movements or reading lips",
        ] },
      { heading: "How To Pass Without Stress" },
      { paragraph: "Test in a quiet, well-lit room. Use a wired internet connection. Close every other app. And if the exam is high-stakes — career, license, or graduation — consider expert help so a single technical glitch doesn't ruin months of work." },
    ],
  },
  {
    slug: "teas-exam-guide",
    title: "TEAS Exam 2026: Everything Nursing Students Need to Know Before Test Day",
    category: "TEAS Exam Preparation",
    excerpt:
      "Your complete TEAS 7 study and test-day guide. Sections, scoring, what schools require, and where to get expert help if you're behind.",
    date: "May 27, 2026",
    readTime: "10 min read",
    body: [
      { paragraph: "The TEAS (Test of Essential Academic Skills) is the #1 nursing school entrance exam in the USA. The current version, TEAS 7, was released by ATI in 2022 and is what you'll take in 2026." },
      { heading: "TEAS 7 Sections" },
      { list: [
          "Reading — 45 questions, 55 minutes",
          "Math — 38 questions, 57 minutes",
          "Science — 50 questions, 60 minutes",
          "English & Language Usage — 37 questions, 37 minutes",
        ] },
      { heading: "What Score Do You Need?" },
      { paragraph: "Most ADN programs require 60+. BSN programs typically want 70+. Top programs want 80+. The national average is around 65." },
      { heading: "How To Prepare" },
      { paragraph: "ATI's official TEAS SmartPrep is the gold standard. Pair it with Mometrix and Pocket Prep practice questions. Plan 6 weeks if starting from scratch." },
    ],
  },
  {
    slug: "wgu-online-classes-tips",
    title: "WGU Online Classes: Tips, Tricks & How to Succeed in Your Program",
    category: "WGU Student Resources",
    excerpt:
      "WGU's competency-based model lets you accelerate your degree — but only if you know how to play the game. Here's the full strategy.",
    date: "Jun 10, 2026",
    readTime: "11 min read",
    body: [
      { paragraph: "Western Governors University (WGU) is the most popular fully online, accelerated university in the United States. Its competency-based model means you can finish a 12-month term in as little as 6 weeks if you move fast." },
      { heading: "How WGU Works" },
      { paragraph: "Each course is a 'Course of Study' (COS) leading to either an Objective Assessment (OA — a proctored online exam) or a Performance Assessment (PA — a written project graded by an evaluator)." },
      { heading: "How To Accelerate" },
      { list: [
          "Skip the courses of study and go directly to the pre-assessment.",
          "If you pass the pre-assessment by 10+ points, schedule the OA immediately.",
          "Batch your PAs — write 2–3 in a single weekend.",
          "Use Reddit r/WGU and the Discord to find OA topic 'cohorts'.",
        ] },
    ],
  },
  {
    slug: "comptia-aplus-exam-guide",
    title: "CompTIA A+ Exam Guide 2026: Pass on Your First Attempt",
    category: "CompTIA & IT Certifications",
    excerpt:
      "Everything you need to pass CompTIA A+ Core 1 (220-1101) and Core 2 (220-1102) on the first try in 2026.",
    date: "Jun 24, 2026",
    readTime: "9 min read",
    body: [
      { paragraph: "CompTIA A+ is the entry-level IT certification. Pass both Core 1 and Core 2, and you've proven you can support modern hardware, networks, mobile devices, security and operating systems." },
      { heading: "Best Study Materials" },
      { list: [
          "Professor Messer's free A+ training videos",
          "Mike Meyers' All-in-One A+ book",
          "Jason Dion practice exams on Udemy",
          "Pocket Prep mobile app for daily flashcards",
        ] },
    ],
  },
  {
    slug: "manage-work-family-online-school",
    title: "How to Manage Work, Family, and Online School at the Same Time",
    category: "Online College Course Help",
    excerpt:
      "Adult learners juggle more than anyone. Here's a real-life system for surviving — and winning — online school while working full time and raising kids.",
    date: "Jul 08, 2026",
    readTime: "7 min read",
    body: [
      { paragraph: "If you're an adult learner working full time, raising children, and trying to finish a degree online, you are not failing. The system was not designed for you. Here's how to win anyway." },
      { heading: "The 5/30 Rule" },
      { paragraph: "Five days a week, thirty focused minutes. That's it. Consistency beats intensity. A 30-minute block before the kids wake up will out-perform a 4-hour Sunday cram every single time." },
    ],
  },
  {
    slug: "ged-vs-hiset",
    title: "GED vs HiSET: Which High School Equivalency Test Should You Take in 2026?",
    category: "GED Exam Help & Tips",
    excerpt:
      "The GED is more famous, but the HiSET is easier in many ways. Here's a side-by-side comparison so you can pick the right one for your state.",
    date: "Jul 22, 2026",
    readTime: "8 min read",
    body: [
      { paragraph: "Both the GED and HiSET are accepted as high school equivalency credentials in most US states. But they are very different exams." },
      { heading: "Quick Comparison" },
      { list: [
          "GED — 4 subjects, computer-based only, 145 to pass each, $36 per subject",
          "HiSET — 5 subjects, computer OR paper, 8 to pass each, $10–$15 per subject",
          "GED — slightly harder reading, more analytical math",
          "HiSET — more straightforward, accepted in 25+ states",
        ] },
    ],
  },
  {
    slug: "nclex-exam-tips",
    title: "NCLEX Exam Tips 2026: What Nursing Students Must Know",
    category: "NCLEX Nursing Exam Tips",
    excerpt:
      "NCLEX-RN and NCLEX-PN updated test plans for 2026, Next-Gen NCLEX item types, and how to pass even if you're testing soon.",
    date: "Aug 19, 2026",
    readTime: "10 min read",
    body: [
      { paragraph: "The Next Generation NCLEX (NGN), launched in 2023, is now standard. It uses case studies, bowtie items, drag-and-drop and clinical-judgment scoring." },
      { heading: "Top 5 NCLEX Tips" },
      { list: [
          "Master Maslow, ABCs, and the Nursing Process — they answer 30% of questions.",
          "Use UWorld for at least 2,000 questions before testing.",
          "Don't memorize — practice case studies.",
          "Sleep before the exam more than you study.",
          "Schedule the exam for early morning when your brain is freshest.",
        ] },
    ],
  },
  {
    slug: "is-online-course-help-safe",
    title: "Is It Safe to Get Help With Your Online Course? Here's What You Need to Know",
    category: "Online College Course Help",
    excerpt:
      "Honest answers about privacy, detection, and how to choose an online exam help service that actually protects you.",
    date: "Sep 09, 2026",
    readTime: "6 min read",
    body: [
      { paragraph: "If you're considering hiring an expert to help with an online course or exam, your #1 question is probably: 'Is this safe?' The honest answer is — it depends on who you hire." },
      { heading: "What To Look For In A Safe Service" },
      { list: [
          "Encrypted messaging (WhatsApp, Signal — never plain email)",
          "Private payment options (Zelle, Cash App, crypto)",
          "Experts who specialize in your specific platform",
          "A real money-back guarantee in writing",
          "Testimonials from real US students you can verify",
        ] },
    ],
  },
  {
    slug: "how-online-exam-help-works",
    title: "How Online Exam Help Services Work: A Complete Student Guide",
    category: "Student Success Stories",
    excerpt:
      "From the moment you reach out to the moment you see your passing grade — here's exactly how online exam help services work in 2026.",
    date: "Sep 30, 2026",
    readTime: "7 min read",
    body: [
      { paragraph: "Online exam help services have grown into a full industry serving hundreds of thousands of adult learners across the United States. Here's how the process actually works." },
      { heading: "The 4-Step Process" },
      { list: [
          "Step 1 — You message us with your exam, course, deadline.",
          "Step 2 — We match you with a vetted expert in your subject.",
          "Step 3 — Expert handles the work securely on your platform.",
          "Step 4 — You receive your passing grade and pay only on results.",
        ] },
    ],
  },
];
