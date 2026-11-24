<script setup lang="ts">
import { NEURON_ANATOMY_HOTSPOTS } from '~/data/activities'
import type { AnatomyHotspot } from '~/types/activity'

const props = withDefaults(
  defineProps<{
    saveProgress?: boolean
  }>(),
  {
    saveProgress: true
  }
)

const { saveActivityScore } = useProgress()

const currentStepIndex = ref(0)
const solvedIds = ref<AnatomyHotspot['id'][]>([])
const lastFeedback = ref<{ ok: boolean; message: string; analogy?: string } | null>(null)
const mistakesCount = ref(0)

const isFinished = computed(() => solvedIds.value.length === NEURON_ANATOMY_HOTSPOTS.length)
const currentTarget = computed<AnatomyHotspot | null>(
  () => NEURON_ANATOMY_HOTSPOTS[currentStepIndex.value] ?? null
)

function selectPart(partId: AnatomyHotspot['id']) {
  if (isFinished.value || !currentTarget.value) return

  const clickedInfo = NEURON_ANATOMY_HOTSPOTS.find((item) => item.id === partId)
  if (!clickedInfo) return

  if (partId === currentTarget.value.id) {
    if (!solvedIds.value.includes(partId)) {
      solvedIds.value = [...solvedIds.value, partId]
    }
    lastFeedback.value = {
      ok: true,
      message: `¡Correcto! ${clickedInfo.label}: ${clickedInfo.roleDescription}`,
      analogy: clickedInfo.everydayAnalogy
    }

    if (currentStepIndex.value < NEURON_ANATOMY_HOTSPOTS.length - 1) {
      currentStepIndex.value += 1
    } else if (props.saveProgress) {
      const score = Math.max(1, NEURON_ANATOMY_HOTSPOTS.length - Math.min(mistakesCount.value, 4))
      saveActivityScore('act-anatomy', score, NEURON_ANATOMY_HOTSPOTS.length)
    }
  } else {
    mistakesCount.value += 1
    lastFeedback.value = {
      ok: false,
      message: `Hiciste clic en "${clickedInfo.label}", que sirve para: ${clickedInfo.roleDescription.toLowerCase()} Intenta localizar la parte que pide el enunciado.`
    }
  }
}

function restart() {
  currentStepIndex.value = 0
  solvedIds.value = []
  lastFeedback.value = null
  mistakesCount.value = 0
}

function hotspotFill(id: AnatomyHotspot['id']): string {
  if (solvedIds.value.includes(id)) return '#ecfdf5'
  return '#ffffff'
}

function hotspotStroke(id: AnatomyHotspot['id']): string {
  if (solvedIds.value.includes(id)) return '#0f9d7a'
  return '#3b5bdb'
}
</script>

