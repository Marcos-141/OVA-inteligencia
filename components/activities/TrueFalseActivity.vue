<script setup lang="ts">
import { TRUE_FALSE_ITEMS } from '~/data/activities'

const { saveActivityScore } = useProgress()

const answers = ref<Record<string, boolean>>({})

const answeredCount = computed(() => Object.keys(answers.value).length)
const correctCount = computed(
  () =>
    TRUE_FALSE_ITEMS.filter((item) => answers.value[item.id] === item.isTrue).length
)
const allAnswered = computed(() => answeredCount.value === TRUE_FALSE_ITEMS.length)

function answerItem(id: string, value: boolean) {
  answers.value = {
    ...answers.value,
    [id]: value
  }
  if (Object.keys(answers.value).length === TRUE_FALSE_ITEMS.length) {
    saveActivityScore('act-true-false', correctCount.value, TRUE_FALSE_ITEMS.length)
  }
}

function reset() {
  answers.value = {}
}
</script>

<template>
  <div class="tf-list">
    <div class="tf-summary">
      <BaseBadge :tone="allAnswered ? 'success' : 'primary'">
        Respondidas: {{ answeredCount }}/{{ TRUE_FALSE_ITEMS.length }}
        <template v-if="allAnswered"> · Aciertos: {{ correctCount }}/{{ TRUE_FALSE_ITEMS.length }}</template>
      </BaseBadge>

      <BaseButton v-if="answeredCount > 0" variant="ghost" size="sm" @click="reset">
        <AppIcon name="refresh" :size="14" />
        Reiniciar
      </BaseButton>
    </div>

    <div v-for="(item, index) in TRUE_FALSE_ITEMS" :key="item.id" class="tf-item">
      <p class="tf-item__statement">
        <strong>{{ index + 1 }}.</strong> {{ item.statement }}
      </p>

      <div class="tf-item__actions">
        <button
          type="button"
          class="tf-btn"
          :class="{
            'tf-btn--selected': answers[item.id] === true,
            'tf-btn--ok': answers[item.id] === true && item.isTrue,
            'tf-btn--err': answers[item.id] === true && !item.isTrue
          }"
          @click="answerItem(item.id, true)"
        >
          Verdadero
        </button>

        <button
          type="button"
          class="tf-btn"
          :class="{
            'tf-btn--selected': answers[item.id] === false,
            'tf-btn--ok': answers[item.id] === false && !item.isTrue,
            'tf-btn--err': answers[item.id] === false && item.isTrue
          }"
          @click="answerItem(item.id, false)"
        >
          Falso
        </button>
      </div>

      <div
        v-if="answers[item.id] !== undefined"
        class="tf-feedback"
        :class="
          answers[item.id] === item.isTrue ? 'tf-feedback--ok' : 'tf-feedback--err'
        "
        aria-live="polite"
      >
        <p>
          {{
            answers[item.id] === item.isTrue
              ? item.feedbackWhenCorrect
              : item.feedbackWhenIncorrect
          }}
        </p>
        <p v-if="answers[item.id] !== item.isTrue" class="tf-feedback__guide">
          <strong>Orientación:</strong> {{ item.guidance }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tf-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tf-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tf-item {
  padding: 1rem 1.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tf-item__statement {
  font-size: 0.95rem;
  color: var(--color-text);
}

.tf-item__actions {
  display: flex;
  gap: 0.6rem;
}

.tf-btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.tf-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.tf-btn--ok {
  background-color: var(--color-success-soft);
  border-color: var(--color-success);
  color: var(--color-success);
}

.tf-btn--err {
  background-color: var(--color-error-soft);
  border-color: var(--color-error);
  color: var(--color-error);
}

.tf-feedback {
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tf-feedback--ok {
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
}

.tf-feedback--err {
  background-color: var(--color-error-soft);
  border: 1px solid var(--color-error-border);
}

.tf-feedback__guide {
  color: var(--color-text-secondary);
}
</style>
