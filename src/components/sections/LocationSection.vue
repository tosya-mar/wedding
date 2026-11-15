<script setup lang="ts">
import { wedding } from '../../data/wedding'
import SectionTitle from '../SectionTitle.vue'
import Palace from '../decor/Palace.vue'

const { ceremony, banquet } = wedding
</script>

<template>
  <div class="location">
    <SectionTitle kicker="Location" title="Место проведения" />

    <article v-reveal class="place">
      <div class="place__art" aria-hidden="true">
        <Palace />
      </div>
      <p class="place__label">{{ ceremony.title }}</p>
      <p class="place__time">{{ ceremony.time }}</p>
      <h3 class="place__name">{{ ceremony.place }}</h3>
      <p class="place__addr">{{ wedding.city }}, {{ ceremony.address }}</p>
      <a class="btn" :href="ceremony.mapUrl" target="_blank" rel="noopener">Посмотреть на карте</a>
    </article>

    <article v-reveal class="place place--tbd">
      <p class="place__label">{{ banquet.title }}</p>
      <h3 class="place__name">{{ banquet.place || 'Скоро расскажем' }}</h3>
      <p class="place__addr">{{ banquet.note }}</p>
    </article>
  </div>
</template>
