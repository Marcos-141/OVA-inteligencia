<script setup lang="ts">
import { LEARNING_LEVELS } from '~/data/learning-path'

const { getLevelProgress, isLevelUnlocked } = useProgress()
</script>

<template>
  <div class="timeline">
    <div v-for="level in LEARNING_LEVELS" :key="level.id" class="timeline__row">
      <div class="timeline__rail" aria-hidden="true">
        <span
          class="timeline__node"
          :class="{
            'timeline__node--done': getLevelProgress(level.id).isCompleted,
            'timeline__node--active': isLevelUnlocked(level.id) && !getLevelProgress(level.id).isCompleted
          }"
        >
          <AppIcon
            v-if="getLevelProgress(level.id).isCompleted"
            name="check"
            :size="15"
          />
          <template v-else>{{ level.id }}</template>
        </span>
        <span v-if="level.id < LEARNING_LEVELS.length" class="timeline__line" />
      </div>

      <div class="timeline__content">
        <LevelCard :level="level" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline__row {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 1.15rem;
  align-items: stretch;
}

.timeline__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline__node {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  border: 2px solid var(--color-border-strong);
  flex-shrink: 0;
  margin-top: 1.25rem;
}

.timeline__node--active {
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.timeline__node--done {
  background-color: var(--color-success);
  color: #ffffff;
  border-color: var(--color-success);
}

.timeline__line {
  width: 2px;
  flex: 1;
  background-color: var(--color-border);
  margin-top: 0.5rem;
  margin-bottom: -1.75rem;
}

.timeline__content {
  min-width: 0;
}

@media (max-width: 640px) {
  .timeline__row {
    grid-template-columns: 1fr;
  }

  .timeline__rail {
    display: none;
  }
}
</style>
