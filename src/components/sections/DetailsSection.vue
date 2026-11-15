<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import SectionTitle from '../SectionTitle.vue'
import Ornament from '../decor/Ornament.vue'

defineProps<{ theme: ThemeDef }>()
</script>

<template>
  <div class="details">
    <SectionTitle kicker="Details" title="Пожелания" />
    <template v-for="(d, i) in wedding.details" :key="d.title">
      <Ornament v-if="i > 0" v-reveal="'zoom'" :type="theme.ornament" />
      <article v-reveal class="details__item">
        <h3 class="details__title">{{ d.title }}</h3>
        <p class="details__text">{{ d.text }}</p>
      </article>
    </template>
  </div>
</template>
