<script setup lang="ts">
interface SignalControl {
  id: string
  label: string
  input: number
  weight: number
}

const signals = ref<SignalControl[]>([
  { id: 'clouds', label: 'Cielo nublado', input: 7, weight: 0.6 },
  { id: 'forecast', label: 'Pronóstico de lluvia', input: 8, weight: 0.9 },
  { id: 'sun', label: 'Sol radiante', input: 2, weight: -0.7 }
])

const bias = ref<number>(-4)

const weightedContributions = computed(() =>
  signals.value.map((signal) => ({
    ...signal,
    contribution: Number((signal.input * signal.weight).toFixed(1))
  }))
)

const totalScore = computed(() => {
  const sum = weightedContributions.value.reduce((acc, item) => acc + item.contribution, 0)
  return Number((sum + bias.value).toFixed(1))
})

// Función sigmoide suave para mostrar nivel de confianza 0..100%
const activationPercent = computed(() => {
  const sigmoid = 1 / (1 + Math.exp(-totalScore.value * 0.45))
  return Math.round(sigmoid * 100)
})

const shouldTakeUmbrella = computed(() => activationPercent.value >= 50)

function applyPreset(preset: 'rainy' | 'sunny' | 'cautious') {
  if (preset === 'rainy') {
    signals.value[0]!.input = 9
    signals.value[1]!.input = 9
    signals.value[2]!.input = 1
    signals.value[0]!.weight = 0.6
    signals.value[1]!.weight = 0.9
    signals.value[2]!.weight = -0.7
    bias.value = -4
  } else if (preset === 'sunny') {
    signals.value[0]!.input = 1
    signals.value[1]!.input = 1
    signals.value[2]!.input = 9
    signals.value[0]!.weight = 0.6
    signals.value[1]!.weight = 0.9
    signals.value[2]!.weight = -0.7
    bias.value = -4
  } else {
    signals.value[0]!.input = 5
    signals.value[1]!.input = 4
    signals.value[2]!.input = 4
    signals.value[0]!.weight = 0.6
    signals.value[1]!.weight = 0.9
    signals.value[2]!.weight = -0.4
    bias.value = 1
  }
}

function lineStrokeWidth(weight: number): number {
  return 1.5 + Math.abs(weight) * 3.5
}

function lineColor(weight: number): string {
  if (weight > 0.05) return '#3b5bdb'
  if (weight < -0.05) return '#dc2626'
  return '#cbd5e1'
}
</script>

