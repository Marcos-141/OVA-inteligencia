export type InteractiveResourceId =
  | 'paradigm-comparator'
  | 'neuron-simulator'
  | 'network-flow'
  | 'architecture-explorer'
  | 'neuron-anatomy'
  | 'brain-analogy-diagram'
  | 'applications-showcase'

export interface ConceptBlock {
  title: string
  body: string
  highlight?: string
}

export interface KeyTerm {
  term: string
  simpleDefinition: string
}

export interface OptionalMathContent {
  title: string
  intro: string
  formulaLabel: string
  formulaText: string
  stepByStep: string[]
  takeaway: string
}

export interface LessonCheckOption {
  id: string
  text: string
  isCorrect: boolean
  feedback: string
}

export interface LessonQuickCheck {
  question: string
  hint: string
  options: LessonCheckOption[]
}

export interface Lesson {
  id: string
  slug: string
  levelId: number
  orderInLevel: number
  title: string
  subtitle: string
  estimatedMinutes: number
  /** Marca que indica que el texto corresponde a material introductorio de referencia reemplazable. */
  isReferenceContent: boolean
  /** 1. Introducción al tema */
  introduction: string
  /** 2. Explicación sencilla */
  simpleExplanation: {
    heading: string
    paragraphs: string[]
    keyTerms: KeyTerm[]
  }
  /** 3. Ejemplo de la vida cotidiana */
  everydayExample: {
    title: string
    scenario: string
    connection: string
  }
  /** 4. Desarrollo del concepto */
  conceptDevelopment: {
    heading: string
    blocks: ConceptBlock[]
    optionalMath?: OptionalMathContent
  }
  /** 5. Recurso visual o interactivo */
  interactiveResource?: {
    id: InteractiveResourceId
    title: string
    instruction: string
  }
  /** 6. Resumen de lo aprendido */
  summaryPoints: string[]
  /** 7. Actividad corta para comprobar la comprensión */
  quickCheck: LessonQuickCheck
}

export interface LearningLevel {
  id: number
  code: string
  title: string
  shortTitle: string
  description: string
  objective: string
  difficultyLabel: 'Inicio' | 'Básico' | 'Intermedio' | 'Aplicado' | 'Integración'
  lessonSlugs: string[]
}
