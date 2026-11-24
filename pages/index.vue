<script setup lang="ts">
import { LEARNING_LEVELS } from '~/data/learning-path'

useHead({
  title: 'OVA: Redes Neuronales Artificiales desde cero'
})

const {
  completedLessonsCount,
  totalLessonsCount,
  overallProgressPercent,
  nextRecommendedLesson,
  getLevelProgress,
  isLevelUnlocked
} = useProgress()

const learningObjectives = [
  {
    icon: 'lightbulb' as const,
    title: 'Desde cero, sin requisitos',
    description:
      'No necesitas saber programación ni matemáticas avanzadas. Cada tema comienza con una comparación de la vida cotidiana.'
  },
  {
    icon: 'layers' as const,
    title: 'Dificultad progresiva en 5 niveles',
    description:
      'Construimos el conocimiento paso a paso: idea general, piezas internas, aprendizaje, arquitecturas y aplicaciones reales.'
  },
  {
    icon: 'sliders' as const,
    title: 'Recursos visuales e interactivos',
    description:
      'Experimenta con una neurona artificial, observa cómo viaja la información y comprueba lo aprendido con retroalimentación inmediata.'
  },
  {
    icon: 'chat' as const,
    title: 'Acompañamiento con Tutor RNA',
    description:
      'Resuelve tus dudas en cualquier momento mediante un chatbot educativo integrado con explicaciones claras para principiantes.'
  }
]
</script>

