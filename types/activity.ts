export type ActivityKind =
  | 'multiple-choice'
  | 'true-false'
  | 'matching'
  | 'neuron-anatomy'

export interface MultipleChoiceOption {
  id: string
  label: string
  isCorrect: boolean
  feedback: string
}

export interface MultipleChoiceItem {
  id: string
  levelId: number
  prompt: string
  context?: string
  hint: string
  options: MultipleChoiceOption[]
}

export interface TrueFalseItem {
  id: string
  levelId: number
  statement: string
  isTrue: boolean
  feedbackWhenCorrect: string
  feedbackWhenIncorrect: string
  guidance: string
}

export interface MatchingPair {
  id: string
  concept: string
  analogy: string
  explanation: string
}

export interface MatchingActivityData {
  id: string
  levelId: number
  title: string
  description: string
  pairs: MatchingPair[]
}

export interface AnatomyHotspot {
  id: 'inputs' | 'weights' | 'bias' | 'activation' | 'output'
  label: string
  roleDescription: string
  everydayAnalogy: string
  prompt: string
}

export interface ActivityModule {
  id: string
  levelId: number
  title: string
  description: string
  kind: ActivityKind
  estimatedMinutes: number
}

export interface EvaluationQuestion {
  id: string
  levelId: number
  levelLabel: string
  prompt: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation: string
  relatedLessonSlug: string
}
