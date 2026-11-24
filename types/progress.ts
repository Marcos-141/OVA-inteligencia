export interface ActivityScoreRecord {
  activityId: string
  completed: boolean
  score: number
  maxScore: number
  updatedAt: string
}

export interface EvaluationRecord {
  completed: boolean
  score: number
  totalQuestions: number
  percentage: number
  levelBreakdown: Record<number, { correct: number; total: number }>
  completedAt: string
}

export interface StudentProgressState {
  completedLessonSlugs: string[]
  quickChecksPassed: string[]
  activityScores: Record<string, ActivityScoreRecord>
  evaluation: EvaluationRecord | null
  freeExplorationMode: boolean
  lastVisitedLessonSlug: string | null
  updatedAt: string
}
