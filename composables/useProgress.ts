import { LEARNING_LEVELS } from '~/data/learning-path'
import { LESSONS } from '~/data/lessons'
import { ACTIVITY_MODULES } from '~/data/activities'
import type {
  ActivityScoreRecord,
  EvaluationRecord,
  StudentProgressState
} from '~/types/progress'

const STORAGE_KEY = 'ova-rna-student-progress-v1'

function createDefaultProgress(): StudentProgressState {
  return {
    completedLessonSlugs: [],
    quickChecksPassed: [],
    activityScores: {},
    evaluation: null,
    freeExplorationMode: false,
    lastVisitedLessonSlug: null,
    updatedAt: new Date().toISOString()
  }
}

function isValidStoredState(data: unknown): data is Partial<StudentProgressState> {
  return typeof data === 'object' && data !== null
}

export function useProgress() {
  const state = useState<StudentProgressState>('ova-progress-state', createDefaultProgress)
  const hydrated = useState<boolean>('ova-progress-hydrated', () => false)

  function persist() {
    if (!import.meta.client) return
    try {
      state.value.updatedAt = new Date().toISOString()
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
    } catch {
      // Silenciamos errores de cuota o modo privado sin romper la experiencia
    }
  }

  function loadFromStorage() {
    if (!import.meta.client || hydrated.value) return
    hydrated.value = true
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed: unknown = JSON.parse(raw)
      if (!isValidStoredState(parsed)) return

      const defaults = createDefaultProgress()
      state.value = {
        completedLessonSlugs: Array.isArray(parsed.completedLessonSlugs)
          ? parsed.completedLessonSlugs.filter((item): item is string => typeof item === 'string')
          : defaults.completedLessonSlugs,
        quickChecksPassed: Array.isArray(parsed.quickChecksPassed)
          ? parsed.quickChecksPassed.filter((item): item is string => typeof item === 'string')
          : defaults.quickChecksPassed,
        activityScores:
          parsed.activityScores && typeof parsed.activityScores === 'object'
            ? parsed.activityScores
            : defaults.activityScores,
        evaluation: parsed.evaluation ?? defaults.evaluation,
        freeExplorationMode: Boolean(parsed.freeExplorationMode),
        lastVisitedLessonSlug:
          typeof parsed.lastVisitedLessonSlug === 'string'
            ? parsed.lastVisitedLessonSlug
            : null,
        updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : defaults.updatedAt
      }
    } catch {
      // Si el almacenamiento estuviera corrupto, conservamos el estado inicial limpio
    }
  }

  if (import.meta.client && !hydrated.value) {
    loadFromStorage()
  }

  function isLessonCompleted(slug: string): boolean {
    return state.value.completedLessonSlugs.includes(slug)
  }

  function isQuickCheckPassed(slug: string): boolean {
    return state.value.quickChecksPassed.includes(slug)
  }

  function markLessonVisited(slug: string) {
    state.value.lastVisitedLessonSlug = slug
    persist()
  }

  function markLessonCompleted(slug: string) {
    if (!state.value.completedLessonSlugs.includes(slug)) {
      state.value.completedLessonSlugs = [...state.value.completedLessonSlugs, slug]
      persist()
    }
  }

  function toggleLessonCompleted(slug: string) {
    if (state.value.completedLessonSlugs.includes(slug)) {
      state.value.completedLessonSlugs = state.value.completedLessonSlugs.filter(
        (item) => item !== slug
      )
    } else {
      state.value.completedLessonSlugs = [...state.value.completedLessonSlugs, slug]
    }
    persist()
  }

  function markQuickCheckPassed(slug: string) {
    if (!state.value.quickChecksPassed.includes(slug)) {
      state.value.quickChecksPassed = [...state.value.quickChecksPassed, slug]
    }
    if (!state.value.completedLessonSlugs.includes(slug)) {
      state.value.completedLessonSlugs = [...state.value.completedLessonSlugs, slug]
    }
    persist()
  }

  function saveActivityScore(activityId: string, score: number, maxScore: number) {
    const existing = state.value.activityScores[activityId]
    const bestScore = existing ? Math.max(existing.score, score) : score
    const record: ActivityScoreRecord = {
      activityId,
      completed: true,
      score: bestScore,
      maxScore,
      updatedAt: new Date().toISOString()
    }
    state.value.activityScores = {
      ...state.value.activityScores,
      [activityId]: record
    }
    persist()
  }

  function saveEvaluationResult(result: EvaluationRecord) {
    state.value.evaluation = result
    persist()
  }

  function setFreeExplorationMode(enabled: boolean) {
    state.value.freeExplorationMode = enabled
    persist()
  }

  function resetProgress() {
    state.value = createDefaultProgress()
    if (import.meta.client) {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Ignorar errores de almacenamiento
      }
    }
  }

  function getLevelProgress(levelId: number) {
    const level = LEARNING_LEVELS.find((item) => item.id === levelId)
    if (!level) {
      return { completedCount: 0, totalCount: 0, percentage: 0, isCompleted: false }
    }
    const totalCount = level.lessonSlugs.length
    const completedCount = level.lessonSlugs.filter((slug) =>
      state.value.completedLessonSlugs.includes(slug)
    ).length
    const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)
    return {
      completedCount,
      totalCount,
      percentage,
      isCompleted: totalCount > 0 && completedCount === totalCount
    }
  }

  function isLevelUnlocked(levelId: number): boolean {
    if (levelId <= 1 || state.value.freeExplorationMode) return true
    return getLevelProgress(levelId - 1).isCompleted
  }

  function isLessonUnlocked(slug: string): boolean {
    if (state.value.freeExplorationMode) return true
    const lesson = LESSONS.find((item) => item.slug === slug)
    if (!lesson) return false
    return isLevelUnlocked(lesson.levelId)
  }

  const totalLessonsCount = LESSONS.length

  const completedLessonsCount = computed(() => state.value.completedLessonSlugs.length)

  const completedLevelsCount = computed(
    () => LEARNING_LEVELS.filter((level) => getLevelProgress(level.id).isCompleted).length
  )

  const completedActivitiesCount = computed(
    () =>
      ACTIVITY_MODULES.filter((module) => state.value.activityScores[module.id]?.completed).length
  )

  const overallProgressPercent = computed(() => {
    const totalUnits = totalLessonsCount + ACTIVITY_MODULES.length + 1 // +1 por evaluación final
    const completedUnits =
      completedLessonsCount.value +
      completedActivitiesCount.value +
      (state.value.evaluation?.completed ? 1 : 0)
    if (totalUnits === 0) return 0
    return Math.round((completedUnits / totalUnits) * 100)
  })

  const nextRecommendedLesson = computed(() => {
    const firstPending = LESSONS.find(
      (lesson) => !state.value.completedLessonSlugs.includes(lesson.slug)
    )
    return firstPending ?? LESSONS[0]
  })

  return {
    state,
    hydrated,
    loadFromStorage,
    isLessonCompleted,
    isQuickCheckPassed,
    markLessonVisited,
    markLessonCompleted,
    toggleLessonCompleted,
    markQuickCheckPassed,
    saveActivityScore,
    saveEvaluationResult,
    setFreeExplorationMode,
    resetProgress,
    getLevelProgress,
    isLevelUnlocked,
    isLessonUnlocked,
    totalLessonsCount,
    completedLessonsCount,
    completedLevelsCount,
    completedActivitiesCount,
    overallProgressPercent,
    nextRecommendedLesson
  }
}
