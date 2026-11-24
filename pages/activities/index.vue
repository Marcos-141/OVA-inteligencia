<script setup lang="ts">
import { ACTIVITY_MODULES } from '~/data/activities'

useHead({
  title: 'Actividades interactivas · OVA RNA'
})

const { state, completedActivitiesCount } = useProgress()

const activeModuleId = ref<string>(ACTIVITY_MODULES[0]?.id ?? 'act-anatomy')

const activeModule = computed(
  () => ACTIVITY_MODULES.find((mod) => mod.id === activeModuleId.value) ?? ACTIVITY_MODULES[0]!
)

function getScoreBadge(activityId: string): string | null {
  const record = state.value.activityScores[activityId]
  if (!record?.completed) return null
  return `${record.score}/${record.maxScore}`
}
</script>

<template>
  <div class="container page-section fade-in">
    <Breadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Actividades' }]" />

    <header class="section-header">
      <span class="section-kicker">Aprender practicando</span>
      <h1 class="section-title">Actividades interactivas</h1>
      <p class="section-subtitle">
        Refuerza lo aprendido con ejercicios visuales, asociación de analogías, verdadero o falso y
        casos prácticos. Todas las actividades ofrecen retroalimentación inmediata.
      </p>
    </header>

    <ClientOnly>
      <div class="activities-layout">
        <!-- Selector de actividades -->
        <aside class="activities-sidebar" aria-label="Lista de actividades disponibles">
          <div class="sidebar-progress">
            <span>Actividades completadas</span>
            <strong>{{ completedActivitiesCount }}/{{ ACTIVITY_MODULES.length }}</strong>
          </div>

          <button
            v-for="mod in ACTIVITY_MODULES"
            :key="mod.id"
            type="button"
            class="activity-nav-btn"
            :class="{ 'activity-nav-btn--active': activeModuleId === mod.id }"
            @click="activeModuleId = mod.id"
          >
            <div class="activity-nav-btn__top">
              <BaseBadge :tone="getScoreBadge(mod.id) ? 'success' : 'neutral'">
                Nivel {{ mod.levelId }}
              </BaseBadge>
              <span v-if="getScoreBadge(mod.id)" class="activity-score">
                <AppIcon name="check" :size="13" />
                {{ getScoreBadge(mod.id) }}
              </span>
            </div>
            <strong class="activity-nav-btn__title">{{ mod.title }}</strong>
            <span class="activity-nav-btn__meta">~{{ mod.estimatedMinutes }} min</span>
          </button>

          <BaseCard padding="sm" tone="primary" class="sidebar-eval">
            <p class="sidebar-eval__text">¿Listo para comprobar tu aprendizaje global?</p>
            <BaseButton to="/evaluation" variant="primary" size="sm" block>
              Ir a Evaluación final
            </BaseButton>
          </BaseCard>
        </aside>

        <!-- Área de la actividad activa -->
        <section class="activity-stage">
          <BaseCard padding="lg" class="activity-stage__card">
            <div class="activity-stage__head">
              <BaseBadge tone="primary">Nivel {{ activeModule.levelId }}</BaseBadge>
              <h2>{{ activeModule.title }}</h2>
              <p>{{ activeModule.description }}</p>
            </div>

            <NeuronAnatomyActivity v-if="activeModule.kind === 'neuron-anatomy'" />
            <MatchingActivity v-else-if="activeModule.kind === 'matching'" />
            <TrueFalseActivity v-else-if="activeModule.kind === 'true-false'" />
            <MultipleChoiceActivity v-else-if="activeModule.kind === 'multiple-choice'" />
          </BaseCard>
        </section>
      </div>

      <template #fallback>
        <BaseCard padding="lg">
          <p class="section-subtitle">Cargando actividades interactivas...</p>
        </BaseCard>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.activities-layout {
  display: grid;
  grid-template-columns: 310px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.activities-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.sidebar-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.sidebar-progress strong {
  color: var(--color-text);
}

.activity-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  text-align: left;
  padding: 0.95rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  transition: all var(--transition-fast);
}

.activity-nav-btn:hover {
  border-color: var(--color-primary-border);
}

.activity-nav-btn--active {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.activity-nav-btn__top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.activity-score {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-success);
}

.activity-nav-btn__title {
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.35;
}

.activity-nav-btn__meta {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.sidebar-eval {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.35rem;
}

.sidebar-eval__text {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.activity-stage__card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.activity-stage__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.activity-stage__head h2 {
  font-size: 1.3rem;
}

.activity-stage__head p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .activities-layout {
    grid-template-columns: 1fr;
  }
}
</style>
