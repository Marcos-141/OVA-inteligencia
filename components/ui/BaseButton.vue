<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'success'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    block?: boolean
  }>(),
  {
    to: undefined,
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    block: false
  }
)
</script>

<template>
  <NuxtLink
    v-if="to && !disabled"
    :to="to"
    :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`, { 'base-btn--block': block }]"
  >
    <slot />
  </NuxtLink>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`, { 'base-btn--block': block }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
  white-space: nowrap;
  line-height: 1.2;
}

.base-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.base-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.base-btn--sm {
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
}

.base-btn--md {
  padding: 0.6875rem 1.25rem;
  font-size: 0.9375rem;
}

.base-btn--lg {
  padding: 0.8125rem 1.5rem;
  font-size: 1rem;
}

.base-btn--block {
  width: 100%;
}

.base-btn--primary {
  background-color: var(--color-primary);
  color: #ffffff;
  box-shadow: var(--shadow-xs);
}

.base-btn--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.base-btn--secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-xs);
}

.base-btn--secondary:hover:not(:disabled) {
  background-color: var(--color-surface-subtle);
  border-color: #94a3b8;
}

.base-btn--ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
}

.base-btn--ghost:hover:not(:disabled) {
  background-color: var(--color-surface-subtle);
  color: var(--color-text);
}

.base-btn--success {
  background-color: var(--color-success);
  color: #ffffff;
  box-shadow: var(--shadow-xs);
}

.base-btn--success:hover:not(:disabled) {
  background-color: var(--color-success-hover);
}
</style>
