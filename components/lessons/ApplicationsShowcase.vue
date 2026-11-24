<script setup lang="ts">
interface AppDomain {
  id: string
  title: string
  input: string
  process: string
  output: string
  everydayUse: string
}

const domains: AppDomain[] = [
  {
    id: 'images',
    title: 'Reconocimiento de imágenes',
    input: 'Miles de puntos de color y brillo (píxeles) que forman una fotografía.',
    process: 'Las primeras capas detectan bordes; las intermedias formas; las finales reconocen objetos completos.',
    output: 'Identificación de objetos, rostros o señales (por ejemplo: "Paso peatonal detectado").',
    everydayUse: 'Buscar "playa" en tu galería de fotos o desbloquear tu teléfono con el rostro.'
  },
  {
    id: 'voice',
    title: 'Reconocimiento de voz',
    input: 'Ondas de sonido divididas en pequeños fragmentos de tiempo y frecuencia.',
    process: 'La red distingue sílabas y palabras aunque cambie la velocidad, el acento o el ruido de fondo.',
    output: 'Texto transcrito o activación de un comando hablado.',
    everydayUse: 'Dictar un mensaje en el celular o activar subtítulos automáticos en un video.'
  },
  {
    id: 'recommendations',
    title: 'Sistemas de recomendación',
    input: 'Historial de películas, canciones o artículos que te gustaron y cuánto tiempo los viste.',
    process: 'Encuentra relaciones sutiles entre tus gustos y los patrones de millones de contenidos.',
    output: 'Lista ordenada de sugerencias personalizadas para ti.',
    everydayUse: 'Descubrir una nueva banda musical o una serie que encaja con lo que sueles ver.'
  },
  {
    id: 'language',
    title: 'Procesamiento del lenguaje',
    input: 'Palabras y frases convertidas en representaciones numéricas que capturan su contexto.',
    process: 'Analiza cómo se relacionan unas palabras con otras dentro de la oración completa.',
    output: 'Traducciones fluidas, resúmenes o correcciones ortográficas según el sentido.',
    everydayUse: 'Traducir un menú en otro idioma o recibir sugerencias al redactar un correo.'
  }
]

const activeId = ref<string>(domains[0]?.id ?? 'images')
const active = computed(() => domains.find((d) => d.id === activeId.value) ?? domains[0]!)
</script>

<template>
  <div class="apps-showcase">
    <div class="apps-showcase__tabs" role="tablist" aria-label="Aplicaciones cotidianas de RNA">
      <button
        v-for="domain in domains"
        :key="domain.id"
        type="button"
        role="tab"
        :aria-selected="activeId === domain.id"
        class="apps-tab"
        :class="{ 'apps-tab--active': activeId === domain.id }"
        @click="activeId = domain.id"
      >
        {{ domain.title }}
      </button>
    </div>

    <div class="apps-flow">
      <div class="apps-step">
        <BaseBadge tone="neutral">1. Qué entra</BaseBadge>
        <p>{{ active.input }}</p>
      </div>
      <div class="apps-step apps-step--mid">
        <BaseBadge tone="primary">2. Qué descubre la red</BaseBadge>
        <p>{{ active.process }}</p>
      </div>
      <div class="apps-step apps-step--out">
        <BaseBadge tone="success">3. Qué entrega</BaseBadge>
        <p>{{ active.output }}</p>
      </div>
    </div>

    <div class="apps-everyday">
      <AppIcon name="sparkles" :size="17" />
      <span><strong>En tu día a día:</strong> {{ active.everydayUse }}</span>
    </div>
  </div>
</template>

<style scoped>
.apps-showcase {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.apps-showcase__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.apps-tab {
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.apps-tab--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.apps-flow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.apps-step {
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
}

.apps-step--mid {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary-border);
}

.apps-step--out {
  background-color: var(--color-success-soft);
  border-color: var(--color-success-border);
}

.apps-step p {
  font-size: 0.885rem;
  color: var(--color-text-secondary);
}

.apps-everyday {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  color: var(--color-text);
}

@media (max-width: 720px) {
  .apps-flow {
    grid-template-columns: 1fr;
  }
}
</style>
