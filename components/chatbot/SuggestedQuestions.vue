<script setup lang="ts">
defineProps<{
  questions: string[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  select: [question: string]
}>()
</script>

<template>
  <div class="suggested">
    <span class="suggested__label">Preguntas sugeridas:</span>
    <div class="suggested__chips">
      <button
        v-for="question in questions"
        :key="question"
        type="button"
        class="suggested__chip"
        :disabled="disabled"
        @click="emit('select', question)"
      >
        {{ question }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.suggested {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.suggested__label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.suggested__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.suggested__chip {
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.suggested__chip:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.suggested__chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