<template>
  <div class="fade-in">
    <!-- Hero principal -->
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__content">
          <BaseBadge tone="primary">Objeto Virtual de Aprendizaje · 100% interactivo</BaseBadge>

          <h1 class="hero__title">
            Comprende las Redes Neuronales Artificiales paso a paso, sin conocimientos previos.
          </h1>

          <p class="hero__subtitle">
            Descubre con ejemplos cotidianos y simulaciones visuales qué son las redes neuronales,
            cómo procesan información, cómo aprenden de sus errores y por qué impulsan herramientas
            que usas todos los días.
          </p>

          <div class="hero__actions">
            <ClientOnly>
              <BaseButton
                :to="
                  nextRecommendedLesson
                    ? `/lessons/${nextRecommendedLesson.slug}`
                    : '/learning'
                "
                variant="primary"
                size="lg"
              >
                {{
                  completedLessonsCount > 0 ? 'Continuar aprendiendo' : 'Comenzar desde el Nivel 1'
                }}
                <AppIcon name="arrow-right" :size="18" />
              </BaseButton>
              <template #fallback>
                <BaseButton to="/learning" variant="primary" size="lg">
                  Comenzar desde el Nivel 1
                  <AppIcon name="arrow-right" :size="18" />
                </BaseButton>
              </template>
            </ClientOnly>

            <BaseButton to="/tutor" variant="secondary" size="lg">
              <AppIcon name="chat" :size="18" />
              Preguntar a Tutor RNA
            </BaseButton>
          </div>

          <ClientOnly>
            <div v-if="completedLessonsCount > 0" class="hero__progress-card">
              <ProgressBar
                :value="overallProgressPercent"
                :label="`Tu progreso actual: ${completedLessonsCount} de ${totalLessonsCount} lecciones completadas`"
                :tone="overallProgressPercent === 100 ? 'success' : 'primary'"
              />
            </div>
          </ClientOnly>
        </div>

        <!-- Ilustración conceptual limpia en SVG -->
        <div class="hero__visual" aria-hidden="true">
          <BaseCard padding="lg" class="hero-diagram">
            <div class="hero-diagram__header">
              <span class="hero-diagram__caption">Cómo fluye una idea en una red neuronal</span>
              <BaseBadge tone="neutral">3 etapas</BaseBadge>
            </div>

            <svg viewBox="0 0 380 230" class="hero-svg">
              <!-- Conexiones Entrada -> Oculta -->
              <g stroke="#cbd5e1" stroke-width="1.8">
                <line x1="72" y1="55" x2="190" y2="42" />
                <line x1="72" y1="55" x2="190" y2="108" />
                <line x1="72" y1="55" x2="190" y2="174" />
                <line x1="72" y1="115" x2="190" y2="42" />
                <line x1="72" y1="115" x2="190" y2="108" stroke="#3b5bdb" stroke-width="2.4" />
                <line x1="72" y1="115" x2="190" y2="174" />
                <line x1="72" y1="175" x2="190" y2="42" />
                <line x1="72" y1="175" x2="190" y2="108" />
                <line x1="72" y1="175" x2="190" y2="174" stroke="#3b5bdb" stroke-width="2.2" />
              </g>

              <!-- Conexiones Oculta -> Salida -->
              <g stroke="#cbd5e1" stroke-width="1.8">
                <line x1="190" y1="42" x2="308" y2="108" />
                <line x1="190" y1="108" x2="308" y2="108" stroke="#0f9d7a" stroke-width="2.6" />
                <line x1="190" y1="174" x2="308" y2="108" stroke="#0f9d7a" stroke-width="2" />
              </g>

              <!-- Capa de entrada -->
              <g>
                <circle cx="72" cy="55" r="16" fill="#eef2ff" stroke="#3b5bdb" stroke-width="2" />
                <circle cx="72" cy="115" r="16" fill="#eef2ff" stroke="#3b5bdb" stroke-width="2" />
                <circle cx="72" cy="175" r="16" fill="#eef2ff" stroke="#3b5bdb" stroke-width="2" />
                <text x="72" y="214" text-anchor="middle" class="svg-label">Entradas</text>
              </g>

              <!-- Capa oculta -->
              <g>
                <circle cx="190" cy="42" r="16" fill="#ffffff" stroke="#64748b" stroke-width="2" />
                <circle cx="190" cy="108" r="17" fill="#3b5bdb" stroke="#2f49b8" stroke-width="2" />
                <circle cx="190" cy="174" r="16" fill="#eef2ff" stroke="#3b5bdb" stroke-width="2" />
                <text x="190" y="214" text-anchor="middle" class="svg-label">Procesamiento</text>
              </g>

              <!-- Capa de salida -->
              <g>
                <circle cx="308" cy="108" r="20" fill="#ecfdf5" stroke="#0f9d7a" stroke-width="2.5" />
                <polyline
                  points="300,108 306,114 317,102"
                  fill="none"
                  stroke="#0f9d7a"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <text x="308" y="214" text-anchor="middle" class="svg-label">Respuesta</text>
              </g>
            </svg>

            <div class="hero-diagram__legend">
              <span><strong>1.</strong> Recibe pistas</span>
              <span><strong>2.</strong> Pondera importancia</span>
              <span><strong>3.</strong> Emite salida</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Objetivos y metodología -->
    <section class="page-section home-band">
      <div class="container">
        <div class="section-header">
          <span class="section-kicker">Cómo aprenderás aquí</span>
          <h2 class="section-title">Diseñado para entender de verdad, no para memorizar</h2>
          <p class="section-subtitle">
            Cada lección sigue una estructura clara: explicación sencilla, ejemplo cotidiano,
            desarrollo progresivo, práctica visual y comprobación inmediata.
          </p>
        </div>

        <div class="objectives-grid">
          <BaseCard v-for="item in learningObjectives" :key="item.title" padding="md">
            <div class="objective-item">
              <span class="objective-item__icon">
                <AppIcon :name="item.icon" :size="20" />
              </span>
              <h3 class="objective-item__title">{{ item.title }}</h3>
              <p class="objective-item__desc">{{ item.description }}</p>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Vista previa de la ruta de aprendizaje -->
    <section class="page-section">
      <div class="container">
        <div class="section-row-head">
          <div class="section-header" style="margin-bottom: 0">
            <span class="section-kicker">5 niveles progresivos</span>
            <h2 class="section-title">Tu ruta de aprendizaje</h2>
            <p class="section-subtitle">
              Avanza a tu ritmo. Cada nivel desbloquea nuevas ideas sobre la base del nivel anterior.
            </p>
          </div>
          <BaseButton to="/learning" variant="secondary">
            Ver ruta detallada
            <AppIcon name="arrow-right" :size="16" />
          </BaseButton>
        </div>

        <ClientOnly>
          <div class="levels-preview-grid">
            <BaseCard
              v-for="level in LEARNING_LEVELS"
              :key="level.id"
              padding="md"
              interactive
              class="preview-level"
            >
              <div class="preview-level__head">
                <BaseBadge :tone="getLevelProgress(level.id).isCompleted ? 'success' : 'primary'">
                  {{ level.code }}
                </BaseBadge>
                <span class="preview-level__diff">{{ level.difficultyLabel }}</span>
              </div>
              <h3 class="preview-level__title">{{ level.title }}</h3>
              <p class="preview-level__desc">{{ level.description }}</p>
              <div class="preview-level__footer">
                <ProgressBar
                  :value="getLevelProgress(level.id).percentage"
                  height="sm"
                  :show-percent="false"
                  :tone="getLevelProgress(level.id).isCompleted ? 'success' : 'primary'"
                />
                <NuxtLink
                  :to="
                    isLevelUnlocked(level.id)
                      ? `/lessons/${level.lessonSlugs[0]}`
                      : '/learning'
                  "
                  class="preview-level__link"
                >
                  {{
                    getLevelProgress(level.id).isCompleted
                      ? 'Repasar nivel'
                      : isLevelUnlocked(level.id)
                        ? 'Explorar nivel'
                        : 'Ver requisitos'
                  }}
                  <AppIcon name="arrow-right" :size="15" />
                </NuxtLink>
              </div>
            </BaseCard>
          </div>
          <template #fallback>
            <div class="levels-preview-grid">
              <BaseCard v-for="level in LEARNING_LEVELS" :key="level.id" padding="md">
                <BaseBadge tone="primary">{{ level.code }}</BaseBadge>
                <h3 class="preview-level__title" style="margin-top: 0.75rem">{{ level.title }}</h3>
                <p class="preview-level__desc">{{ level.description }}</p>
              </BaseCard>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- Accesos rápidos a módulos complementarios -->
    <section class="page-section home-band">
      <div class="container">
        <div class="quick-access-grid">
          <BaseCard padding="lg" interactive class="quick-card">
            <span class="quick-card__icon">
              <AppIcon name="sliders" :size="22" />
            </span>
            <h3>Actividades interactivas</h3>
            <p>
              Identifica componentes de una neurona, asocia conceptos cotidianos y resuelve ejercicios
              con retroalimentación inmediata.
            </p>
            <BaseButton to="/activities" variant="secondary" size="sm">
              Ir a Actividades
              <AppIcon name="arrow-right" :size="16" />
            </BaseButton>
          </BaseCard>

          <BaseCard padding="lg" interactive class="quick-card">
            <span class="quick-card__icon">
              <AppIcon name="chat" :size="22" />
            </span>
            <h3>Tutor RNA</h3>
            <p>
              ¿Tienes una duda puntual sobre pesos, sesgo o retropropagación? Consulta al chatbot
              educativo integrado en lenguaje sencillo.
            </p>
            <BaseButton to="/tutor" variant="secondary" size="sm">
              Abrir Tutor RNA
              <AppIcon name="arrow-right" :size="16" />
            </BaseButton>
          </BaseCard>

          <BaseCard padding="lg" interactive class="quick-card">
            <span class="quick-card__icon quick-card__icon--success">
              <AppIcon name="award" :size="22" />
            </span>
            <h3>Evaluación final</h3>
            <p>
              Pon a prueba todo lo que aprendiste en los 5 niveles, obtén tu calificación y revisa
              una explicación detallada de cada respuesta.
            </p>
            <BaseButton to="/evaluation" variant="secondary" size="sm">
              Ir a Evaluación
              <AppIcon name="arrow-right" :size="16" />
            </BaseButton>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 3.25rem 0 3rem;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2.5rem;
  align-items: center;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.15rem;
}

