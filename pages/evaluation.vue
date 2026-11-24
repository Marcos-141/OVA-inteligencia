<script setup lang="ts">
import { FINAL_EVALUATION_QUESTIONS } from '~/data/activities'
import { LEARNING_LEVELS } from '~/data/learning-path'
import type { EvaluationRecord } from '~/types/progress'

useHead({
  title: 'Evaluación final · OVA RNA'
})

const { state, saveEvaluationResult } = useProgress()

const selectedAnswers = ref<Record<string, string>>({})
const currentIndex = ref(0)
const submitted = ref(false)

const totalQuestions = FINAL_EVALUATION_QUESTIONS.length
const currentQuestion = computed(
  () => FINAL_EVALUATION_QUESTIONS[currentIndex.value] ?? FINAL_EVALUATION_QUESTIONS[0]!
)

const answeredCount = computed(() => Object.keys(selectedAnswers.value).length)
const allAnswered = computed(() => answeredCount.value === totalQuestions)
const stepProgress = computed(() => Math.round(((currentIndex.value + 1) / totalQuestions) * 100))

function selectOption(questionId: string, optionId: string) {
  if (submitted.value) return
  selectedAnswers.value = {
    ...selectedAnswers.value,
    [questionId]: optionId
  }
}

const computedResult = computed<EvaluationRecord>(() => {
  let score = 0
  const levelBreakdown: Record<number, { correct: number; total: number }> = {}

  for (const question of FINAL_EVALUATION_QUESTIONS) {
    if (!levelBreakdown[question.levelId]) {
      levelBreakdown[question.levelId] = { correct: 0, total: 0 }
    }
    levelBreakdown[question.levelId]!.total += 1

    const chosenId = selectedAnswers.value[question.id]
    const isCorrect = Boolean(
      question.options.find((opt) => opt.id === chosenId)?.isCorrect
    )
    if (isCorrect) {
      score += 1
      levelBreakdown[question.levelId]!.correct += 1
    }
  }

  return {
    completed: true,
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    levelBreakdown,
    completedAt: new Date().toISOString()
  }
})

function submitEvaluation() {
  if (!allAnswered.value) return
  submitted.value = true
  saveEvaluationResult(computedResult.value)
}

function retakeEvaluation() {
  selectedAnswers.value = {}
  currentIndex.value = 0
  submitted.value = false
}

const performanceBand = computed(() => {
  const pct = computedResult.value.percentage
  if (pct >= 90) {
    return {
      tone: 'success' as const,
      title: '¡Dominio sobresaliente!',
      message:
        'Comprendes con gran claridad los fundamentos, la estructura, el aprendizaje y las aplicaciones de las Redes Neuronales Artificiales.'
    }
  }
  if (pct >= 70) {
    return {
      tone: 'success' as const,
      title: '¡Muy buen resultado!',
      message:
        'Tienes una base sólida sobre cómo funcionan y aprenden las redes neuronales. Revisa los detalles de las preguntas falladas para afianzar todo.'
    }
  }
  if (pct >= 50) {
    return {
      tone: 'warning' as const,
      title: 'Buen avance, conviene repasar algunos temas',
      message:
        'Ya manejas varias ideas clave. Te recomendamos repasar los niveles con menor puntaje y volver a intentarlo.'
    }
  }
  return {
    tone: 'warning' as const,
    title: 'Buen punto de partida para repasar',
    message:
      'No te preocupes: aprender un tema nuevo toma práctica. Recorre las lecciones con calma, prueba los simuladores y vuelve a presentar la evaluación.'
  }
})
</script>

