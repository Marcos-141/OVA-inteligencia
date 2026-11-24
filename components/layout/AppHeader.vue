<script setup lang="ts">
import type { NavItem } from './MobileMenu.vue'

const route = useRoute()
const mobileOpen = ref(false)

const navItems: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Ruta de aprendizaje', to: '/learning' },
  { label: 'Actividades', to: '/activities' },
  { label: 'Evaluación final', to: '/evaluation' },
  { label: 'Tutor RNA', to: '/tutor' }
]

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <NuxtLink to="/" class="brand" aria-label="Inicio del OVA sobre Redes Neuronales Artificiales">
        <span class="brand__mark">
          <AppIcon name="brain" :size="20" />
        </span>
        <span class="brand__text">
          <strong class="brand__title">OVA · RNA</strong>
          <span class="brand__subtitle">Redes Neuronales desde cero</span>
        </span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Navegación principal">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="desktop-nav__link"
          :class="{
            'desktop-nav__link--active':
              item.to === '/'
                ? route.path === '/'
                : item.to === '/learning'
                  ? route.path.startsWith('/learning') || route.path.startsWith('/lessons')
                  : route.path.startsWith(item.to)
          }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="app-header__actions">
        <div class="desktop-progress">
          <ProgressIndicator />
        </div>

        <button
          type="button"
          class="mobile-trigger"
          aria-label="Abrir menú de navegación"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = true"
        >
          <AppIcon name="menu" :size="20" />
        </button>
      </div>
    </div>

    <MobileMenu :open="mobileOpen" :items="navItems" @close="mobileOpen = false" />
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  height: var(--header-height);
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.app-header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand__title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-text);
}

.brand__subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.desktop-nav__link {
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.desktop-nav__link:hover {
  background-color: var(--color-surface-subtle);
  color: var(--color-text);
}

.desktop-nav__link--active {
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-trigger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
}

@media (max-width: 960px) {
  .desktop-nav,
  .desktop-progress {
    display: none;
  }

  .mobile-trigger {
    display: inline-flex;
  }
}
</style>
