<script setup lang="ts">
interface CaseStudy {
  id: string
  title: string
  traditional: {
    approach: string
    limitation: string
  }
  ml: {
    approach: string
    strength: string
  }
  recommendation: string
}

const cases: CaseStudy[] = [
  {
    id: 'spam',
    title: 'Filtrar correo basura (spam)',
    traditional: {
      approach: 'Escribir una lista fija de palabras prohibidas ("premio", "gratis", "urgente").',
      limitation: 'Si el correo cambia una letra ("pr3mio") o inventa un truco nuevo, la regla deja de funcionar.'
    },
    ml: {
      approach: 'Entrenar con miles de correos reales marcados como "Spam" y "Normal".',
      strength: 'Reconoce combinaciones sutiles de palabras, remitentes y patrones incluso en mensajes nuevos.'
    },
    recommendation: 'Ideal para aprendizaje automático.'
  },
  {
    id: 'pets',
    title: 'Reconocer si en una foto hay un perro',
    traditional: {
      approach: 'Intentar describir con reglas exactas la forma de las orejas, color y tamaño.',
      limitation: 'Existen cientos de razas, posturas y tipos de luz; escribir todas las reglas es casi imposible.'
    },
    ml: {
      approach: 'Mostrar miles de fotografías con perros y sin perros para que la red aprenda rasgos visuales.',
      strength: 'Generaliza a fotos nuevas en ángulos e iluminaciones que nunca había visto.'
    },
    recommendation: 'Ideal para redes neuronales.'
  },
  {
    id: 'discount',
    title: 'Calcular un 15% de descuento en una compra',
    traditional: {
      approach: 'Aplicar una única fórmula exacta: precio × 0,85.',
      limitation: 'Ninguna: la regla es clara, universal y nunca cambia.'
    },
    ml: {
      approach: 'Entrenar con ejemplos para aproximar el 15%.',
      strength: 'Innecesario: consumiría más trabajo y podría dar ligeras aproximaciones en vez del valor exacto.'
    },
    recommendation: 'Ideal para programación tradicional.'
  }
]

const selectedCaseId = ref<string>(cases[0]?.id ?? 'spam')
const currentCase = computed(() => cases.find((item) => item.id === selectedCaseId.value) ?? cases[0]!)
</script>

<template>
  <div class="comparator">
    <div class="comparator__tabs" role="tablist" aria-label="Casos cotidianos para comparar">
      <button
        v-for="item in cases"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="selectedCaseId === item.id"
        class="comparator__tab"
        :class="{ 'comparator__tab--active': selectedCaseId === item.id }"
        @click="selectedCaseId = item.id"
      >
        {{ item.title }}
      </button>
    </div>

    <div class="comparator__grid">
      <div class="approach-box">
        <BaseBadge tone="neutral">Programación tradicional</BaseBadge>
        <p class="approach-box__formula">Datos + Reglas manuales → Resultado</p>
        <p class="approach-box__text">{{ currentCase.traditional.approach }}</p>
        <p class="approach-box__note">
          <strong>Observación:</strong> {{ currentCase.traditional.limitation }}
        </p>
      </div>

      <div class="approach-box approach-box--ml">
        <BaseBadge tone="primary">Aprendizaje automático</BaseBadge>
        <p class="approach-box__formula">Datos + Ejemplos → Patrones aprendidos</p>
        <p class="approach-box__text">{{ currentCase.ml.approach }}</p>
        <p class="approach-box__note">
          <strong>Observación:</strong> {{ currentCase.ml.strength }}
        </p>
      </div>
    </div>

    <div class="comparator__verdict">
      <AppIcon name="lightbulb" :size="18" />
      <span><strong>Conclusión:</strong> {{ currentCase.recommendation }}</span>
    </div>
  </div>
</template>

<style scoped>
.comparator {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparator__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.comparator__tab {
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.comparator__tab--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.comparator__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.approach-box {
  padding: 1.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
}

.approach-box--ml {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary-border);
}

.approach-box__formula {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.approach-box__text {
  font-size: 0.9375rem;
  color: var(--color-text);
}

.approach-box__note {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.comparator__verdict {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-success-soft);
  border: 1px solid var(--color-success-border);
  color: var(--color-text);
  font-size: 0.9rem;
}

@media (max-width: 700px) {
  .comparator__grid {
    grid-template-columns: 1fr;
  }
}
</style>
