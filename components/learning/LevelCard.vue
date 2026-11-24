<script setup lang="ts">
import { getLessonsByLevel } from '~/data/lessons'
import type { LearningLevel } from '~/types/lesson'

const props = defineProps<{
  level: LearningLevel
}>()

const { getLevelProgress, isLevelUnlocked, isLessonCompleted } = useProgress()

const lessons = computed(() => getLessonsByLevel(props.level.id))
const levelProgress = computed(() => getLevelProgress(props.level.id))
const unlocked = computed(() => isLevelUnlocked(props.level.id))

const badgeTone = computed<'success' | 'primary' | 'neutral'>(() => {
  if (levelProgress.value.isCompleted) return 'success'
  if (unlocked.value) return 'primary'
  return 'neutral'
})

const statusLabel = computed(() => {
  if (levelProgress.value.isCompleted) return 'Completado'
  if (unlocked.value) return 'Disponible'
  return 'Bloqueado'
})
</script>

<template>
  <BaseCard class="level-card" :class="{ 'level-card--locked': !unlocked }" padding="lg">
    <div class="level-card__top">
      <div class="level-card__badges">
        <BaseBadge :tone="badgeTone">{{ level.code }}</BaseBadge>
        <BaseBadge tone="neutral">{{ level.difficultyLabel }}</BaseBadge>
        <BaseBadge :tone="badgeTone">
          <AppIcon
            :name="levelProgress.isCompleted ? 'check' : unlocked ? 'play' : 'lock'"
            :size="12"
          />
          {{ statusLabel }}
        </BaseBadge>
      </div>

      <span class="level-card__count">
        {{ levelProgress.completedCount }}/{{ levelProgress.totalCount }} lecciones
      </span>
    </div>

    <div class="level-card__body">
      <h2 class="level-card__title">{{ level.title }}</h2>
      <p class="level-card__desc">{{ level.description }}</p>
      <p class="level-card__objective">
        <strong>Objetivo:</strong> {{ level.objective }}
      </p>
    </div>

    <ProgressBar
      :value="levelProgress.percentage"
      :tone="levelProgress.isCompleted ? 'success' : 'primary'"
      height="sm"
      :show-percent="false"
    />

    <ul class="lesson-list">
      <li v-for="lesson in lessons" :key="lesson.slug" class="lesson-list__item">
        <NuxtLink
          v-if="unlocked"
          :to="`/lessons/${lesson.slug}`"
          class="lesson-row"
          :class="{ 'lesson-row--done': isLessonCompleted(lesson.slug) }"
        >
          <span class="lesson-row__icon">
            <AppIcon
              :name="isLessonCompleted(lesson.slug) ? 'check-circle' : 'book'"
              :size="18"
            />
          </span>
          <span class="lesson-row__content">
            <span class="lesson-row__title">
              {{ level.id }}.{{ lesson.orderInLevel }} {{ lesson.title }}
            </span>
            <span class="lesson-row__meta">
              {{ lesson.estimatedMinutes }} min
              <template v-if="lesson.interactiveResource"> · Incluye recurso interactivo</template>
            </span>
          </span>
          <AppIcon name="arrow-right" :size="16" class="lesson-row__arrow" />
        </NuxtLink>

        <div v-else class="lesson-row lesson-row--locked">
          <span class="lesson-row__icon">
            <AppIcon name="lock" :size="16" />
          </span>
          <span class="lesson-row__content">
            <span class="lesson-row__title">
              {{ level.id }}.{{ lesson.orderInLevel }} {{ lesson.title }}
            </span>
            <span class="lesson-row__meta">
              Completa el Nivel {{ level.id - 1 }} para desbloquear esta lección
            </span>
          </span>
        </div>
      </li>
    </ul>

    <div v-if="level.id === 5 && unlocked" class="level-card__extra">
      <BaseButton to="/activities" variant="secondary" size="sm">
        Practicar actividades integradoras
      </BaseButton>
      <BaseButton to="/evaluation" variant="primary" size="sm">
        Presentar Evaluación final
        <AppIcon name="award" :size="16" />
      </BaseButton>
    </div>
  </BaseCard>
</template>

<style scoped>
.level-card {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.level-card--locked {
  background-color: #fbfcfe;
}

.level-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.level-card__badges {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.level-card__count {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.level-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.level-card__title {
  font-size: 1.25rem;
  font-weight: 700;
}

.level-card__desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.level-card__objective {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.lesson-list {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    transform var(--transition-fast);
}

.lesson-row:not(.lesson-row--locked):hover {
  border-color: var(--color-primary-border);
  background-color: var(--color-primary-soft);
}

.lesson-row--done {
  border-color: var(--color-success-border);
  background-color: var(--color-success-soft);
}

.lesson-row--locked {
  background-color: var(--color-surface-subtle);
  opacity: 0.75;
  cursor: not-allowed;
}

.lesson-row__icon {
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
}

.lesson-row--done .lesson-row__icon {
  color: var(--color-success);
}

.lesson-row--locked .lesson-row__icon {
  color: var(--color-text-muted);
}

.lesson-row__content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
}

.lesson-row__title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
}

.lesson-row__meta {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.lesson-row__arrow {
  color: var(--color-text-muted);
}

.level-card__extra {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.35rem;
}
</style>
