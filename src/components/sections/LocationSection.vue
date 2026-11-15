<script setup lang="ts">
import { wedding } from '../../data/wedding'
import SectionTitle from '../SectionTitle.vue'
import palaceImg from '../../assets/palace.png'

const { ceremony, banquet } = wedding
</script>

<template>
  <div class="location">
    <SectionTitle kicker="Location" title="Место проведения" />

    <article v-reveal class="place">
      <div class="place__art place__art--scrap" aria-hidden="true">
        <img class="place__scrap" :src="palaceImg" alt="" />
        <i class="tape place__tape place__tape--l" />
        <i class="tape place__tape place__tape--r" />
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