<template>
  <div class="container page-section fade-in">
    <div class="reading-container">
      <Breadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Evaluación final' }]" />

      <header class="section-header">
        <span class="section-kicker">Nivel 5 · Integración y evaluación</span>
        <h1 class="section-title">Evaluación final</h1>
        <p class="section-subtitle">
          Responde estas {{ totalQuestions }} preguntas integradoras sobre los 5 niveles del OVA. Al
          finalizar recibirás tu calificación, desglose por nivel y retroalimentación detallada.
        </p>
      </header>

      <!-- Registro previo guardado en localStorage -->
      <ClientOnly>
        <BaseCard
          v-if="state.evaluation?.completed && !submitted"
          padding="sm"
          tone="success"
          class="previous-record"
        >
          <div class="previous-record__content">
            <AppIcon name="award" :size="20" class="icon-success" />
            <span>
              Última calificación registrada:
              <strong>
                {{ state.evaluation.score }}/{{ state.evaluation.totalQuestions }}
                ({{ state.evaluation.percentage }}%)
              </strong>. Puedes volver a realizarla cuando quieras para mejorar tu puntaje.
            </span>
          </div>
        </BaseCard>
      </ClientOnly>

      <!-- MODO CUESTIONARIO -->
      <div v-if="!submitted" class="eval-shell">
        <BaseCard padding="lg" class="eval-card">
          <div class="eval-card__top">
            <BaseBadge tone="primary">
              Pregunta {{ currentIndex + 1 }} de {{ totalQuestions }}
            </BaseBadge>
            <BaseBadge tone="neutral">{{ currentQuestion.levelLabel }}</BaseBadge>
          </div>

          <ProgressBar
            :value="stepProgress"
            :label="`Respondidas: ${answeredCount} de ${totalQuestions}`"
            height="sm"
          />

          <h2 class="eval-card__prompt">{{ currentQuestion.prompt }}</h2>

          <div class="eval-options" role="radiogroup" :aria-label="currentQuestion.prompt">
            <button
              v-for="option in currentQuestion.options"
              :key="option.id"
              type="button"
              class="eval-option"
              :class="{
                'eval-option--selected': selectedAnswers[currentQuestion.id] === option.id
              }"
              @click="selectOption(currentQuestion.id, option.id)"
            >
              <span class="eval-option__letter">{{ option.id.toUpperCase() }}</span>
              <span>{{ option.text }}</span>
            </button>
          </div>

          <!-- Navegación entre preguntas -->
          <div class="eval-nav">
            <BaseButton
              variant="secondary"
              size="md"
              :disabled="currentIndex === 0"
              @click="currentIndex -= 1"
            >
              <AppIcon name="arrow-left" :size="16" />
              Anterior
            </BaseButton>

            <div class="question-dots" aria-label="Selector rápido de preguntas">
              <button
                v-for="(q, idx) in FINAL_EVALUATION_QUESTIONS"
                :key="q.id"
                type="button"
                class="q-dot"
                :class="{
                  'q-dot--current': idx === currentIndex,
                  'q-dot--answered': Boolean(selectedAnswers[q.id])
                }"
                :aria-label="`Ir a la pregunta ${idx + 1}`"
                @click="currentIndex = idx"
              >
                {{ idx + 1 }}
              </button>
            </div>

            <BaseButton
              v-if="currentIndex < totalQuestions - 1"
              variant="primary"
              size="md"
              @click="currentIndex += 1"
            >
              Siguiente
              <AppIcon name="arrow-right" :size="16" />
            </BaseButton>

            <BaseButton
              v-else
              variant="success"
              size="md"
              :disabled="!allAnswered"
              @click="submitEvaluation"
            >
              <AppIcon name="award" :size="16" />
              Finalizar y calificar
            </BaseButton>
          </div>

          <p v-if="currentIndex === totalQuestions - 1 && !allAnswered" class="eval-missing-note">
            Responde todas las preguntas antes de finalizar (te faltan
            {{ totalQuestions - answeredCount }}).
          </p>
        </BaseCard>
      </div>

      <!-- MODO RESULTADOS Y RETROALIMENTACIÓN -->
      <div v-else class="results-shell">
        <BaseCard padding="lg" :tone="performanceBand.tone" class="results-hero">
          <div class="results-hero__score">
            <span class="score-big">{{ computedResult.percentage }}%</span>
            <span class="score-fraction">
              {{ computedResult.score }} de {{ computedResult.totalQuestions }} respuestas correctas
            </span>
          </div>

          <div class="results-hero__text">
            <h2>{{ performanceBand.title }}</h2>
            <p>{{ performanceBand.message }}</p>
            <div class="results-hero__actions">
              <BaseButton variant="primary" size="md" @click="retakeEvaluation">
                <AppIcon name="refresh" :size="16" />
                Volver a intentar
              </BaseButton>
              <BaseButton to="/learning" variant="secondary" size="md">
                Ir a la Ruta de aprendizaje
              </BaseButton>
              <BaseButton to="/tutor" variant="secondary" size="md">
                Consultar dudas al Tutor RNA
              </BaseButton>
            </div>
          </div>
        </BaseCard>

        <!-- Desglose por nivel -->
        <BaseCard padding="lg" class="breakdown-card">
          <h3>Desglose por nivel</h3>
          <div class="breakdown-grid">
            <div v-for="level in LEARNING_LEVELS" :key="level.id" class="breakdown-item">
              <div class="breakdown-item__head">
                <strong>{{ level.code }} · {{ level.shortTitle }}</strong>
                <span>
                  {{ computedResult.levelBreakdown[level.id]?.correct ?? 0 }}/{{
                    computedResult.levelBreakdown[level.id]?.total ?? 0
                  }}
                </span>
              </div>
              <ProgressBar
                :value="
                  computedResult.levelBreakdown[level.id]?.total
                    ? ((computedResult.levelBreakdown[level.id]?.correct ?? 0) /
                        (computedResult.levelBreakdown[level.id]?.total ?? 1)) *
                      100
                    : 0
                "
                height="sm"
                :show-percent="false"
                tone="success"
              />
            </div>
          </div>
        </BaseCard>

        <!-- Revisión detallada -->
        <section class="review-section">
          <h3>Revisión detallada de tus respuestas</h3>
          <div class="review-list">
            <BaseCard
              v-for="(question, idx) in FINAL_EVALUATION_QUESTIONS"
              :key="question.id"
              padding="md"
              class="review-item"
            >
              <div class="review-item__head">
                <BaseBadge
                  :tone="
                    question.options.find((o) => o.id === selectedAnswers[question.id])?.isCorrect
                      ? 'success'
                      : 'error'
                  "
                >
                  {{
                    question.options.find((o) => o.id === selectedAnswers[question.id])?.isCorrect
                      ? 'Correcta'
                      : 'Por repasar'
                  }}
                </BaseBadge>
                <span class="review-item__level">{{ question.levelLabel }}</span>
              </div>

              <p class="review-item__prompt">
                <strong>{{ idx + 1 }}.</strong> {{ question.prompt }}
              </p>

              <p class="review-item__answer">
                <strong>Tu respuesta:</strong>
                {{
                  question.options.find((o) => o.id === selectedAnswers[question.id])?.text ??
                  'Sin responder'
                }}
              </p>

              <p
                v-if="
                  !question.options.find((o) => o.id === selectedAnswers[question.id])?.isCorrect
                "
                class="review-item__correct"
              >
                <strong>Respuesta correcta:</strong>
                {{ question.options.find((o) => o.isCorrect)?.text }}
              </p>

              <p class="review-item__exp">{{ question.explanation }}</p>

              <NuxtLink :to="`/lessons/${question.relatedLessonSlug}`" class="review-item__link">
                Repasar la lección relacionada
                <AppIcon name="arrow-right" :size="14" />
              </NuxtLink>
            </BaseCard>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.previous-record {
  margin-bottom: 1.25rem;
}

