import { ProjectItem } from "@/types"

export const projects: ProjectItem[] = [
  {
    id: "western-blot-mcp",
    title: "western blot mcp",
    description:
      "an mcp server that plugs into claude desktop to analyze western blot images — returns structured json with bands, lanes, and qc flags instead of variable prose, with step-by-step reasoning chains for reproducible lab workflows",
    techStack: ["python", "mcp", "gemini", "litellm", "uv", "pytest"],
    links: {
      github: "https://github.com/E10Feng/western-blot-mcp",
    },
    featured: false,
    year: 2026,
    date: "2026-05-31",
    content: [
      { type: "text", content: "Western blot analysis with AI produces inconsistent, hard-to-reproduce results when done ad-hoc — different prompts yield different prose, making batch processing and lab record-keeping unreliable. This MCP server fixes that by wrapping Gemini's vision capabilities in a structured interface that always returns the same JSON schema: bands, lanes, certainty ratings, and QC flags." },
      { type: "text", content: "Each analysis includes an auditable reasoning chain — a step-by-step array of conclusions the model made — so researchers can validate the logic, not just the output. The QC layer catches overexposure, loading control issues, ghost bands, smile effect, and image integrity problems, and even flags domain-specific pitfalls like GAPDH invalidity in hypoxia studies." },
      { type: "text", content: "The server supports file paths, URLs, and base64-encoded images as input and runs locally via Claude Desktop with a one-click .mcpb install. Gemini is the default (free via Google AI Studio), with OpenAI, Anthropic, and DeepSeek available through LiteLLM." },
    ],
  },
  {
    id: "balance-well",
    title: "BalanceWell",
    description:
      "duolingo but for rehab — a mobile-first pwa helping older adults (65+) reduce fall risk through daily balance exercises — personalized plans with lottie animations, a gemini-powered ai coach that adapts each day's plan, and email + push reminders",
    techStack: ["next.js", "neon", "drizzle orm", "nextauth", "gemini", "vercel ai sdk", "resend", "web push", "pwa", "tailwind css"],
    links: {
      github: "https://github.com/E10Feng/balance-app",
      demo: "https://balance-app-brown.vercel.app",
    },
    featured: false,
    year: 2026,
    date: "2026-05-22",
    content: [
      { type: "text", content: "BalanceWell is a mobile-first progressive web app for community-dwelling older adults (65+) to reduce fall risk through daily balance exercises. The app delivers a personalized plan of up to 4 exercises per day with Lottie animations for visual guidance, and is installable as a PWA with offline UI support." },
      { type: "text", content: "Coach Mei, a Gemini 2.5 Flash-powered conversational AI coach, answers questions, adjusts exercise difficulty, and silently updates tomorrow's plan in the background after each post-session check-in — where users log an emoji rating and notes about how they felt." },
      { type: "text", content: "Features include a streak counter, weekly completion grid, per-exercise level progression bars, daily email reminders via Resend, and browser push notifications via Web Push (VAPID). Auth is handled with NextAuth v5 + Google OAuth, and the database is serverless Postgres on Neon with Drizzle ORM." },
    ],
  },
  {
    id: "gradyou8",
    title: "gradYOU8",
    description:
      "upload your washu transcript and get a full graduation audit — which requirements you've satisfied, what's remaining, and an ai chat to answer questions about your degree",
    techStack: ["fastapi", "python", "react", "vite", "minimax", "rag"],
    links: {
      github: "https://github.com/E10Feng/gradYOU8",
    },
    featured: true,
    year: 2026,
    date: "2026-04-09",
    content: [
      { type: "text", content: "Graduation requirement tracking at WashU is a manual, confusing process — students dig through DegreeAudit and the bulletin trying to figure out what's left. gradYOU8 automates this by parsing your uploaded transcript PDF into a structured student profile and running it against dynamically-fetched degree requirements." },
      { type: "text", content: "Rather than hardcoding requirements, the app uses a RAG pipeline over WashU Bulletin PDFs to support any major or minor without manual updates. The dashboard shows overall completion percentage, per-group progress bars, distribution area breakdowns, and specific remaining coursework." },
      { type: "text", content: "An integrated AI chat interface answers contextual questions about your graduation requirements, with your completed coursework automatically included in every response." },
    ],
  },
  {
    id: "cyberclaw-city",
    title: "CyberClaw City",
    description:
      "a 3d explorable visualization of an ai agent architecture — navigate through districts representing memory, the build pipeline, job search tools, skills, and more",
    techStack: ["next.js", "react three fiber", "three.js", "typescript", "zustand", "framer motion"],
    links: {
      github: "https://github.com/E10Feng/cyberclaw-city",
      demo: "https://cyberclaw-city.vercel.app",
    },
    featured: true,
    year: 2026,
    date: "2026-04-01",
  },
  {
    id: "portfolio-website",
    title: "portfolio website",
    description:
      "a website to showcase my projects, research, and amazing personality :)",
    techStack: ["typescript", "next.js", "tailwind css", "framer motion"],
    links: {
      github: "https://github.com/E10Feng/portfolio#",
    },
    featured: true,
    year: 2026,
    date: "2026-01-01",
  },
  {
    id: "swell1-publication",
    title: "lrrc8/swell1 publication",
    description:
      "my work on the role of lrrc8/swell1 in skeletal muscle cell recruitment and regeneration was incorporated into a science advances publication!",
    techStack: ["wet lab", "western blot", "cryogenic tissue sectioning", "microscopy", "animal husbandry"],
    links: {
      paper: "https://www.science.org/doi/10.1126/sciadv.adt6366",
    },
    featured: true,
    year: 2025,
    content: [
      { type: "text", content: "Click the paper link to view the publication!" },
      { type: "text", content: "I studied the role of lrrc8/swell1 in skeletal muscle cell recruitment and regeneration. The abstract for my contribution to the paper is given below:" },
      {
        type: "text", content: "The recruitment of muscle satellite cells in response to injury is essential for the maintenance and growth of skeletal muscle and LRRC8 is an important factor in this process. Our previous studies show that LRRC8-deficient muscle satellite cells have impaired recovery from acute injury via cardiotoxin injection; here, we studied a more physiological and pathophysiological eccentric contraction injury model. Subjecting WT and LRRC8 knockout mice to a 10-day eccentric contraction protocol showed no differences in recovery between WT and KO groups but confirmed the efficacy of this protocol at inducing injury and subsequent satellite cell recruitment. Further, we piloted a novel progressive resistance exercise (PRE) model to determine if differences in skeletal muscle hypertrophy could be observed. Though there were no significant differences in muscle mass over the 4-week protocol, WT mice exhibited a trend toward increased adipose tissue mass—an interesting and unexpected result that may be explored in future studies. The physiological and translational nature of these experiments provides relevance for athletes, older adults, and patients suffering from muscle injury or chronic disease. Identifying the LRRC8 complex as a factor in skeletal muscle recovery and growth could establish a future target for drug or gene therapy. "
      }
    ]
  },
  {
    id: "derm-fairness-project",
    title: "dermatology fairness project",
    description:
      "investigated how synthetic dermatology medical images could augment training data sets to improve fairness between skin tones in machine learning classification models",
    techStack: ["python", "pytorch", "gans", "ml"],
    links: {
      github: "https://github.com/E10Feng/derm_fairness_project",
    },
    featured: true,
    year: 2024,
    content: [
      { type: "text", content: "Machine learning tools have significantly advanced their ability to diagnose skin cancers, achieving or even exceeding human-level performance. However, these models have been shown to underperform for individuals with darker skin. We hypothesize that this occurs due to a lack of high-quality data for darker skin tones and that the addition of synthetically generated training data could improve performance across skin tones." },
      { type: "text", content: "We fine-tuned a pre-trained ResNet50 model on the Fitzpatrick17k dataset, which comprises 17,000 images of skin lesions, labeled as 'malignant' or 'benign' and has been labeled for skin tone according to the Fitzpatrick scale: 1 (lightest) to 6 (darkest). We defined fairness as the difference between the highest and lowest false negative rates (FNRs) of the six skin tones. We augmented our training data using two oversampling methods: one to increase the representation of dark skin tones (skin tone oversampling) and another to increase the representation of dark skin tones with cancer (disease oversampling). This oversampling was performed at various levels (x1.25, x1.35, x1.5, x1.70, x1.85). Further, we used StyleGAN3, a generative adversarial network (GAN), to generate synthetic images and repeated the two oversampling strategies using synthetic data (skin tone augmentation and disease augmentation, respectively). We ran each experimental condition 8-10 times and collected metrics to assess model performance and fairness (ie AUC, FPR, FNR). " },
      { type: "text", content: "Our baseline model achieved an AUC of 0.755, but we found that skin tone correlates with model performance and fairness, with darker skin tones performing worse and having higher FNRs than lighter skin tones. Training with oversampling shows that AUC can be improved at the loss of some fairness. Augmenting training data with synthetic images also showed increased model performance but showed potential for keeping fairness at baseline level or improving it. " },
      { type: "text", content: "Our findings suggest that improving fairness in imbalanced datasets can be achieved through oversampling and augmenting data with synthetic images. While StyleGAN3 was used as our generative model, there are diffusion models that now outperform this architecture. Future work should explore more advanced methods like diffusion models to produce higher-quality synthetic images to enhance generalizability across datasets and also investigate how/why certain synthetic images are more effective at improving model performance compared to others." }
    ]
  },
]
