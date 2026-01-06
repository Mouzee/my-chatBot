
export interface ProjectDetails {
    overview?: string
    features?: string[]
    technologies?: string[]
    challenges?: string
    results?: string
}

export interface ProjectCardProps {
    title: string
    description: string
    tags?: string[]
    imageSrc?: string | string[]
    link?: string
    githubLink?: string
    delay?: number
    autoSlide?: boolean
    slideInterval?: number
    details?: ProjectDetails
}

export type ChatStage = "name" | "category" | "question-select" | "answer" | "complete"
export type ChatCategoryType = "recruiter" | "client" | "collaborator"

export interface ChatMessage {
    id: string
    content: string
    type: "bot" | "user"
}

export interface FAQItem {
    id: string
    question: string
    answer: string
}
