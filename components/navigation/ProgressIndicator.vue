<script setup lang="ts">
const { overallProgressPercent } = useProgress()
</script>

<template>
  <NuxtLink to="/learning" class="progress-pill" title="Ver tu progreso en la Ruta de aprendizaje">
    <span class="progress-pill__dot" :class="{ 'progress-pill__dot--done': overallProgressPercent === 100 }" />
    <span class="progress-pill__label">Avance</span>
    <ClientOnly>
      <strong class="progress-pill__value">{{ overallProgressPercent }}%</strong>
      <template #fallback>
        <strong class="progress-pill__value">0%</strong>
      </template>
    </ClientOnly>
  </NuxtLink>
</template>

<style scoped>
.progress-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-pill);
  background-color: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.progress-pill:hover {
  border-color: var(--color-primary-border);
  background-color: var(--color-primary-soft);
}

.progress-pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.progress-pill__dot--done {
  background-color: var(--color-success);
}

.progress-pill__value {
  color: var(--color-text);
  font-weight: 700;
}
</style>
