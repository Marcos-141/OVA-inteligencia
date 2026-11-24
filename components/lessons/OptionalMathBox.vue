<script setup lang="ts">
import type { OptionalMathContent } from '~/types/lesson'

defineProps<{
  content: OptionalMathContent
}>()

const expanded = ref(false)
</script>

<template>
  <div class="math-box">
    <button
      type="button"
      class="math-box__trigger"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <span class="math-box__trigger-left">
        <BaseBadge tone="warning">Opcional</BaseBadge>
        <span class="math-box__title">{{ content.title }}</span>
      </span>
      <AppIcon
        name="chevron-down"
        :size="18"
        class="math-box__chevron"
        :class="{ 'math-box__chevron--open': expanded }"
      />
    </button>

    <div v-if="expanded" class="math-box__body">
      <p class="math-box__intro">{{ content.intro }}</p>

      <div class="math-box__formula">
        <span class="math-box__formula-label">{{ content.formulaLabel }}</span>
        <code>{{ content.formulaText }}</code>
      </div>

      <ol class="math-box__steps">
        <li v-for="step in content.stepByStep" :key="step">{{ step }}</li>
      </ol>

      <p class="math-box__takeaway">{{ content.takeaway }}</p>
    </div>
  </div>
</template>

<style scoped>
.math-box {
  border: 1px solid var(--color-warning-border);
  background-color: var(--color-warning-soft);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.math-box__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.95rem 1.15rem;
  background: transparent;
  border: none;
  text-align: left;
  color: var(--color-text);
}

.math-box__trigger-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.math-box__title {
  font-weight: 700;
  font-size: 0.95rem;
}

.math-box__chevron {
  color: var(--color-warning);
  transition: transform var(--transition-fast);
}

.math-box__chevron--open {
  transform: rotate(180deg);
}

.math-box__body {
  padding: 0 1.15rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.math-box__intro,
.math-box__takeaway {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.math-box__formula {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.math-box__formula-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.math-box__formula code {
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 600;
  word-break: break-word;
}

.math-box__steps {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: var(--color-text);
}
</style>
