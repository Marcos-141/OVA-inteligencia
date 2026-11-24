<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number
    label?: string
    showPercent?: boolean
    tone?: 'primary' | 'success'
    height?: 'sm' | 'md'
  }>(),
  {
    label: undefined,
    showPercent: true,
    tone: 'primary',
    height: 'md'
  }
)

const clampedValue = computed(() => Math.min(100, Math.max(0, Math.round(props.value))))
</script>

<template>
  <div class="progress-wrapper">
    <div v-if="label || showPercent" class="progress-header">
      <span v-if="label" class="progress-label">{{ label }}</span>
      <span v-if="showPercent" class="progress-value">{{ clampedValue }}%</span>
    </div>
    <div
      class="progress-track"
      :class="`progress-track--${height}`"
      role="progressbar"
      :aria-valuenow="clampedValue"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="label || 'Progreso de aprendizaje'"
    >
      <div
        class="progress-fill"
        :class="`progress-fill--${tone}`"
        :style="{ width: `${clampedValue}%` }"
      />
    </div>
  </div>
</template>

<style scoped>
.progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
}

.progress-label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.progress-value {
  color: var(--color-text);
  font-weight: 700;
}

.progress-track {
  width: 100%;
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-pill);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.progress-track--sm {
  height: 7px;
}

.progress-track--md {
  height: 10px;
}

.progress-fill {
  height: 100%;
  border-radius: var(--radius-pill);
  transition: width 320ms ease;
}

.progress-fill--primary {
  background-color: var(--color-primary);
}

.progress-fill--success {
  background-color: var(--color-success);
}
</style>
