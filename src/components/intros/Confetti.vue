<script setup lang="ts">
const props = withDefaults(defineProps<{ colors?: string[]; count?: number; hearts?: boolean }>(), {
  colors: () => ['#e8c26b', '#f3d6cf', '#c98b8b', '#ffffff', '#a3ae8f'],
  count: 46,
  hearts: false,
})

const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const pieces = Array.from({ length: props.count }, (_, i) => {
  const angle = rand(i + 1) * Math.PI * 2
  const dist = 120 + rand(i + 50) * 220
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 80,
    r: rand(i + 90) * 720 - 360,
    delay: rand(i + 130) * 0.15,
    color: props.colors[i % props.colors.length],
    size: 6 + rand(i + 170) * 8,
    round: rand(i + 210) > 0.6,
  }
})
</script>

<template>
  <div class="confetti" aria-hidden="true">
    <span
      v-for="(p, i) in pieces"
      :key="i"
      class="confetti__piece"
      :class="{ 'is-round': p.round, 'is-heart': hearts && i % 3 === 0 }"
      :style="{
        '--x': p.x + 'px',
        '--y': p.y + 'px',
        '--r': p.r + 'deg',
        '--c': p.color,
        width: p.size + 'px',
        height: (p.round ? p.size : p.size * 0.5) + 'px',
        animationDelay: p.delay + 's',
      }"
    />
  </div>
</template>
