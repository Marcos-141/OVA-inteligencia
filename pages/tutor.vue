<script setup lang="ts">
useHead({
  title: 'Tutor RNA · Chatbot educativo · OVA RNA'
})

const { faqEntries, sendMessage, isResponding } = useChatbot()

function askFaq(question: string) {
  sendMessage(question)
}
</script>

<template>
  <div class="container page-section fade-in">
    <Breadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Tutor RNA' }]" />

    <header class="section-header">
      <span class="section-kicker">Acompañamiento para principiantes</span>
      <h1 class="section-title">Tutor RNA</h1>
      <p class="section-subtitle">
        Consulta dudas generales sobre las lecciones del OVA en lenguaje sencillo. Este tutor
        funciona completamente en tu navegador con respuestas educativas preparadas localmente, sin
        conectarse a servidores ni servicios externos.
      </p>
    </header>

    <div class="tutor-layout">
      <section class="tutor-main">
        <TutorChatWindow />
      </section>

      <aside class="tutor-sidebar" aria-label="Preguntas frecuentes del OVA">
        <BaseCard padding="md" class="faq-card">
          <h2 class="faq-card__title">Preguntas frecuentes</h2>
          <p class="faq-card__subtitle">
            Haz clic en cualquier pregunta para consultarla al instante con Tutor RNA.
          </p>

          <div class="faq-list">
            <button
              v-for="entry in faqEntries"
              :key="entry.id"
              type="button"
              class="faq-item"
              :disabled="isResponding"
              @click="askFaq(entry.questionExample)"
            >
              <span class="faq-item__cat">{{ entry.category }}</span>
              <span class="faq-item__q">{{ entry.questionExample }}</span>
            </button>
          </div>
        </BaseCard>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.tutor-layout {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 1.5rem;
  align-items: start;
}

.faq-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.faq-card__title {
  font-size: 1.08rem;
}

.faq-card__subtitle {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-height: 520px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.faq-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  text-align: left;
  padding: 0.7rem 0.8rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  transition: all var(--transition-fast);
}

.faq-item:hover:not(:disabled) {
  border-color: var(--color-primary-border);
  background-color: var(--color-primary-soft);
}

.faq-item__cat {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.faq-item__q {
  font-size: 0.85rem;
  color: var(--color-text);
  font-weight: 500;
  line-height: 1.35;
}

@media (max-width: 960px) {
  .tutor-layout {
    grid-template-columns: 1fr;
  }

  .faq-list {
    max-height: none;
  }
}
</style>