<template>
  <div class="anatomy">
    <div class="anatomy__header">
      <div v-if="!isFinished && currentTarget" class="anatomy__prompt">
        <BaseBadge tone="primary">
          Reto {{ currentStepIndex + 1 }} de {{ NEURON_ANATOMY_HOTSPOTS.length }}
        </BaseBadge>
        <p class="anatomy__prompt-text">{{ currentTarget.prompt }}</p>
      </div>

      <div v-else class="anatomy__done">
        <BaseBadge tone="success">
          <AppIcon name="check" :size="12" />
          ¡Completado!
        </BaseBadge>
        <p class="anatomy__prompt-text">
          Identificaste los 5 componentes fundamentales de una neurona artificial.
        </p>
        <BaseButton variant="secondary" size="sm" @click="restart">
          <AppIcon name="refresh" :size="14" />
          Practicar de nuevo
        </BaseButton>
      </div>
    </div>

    <div class="anatomy__canvas">
      <svg
        viewBox="0 0 640 250"
        class="anatomy__svg"
        role="group"
        aria-label="Diagrama interactivo de componentes de una neurona artificial"
      >
        <!-- Conexiones -->
        <line x1="126" y1="65" x2="210" y2="112" stroke="#cbd5e1" stroke-width="2" />
        <line x1="126" y1="125" x2="210" y2="125" stroke="#cbd5e1" stroke-width="2" />
        <line x1="126" y1="185" x2="210" y2="138" stroke="#cbd5e1" stroke-width="2" />
        <line x1="274" y1="125" x2="345" y2="125" stroke="#cbd5e1" stroke-width="2" />
        <line x1="395" y1="74" x2="395" y2="95" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 3" />
        <line x1="445" y1="125" x2="515" y2="125" stroke="#cbd5e1" stroke-width="2.5" />

        <!-- 1. Entradas -->
        <g
          class="hotspot"
          role="button"
          tabindex="0"
          aria-label="Seleccionar zona izquierda (Entradas)"
          @click="selectPart('inputs')"
          @keydown.enter.prevent="selectPart('inputs')"
        >
          <rect
            x="18"
            y="42"
            width="108"
            height="166"
            rx="12"
            :fill="hotspotFill('inputs')"
            :stroke="hotspotStroke('inputs')"
            stroke-width="2"
          />
          <circle cx="54" cy="75" r="10" fill="#eef2ff" stroke="#3b5bdb" />
          <circle cx="54" cy="125" r="10" fill="#eef2ff" stroke="#3b5bdb" />
          <circle cx="54" cy="175" r="10" fill="#eef2ff" stroke="#3b5bdb" />
          <text x="86" y="79" class="svg-num">x₁</text>
          <text x="86" y="129" class="svg-num">x₂</text>
          <text x="86" y="179" class="svg-num">x₃</text>
          <text x="72" y="232" text-anchor="middle" class="svg-caption">
            {{ solvedIds.includes('inputs') ? 'Entradas ✓' : 'Zona A' }}
          </text>
        </g>

        <!-- 2. Pesos -->
        <g
          class="hotspot"
          role="button"
          tabindex="0"
          aria-label="Seleccionar multiplicadores de conexión (Pesos)"
          @click="selectPart('weights')"
          @keydown.enter.prevent="selectPart('weights')"
        >
          <rect
            x="196"
            y="84"
            width="86"
            height="82"
            rx="12"
            :fill="hotspotFill('weights')"
            :stroke="hotspotStroke('weights')"
            stroke-width="2"
          />
          <text x="239" y="114" text-anchor="middle" class="svg-symbol">× w₁, w₂</text>
          <text x="239" y="135" text-anchor="middle" class="svg-mini">Importancia</text>
          <text x="239" y="232" text-anchor="middle" class="svg-caption">
            {{ solvedIds.includes('weights') ? 'Pesos ✓' : 'Zona B' }}
          </text>
        </g>

        <!-- 3. Sesgo (Bias) -->
        <g
          class="hotspot"
          role="button"
          tabindex="0"
          aria-label="Seleccionar ajuste interno superior (Sesgo)"
          @click="selectPart('bias')"
          @keydown.enter.prevent="selectPart('bias')"
        >
          <rect
            x="336"
            y="22"
            width="118"
            height="52"
            rx="12"
            :fill="hotspotFill('bias')"
            :stroke="hotspotStroke('bias')"
            stroke-width="2"
          />
          <text x="395" y="45" text-anchor="middle" class="svg-symbol">+ b</text>
          <text x="395" y="62" text-anchor="middle" class="svg-mini">
            {{ solvedIds.includes('bias') ? 'Sesgo ✓' : 'Zona C' }}
          </text>
        </g>

        <!-- 4. Función de activación -->
        <g
          class="hotspot"
          role="button"
          tabindex="0"
          aria-label="Seleccionar bloque central de decisión (Función de activación)"
          @click="selectPart('activation')"
          @keydown.enter.prevent="selectPart('activation')"
        >
          <rect
            x="345"
            y="95"
            width="100"
            height="72"
            rx="14"
            :fill="hotspotFill('activation')"
            :stroke="hotspotStroke('activation')"
            stroke-width="2.2"
          />
          <text x="395" y="127" text-anchor="middle" class="svg-symbol">f(Σ)</text>
          <text x="395" y="147" text-anchor="middle" class="svg-mini">Filtro / Umbral</text>
          <text x="395" y="232" text-anchor="middle" class="svg-caption">
            {{ solvedIds.includes('activation') ? 'Activación ✓' : 'Zona D' }}
          </text>
        </g>

        <!-- 5. Salida -->
        <g
          class="hotspot"
          role="button"
          tabindex="0"
          aria-label="Seleccionar zona derecha (Salida)"
          @click="selectPart('output')"
          @keydown.enter.prevent="selectPart('output')"
        >
          <rect
            x="515"
            y="88"
            width="106"
            height="74"
            rx="14"
            :fill="hotspotFill('output')"
            :stroke="hotspotStroke('output')"
            stroke-width="2.2"
          />
          <text x="568" y="122" text-anchor="middle" class="svg-symbol">y</text>
          <text x="568" y="142" text-anchor="middle" class="svg-mini">Resultado</text>
          <text x="568" y="232" text-anchor="middle" class="svg-caption">
            {{ solvedIds.includes('output') ? 'Salida ✓' : 'Zona E' }}
          </text>
        </g>
      </svg>
    </div>

    <div
      v-if="lastFeedback"
      class="anatomy__feedback"
      :class="lastFeedback.ok ? 'anatomy__feedback--ok' : 'anatomy__feedback--err'"
      aria-live="polite"
    >
      <AppIcon :name="lastFeedback.ok ? 'check-circle' : 'alert-circle'" :size="19" />
      <div>
        <p>{{ lastFeedback.message }}</p>
        <p v-if="lastFeedback.analogy" class="anatomy__analogy">
          <strong>Analogía:</strong> {{ lastFeedback.analogy }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.anatomy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.anatomy__prompt,
.anatomy__done {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.anatomy__prompt-text {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

.anatomy__canvas {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  overflow-x: auto;
}

.anatomy__svg {
  width: 100%;
  min-width: 520px;
  height: auto;
}

.hotspot {
  cursor: pointer;
}

.hotspot:hover rect {
  fill: #eef2ff;
}

.svg-num {
  font-size: 12px;
  font-weight: 700;
  fill: #334155;
}

.svg-symbol {
  font-size: 14px;
  font-weight: 800;
  fill: #0f172a;
}

.svg-mini {
  font-size: 10.5px;
  fill: #64748b;
}

.svg-caption {
  font-size: 11.5px;
  font-weight: 700;
  fill: #334155;
}

.anatomy__feedback {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.885rem;
}

.anatomy__feedback--ok {
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
  color: var(--color-text);
}

.anatomy__feedback--err {
  background-color: var(--color-error-soft);
  border: 1px solid var(--color-error-border);
  color: var(--color-text);
}

.anatomy__analogy {
  margin-top: 0.25rem;
  color: var(--color-text-secondary);
}
</style>
