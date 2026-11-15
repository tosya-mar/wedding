<script setup lang="ts">
import { wedding } from '../../data/wedding'

const points = Array.from({ length: 36 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 36
  const r = i % 2 ? 46 : 49 - (i % 5)
  return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`
}).join(' ')
</script>

<template>
  <svg class="wax-seal" viewBox="0 0 100 100" aria-hidden="true">
    <polygon class="wax-seal__body" :points="points" />
    <circle class="wax-seal__ring" cx="50" cy="50" r="34" fill="none" />
    <text class="wax-seal__text" x="50" y="52" text-anchor="middle" dominant-baseline="middle">
      {{ wedding.monogram.left }}&amp;{{ wedding.monogram.right }}
    </text>
  </svg>
</template>
