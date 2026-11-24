<script setup lang="ts">
import type { LessonQuickCheck } from '~/types/lesson'

const props = defineProps<{
  lessonSlug: string
  check: LessonQuickCheck
}>()

const { markQuickCheckPassed, isQuickCheckPassed } = useProgress()

const selectedOptionId = ref<string | null>(null)
const showHint = ref(false)

const selectedOption = computed(
  () => props.check.options.find((opt) => opt.id === selectedOptionId.value) ?? null
)

const alreadyPassed = computed(() => isQuickCheckPassed(props.lessonSlug))

watch(
  () => props.lessonSlug,
  () => {
    selectedOptionId.value = null
    showHint.value = false
  }
)

function chooseOption(optionId: string) {
  selectedOptionId.value = optionId
  const option = props.check.options.find((item) => item.id === optionId)
  if (option?.isCorrect) {
    markQuickCheckPassed(props.lessonSlug)
  }
}
</script>

<template>
  <BaseCard padding="lg" class="quick-check">
    <div class="quick-check__head">
      <div class="quick-check__badges">
        <BaseBadge tone="primary">Paso 7 · Comprueba tu comprensión</BaseBadge>
        <BaseBadge v-if="alreadyPassed" tone="success">
          <AppIcon name="check" :size="12" />
          Superado
        </BaseBadge>
      </div>
      <h3 class="quick-check__question">{{ check.question }}</h3>
    </div>

    <div class="quick-check__options" role="radiogroup" :aria-label="check.question">
      <button
        v-for="option in check.options"
        :key="option.id"
        type="button"
        class="option-btn"
        :class="{
          'option-btn--selected': selectedOptionId === option.id,
          'option-btn--correct': selectedOptionId === option.id && option.isCorrect,
          'option-btn--wrong': selectedOptionId === option.id && !option.isCorrect
        }"
        @click="chooseOption(option.id)"
      >
        <span class="option-btn__letter">{{ option.id.toUpperCase() }}</span>
        <span class="option-btn__text">{{ option.text }}</span>
      </button>
    </div>

    <div
      v-if="selectedOption"
      class="feedback-box"
      :class="selectedOption.isCorrect ? 'feedback-box--ok' : 'feedback-box--err'"
      aria-live="polite"
    >
      <AppIcon
        :name="selectedOption.isCorrect ? 'check-circle' : 'alert-circle'"
        :size="20"
        class="feedback-box__icon"
      />
      <div class="feedback-box__content">
        <p class="feedback-box__title">
          {{ selectedOption.isCorrect ? '¡Excelente comprensión!' : 'Aún no, revisemos juntos' }}
        </p>
        <p class="feedback-box__text">{{ selectedOption.feedback }}</p>
        <p v-if="!selectedOption.isCorrect" class="feedback-box__hint">
          <strong>Orientación:</strong> {{ check.hint }}
        </p>
      </div>
    </div>

    <div v-else class="quick-check__hint-bar">
      <button type="button" class="hint-toggle" @click="showHint = !showHint">
        <AppIcon name="lightbulb" :size="15" />
        {{ showHint ? 'Ocultar pista' : '¿Necesitas una pista?' }}
      </button>
      <p v-if="showHint" class="hint-text">{{ check.hint }}</p>
    </div>
  </BaseCard>
</template>

<style scoped>
.quick-check {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.quick-check__head {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.quick-check__badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.quick-check__question {
  font-size: 1.1rem;
  font-weight: 700;
}

.quick-check__options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.option-btn {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: all var(--transition-fast);
}

.option-btn:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.option-btn--correct {
  border-color: var(--color-success);
  background-color: var(--color-success-soft);
}

.option-btn--wrong {
  border-color: var(--color-error);
  background-color: var(--color-error-soft);
}

.option-btn__letter {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: var(--color-surface-subtle);
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.option-btn--correct .option-btn__letter {
  background-color: var(--color-success);
  color: #ffffff;
}

.option-btn--wrong .option-btn__letter {
  background-color: var(--color-error);
  color: #ffffff;
}

.option-btn__text {
  font-size: 0.9375rem;
  line-height: 1.5;
}

.feedback-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: var(--radius-sm);
}

.feedback-box--ok {
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
}

.feedback-box--ok .feedback-box__icon {
  color: var(--color-success);
}

.feedback-box--err {
  background-color: var(--color-error-soft);
  border: 1px solid var(--color-error-border);
}

.feedback-box--err .feedback-box__icon {
  color: var(--color-error);
}

.feedback-box__content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.feedback-box__title {
  font-weight: 700;
  font-size: 0.95rem;
}

.feedback-box__text,
.feedback-box__hint {
  font-size: 0.885rem;
  color: var(--color-text-secondary);
}

.quick-check__hint-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.hint-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0;
}

.hint-toggle:hover {
  text-decoration: underline;
}

.hint-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  background-color: var(--color-warning-soft);
  border: 1px solid var(--color-warning-border);
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
}
</style>
