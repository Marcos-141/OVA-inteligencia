<script setup lang="ts">
export interface NavItem {
  label: string
  to: string
}

defineProps<{
  open: boolean
  items: NavItem[]
}>()

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()
</script>

<template>
  <Transition name="mobile-fade">
    <div v-if="open" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú principal">
      <div class="mobile-menu__backdrop" @click="emit('close')" />
      <div class="mobile-menu__panel">
        <div class="mobile-menu__header">
          <span class="mobile-menu__title">Navegación</span>
          <button
            type="button"
            class="mobile-menu__close"
            aria-label="Cerrar menú"
            @click="emit('close')"
          >
            <AppIcon name="close" :size="20" />
          </button>
        </div>

        <nav class="mobile-menu__links">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="mobile-menu__link"
            :class="{
              'mobile-menu__link--active':
                item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)
            }"
            @click="emit('close')"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="mobile-menu__footer">
          <ProgressIndicator />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 60;
}

.mobile-menu__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.35);
}

.mobile-menu__panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(300px, 84vw);
  background-color: var(--color-surface);
  border-left: 1px solid var(--color-border);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--shadow-md);
}

.mobile-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.mobile-menu__title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
}

.mobile-menu__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
}

.mobile-menu__links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.mobile-menu__link {
  padding: 0.75rem 0.875rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.mobile-menu__link:hover,
.mobile-menu__link--active {
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
}

.mobile-menu__footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.mobile-fade-enter-active,
.mobile-fade-leave-active {
  transition: opacity 180ms ease;
}

.mobile-fade-enter-from,
.mobile-fade-leave-to {
  opacity: 0;
}
</style>
