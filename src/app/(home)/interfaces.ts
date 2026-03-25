export interface Project {
    name: string
    description: string
    stack: string
    link: string
}

export interface HomePageData {
    about: string
    about2: string
    languages: string[]
    frameworks: string[]
    technologies: string[]
    projects: Project[]
}
