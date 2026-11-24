<script setup lang="ts">
import { ACTIVITY_MODULES } from '~/data/activities'
import { LEARNING_LEVELS } from '~/data/learning-path'

useHead({
  title: 'Ruta de aprendizaje · OVA RNA'
})

const {
  state,
  totalLessonsCount,
  completedLessonsCount,
  completedLevelsCount,
  completedActivitiesCount,
  overallProgressPercent,
  nextRecommendedLesson,
  setFreeExplorationMode,
  resetProgress
} = useProgress()

const showResetConfirm = ref(false)

function handleReset() {
  resetProgress()
  showResetConfirm.value = false
}
</script>

<template>
  <div class="container page-section fade-in">
    <Breadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Ruta de aprendizaje' }]" />

    <header class="section-header">
      <span class="section-kicker">Progresión paso a paso</span>
      <h1 class="section-title">Ruta de aprendizaje</h1>
      <p class="section-subtitle">
        Avanza desde los conceptos más cotidianos hasta comprender cómo aprende y se aplica una Red
        Neuronal Artificial. Cada nivel prepara el terreno para el siguiente.
      </p>
    </header>

    <ClientOnly>
      <BaseCard class="summary-panel" padding="lg">
        <div class="summary-panel__top">
          <div class="summary-panel__stats">
            <div class="stat-box">
              <span class="stat-box__label">Avance general</span>
              <strong class="stat-box__value">{{ overallProgressPercent }}%</strong>
            </div>
            <div class="stat-box">
              <span class="stat-box__label">Lecciones</span>
              <strong class="stat-box__value">
                {{ completedLessonsCount }}/{{ totalLessonsCount }}
              </strong>
            </div>
            <div class="stat-box">
              <span class="stat-box__label">Niveles completos</span>
              <strong class="stat-box__value">
                {{ completedLevelsCount }}/{{ LEARNING_LEVELS.length }}
              </strong>
            </div>
            <div class="stat-box">
              <span class="stat-box__label">Actividades</span>
              <strong class="stat-box__value">
                {{ completedActivitiesCount }}/{{ ACTIVITY_MODULES.length }}
              </strong>
            </div>
          </div>

          <BaseButton
            v-if="nextRecommendedLesson"
            :to="`/lessons/${nextRecommendedLesson.slug}`"
            variant="primary"
          >
            {{ completedLessonsCount > 0 ? 'Continuar aprendiendo' : 'Comenzar Nivel 1' }}
            <AppIcon name="arrow-right" :size="18" />
          </BaseButton>
        </div>

        <ProgressBar
          :value="overallProgressPercent"
          label="Progreso acumulado (guardado localmente en tu navegador)"
          :tone="overallProgressPercent === 100 ? 'success' : 'primary'"
        />

        <div class="summary-panel__controls">
          <label class="toggle-control">
            <input
              type="checkbox"
              :checked="state.freeExplorationMode"
              @change="setFreeExplorationMode(($event.target as HTMLInputElement).checked)"
            />
            <span>
              <strong>Modo exploración libre:</strong> permite abrir cualquier nivel sin esperar al
              desbloqueo progresivo.
            </span>
          </label>

          <div class="reset-area">
            <button
              v-if="!showResetConfirm"
              type="button"
              class="reset-link"
              @click="showResetConfirm = true"
            >
              <AppIcon name="refresh" :size="14" />
              Reiniciar progreso
            </button>
            <div v-else class="reset-confirm">
              <span>¿Borrar tu avance guardado?</span>
              <BaseButton variant="secondary" size="sm" @click="showResetConfirm = false">
                Cancelar
              </BaseButton>
              <BaseButton variant="primary" size="sm" @click="handleReset">
                Sí, reiniciar
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>

      <LearningPathTimeline />

      <template #fallback>
        <BaseCard padding="lg">
          <p class="section-subtitle">Cargando tu ruta de aprendizaje...</p>
        </BaseCard>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.summary-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.summary-panel__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.summary-panel__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2rem;
}

.stat-box {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-box__label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.stat-box__value {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  color: var(--color-text);
}

.summary-panel__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-border);
}

.toggle-control {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.toggle-control input {
  margin-top: 0.25rem;
  accent-color: var(--color-primary);
  width: 16px;
  height: 16px;
}

.reset-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-sm);
}

.reset-link:hover {
  color: var(--color-error);
  background-color: var(--color-error-soft);
}

.reset-confirm {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text);
  flex-wrap: wrap;
}
</style>