.previous-record__content {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
}

.icon-success {
  color: var(--color-success);
}

.eval-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.eval-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.eval-card__prompt {
  font-size: 1.2rem;
  font-weight: 700;
}

.eval-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.eval-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.95rem 1.05rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95rem;
  transition: all var(--transition-fast);
}

.eval-option:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.eval-option--selected {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
  box-shadow: 0 0 0 2px rgba(59, 91, 219, 0.16);
}

.eval-option__letter {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-subtle);
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.eval-option--selected .eval-option__letter {
  background-color: var(--color-primary);
  color: #ffffff;
}

.eval-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border);
}

.question-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
}

.q-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
}

.q-dot--answered {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary-border);
  color: var(--color-primary);
}

.q-dot--current {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.eval-missing-note {
  font-size: 0.85rem;
  color: var(--color-warning);
  text-align: right;
}

.results-shell {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.results-hero {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: center;
}

.results-hero__score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.4rem;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  min-width: 155px;
}

.score-big {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
}

.score-fraction {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  text-align: center;
  margin-top: 0.25rem;
}

.results-hero__text {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.results-hero__text p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.results-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.35rem;
}

.breakdown-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breakdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.9rem;
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.breakdown-item__head {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.review-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.review-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.review-item__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.review-item__level {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.review-item__prompt {
  font-size: 0.97rem;
}

.review-item__answer,
.review-item__correct,
.review-item__exp {
  font-size: 0.885rem;
  color: var(--color-text-secondary);
}

.review-item__correct {
  color: var(--color-success);
}

.review-item__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: 0.2rem;
}

.review-item__link:hover {
  text-decoration: underline;
}

@media (max-width: 700px) {
  .results-hero {
    grid-template-columns: 1fr;
  }
}
</style>
