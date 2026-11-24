import {
  CHATBOT_KNOWLEDGE,
  TUTOR_FALLBACK_LINKS,
  TUTOR_SUGGESTED_QUESTIONS,
  TUTOR_WELCOME_MESSAGE
} from '~/data/chatbot-responses'
import type { ChatbotKnowledgeEntry, ChatMessageItem } from '~/types/chatbot'

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function createMessageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function findBestKnowledgeMatch(query: string): ChatbotKnowledgeEntry | null {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return null

  const queryWords = normalizedQuery.split(' ').filter((word) => word.length >= 2)

  let bestEntry: ChatbotKnowledgeEntry | null = null
  let bestScore = 0

  for (const entry of CHATBOT_KNOWLEDGE) {
    let score = 0

    if (entry.exactTriggers) {
      for (const trigger of entry.exactTriggers) {
        const normalizedTrigger = normalizeText(trigger)
        if (normalizedQuery.includes(normalizedTrigger)) {
          score += 6
        }
      }
    }

    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalizeText(keyword)
      if (!normalizedKeyword) continue

      if (normalizedKeyword.includes(' ')) {
        if (normalizedQuery.includes(normalizedKeyword)) {
          score += 4
        }
      } else if (queryWords.includes(normalizedKeyword)) {
        score += 2.5
      } else if (
        normalizedKeyword.length >= 5 &&
        queryWords.some(
          (word) =>
            word.length >= 5 &&
            (word.startsWith(normalizedKeyword.slice(0, 5)) ||
              normalizedKeyword.startsWith(word.slice(0, 5)))
        )
      ) {
        score += 1.5
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  return bestScore >= 2 ? bestEntry : null
}

function createInitialMessages(): ChatMessageItem[] {
  return [
    {
      id: createMessageId('welcome'),
      sender: 'tutor',
      text: TUTOR_WELCOME_MESSAGE,
      timestamp: formatCurrentTime()
    }
  ]
}

export function useChatbot() {
  const messages = useState<ChatMessageItem[]>('tutor-rna-messages', createInitialMessages)
  const isResponding = useState<boolean>('tutor-rna-responding', () => false)

  function buildTutorReply(userInput: string): ChatMessageItem {
    const match = findBestKnowledgeMatch(userInput)

    if (match) {
      const fullText = match.everydayTip
        ? `${match.answer}\n\nEjemplo cotidiano: ${match.everydayTip}`
        : match.answer

      return {
        id: createMessageId('tutor'),
        sender: 'tutor',
        text: fullText,
        timestamp: formatCurrentTime(),
        relatedLinks: match.relatedLinks
      }
    }

    return {
      id: createMessageId('tutor-fallback'),
      sender: 'tutor',
      text:
        'Aún no tengo una respuesta preparada en mi guía local para esa pregunta específica. Recuerda que soy un tutor educativo basado en los contenidos de este OVA (sin conexión a servidores externos).\n\nTe sugiero intentar con preguntas sobre: inteligencia artificial, neurona artificial, entradas, pesos, sesgo, función de activación, propagación hacia adelante, retropropagación, tipos de aprendizaje o aplicaciones cotidianas, o visitar directamente estas secciones:',
      timestamp: formatCurrentTime(),
      relatedLinks: TUTOR_FALLBACK_LINKS,
      isFallback: true
    }
  }

  function sendMessage(rawText: string) {
    const text = rawText.trim()
    if (!text || isResponding.value) return

    const studentMessage: ChatMessageItem = {
      id: createMessageId('student'),
      sender: 'student',
      text,
      timestamp: formatCurrentTime()
    }

    messages.value = [...messages.value, studentMessage]
    isResponding.value = true

    setTimeout(() => {
      const reply = buildTutorReply(text)
      messages.value = [...messages.value, reply]
      isResponding.value = false
    }, 360)
  }

  function resetConversation() {
    isResponding.value = false
    messages.value = createInitialMessages()
  }

  return {
    messages,
    isResponding,
    suggestedQuestions: TUTOR_SUGGESTED_QUESTIONS,
    faqEntries: CHATBOT_KNOWLEDGE.filter((entry) => entry.id !== 'kb-saludo'),
    sendMessage,
    resetConversation
  }
}
