<script setup lang="ts">
interface AnalogyItem {
  id: string
  bioName: string
  bioDesc: string
  rnaName: string
  rnaDesc: string
}

const items: AnalogyItem[] = [
  {
    id: 'dendrites',
    bioName: 'Dendritas (Cerebro)',
    bioDesc: 'Ramificaciones que reciben señales eléctricas de otras neuronas.',
    rnaName: 'Entradas (RNA)',
    rnaDesc: 'Datos numéricos que llegan a la neurona artificial desde el exterior o desde capas previas.'
  },
  {
    id: 'synapse',
    bioName: 'Sinapsis (Cerebro)',
    bioDesc: 'Conexiones que se fortalecen o debilitan cuando aprendemos algo nuevo.',
    rnaName: 'Pesos (RNA)',
    rnaDesc: 'Números que aumentan o disminuyen durante el entrenamiento para dar más o menos importancia a cada entrada.'
  },
  {
    id: 'soma',
    bioName: 'Cuerpo celular (Cerebro)',
    bioDesc: 'Integra todas las señales entrantes y decide si dispara un impulso nervioso.',
    rnaName: 'Suma + Sesgo + Activación (RNA)',
    rnaDesc: 'Combina las entradas ponderadas, suma el sesgo y decide qué tan fuerte será la respuesta.'
  },
  {
    id: 'axon',
    bioName: 'Axón (Cerebro)',
    bioDesc: 'Transmite el impulso resultante hacia otras neuronas de la red.',
    rnaName: 'Salida (RNA)',
    rnaDesc: 'Envía el valor calculado a la siguiente capa o como predicción final del sistema.'
  }
]

const selectedId = ref<string>(items[0]?.id ?? 'dendrites')
const selected = computed(() => items.find((i) => i.id === selectedId.value) ?? items[0]!)
</script>

<template>
  <div class="analogy-widget">
    <div class="analogy-tabs" role="tablist" aria-label="Partes comparadas entre cerebro y RNA">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="selectedId === item.id"
        class="analogy-tab"
        :class="{ 'analogy-tab--active': selectedId === item.id }"
        @click="selectedId = item.id"
      >
        {{ item.rnaName.replace(' (RNA)', '') }}
      </button>
    </div>

    <div class="analogy-compare">
      <div class="analogy-col analogy-col--bio">
        <BaseBadge tone="neutral">Inspiración biológica</BaseBadge>
        <h4>{{ selected.bioName }}</h4>
        <p>{{ selected.bioDesc }}</p>
      </div>

      <div class="analogy-arrow" aria-hidden="true">
        <AppIcon name="arrow-right" :size="20" />
      </div>

      <div class="analogy-col analogy-col--rna">
        <BaseBadge tone="primary">Equivalente digital</BaseBadge>
        <h4>{{ selected.rnaName }}</h4>
        <p>{{ selected.rnaDesc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analogy-widget {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.analogy-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.analogy-tab {
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.analogy-tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.analogy-tab--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.analogy-compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.analogy-col {
  padding: 1.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
}

.analogy-col--rna {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary-border);
}

.analogy-col h4 {
  font-size: 1rem;
}

.analogy-col p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.analogy-arrow {
  color: var(--color-primary);
  display: inline-flex;
  justify-content: center;
}

@media (max-width: 680px) {
  .analogy-compare {
    grid-template-columns: 1fr;
  }

  .analogy-arrow {
    transform: rotate(90deg);
  }
}
</style>
