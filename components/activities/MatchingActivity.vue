<script setup lang="ts">
import { MATCHING_ACTIVITY } from '~/data/activities'

const { saveActivityScore } = useProgress()

// Orden determinista mezclado para evitar diferencias SSR/hidratación
const analogyOrder = ['p3', 'p5', 'p1', 'p4', 'p2']
const analogies = computed(() =>
  analogyOrder
    .map((id) => MATCHING_ACTIVITY.pairs.find((pair) => pair.id === id))
    .filter((pair): pair is (typeof MATCHING_ACTIVITY.pairs)[number] => Boolean(pair))
)

const selectedConceptId = ref<string | null>(null)
const matchedIds = ref<string[]>([])
const mistakes = ref(0)
const feedback = ref<{ ok: boolean; text: string } | null>(null)

const isComplete = computed(() => matchedIds.value.length === MATCHING_ACTIVITY.pairs.length)

function pickConcept(id: string) {
  if (matchedIds.value.includes(id)) return
  selectedConceptId.value = id
  feedback.value = null
}

function pickAnalogy(analogyPairId: string) {
  if (matchedIds.value.includes(analogyPairId)) return
  if (!selectedConceptId.value) {
    feedback.value = {
      ok: false,
      text: 'Primero selecciona un concepto de la columna izquierda.'
    }
    return
  }

  const conceptPair = MATCHING_ACTIVITY.pairs.find((p) => p.id === selectedConceptId.value)
  if (!conceptPair) return

  if (selectedConceptId.value === analogyPairId) {
    matchedIds.value = [...matchedIds.value, analogyPairId]
    selectedConceptId.value = null
    feedback.value = {
      ok: true,
      text: `¡Pareja correcta! ${conceptPair.concept}: ${conceptPair.explanation}`
    }

    if (matchedIds.value.length === MATCHING_ACTIVITY.pairs.length) {
      const score = Math.max(1, MATCHING_ACTIVITY.pairs.length - Math.min(mistakes.value, 4))
      saveActivityScore(MATCHING_ACTIVITY.id, score, MATCHING_ACTIVITY.pairs.length)
    }
  } else {
    mistakes.value += 1
    feedback.value = {
      ok: false,
      text: `Esa analogía no corresponde a "${conceptPair.concept}". Pista: ${conceptPair.explanation}`
    }
  }
}

function resetActivity() {
  selectedConceptId.value = null
  matchedIds.value = []
  mistakes.value = 0
  feedback.value = null
}
</script>

<template>
  <div class="matching">
    <div class="matching__top">
      <BaseBadge :tone="isComplete ? 'success' : 'primary'">
        Emparejados: {{ matchedIds.length }}/{{ MATCHING_ACTIVITY.pairs.length }}
      </BaseBadge>
      <BaseButton v-if="isComplete" variant="secondary" size="sm" @click="resetActivity">
        <AppIcon name="refresh" :size="14" />
        Intentar de nuevo
      </BaseButton>
    </div>

    <div class="matching__columns">
      <div class="matching__col">
        <h4 class="matching__col-title">1. Elige un concepto</h4>
        <button
          v-for="pair in MATCHING_ACTIVITY.pairs"
          :key="pair.id"
          type="button"
          class="match-card"
          :class="{
            'match-card--selected': selectedConceptId === pair.id,
            'match-card--done': matchedIds.includes(pair.id)
          }"
          :disabled="matchedIds.includes(pair.id)"
          @click="pickConcept(pair.id)"
        >
          <span>{{ pair.concept }}</span>
          <AppIcon v-if="matchedIds.includes(pair.id)" name="check-circle" :size="17" />
        </button>
      </div>

      <div class="matching__col">
        <h4 class="matching__col-title">2. Relaciónalo con su analogía</h4>
        <button
          v-for="pair in analogies"
          :key="`an-${pair.id}`"
          type="button"
          class="match-card"
          :class="{ 'match-card--done': matchedIds.includes(pair.id) }"
          :disabled="matchedIds.includes(pair.id)"
          @click="pickAnalogy(pair.id)"
        >
          <span>{{ pair.analogy }}</span>
          <AppIcon v-if="matchedIds.includes(pair.id)" name="check-circle" :size="17" />
        </button>
      </div>
    </div>

    <div
      v-if="feedback"
      class="matching__feedback"
      :class="feedback.ok ? 'matching__feedback--ok' : 'matching__feedback--err'"
      aria-live="polite"
    >
      <AppIcon :name="feedback.ok ? 'check-circle' : 'alert-circle'" :size="18" />
      <span>{{ feedback.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.matching {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.matching__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.matching__columns {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 1rem;
}

.matching__col {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.matching__col-title {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.15rem;
}

.match-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.match-card:hover:not(:disabled) {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.match-card--selected {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
  box-shadow: 0 0 0 2px rgba(59, 91, 219, 0.18);
  font-weight: 700;
}

.match-card--done {
  border-color: var(--color-success-border);
  background-color: var(--color-success-soft);
  color: var(--color-success);
  cursor: default;
}

.matching__feedback {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.885rem;
}

.matching__feedback--ok {
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
}

.matching__feedback--err {
  background-color: var(--color-error-soft);
  border: 1px solid var(--color-error-border);
}

@media (max-width: 720px) {
  .matching__columns {
    grid-template-columns: 1fr;
  }
}
</style>
