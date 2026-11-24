<script setup lang="ts">
import { getLevelById } from '~/data/learning-path'
import { getAdjacentLessons, getLessonBySlug } from '~/data/lessons'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const lesson = computed(() => getLessonBySlug(slug.value))
const level = computed(() => (lesson.value ? getLevelById(lesson.value.levelId) : undefined))
const adjacent = computed(() => getAdjacentLessons(slug.value))

const {
  isLessonUnlocked,
  isLessonCompleted,
  markLessonVisited,
  setFreeExplorationMode
} = useProgress()

const unlocked = computed(() => (lesson.value ? isLessonUnlocked(lesson.value.slug) : false))
const completed = computed(() => (lesson.value ? isLessonCompleted(lesson.value.slug) : false))

useHead(() => ({
  title: lesson.value ? `${lesson.value.title} · OVA RNA` : 'Lección no encontrada · OVA RNA'
}))

watch(
  [lesson, unlocked],
  ([currentLesson, canAccess]) => {
    if (import.meta.client && currentLesson && canAccess) {
      markLessonVisited(currentLesson.slug)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="container page-section fade-in">
    <div v-if="!lesson" class="reading-container">
      <BaseCard padding="lg">
        <h1>Lección no encontrada</h1>
        <p style="margin: 0.75rem 0 1.25rem; color: var(--color-text-secondary)">
          La lección que buscas no existe o fue movida. Puedes regresar a la ruta de aprendizaje.
        </p>
        <BaseButton to="/learning" variant="primary">Ir a la Ruta de aprendizaje</BaseButton>
      </BaseCard>
    </div>

    <div v-else class="reading-container">
      <Breadcrumbs
        :items="[
          { label: 'Inicio', to: '/' },
          { label: 'Ruta de aprendizaje', to: '/learning' },
          { label: `${level?.code ?? ''} · ${lesson.title}` }
        ]"
      />

      <ClientOnly>
        <!-- Estado bloqueado si el estudiante entra por URL sin completar el nivel previo -->
        <BaseCard v-if="!unlocked" padding="lg" class="locked-card">
          <BaseBadge tone="warning">
            <AppIcon name="lock" :size="13" />
            Nivel {{ lesson.levelId }} bloqueado temporalmente
          </BaseBadge>
          <h1>{{ lesson.title }}</h1>
          <p class="locked-card__text">
            Esta lección forma parte del <strong>Nivel {{ lesson.levelId }}</strong>. Para aprovechar
            mejor la dificultad progresiva, te recomendamos completar primero las lecciones del
            <strong>Nivel {{ lesson.levelId - 1 }}</strong>.
          </p>
          <div class="locked-card__actions">
            <BaseButton to="/learning" variant="primary">Volver a la Ruta de aprendizaje</BaseButton>
            <BaseButton variant="secondary" @click="setFreeExplorationMode(true)">
              Activar modo exploración libre
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Contenido completo de la lección en 7 pasos pedagógicos -->
        <article v-else class="lesson-article">
          <!-- Cabecera de la lección -->
          <header class="lesson-header">
            <div class="lesson-header__meta">
              <BaseBadge tone="primary">
                {{ level?.code }} · Lección {{ lesson.levelId }}.{{ lesson.orderInLevel }}
              </BaseBadge>
              <BaseBadge tone="neutral">{{ lesson.estimatedMinutes }} min de lectura</BaseBadge>
              <BaseBadge v-if="completed" tone="success">
                <AppIcon name="check" :size="12" />
                Completada
              </BaseBadge>
            </div>

            <h1 class="lesson-header__title">{{ lesson.title }}</h1>
            <p class="lesson-header__subtitle">{{ lesson.subtitle }}</p>

            <div v-if="lesson.isReferenceContent" class="reference-note">
              <AppIcon name="info" :size="15" />
              <span>
                Contenido introductorio de referencia preparado en módulos de datos para facilitar su
                posterior sustitución por material académico oficial.
              </span>
            </div>
          </header>

          <!-- 1. Introducción al tema -->
          <section class="lesson-block">
            <span class="step-label">Paso 1 · Introducción</span>
            <p class="lead-paragraph">{{ lesson.introduction }}</p>
          </section>

          <!-- 2. Explicación sencilla -->
          <section class="lesson-block">
            <span class="step-label">Paso 2 · Explicación sencilla</span>
            <h2 class="block-heading">{{ lesson.simpleExplanation.heading }}</h2>
            <div class="paragraphs">
              <p v-for="paragraph in lesson.simpleExplanation.paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>

            <div v-if="lesson.simpleExplanation.keyTerms.length" class="terms-grid">
              <BaseCard
                v-for="item in lesson.simpleExplanation.keyTerms"
                :key="item.term"
                padding="sm"
                tone="subtle"
              >
                <p class="term-card__name">{{ item.term }}</p>
                <p class="term-card__def">{{ item.simpleDefinition }}</p>
              </BaseCard>
            </div>
          </section>

          <!-- 3. Ejemplo de la vida cotidiana -->
          <section class="lesson-block">
            <BaseCard padding="lg" tone="primary" class="example-card">
              <div class="example-card__head">
                <AppIcon name="lightbulb" :size="20" class="example-card__icon" />
                <span class="step-label" style="margin: 0">Paso 3 · Ejemplo de la vida cotidiana</span>
              </div>
              <h2 class="block-heading">{{ lesson.everydayExample.title }}</h2>
              <p class="example-card__text">{{ lesson.everydayExample.scenario }}</p>
              <p class="example-card__connection">
                <strong>¿Cómo se conecta con las RNA?</strong> {{ lesson.everydayExample.connection }}
              </p>
            </BaseCard>
          </section>

          <!-- 4. Desarrollo del concepto -->
          <section class="lesson-block">
            <span class="step-label">Paso 4 · Desarrollo del concepto</span>
            <h2 class="block-heading">{{ lesson.conceptDevelopment.heading }}</h2>

            <div class="concept-list">
              <BaseCard
                v-for="block in lesson.conceptDevelopment.blocks"
                :key="block.title"
                padding="md"
              >
                <h3 class="concept-item__title">{{ block.title }}</h3>
                <p class="concept-item__body">{{ block.body }}</p>
                <p v-if="block.highlight" class="concept-item__highlight">{{ block.highlight }}</p>
              </BaseCard>
            </div>

            <OptionalMathBox
              v-if="lesson.conceptDevelopment.optionalMath"
              :content="lesson.conceptDevelopment.optionalMath"
            />
          </section>

          <!-- 5. Recurso visual o interactivo -->
          <section v-if="lesson.interactiveResource" class="lesson-block">
            <BaseCard padding="lg" class="interactive-shell">
              <div class="interactive-shell__head">
                <span class="step-label" style="margin: 0">Paso 5 · Recurso visual e interactivo</span>
                <h2 class="block-heading">{{ lesson.interactiveResource.title }}</h2>
                <p class="interactive-shell__instruction">
                  {{ lesson.interactiveResource.instruction }}
                </p>
              </div>

              <BrainAnalogyDiagram
                v-if="lesson.interactiveResource.id === 'brain-analogy-diagram'"
              />
              <ParadigmComparator
                v-else-if="lesson.interactiveResource.id === 'paradigm-comparator'"
              />
              <NeuronSimulator
                v-else-if="lesson.interactiveResource.id === 'neuron-simulator'"
              />
              <NeuronAnatomyActivity
                v-else-if="lesson.interactiveResource.id === 'neuron-anatomy'"
                :save-progress="true"
              />
              <NetworkFlowVisualizer
                v-else-if="lesson.interactiveResource.id === 'network-flow'"
              />
              <ArchitectureExplorer
                v-else-if="lesson.interactiveResource.id === 'architecture-explorer'"
              />
              <ApplicationsShowcase
                v-else-if="lesson.interactiveResource.id === 'applications-showcase'"
              />
            </BaseCard>
          </section>

          <!-- 6. Resumen de lo aprendido -->
          <section class="lesson-block">
            <BaseCard padding="lg" tone="success" class="summary-card">
              <span class="step-label step-label--success">Paso 6 · Resumen de lo aprendido</span>
              <ul class="summary-list">
                <li v-for="point in lesson.summaryPoints" :key="point">
                  <AppIcon name="check-circle" :size="18" class="summary-list__icon" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </BaseCard>
          </section>

          <!-- 7. Actividad corta para comprobar la comprensión -->
          <section class="lesson-block">
            <LessonQuickCheck :lesson-slug="lesson.slug" :check="lesson.quickCheck" />
          </section>

          <!-- Acceso discreto a Tutor RNA -->
          <div class="tutor-nudge">
            <div class="tutor-nudge__left">
              <AppIcon name="chat" :size="20" class="tutor-nudge__icon" />
              <span>¿Te quedó alguna duda sobre esta lección? Puedes preguntarle al Tutor RNA.</span>
            </div>
            <BaseButton to="/tutor" variant="secondary" size="sm">Abrir Tutor RNA</BaseButton>
          </div>

          <!-- Navegación y marcado de finalización -->
          <LessonNavigation
            :current-lesson="lesson"
            :previous-lesson="adjacent.previous"
            :next-lesson="adjacent.next"
          />
        </article>

        <template #fallback>
          <BaseCard padding="lg">
            <p class="section-subtitle">Cargando contenido de la lección...</p>
          </BaseCard>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.locked-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.locked-card__text {
  color: var(--color-text-secondary);
}

.locked-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.lesson-article {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.lesson-header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.lesson-header__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.lesson-header__title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
}

.lesson-header__subtitle {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
}

.reference-note {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background-color: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  padding: 0.55rem 0.8rem;
  border-radius: var(--radius-sm);
}

.lesson-block {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.step-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-primary);
}

.step-label--success {
  color: var(--color-success);
}

.block-heading {
  font-size: 1.3rem;
  font-weight: 700;
}

.lead-paragraph {
  font-size: 1.05rem;
  color: var(--color-text);
  line-height: 1.7;
}

.paragraphs {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-top: 0.35rem;
}

.term-card__name {
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
  font-size: 0.925rem;
}

.term-card__def {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.example-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.example-card__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.example-card__icon {
  color: var(--color-primary);
}

.example-card__text {
  color: var(--color-text);
}

.example-card__connection {
  padding-top: 0.65rem;
  border-top: 1px solid var(--color-primary-border);
  font-size: 0.925rem;
  color: var(--color-text-secondary);
}

.concept-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.concept-item__title {
  font-size: 1.02rem;
  margin-bottom: 0.35rem;
}

.concept-item__body {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.concept-item__highlight {
  margin-top: 0.65rem;
  padding: 0.65rem 0.85rem;
  border-left: 3px solid var(--color-primary);
  background-color: var(--color-primary-soft);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.885rem;
  font-weight: 600;
  color: var(--color-text);
}

.interactive-shell {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  background-color: #fbfcfe;
}

.interactive-shell__head {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.interactive-shell__instruction {
  font-size: 0.925rem;
  color: var(--color-text-secondary);
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.summary-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.summary-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: var(--color-text);
}

.summary-list__icon {
  color: var(--color-success);
  margin-top: 3px;
}

.tutor-nudge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: 1px dashed var(--color-border-strong);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.tutor-nudge__left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.tutor-nudge__icon {
  color: var(--color-primary);
}
</style>