<template>
  <div class="sim">
    <div class="sim__presets">
      <span class="sim__presets-label">Prueba un escenario rápido:</span>
      <button type="button" class="preset-chip" @click="applyPreset('rainy')">Día tormentoso</button>
      <button type="button" class="preset-chip" @click="applyPreset('sunny')">Día soleado</button>
      <button type="button" class="preset-chip" @click="applyPreset('cautious')">
        Persona muy precavida (sesgo alto)
      </button>
    </div>

    <!-- Diagrama en vivo -->
    <div class="sim__diagram-wrap">
      <svg viewBox="0 0 640 240" class="sim__svg" role="img" aria-label="Diagrama interactivo de una neurona artificial">
        <!-- Líneas de entrada con grosor proporcional al peso -->
        <g v-for="(sig, idx) in weightedContributions" :key="sig.id">
          <line
            x1="150"
            :y1="52 + idx * 68"
            x2="328"
            y2="120"
            :stroke="lineColor(sig.weight)"
            :stroke-width="lineStrokeWidth(sig.weight)"
            stroke-linecap="round"
            class="sim-line"
          />
          <rect
            x="212"
            :y="38 + idx * 68"
            width="64"
            height="22"
            rx="11"
            fill="#ffffff"
            stroke="#e2e8f0"
          />
          <text x="244" :y="53 + idx * 68" text-anchor="middle" class="svg-weight">
            Peso {{ sig.weight > 0 ? `+${sig.weight}` : sig.weight }}
          </text>
        </g>

        <!-- Línea de salida -->
        <line
          x1="406"
          y2="120"
          x2="494"
          y1="120"
          :stroke="shouldTakeUmbrella ? '#0f9d7a' : '#64748b'"
          stroke-width="3.5"
          stroke-linecap="round"
        />

        <!-- Nodos de entrada -->
        <g v-for="(sig, idx) in weightedContributions" :key="`node-${sig.id}`">
          <rect
            x="16"
            :y="32 + idx * 68"
            width="134"
            height="40"
            rx="10"
            fill="#ffffff"
            stroke="#cbd5e1"
          />
          <text x="83" :y="49 + idx * 68" text-anchor="middle" class="svg-input-label">
            {{ sig.label }}
          </text>
          <text x="83" :y="64 + idx * 68" text-anchor="middle" class="svg-input-val">
            Entrada: {{ sig.input }}/10
          </text>
        </g>

        <!-- Cuerpo de la neurona -->
        <circle
          cx="368"
          cy="120"
          r="46"
          :fill="shouldTakeUmbrella ? '#ecfdf5' : '#eef2ff'"
          :stroke="shouldTakeUmbrella ? '#0f9d7a' : '#3b5bdb'"
          stroke-width="3"
        />
        <text x="368" y="109" text-anchor="middle" class="svg-neuron-title">Neurona</text>
        <text x="368" y="128" text-anchor="middle" class="svg-neuron-score">
          {{ totalScore >= 0 ? `+${totalScore}` : totalScore }}
        </text>
        <text x="368" y="144" text-anchor="middle" class="svg-neuron-sub">
          Sesgo: {{ bias >= 0 ? `+${bias}` : bias }}
        </text>

        <!-- Nodo de salida -->
        <rect
          x="494"
          y="78"
          width="132"
          height="84"
          rx="12"
          :fill="shouldTakeUmbrella ? '#ecfdf5' : '#f8fafc'"
          :stroke="shouldTakeUmbrella ? '#0f9d7a' : '#94a3b8'"
          stroke-width="2"
        />
        <text x="560" y="105" text-anchor="middle" class="svg-out-kicker">Activación: {{ activationPercent }}%</text>
        <text x="560" y="128" text-anchor="middle" class="svg-out-decision">
          {{ shouldTakeUmbrella ? 'Llevar paraguas' : 'No llevarlo' }}
        </text>
        <text x="560" y="147" text-anchor="middle" class="svg-out-sub">
          {{ shouldTakeUmbrella ? 'Neurona activada' : 'Por debajo del umbral' }}
        </text>
      </svg>
    </div>

    <!-- Controles interactivos -->
    <div class="sim__controls">
      <div v-for="sig in signals" :key="`ctrl-${sig.id}`" class="control-card">
        <div class="control-card__head">
          <strong>{{ sig.label }}</strong>
          <span class="control-card__contrib">
            Aporte: {{ (sig.input * sig.weight) >= 0 ? '+' : '' }}{{ (sig.input * sig.weight).toFixed(1) }}
          </span>
        </div>

        <label class="slider-row">
          <span>Entrada (intensidad): <strong>{{ sig.input }}</strong></span>
          <input v-model.number="sig.input" type="range" min="0" max="10" step="1" />
        </label>

        <label class="slider-row">
          <span>
            Peso (importancia):
            <strong :class="sig.weight < 0 ? 'text-neg' : 'text-pos'">
              {{ sig.weight > 0 ? `+${sig.weight}` : sig.weight }}
            </strong>
          </span>
          <input v-model.number="sig.weight" type="range" min="-1" max="1" step="0.1" />
        </label>
      </div>

      <div class="control-card control-card--bias">
        <div class="control-card__head">
          <strong>Sesgo (Bias)</strong>
          <span class="control-card__contrib">{{ bias >= 0 ? `+${bias}` : bias }}</span>
        </div>
        <p class="bias-help">
          Un sesgo positivo te hace más precavido (llevas paraguas con menos pistas). Un sesgo
          negativo exige más evidencia de lluvia.
        </p>
        <label class="slider-row">
          <span>Ajuste personal: <strong>{{ bias >= 0 ? `+${bias}` : bias }}</strong></span>
          <input v-model.number="bias" type="range" min="-8" max="4" step="0.5" />
        </label>
      </div>
    </div>

    <div class="sim__result" :class="shouldTakeUmbrella ? 'sim__result--yes' : 'sim__result--no'">
      <div>
        <strong>Decisión de la neurona:</strong>
        {{
          shouldTakeUmbrella
            ? 'Sí, conviene llevar paraguas.'
            : 'No hace falta llevar paraguas.'
        }}
      </div>
      <span class="sim__result-meta">
        Puntaje total: {{ totalScore >= 0 ? `+${totalScore}` : totalScore }} · Nivel de activación:
        {{ activationPercent }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
.sim {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.sim__presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.sim__presets-label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.preset-chip {
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.preset-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.sim__diagram-wrap {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  overflow-x: auto;
}

.sim__svg {
  width: 100%;
  min-width: 520px;
  height: auto;
}

.sim-line {
  transition: stroke-width 180ms ease, stroke 180ms ease;
}

.svg-input-label {
  font-size: 11px;
  font-weight: 600;
  fill: #0f172a;
}

.svg-input-val {
  font-size: 10px;
  fill: #64748b;
}

.svg-weight {
  font-size: 10px;
  font-weight: 600;
  fill: #334155;
}

.svg-neuron-title {
  font-size: 11px;
  font-weight: 600;
  fill: #475569;
}

.svg-neuron-score {
  font-size: 17px;
  font-weight: 800;
  fill: #0f172a;
}

.svg-neuron-sub {
  font-size: 10px;
  fill: #64748b;
}

.svg-out-kicker {
  font-size: 10.5px;
  font-weight: 600;
  fill: #475569;
}

.svg-out-decision {
  font-size: 13px;
  font-weight: 800;
  fill: #0f172a;
}

.svg-out-sub {
  font-size: 10px;
  fill: #64748b;
}

.sim__controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.control-card {
  padding: 0.95rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.control-card--bias {
  background-color: var(--color-surface-subtle);
}

.control-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.control-card__contrib {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
}

.bias-help {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.slider-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.slider-row input[type='range'] {
  width: 100%;
  accent-color: var(--color-primary);
}

.text-pos {
  color: var(--color-primary);
}

.text-neg {
  color: var(--color-error);
}

.sim__result {
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.925rem;
}

.sim__result--yes {
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
}

.sim__result--no {
  background-color: var(--color-surface-subtle);
  border: 1px solid var(--color-border-strong);
}

.sim__result-meta {
  font-size: 0.825rem;
  color: var(--color-text-secondary);
  font-weight: 600;
}

@media (max-width: 720px) {
  .sim__controls {
    grid-template-columns: 1fr;
  }
}
</style>
