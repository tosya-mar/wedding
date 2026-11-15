<script setup lang="ts">
import type { Ornament } from '../../data/themes'
import WaxSeal from './WaxSeal.vue'

defineProps<{ type: Ornament }>()
</script>

<template>
  <div class="ornament" :class="`ornament--${type}`" aria-hidden="true">
    <svg v-if="type === 'vine'" viewBox="0 0 220 40" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">
      <path d="M110 20 C95 6 80 34 64 20 S36 8 22 20 S6 26 2 20" />
      <path d="M110 20 C125 6 140 34 156 20 S184 8 198 20 S214 26 218 20" />
      <path d="M64 20 c-4 -8 -12 -10 -16 -6 M156 20 c4 -8 12 -10 16 -6 M40 16 c2 -6 8 -8 12 -6 M180 16 c-2 -6 -8 -8 -12 -6" />
      <path d="M88 22 c-3 6 -10 8 -14 6 M132 22 c3 6 10 8 14 6" />
      <circle cx="110" cy="20" r="4" />
      <path d="M110 12 c3 2 3 6 0 8 c-3 -2 -3 -6 0 -8z M110 28 c3 -2 3 -6 0 -8 c-3 2 -3 6 0 8z M102 20 c2 -3 6 -3 8 0 c-2 3 -6 3 -8 0z M118 20 c-2 -3 -6 -3 -8 0 c2 3 6 3 8 0z" />
    </svg>

    <template v-else-if="type === 'heart' || type === 'red'">
      <span class="ornament__line" />
      <svg viewBox="0 0 40 36" class="ornament__heart">
        <path
          d="M20 33 C6 23 2 16 2 10.5 C2 5 6 2 10.5 2 C14.5 2 18 4.5 20 8 C22 4.5 25.5 2 29.5 2 C34 2 38 5 38 10.5 C38 16 34 23 20 33Z"
        />
      </svg>
      <span class="ornament__line" />
    </template>

    <template v-else-if="type === 'seal'">
      <span class="ornament__line" />
      <WaxSeal class="ornament__seal" />
      <span class="ornament__line" />
    </template>

    <template v-else-if="type === 'star'">
      <span class="ornament__line" />
      <svg viewBox="0 0 40 40" class="ornament__star"><path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17Z" /></svg>
      <span class="ornament__line" />
    </template>

    <template v-else-if="type === 'flower'">
      <span class="ornament__line" />
      <svg viewBox="0 0 40 40" class="ornament__flower">
        <g transform="translate(20 20)">
          <ellipse v-for="a in [0, 72, 144, 216, 288]" :key="a" rx="6" ry="10" :transform="`rotate(${a}) translate(0 -8)`" />
          <circle r="4" class="ornament__flower-core" />
        </g>
      </svg>
      <span class="ornament__line" />
    </template>

    <template v-else-if="type === 'stamp'">
      <span class="ornament__line ornament__line--dashed" />
      <svg viewBox="0 0 40 28" class="ornament__mail" fill="none" stroke="currentColor" stroke-width="1.6">
        <rect x="2" y="2" width="36" height="24" rx="2" />
        <path d="M2 4 L20 16 L38 4" />
      </svg>
      <span class="ornament__line ornament__line--dashed" />
    </template>

    <template v-else>
      <span class="ornament__dot" />
      <span class="ornament__line" />
      <span class="ornament__dot" />
    </template>
  </div>
</template>
