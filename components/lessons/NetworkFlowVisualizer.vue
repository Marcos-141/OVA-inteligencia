<script setup lang="ts">
type FlowStage = 'idle' | 'input' | 'hidden' | 'output' | 'error' | 'backprop'

const stage = ref<FlowStage>('idle')
const trainingRound = ref(0)
const isAnimating = ref(false)

const stageDescription: Record<FlowStage, { title: string; detail: string }> = {
  idle: {
    title: 'Lista para comenzar',
    detail:
      'Pulsa "Propagación hacia adelante" para ver cómo viajan los datos desde la entrada hasta la salida.'
  },
  input: {
    title: '1. Llegan los datos (Capa de entrada)',
    detail:
      'La red recibe un ejemplo convertido en números (por ejemplo, pistas visuales de una imagen).'
  },
  hidden: {
    title: '2. Procesamiento interno (Capa oculta)',
    detail:
      'Las neuronas intermedias multiplican por sus pesos, suman sesgos y combinan patrones útiles.'
  },
  output: {
    title: '3. Se emite la respuesta (Capa de salida)',
    detail:
      'La red entrega su predicción actual. Termina la propagación hacia adelante.'
  },
  error: {
    title: '4. Medición del error',
    detail:
      'Comparamos la predicción con la respuesta esperada para saber cuánto se equivocó la red.'
  },
  backprop: {
    title: '5. Retropropagación (Ajuste hacia atrás)',
    detail:
      'La corrección viaja desde la salida hacia atrás ajustando suavemente los pesos para acertar mejor en la siguiente ronda.'
  }
}

let timers: ReturnType<typeof setTimeout>[] = []

function clearTimers() {
  for (const timer of timers) {
    clearTimeout(timer)
  }
  timers = []
}

function runForwardPass() {
  clearTimers()
  isAnimating.value = true
  stage.value = 'input'
  timers.push(
    setTimeout(() => {
      stage.value = 'hidden'
    }, 850),
    setTimeout(() => {
      stage.value = 'output'
      isAnimating.value = false
    }, 1700)
  )
}

function runFullTrainingCycle() {
  clearTimers()
  isAnimating.value = true
  stage.value = 'input'
  timers.push(
    setTimeout(() => {
      stage.value = 'hidden'
    }, 750),
    setTimeout(() => {
      stage.value = 'output'
    }, 1500),
    setTimeout(() => {
      stage.value = 'error'
    }, 2300),
    setTimeout(() => {
      stage.value = 'backprop'
      trainingRound.value += 1
      isAnimating.value = false
    }, 3150)
  )
}

const simulatedError = computed(() => {
  const base = Math.max(8, 54 - trainingRound.value * 14)
  return `${base}%`
})

onBeforeUnmount(clearTimers)
</script>

