<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import SectionTitle from '../SectionTitle.vue'
import TimelineIcon from '../decor/TimelineIcon.vue'

defineProps<{ theme: ThemeDef }>()
</script>

<template>
  <div class="timing" :class="`timing--${theme.timing}`">
    <SectionTitle kicker="Timing" title="Программа дня" />
    <ol class="timing__list">
      <li
        v-for="(item, i) in wedding.timeline"
        :key="item.time"
        v-reveal="i % 2 ? 'right' : 'left'"
        class="timing__item"
        :style="{ '--i': i }"
      >
        <span class="timing__time">{{ item.time }}</span>
        <span class="timing__icon"><TimelineIcon :name="item.icon" /></span>
        <span class="timing__text">
          <span class="timing__title">{{ item.title }}</span>
          <span v-if="item.note" class="timing__note">{{ item.note }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>
