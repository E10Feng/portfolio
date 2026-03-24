import { ResumeItem } from "@/types"

export const resumeItems: ResumeItem[] = [
  {
    id: "rediminds-co-op",
    type: ["work", "internship"],
    organization: "rediminds",
    role: "ai enablement intern",
    startDate: "jan 2026",
    endDate: "present",
    location: "detroit, mi || remote",
    description: [
      "leading development of an automated worker's compensation medical necessity review system using hierarchical RAG and agent frameworks, improving review speed and consistency",
    ],
    technologies: ["python", "postgres", "gcp", "vertexai", "google adk"],
  },
  {
    id: "nasa-intern",
    type: ["work", "internship"],
    organization: "nasa",
    role: "ai systems engineering intern",
    startDate: "may 2025",
    endDate: "aug 2025",
    location: "houston, tx",
    description: [
      "devised a graph rag ai system to help biomedical flight controllers perform daily tasks and troubleshoot ISS crew health issues, enabling faster decision-making",
      "my work was highlighted in nasa's technology report (msc-28048) and added to the johnson space center software portfolio",
      "developed search algorithms and embedding-based semantic search to explore large astronaut health data sets, combining nlp and llms for better data retrieval; built an intuitive gui with Streamlit that shortens the learning curve for decision makers"
    ],
    technologies: ["python", "langgraph", "neo4j", "streamlit", "vertexai", "gcp"],
    photos: [
      "/NASA-photo-1.jpg",
      "/NASA-photo-2.jpg",
      "/NASA-photo-3.jpg",
      "/NASA-photo-4.jpg",
      "/NASA-photo-5.jpg",
      "/NASA-photo-6.jpg",
      "/NASA-photo-7.jpg",
      "/NASA-photo-8.jpg",
    ],
  },
  {
    id: "biomedical-informatics-intern",
    type: ["research", "internship"],
    organization: "vanderbilt university medical center",
    role: "machine learning research intern",
    startDate: "may 2024",
    endDate: "aug 2024",
    location: "nashville, tn",
    description: [
      "investigated how synthetic dermatology medical images could augment training data sets to improve fairness between skin tones in machine learning classification models",
      "discovered potential for GAN-generated synthetic data to increase both AUC and fairness without tradeoffs",
    ],
    technologies: ["python", "pytorch", "gans", "ml"]

  },
  {
    id: "bio-research",
    type: ["research", "internship"],
    organization: "washington university in st. louis medical school",
    role: "vagelos research fellow",
    startDate: "may 2023",
    endDate: "aug 2023",
    location: "st. louis, mo",
    description: [
      "investigated the role of anion channel SWELL1 in the recruitment of satellite muscle cells in response to injury",
      "performed Western blotting, skeletal muscle tissue sectioning, and microscopy to analyze protein expression and tissue morphology",
      "participated in vagelos fellowship program, a 10-week fully funded undergraduate research opportunity"
    ],
    technologies: ["wet lab", "western blot", "cryogenic tissue sectioning", "microscopy", "animal husbandry"]
  },
  {
    id: "bs-cs",
    type: ["education"],
    organization: "washington university in st. louis",
    role: "b.s. computational biology",
    startDate: "aug 2022",
    endDate: "may 2026",
    location: "st. louis, mo",
    description: [
      "minor in computer science",
      "d3 varsity swimming (7x ncaa all-american)",
      "beyond boundaries interdisciplinary studies",
      "dean's list all semesters",
      "vagelos biological research fellowship",
    ],
  },
]
