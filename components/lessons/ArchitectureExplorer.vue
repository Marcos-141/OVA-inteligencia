<script setup lang="ts">
interface ArchitectureInfo {
  id: 'single' | 'multi' | 'deep'
  name: string
  hiddenLayers: number
  summary: string
  strength: string
  example: string
}

const architectures: ArchitectureInfo[] = [
  {
    id: 'single',
    name: 'Red de una capa',
    hiddenLayers: 0,
    summary: 'Conecta directamente las entradas con la salida, sin capas ocultas intermedias.',
    strength: 'Muy rápida, fácil de entrenar y transparente para decisiones directas.',
    example: 'Decidir con dos o tres pistas simples si un correo contiene palabras obvias de alerta.'
  },
  {
    id: 'multi',
    name: 'Red multicapa',
    hiddenLayers: 1,
    summary: 'Incluye una o dos capas ocultas que combinan pistas para resolver patrones más variados.',
    strength: 'Buen equilibrio entre capacidad y sencillez; útil para muchos problemas de datos tabulares.',
    example: 'Estimar el tiempo aproximado de un trayecto según hora, clima y día de la semana.'
  },
  {
    id: 'deep',
    name: 'Red neuronal profunda',
    hiddenLayers: 3,
    summary: 'Apila muchas capas ocultas donde cada nivel aprende conceptos más elaborados que el anterior.',
    strength: 'Sobresale con información compleja y rica en matices como fotos, voz y texto.',
    example: 'Traducir conversaciones en tiempo real o reconocer objetos dentro de una fotografía.'
  }
]

const selectedId = ref<'single' | 'multi' | 'deep'>('single')
const current = computed(
  () => architectures.find((arch) => arch.id === selectedId.value) ?? architectures[0]!
)

const columns = computed<number[]>(() => {
  if (selectedId.value === 'single') return [3, 1]
  if (selectedId.value === 'multi') return [3, 4, 1]
  return [3, 4, 4, 3, 1]
})

function nodeX(colIndex: number): number {
  const totalCols = columns.value.length
  const padding = 65
  const usable = 480 - padding * 2
  if (totalCols <= 1) return 240
  return padding + (usable / (totalCols - 1)) * colIndex
}

function nodeY(rowIndex: number, totalInCol: number): number {
  const center = 95
  const spacing = 38
  const start = center - ((totalInCol - 1) * spacing) / 2
  return start + rowIndex * spacing
}
</script>

<template>
  <div class="arch">
    <div class="arch__tabs" role="tablist" aria-label="Tipos de arquitectura de red neuronal">
      <button
        v-for="arch in architectures"
        :key="arch.id"
        type="button"
        role="tab"
        :aria-selected="selectedId === arch.id"
        class="arch__tab"
        :class="{ 'arch__tab--active': selectedId === arch.id }"
        @click="selectedId = arch.id"
      >
        {{ arch.name }}
      </button>
    </div>

    <div class="arch__grid">
      <div class="arch__canvas">
        <svg viewBox="0 0 480 190" class="arch__svg" role="img" :aria-label="current.name">
          <!-- Conexiones entre columnas consecutivas -->
          <g stroke="#cbd5e1" stroke-width="1.3">
            <template v-for="(count, colIdx) in columns" :key="`edge-col-${colIdx}`">
              <template v-if="colIdx < columns.length - 1">
                <template v-for="r1 in count" :key="`e-${colIdx}-${r1}`">
                  <line
                    v-for="r2 in columns[colIdx + 1]"
                    :key="`e-${colIdx}-${r1}-${r2}`"
                    :x1="nodeX(colIdx)"
                    :y1="nodeY(r1 - 1, count)"
                    :x2="nodeX(colIdx + 1)"
                    :y2="nodeY(r2 - 1, columns[colIdx + 1] ?? 1)"
                  />
                </template>
              </template>
            </template>
          </g>

          <!-- Nodos por columna -->
          <g v-for="(count, colIdx) in columns" :key="`node-col-${colIdx}`">
            <circle
              v-for="row in count"
              :key="`n-${colIdx}-${row}`"
              :cx="nodeX(colIdx)"
              :cy="nodeY(row - 1, count)"
              r="11"
              :fill="
                colIdx === 0
                  ? '#eef2ff'
                  : colIdx === columns.length - 1
                    ? '#ecfdf5'
                    : '#ffffff'
              "
              :stroke="
                colIdx === columns.length - 1
                  ? '#0f9d7a'
                  : '#3b5bdb'
              "
              stroke-width="2"
            />
          </g>

          <text :x="nodeX(0)" y="180" text-anchor="middle" class="arch-label">Entrada</text>
          <text
            v-if="columns.length > 2"
            x="240"
            y="180"
            text-anchor="middle"
            class="arch-label"
          >
            {{ current.hiddenLayers === 1 ? '1 capa oculta' : 'Múltiples capas ocultas' }}
          </text>
          <text :x="nodeX(columns.length - 1)" y="180" text-anchor="middle" class="arch-label">
            Salida
          </text>
        </svg>
      </div>

      <div class="arch__details">
        <h4>{{ current.name }}</h4>
        <p>{{ current.summary }}</p>
        <div class="arch__meta">
          <p><strong>Punto fuerte:</strong> {{ current.strength }}</p>
          <p><strong>Ejemplo práctico:</strong> {{ current.example }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arch {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.arch__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.arch__tab {
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.arch__tab--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.arch__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1rem;
  align-items: center;
}

.arch__canvas {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
}

.arch__svg {
  width: 100%;
  height: auto;
}

.arch-label {
  font-size: 11px;
  font-weight: 600;
  fill: #475569;
}

.arch__details {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.arch__details h4 {
  font-size: 1.05rem;
}

.arch__details p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.arch__meta {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

@media (max-width: 720px) {
  .arch__grid {
    grid-template-columns: 1fr;
  }
}
</style>
