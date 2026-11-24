<script setup lang="ts">
import { MULTIPLE_CHOICE_ITEMS } from '~/data/activities'

const { saveActivityScore } = useProgress()

const selectedMap = ref<Record<string, string>>({})

const answeredCount = computed(() => Object.keys(selectedMap.value).length)
const correctCount = computed(
  () =>
    MULTIPLE_CHOICE_ITEMS.filter((item) => {
      const chosenId = selectedMap.value[item.id]
      return item.options.find((opt) => opt.id === chosenId)?.isCorrect
    }).length
)
const allAnswered = computed(() => answeredCount.value === MULTIPLE_CHOICE_ITEMS.length)

function choose(itemId: string, optionId: string) {
  selectedMap.value = {
    ...selectedMap.value,
    [itemId]: optionId
  }

  if (Object.keys(selectedMap.value).length === MULTIPLE_CHOICE_ITEMS.length) {
    saveActivityScore('act-multiple-choice', correctCount.value, MULTIPLE_CHOICE_ITEMS.length)
  }
}

function getSelectedOption(itemId: string) {
  const item = MULTIPLE_CHOICE_ITEMS.find((entry) => entry.id === itemId)
  const chosenId = selectedMap.value[itemId]
  return item?.options.find((opt) => opt.id === chosenId) ?? null
}

function reset() {
  selectedMap.value = {}
}
</script>

<template>
  <div class="mc-list">
    <div class="mc-top">
      <BaseBadge :tone="allAnswered ? 'success' : 'primary'">
        Respondidas: {{ answeredCount }}/{{ MULTIPLE_CHOICE_ITEMS.length }}
        <template v-if="allAnswered">
          · Aciertos: {{ correctCount }}/{{ MULTIPLE_CHOICE_ITEMS.length }}
        </template>
      </BaseBadge>
      <BaseButton v-if="answeredCount > 0" variant="ghost" size="sm" @click="reset">
        <AppIcon name="refresh" :size="14" />
        Reiniciar
      </BaseButton>
    </div>

    <div v-for="(item, idx) in MULTIPLE_CHOICE_ITEMS" :key="item.id" class="mc-card">
      <p class="mc-card__prompt">
        <strong>Caso {{ idx + 1 }}.</strong> {{ item.prompt }}
      </p>

      <div class="mc-card__options">
        <button
          v-for="opt in item.options"
          :key="opt.id"
          type="button"
          class="mc-opt"
          :class="{
            'mc-opt--ok': selectedMap[item.id] === opt.id && opt.isCorrect,
            'mc-opt--err': selectedMap[item.id] === opt.id && !opt.isCorrect
          }"
          @click="choose(item.id, opt.id)"
        >
          <span class="mc-opt__badge">{{ opt.id.toUpperCase() }}</span>
          <span>{{ opt.label }}</span>
        </button>
      </div>

      <div
        v-if="getSelectedOption(item.id)"
        class="mc-feedback"
        :class="
          getSelectedOption(item.id)?.isCorrect ? 'mc-feedback--ok' : 'mc-feedback--err'
        "
        aria-live="polite"
      >
        <p>{{ getSelectedOption(item.id)?.feedback }}</p>
        <p v-if="!getSelectedOption(item.id)?.isCorrect" class="mc-feedback__hint">
          <strong>Pista:</strong> {{ item.hint }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mc-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.mc-card {
  padding: 1.05rem 1.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.mc-card__prompt {
  font-size: 0.95rem;
  color: var(--color-text);
}

.mc-card__options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mc-opt {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  text-align: left;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  font-size: 0.9rem;
  color: var(--color-text);
  transition: all var(--transition-fast);
}

.mc-opt:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.mc-opt--ok {
  border-color: var(--color-success);
  background-color: var(--color-success-soft);
}

.mc-opt--err {
  border-color: var(--color-error);
  background-color: var(--color-error-soft);
}

.mc-opt__badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-subtle);
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
}

.mc-opt--ok .mc-opt__badge {
  background-color: var(--color-success);
  color: #ffffff;
}

.mc-opt--err .mc-opt__badge {
  background-color: var(--color-error);
  color: #ffffff;
}

.mc-feedback {
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mc-feedback--ok {
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
}

.mc-feedback--err {
  background-color: var(--color-error-soft);
  border: 1px solid var(--color-error-border);
}

.mc-feedback__hint {
  color: var(--color-text-secondary);
}
</style>
