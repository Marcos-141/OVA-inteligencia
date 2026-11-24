export type ChatSender = 'student' | 'tutor'

export interface ChatSuggestedLink {
  label: string
  to: string
}

export interface ChatMessageItem {
  id: string
  sender: ChatSender
  text: string
  timestamp: string
  relatedLinks?: ChatSuggestedLink[]
  isFallback?: boolean
}

export interface ChatbotKnowledgeEntry {
  id: string
  category: string
  levelId: number
  questionExample: string
  keywords: string[]
  /** Frases o términos de alto peso que identifican con precisión la consulta */
  exactTriggers?: string[]
  answer: string
  everydayTip?: string
  relatedLinks: ChatSuggestedLink[]
}
