<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="Ruta de navegación" class="breadcrumbs">
    <ol class="breadcrumbs__list">
      <li v-for="(item, index) in items" :key="item.label" class="breadcrumbs__item">
        <NuxtLink v-if="item.to && index < items.length - 1" :to="item.to" class="breadcrumbs__link">
          {{ item.label }}
        </NuxtLink>
        <span v-else class="breadcrumbs__current" aria-current="page">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="breadcrumbs__sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  margin-bottom: 1.25rem;
}

.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.breadcrumbs__item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.breadcrumbs__link {
  transition: color var(--transition-fast);
}

.breadcrumbs__link:hover {
  color: var(--color-primary);
}

.breadcrumbs__current {
  color: var(--color-text);
  font-weight: 500;
}

.breadcrumbs__sep {
  color: var(--color-border-strong);
}
</style>
