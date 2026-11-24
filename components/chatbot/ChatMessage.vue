<script setup lang="ts">
import type { ChatMessageItem } from '~/types/chatbot'

const props = defineProps<{
  message: ChatMessageItem
}>()

const paragraphs = computed(() =>
  props.message.text
    .split('\n\n')
    .map((segment) => segment.trim())
    .filter(Boolean)
)
</script>

<template>
  <div
    class="msg-row"
    :class="message.sender === 'student' ? 'msg-row--student' : 'msg-row--tutor'"
  >
    <div v-if="message.sender === 'tutor'" class="msg-avatar" aria-hidden="true">
      <AppIcon name="brain" :size="16" />
    </div>

    <div
      class="msg-bubble"
      :class="[
        message.sender === 'student' ? 'msg-bubble--student' : 'msg-bubble--tutor',
        { 'msg-bubble--fallback': message.isFallback }
      ]"
    >
      <div class="msg-meta">
        <strong>{{ message.sender === 'tutor' ? 'Tutor RNA' : 'Tú' }}</strong>
        <span>{{ message.timestamp }}</span>
      </div>

      <div class="msg-text">
        <p v-for="(paragraph, idx) in paragraphs" :key="idx">{{ paragraph }}</p>
      </div>

      <div v-if="message.relatedLinks?.length" class="msg-links">
        <NuxtLink
          v-for="link in message.relatedLinks"
          :key="link.to + link.label"
          :to="link.to"
          class="msg-link-chip"
        >
          <AppIcon name="book" :size="13" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.msg-row--student {
  justify-content: flex-end;
}

.msg-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.msg-bubble {
  max-width: min(82%, 560px);
  padding: 0.9rem 1.05rem;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.msg-bubble--tutor {
  background-color: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  border-top-left-radius: 4px;
  color: var(--color-text);
}

.msg-bubble--fallback {
  background-color: var(--color-warning-soft);
  border-color: var(--color-warning-border);
}

.msg-bubble--student {
  background-color: var(--color-primary);
  color: #ffffff;
  border-top-right-radius: 4px;
}

.msg-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.75rem;
  opacity: 0.8;
}

.msg-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.925rem;
  line-height: 1.55;
}

.msg-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding-top: 0.35rem;
}

.msg-link-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-pill);
  background-color: var(--color-surface);
  border: 1px solid var(--color-primary-border);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 600;
  transition: background-color var(--transition-fast);
}

.msg-link-chip:hover {
  background-color: var(--color-primary-soft);
}

@media (max-width: 600px) {
  .msg-bubble {
    max-width: 90%;
  }
}
</style>
