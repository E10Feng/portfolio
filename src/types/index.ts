export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string; caption?: string }

export interface ProjectItem {
  id: string
  title: string
  description: string
  techStack: string[]
  links: {
    github?: string
    paper?: string
    demo?: string
  }
  featured: boolean
  year: number
  content?: ContentBlock[]
}

export type ResumeItemType = "education" | "work" | "research" | "internship"

export interface ResumeItem {
  id: string
  type: ResumeItemType[]
  organization: string
  role: string
  startDate: string
  endDate: string
  location: string
  description: string[]
  technologies?: string[]
  photos?: string[]
  content?: ContentBlock[]
}
