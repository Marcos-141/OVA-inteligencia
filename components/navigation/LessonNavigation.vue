<script setup lang="ts">
import type { Lesson } from '~/types/lesson'

const props = defineProps<{
  currentLesson: Lesson
  previousLesson: Lesson | null
  nextLesson: Lesson | null
}>()

const { isLessonCompleted, toggleLessonCompleted, isLessonUnlocked } = useProgress()

const completed = computed(() => isLessonCompleted(props.currentLesson.slug))
const canOpenNext = computed(() =>
  props.nextLesson ? isLessonUnlocked(props.nextLesson.slug) : false
)
</script>

<template>
  <section class="lesson-nav" aria-label="Navegación entre lecciones">
    <div class="lesson-nav__complete-box">
      <div class="lesson-nav__status">
        <AppIcon
          :name="completed ? 'check-circle' : 'book'"
          :size="22"
          :class="completed ? 'icon-success' : 'icon-primary'"
        />
        <div>
          <p class="lesson-nav__status-title">
            {{ completed ? 'Lección completada' : '¿Terminaste de revisar esta lección?' }}
          </p>
          <p class="lesson-nav__status-desc">
            {{
              completed
                ? 'Tu progreso quedó guardado automáticamente en este navegador.'
                : 'Márcala como completada para registrar tu avance y desbloquear los siguientes niveles.'
            }}
          </p>
        </div>
      </div>

      <BaseButton
        :variant="completed ? 'secondary' : 'success'"
        size="md"
        @click="toggleLessonCompleted(currentLesson.slug)"
      >
        <AppIcon :name="completed ? 'check' : 'check-circle'" :size="18" />
        {{ completed ? 'Completada (desmarcar)' : 'Marcar como completada' }}
      </BaseButton>
    </div>

    <div class="lesson-nav__links">
      <BaseButton
        v-if="previousLesson"
        :to="`/lessons/${previousLesson.slug}`"
        variant="secondary"
        size="md"
      >
        <AppIcon name="arrow-left" :size="18" />
        Anterior: {{ previousLesson.title }}
      </BaseButton>
      <BaseButton v-else to="/learning" variant="secondary" size="md">
        <AppIcon name="arrow-left" :size="18" />
        Volver a la ruta
      </BaseButton>

      <BaseButton
        v-if="nextLesson && canOpenNext"
        :to="`/lessons/${nextLesson.slug}`"
        variant="primary"
        size="md"
      >
        Siguiente lección
        <AppIcon name="arrow-right" :size="18" />
      </BaseButton>

      <BaseButton
        v-else-if="nextLesson && !canOpenNext"
        variant="secondary"
        size="md"
        disabled
      >
        <AppIcon name="lock" :size="16" />
        Completa este nivel para avanzar
      </BaseButton>

      <BaseButton v-else to="/evaluation" variant="primary" size="md">
        Ir a la Evaluación final
        <AppIcon name="award" :size="18" />
      </BaseButton>
    </div>
  </section>
</template>

<style scoped>
.lesson-nav {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.lesson-nav__complete-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.lesson-nav__status {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.lesson-nav__status-title {
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.95rem;
}

.lesson-nav__status-desc {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.icon-success {
  color: var(--color-success);
  margin-top: 2px;
}

.icon-primary {
  color: var(--color-primary);
  margin-top: 2px;
}

.lesson-nav__links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.lesson-nav__links :deep(.base-btn) {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 700px) {
  .lesson-nav__complete-box {
    flex-direction: column;
    align-items: stretch;
  }

  .lesson-nav__links {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
