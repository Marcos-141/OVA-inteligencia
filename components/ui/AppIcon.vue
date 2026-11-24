<script setup lang="ts">
export type IconName =
  | 'brain'
  | 'book'
  | 'compass'
  | 'check'
  | 'check-circle'
  | 'alert-circle'
  | 'lock'
  | 'play'
  | 'arrow-right'
  | 'arrow-left'
  | 'chat'
  | 'layers'
  | 'award'
  | 'menu'
  | 'close'
  | 'refresh'
  | 'lightbulb'
  | 'sliders'
  | 'send'
  | 'sparkles'
  | 'info'
  | 'chevron-down'

withDefaults(
  defineProps<{
    name: IconName
    size?: number
  }>(),
  {
    size: 20
  }
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.9"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="app-icon"
  >
    <template v-if="name === 'brain'">
      <path d="M9.5 3A3.5 3.5 0 0 0 6 6.5c0 .4.07.78.2 1.13A3.5 3.5 0 0 0 4 10.8c0 1.24.64 2.33 1.6 2.95A3.5 3.5 0 0 0 8.5 19.5c.6 0 1.16-.15 1.65-.41" />
      <path d="M14.5 3A3.5 3.5 0 0 1 18 6.5c0 .4-.07.78-.2 1.13A3.5 3.5 0 0 1 20 10.8c0 1.24-.64 2.33-1.6 2.95a3.5 3.5 0 0 1-2.9 5.75c-.6 0-1.16-.15-1.65-.41" />
      <path d="M12 4v16" />
      <path d="M8.5 8.5h3.5" />
      <path d="M12 13.5h3.5" />
    </template>

    <template v-else-if="name === 'book'">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </template>

    <template v-else-if="name === 'compass'">
      <circle cx="12" cy="12" r="9.5" />
      <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" />
    </template>

    <template v-else-if="name === 'check'">
      <polyline points="20 6 9 17 4 12" />
    </template>

    <template v-else-if="name === 'check-circle'">
      <circle cx="12" cy="12" r="9.5" />
      <polyline points="8.5 12.5 11 15 16 9.5" />
    </template>

    <template v-else-if="name === 'alert-circle'">
      <circle cx="12" cy="12" r="9.5" />
      <line x1="12" y1="8" x2="12" y2="12.5" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" />
    </template>

    <template v-else-if="name === 'lock'">
      <rect x="4.5" y="11" width="15" height="9.5" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </template>

    <template v-else-if="name === 'play'">
      <polygon points="7 5 19 12 7 19 7 5" />
    </template>

    <template v-else-if="name === 'arrow-right'">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </template>

    <template v-else-if="name === 'arrow-left'">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 6 5 12 11 18" />
    </template>

    <template v-else-if="name === 'chat'">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </template>

    <template v-else-if="name === 'layers'">
      <polygon points="12 3 2 8 12 13 22 8 12 3" />
      <polyline points="2 12.5 12 17.5 22 12.5" />
      <polyline points="2 17 12 22 22 17" />
    </template>

    <template v-else-if="name === 'award'">
      <circle cx="12" cy="8.5" r="5.5" />
      <polyline points="8.5 13 7 21 12 18.5 17 21 15.5 13" />
    </template>

    <template v-else-if="name === 'menu'">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </template>

    <template v-else-if="name === 'close'">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </template>

    <template v-else-if="name === 'refresh'">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </template>

    <template v-else-if="name === 'lightbulb'">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.8 10.65c.65.54 1.15 1.38 1.3 2.35h5c.15-.97.65-1.81 1.3-2.35A6 6 0 0 0 12 3z" />
    </template>

    <template v-else-if="name === 'sliders'">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="2" y1="14" x2="6" y2="14" />
      <line x1="10" y1="8" x2="14" y2="8" />
      <line x1="18" y1="16" x2="22" y2="16" />
    </template>

    <template v-else-if="name === 'send'">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </template>

    <template v-else-if="name === 'sparkles'">
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </template>

    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="9.5" />
      <line x1="12" y1="16" x2="12" y2="11.5" />
      <circle cx="12" cy="8.5" r="0.6" fill="currentColor" />
    </template>

    <template v-else-if="name === 'chevron-down'">
      <polyline points="6 9 12 15 18 9" />
    </template>
  </svg>
</template>

<style scoped>
.app-icon {
  flex-shrink: 0;
}
</style>
