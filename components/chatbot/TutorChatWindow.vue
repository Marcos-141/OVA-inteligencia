<script setup lang="ts">
const { messages, isResponding, suggestedQuestions, sendMessage, resetConversation } = useChatbot()

const draft = ref('')
const feedRef = ref<HTMLElement | null>(null)

function handleSubmit() {
  if (!draft.value.trim() || isResponding.value) return
  sendMessage(draft.value)
  draft.value = ''
}

function handleSuggestion(question: string) {
  sendMessage(question)
}

watch(
  [() => messages.value.length, isResponding],
  async () => {
    await nextTick()
    if (feedRef.value) {
      feedRef.value.scrollTop = feedRef.value.scrollHeight
    }
  }
)
</script>

<template>
  <BaseCard padding="sm" class="chat-window">
    <div class="chat-header">
      <div class="chat-header__identity">
        <span class="chat-header__icon">
          <AppIcon name="brain" :size="20" />
        </span>
        <div>
          <h2 class="chat-header__title">Tutor RNA</h2>
          <p class="chat-header__sub">Guía educativa local · Respuestas para principiantes</p>
        </div>
      </div>

      <BaseButton variant="secondary" size="sm" @click="resetConversation">
        <AppIcon name="refresh" :size="14" />
        Nueva conversación
      </BaseButton>
    </div>

    <div ref="feedRef" class="chat-feed" role="log" aria-live="polite" aria-label="Conversación con Tutor RNA">
      <ChatMessage v-for="msg in messages" :key="msg.id" :message="msg" />

      <div v-if="isResponding" class="typing-indicator" aria-label="Tutor RNA está preparando su respuesta">
        <span class="typing-dot" />
        <span class="typing-dot" />
        <span class="typing-dot" />
        <span class="typing-text">Tutor RNA está buscando en la guía...</span>
      </div>
    </div>

    <div class="chat-suggestions">
      <SuggestedQuestions
        :questions="suggestedQuestions"
        :disabled="isResponding"
        @select="handleSuggestion"
      />
    </div>

    <form class="chat-form" @submit.prevent="handleSubmit">
      <label for="tutor-input" class="sr-only">Escribe tu pregunta para Tutor RNA</label>
      <input
        id="tutor-input"
        v-model="draft"
        type="text"
        class="chat-input"
        placeholder="Escribe tu duda (ej. ¿qué es el sesgo? o ¿cómo aprende una RNA?)"
        autocomplete="off"
        :disabled="isResponding"
      />
      <BaseButton
        type="submit"
        variant="primary"
        size="md"
        :disabled="!draft.trim() || isResponding"
      >
        <AppIcon name="send" :size="16" />
        Enviar
      </BaseButton>
    </form>
  </BaseCard>
</template>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.chat-header__identity {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.chat-header__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.chat-header__title {
  font-size: 1.05rem;
  font-weight: 700;
}

.chat-header__sub {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.chat-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  height: 440px;
  overflow-y: auto;
  background-color: var(--color-surface);
}

.typing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-pill);
  background-color: var(--color-surface-subtle);
  align-self: flex-start;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-primary);
  animation: pulseDot 1s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 150ms;
}

.typing-dot:nth-child(3) {
  animation-delay: 300ms;
}

.typing-text {
  margin-left: 0.35rem;
}

@keyframes pulseDot {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: scale(0.85);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
}

.chat-suggestions {
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background-color: #fbfcfe;
}

.chat-form {
  display: flex;
  gap: 0.6rem;
  padding: 0.95rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.chat-input {
  flex: 1;
  min-width: 0;
  padding: 0.6875rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 0.9375rem;
}

.chat-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.14);
}

@media (max-width: 600px) {
  .chat-feed {
    height: 360px;
    padding: 1rem;
  }

  .chat-form {
    padding: 0.85rem;
  }
}
</style>
