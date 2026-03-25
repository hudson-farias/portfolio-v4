export interface Project {
    name: string
    description: string
    stack: string
    link: string
}

export interface HomePageData {
    languages: string[]
    frameworks: string[]
    technologies: string[]
    projects: Project[]
}