<template>
  <div class="flow-widget">
    <div class="flow-controls">
      <BaseButton
        variant="primary"
        size="sm"
        :disabled="isAnimating"
        @click="runForwardPass"
      >
        <AppIcon name="play" :size="15" />
        Propagación hacia adelante
      </BaseButton>

      <BaseButton
        variant="secondary"
        size="sm"
        :disabled="isAnimating"
        @click="runFullTrainingCycle"
      >
        <AppIcon name="refresh" :size="15" />
        Ciclo completo (incluye retropropagación)
      </BaseButton>

      <BaseBadge :tone="trainingRound > 0 ? 'success' : 'neutral'">
        Rondas practicadas: {{ trainingRound }} · Error estimado: {{ simulatedError }}
      </BaseBadge>
    </div>

    <div class="flow-canvas">
      <svg viewBox="0 0 580 210" class="flow-svg" role="img" aria-label="Animación de flujo de datos y retropropagación">
        <!-- Conexiones Entrada -> Oculta -->
        <g
          :stroke="
            stage === 'hidden'
              ? '#3b5bdb'
              : stage === 'backprop'
                ? '#d97706'
                : '#cbd5e1'
          "
          :stroke-width="stage === 'hidden' || stage === 'backprop' ? 2.6 : 1.6"
          class="flow-transition"
        >
          <line x1="100" y1="55" x2="290" y2="45" />
          <line x1="100" y1="55" x2="290" y2="105" />
          <line x1="100" y1="55" x2="290" y2="165" />
          <line x1="100" y1="155" x2="290" y2="45" />
          <line x1="100" y1="155" x2="290" y2="105" />
          <line x1="100" y1="155" x2="290" y2="165" />
        </g>

        <!-- Conexiones Oculta -> Salida -->
        <g
          :stroke="
            stage === 'output'
              ? '#0f9d7a'
              : stage === 'backprop' || stage === 'error'
                ? '#d97706'
                : '#cbd5e1'
          "
          :stroke-width="
            stage === 'output' || stage === 'backprop' || stage === 'error' ? 2.8 : 1.6
          "
          class="flow-transition"
        >
          <line x1="290" y1="45" x2="475" y2="105" />
          <line x1="290" y1="105" x2="475" y2="105" />
          <line x1="290" y1="165" x2="475" y2="105" />
        </g>

        <!-- Flecha indicadora de dirección -->
        <text
          v-if="stage === 'input' || stage === 'hidden' || stage === 'output'"
          x="290"
          y="20"
          text-anchor="middle"
          class="dir-forward"
        >
          Flujo hacia adelante →
        </text>
        <text
          v-else-if="stage === 'backprop'"
          x="290"
          y="20"
          text-anchor="middle"
          class="dir-back"
        >
          ← Corrección hacia atrás (Retropropagación)
        </text>

        <!-- Nodos Entrada -->
        <g>
          <circle
            cx="100"
            cy="55"
            r="18"
            :fill="stage === 'input' ? '#3b5bdb' : '#eef2ff'"
            stroke="#3b5bdb"
            stroke-width="2"
          />
          <circle
            cx="100"
            cy="155"
            r="18"
            :fill="stage === 'input' ? '#3b5bdb' : '#eef2ff'"
            stroke="#3b5bdb"
            stroke-width="2"
          />
          <text x="100" y="196" text-anchor="middle" class="layer-label">Capa de entrada</text>
        </g>

        <!-- Nodos Oculta -->
        <g>
          <circle
            cx="290"
            cy="45"
            r="17"
            :fill="stage === 'hidden' ? '#3b5bdb' : stage === 'backprop' ? '#fffbeb' : '#ffffff'"
            :stroke="stage === 'backprop' ? '#d97706' : '#3b5bdb'"
            stroke-width="2"
          />
          <circle
            cx="290"
            cy="105"
            r="17"
            :fill="stage === 'hidden' ? '#3b5bdb' : stage === 'backprop' ? '#fffbeb' : '#ffffff'"
            :stroke="stage === 'backprop' ? '#d97706' : '#3b5bdb'"
            stroke-width="2"
          />
          <circle
            cx="290"
            cy="165"
            r="17"
            :fill="stage === 'hidden' ? '#3b5bdb' : stage === 'backprop' ? '#fffbeb' : '#ffffff'"
            :stroke="stage === 'backprop' ? '#d97706' : '#3b5bdb'"
            stroke-width="2"
          />
          <text x="290" y="196" text-anchor="middle" class="layer-label">Capa oculta</text>
        </g>

        <!-- Nodo Salida -->
        <g>
          <circle
            cx="475"
            cy="105"
            r="22"
            :fill="
              stage === 'output'
                ? '#0f9d7a'
                : stage === 'error'
                  ? '#fef2f2'
                  : '#ecfdf5'
            "
            :stroke="stage === 'error' ? '#dc2626' : '#0f9d7a'"
            stroke-width="2.5"
          />
          <text x="475" y="196" text-anchor="middle" class="layer-label">Capa de salida</text>
        </g>
      </svg>
    </div>

    <div class="flow-status" aria-live="polite">
      <strong>{{ stageDescription[stage].title }}</strong>
      <p>{{ stageDescription[stage].detail }}</p>
    </div>
  </div>
</template>

<style scoped>
.flow-widget {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flow-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.flow-canvas {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.85rem;
}

.flow-svg {
  width: 100%;
  height: auto;
}

.flow-transition {
  transition: stroke 260ms ease, stroke-width 260ms ease;
}

.layer-label {
  font-size: 12px;
  font-weight: 600;
  fill: #475569;
}

.dir-forward {
  font-size: 12px;
  font-weight: 700;
  fill: #3b5bdb;
}

.dir-back {
  font-size: 12px;
  font-weight: 700;
  fill: #b45309;
}

.flow-status {
  padding: 0.9rem 1.05rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.flow-status strong {
  font-size: 0.95rem;
  color: var(--color-text);
}

.flow-status p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style>
