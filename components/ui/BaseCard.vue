<script setup lang="ts">
withDefaults(
  defineProps<{
    padding?: 'sm' | 'md' | 'lg'
    interactive?: boolean
    tone?: 'default' | 'subtle' | 'primary' | 'success' | 'warning'
  }>(),
  {
    padding: 'md',
    interactive: false,
    tone: 'default'
  }
)
</script>

<template>
  <div
    :class="[
      'base-card',
      `base-card--pad-${padding}`,
      `base-card--tone-${tone}`,
      { 'base-card--interactive': interactive }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
}

.base-card--pad-sm {
  padding: 1rem 1.125rem;
}

.base-card--pad-md {
  padding: 1.375rem 1.5rem;
}

.base-card--pad-lg {
  padding: 1.75rem 2rem;
}

.base-card--tone-subtle {
  background-color: var(--color-surface-subtle);
  box-shadow: none;
}

.base-card--tone-primary {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary-border);
  box-shadow: none;
}

.base-card--tone-success {
  background-color: var(--color-success-soft);
  border-color: var(--color-success-border);
  box-shadow: none;
}

.base-card--tone-warning {
  background-color: var(--color-warning-soft);
  border-color: var(--color-warning-border);
  box-shadow: none;
}

.base-card--interactive:hover {
  border-color: var(--color-primary-border);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .base-card--pad-lg {
    padding: 1.25rem;
  }
  .base-card--pad-md {
    padding: 1.125rem;
  }
}
</style>
