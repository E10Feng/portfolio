import { ProjectItem } from "@/types"

export const projects: ProjectItem[] = [
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
    id: "recall-graph",
    title: "RecallGraph",
    description:
      "a drop-in langgraph checkpointer backed by postgresql/pgvector that gives agents real persistent memory across sessions — replacing ephemeral in-memory state with durable, semantically searchable episodic memory",
    techStack: ["python", "langgraph", "postgresql", "pgvector", "sqlalchemy", "openai embeddings"],
    links: {
      github: "https://github.com/E10Feng/recall-graph",
    },
    featured: true,
    year: 2026,
    content: [
      { type: "text", content: "LangGraph's built-in MemorySaver dies on every process restart — agents lose prior decisions, evolving facts, and context continuity. RecallGraph solves this with a drop-in PostgreSQL-backed checkpointer that persists full agent state across sessions." },
      { type: "text", content: "The library provides two main interfaces: RecallGraphCheckpointer (a drop-in replacement for MemorySaver that stores full LangGraph state snapshots in PostgreSQL) and RecallMemory (a high-level API for episodic memory with semantic recall via pgvector cosine similarity search)." },
      { type: "text", content: "Key features include persistent cross-session checkpointing, semantically searchable episodic memory, auto-summarization of stale memories to prevent context bloat, and full thread isolation for multi-tenant safety. Built and tested with 11/11 tests passing." }
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
      { type: "text", content: "We fine-tuned a pre-trained ResNet50 model on the Fitzpatrick17k dataset, which comprises 17,000 images of skin lesions, labeled as ‘malignant’ or ‘benign’ and has been labeled for skin tone according to the Fitzpatrick scale: 1 (lightest) to 6 (darkest). We defined fairness as the difference between the highest and lowest false negative rates (FNRs) of the six skin tones. We augmented our training data using two oversampling methods: one to increase the representation of dark skin tones (skin tone oversampling) and another to increase the representation of dark skin tones with cancer (disease oversampling). This oversampling was performed at various levels (x1.25, x1.35, x1.5, x1.70, x1.85). Further, we used StyleGAN3, a generative adversarial network (GAN), to generate synthetic images and repeated the two oversampling strategies using synthetic data (skin tone augmentation and disease augmentation, respectively). We ran each experimental condition 8-10 times and collected metrics to assess model performance and fairness (ie AUC, FPR, FNR). " },
      { type: "text", content: "Our baseline model achieved an AUC of 0.755, but we found that skin tone correlates with model performance and fairness, with darker skin tones performing worse and having higher FNRs than lighter skin tones. Training with oversampling shows that AUC can be improved at the loss of some fairness. Augmenting training data with synthetic images also showed increased model performance but showed potential for keeping fairness at baseline level or improving it. " },
      { type: "text", content: "Our findings suggest that improving fairness in imbalanced datasets can be achieved through oversampling and augmenting data with synthetic images. While StyleGAN3 was used as our generative model, there are diffusion models that now outperform this architecture. Future work should explore more advanced methods like diffusion models to produce higher-quality synthetic images to enhance generalizability across datasets and also investigate how/why certain synthetic images are more effective at improving model performance compared to others." }
    ]
  },
]
