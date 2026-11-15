<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import SectionTitle from '../SectionTitle.vue'

defineProps<{ theme: ThemeDef }>()
</script>

<template>
  <div class="dress">
    <SectionTitle kicker="Dress code" title="Дресс-код" />
    <p v-reveal class="dress__text">{{ wedding.dressCode.text }}</p>
    <ul class="dress__palette">
      <li
        v-for="(c, i) in theme.palette"
        :key="c.color"
        v-reveal="'zoom'"
        class="dress__swatch"
        :style="{ '--c': c.color, transitionDelay: i * 80 + 'ms' }"
      >
        <span class="dress__dot" />
        <span class="dress__name">{{ c.name }}</span>
      </li>
    </ul>
    <p v-reveal class="dress__note">{{ wedding.dressCode.note }}</p>
  </div>
</template>
