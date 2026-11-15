<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import Ornament from '../decor/Ornament.vue'

defineProps<{ theme: ThemeDef }>()
</script>

<template>
  <div class="greeting">
    <h2 v-reveal class="greeting__title">{{ wedding.greeting.title }}</h2>
    <p v-for="(line, i) in wedding.greeting.text" :key="i" v-reveal class="greeting__text">
      {{ line }}
    </p>
    <Ornament v-reveal="'zoom'" :type="theme.ornament" />
  </div>
</template>