.hero__title {
  font-size: clamp(1.9rem, 3.6vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
}

.hero__subtitle {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 58ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.hero__progress-card {
  width: 100%;
  max-width: 500px;
  padding: 0.9rem 1.1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-top: 0.25rem;
}

.hero-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-diagram__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.hero-diagram__caption {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.hero-svg {
  width: 100%;
  height: auto;
}

.svg-label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  fill: #475569;
}

.hero-diagram__legend {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  flex-wrap: wrap;
}

.home-band {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.objectives-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.15rem;
}

.objective-item {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.objective-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
}

.objective-item__title {
  font-size: 1.02rem;
  font-weight: 700;
}

.objective-item__desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.section-row-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.levels-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.15rem;
}

.preview-level {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.preview-level__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-level__diff {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.preview-level__title {
  font-size: 1.08rem;
  font-weight: 700;
}

.preview-level__desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  flex: 1;
}

.preview-level__footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.preview-level__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
}

.preview-level__link:hover {
  text-decoration: underline;
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.quick-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.quick-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
}

.quick-card__icon--success {
  background-color: var(--color-success-soft);
  color: var(--color-success);
}

.quick-card h3 {
  font-size: 1.12rem;
}

.quick-card p {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  flex: 1;
}

@media (max-width: 960px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .objectives-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quick-access-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 2rem 0;
  }

  .objectives-grid {
    grid-template-columns: 1fr;
  }
}
</style>
