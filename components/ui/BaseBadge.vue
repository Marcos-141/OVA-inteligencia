<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'error'
  }>(),
  {
    tone: 'neutral'
  }
)
</script>

<template>
  <span :class="['base-badge', `base-badge--${tone}`]">
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  border: 1px solid transparent;
}

.base-badge--neutral {
  background-color: var(--color-surface-subtle);
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}

.base-badge--primary {
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  border-color: var(--color-primary-border);
}

.base-badge--success {
  background-color: var(--color-success-soft);
  color: var(--color-success);
  border-color: var(--color-success-border);
}

.base-badge--warning {
  background-color: var(--color-warning-soft);
  color: var(--color-warning);
  border-color: var(--color-warning-border);
}

.base-badge--error {
  background-color: var(--color-error-soft);
  color: var(--color-error);
  border-color: var(--color-error-border);
}
</style>
