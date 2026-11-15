<script setup lang="ts">
import type { TimelineIcon } from '../../data/wedding'

defineProps<{ name: TimelineIcon }>()
</script>

<template>
  <svg
    class="t-icon"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'guests'">
      <circle cx="11" cy="10" r="4" />
      <path d="M3 26c0-5 3.6-8 8-8s8 3 8 8" />
      <circle cx="22" cy="11" r="3.2" />
      <path d="M20 18.5c.7-.3 1.4-.5 2-.5 3.6 0 7 2.6 7 7" />
    </template>
    <template v-else-if="name === 'rings'">
      <circle cx="12" cy="19" r="7" />
      <circle cx="20" cy="19" r="7" />
      <path d="M13 8l3-4 3 4-3 3z" />
    </template>
    <template v-else-if="name === 'camera'">
      <rect x="4" y="9" width="24" height="17" rx="3" />
      <path d="M11 9l2-3h6l2 3" />
      <circle cx="16" cy="17.5" r="5" />
      <circle cx="24" cy="13" r=".6" fill="currentColor" />
    </template>
    <template v-else-if="name === 'dinner'">
      <path d="M8 4h7l-1 8a2.5 2.5 0 0 1-5 0z" transform="rotate(-12 11 10)" />
      <path d="M17 4h7l-1 8a2.5 2.5 0 0 1-5 0z" transform="rotate(12 21 10)" />
      <path d="M10.5 15.5L9 26M7 26h5M21.5 15.5L23 26M20 26h5" />
      <path d="M16 2v3M13 3l1 2M19 3l-1 2" />
    </template>
    <template v-else-if="name === 'cake'">
      <rect x="6" y="18" width="20" height="9" rx="1.5" />
      <rect x="9" y="11" width="14" height="7" rx="1.5" />
      <path d="M16 11V7M16 4.5c1 1 1 2 0 2.5-1-.5-1-1.5 0-2.5z" />
      <path d="M6 22c2 1.5 4 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1 1.5 3 1.5 5 0" />
    </template>
    <template v-else>
      <path d="M16 3l2.2 6.8L25 12l-6.8 2.2L16 21l-2.2-6.8L7 12l6.8-2.2z" />
      <path d="M25 20l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
      <path d="M7 21l.8 2.2L10 24l-2.2.8L7 27l-.8-2.2L4 24l2.2-.8z" />
    </template>
  </svg>
</template>
