<script setup lang="ts">
import { computed } from 'vue'
import type { Particles } from '../../data/themes'

const props = defineProps<{ type: Particles }>()

// Deterministic pseudo-random so the layout doesn't jump between re-renders.
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const items = computed(() => {
  const count = props.type === 'stars' ? 40 : 16
  return Array.from({ length: count }, (_, i) => ({
    left: rand(i + 1) * 100,
    top: rand(i + 101) * 100,
    size: 0.6 + rand(i + 201) * 0.9,
    delay: -rand(i + 301) * 20,
    duration: 12 + rand(i + 401) * 14,
    drift: (rand(i + 501) - 0.5) * 160,
  }))
})
</script>

<template>
  <div v-if="type !== 'none'" class="particles" :class="`particles--${type}`" aria-hidden="true">
    <span
      v-for="(p, i) in items"
      :key="i"
      class="particle"
      :style="{
        left: p.left + '%',
        top: type === 'stars' ? p.top + '%' : undefined,
        '--s': p.size,
        '--drift': p.drift + 'px',
        animationDelay: p.delay + 's',
        animationDuration: (type === 'stars' ? p.duration / 4 : p.duration) + 's',
      }"
    >
      <svg v-if="type === 'hearts'" viewBox="0 0 40 36">
        <path d="M20 33 C6 23 2 16 2 10.5 C2 5 6 2 10.5 2 C14.5 2 18 4.5 20 8 C22 4.5 25.5 2 29.5 2 C34 2 38 5 38 10.5 C38 16 34 23 20 33Z" />
      </svg>
    </span>
  </div>
</template>
