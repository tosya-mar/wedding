<script setup lang="ts">
import { wedding, coupleShort } from '../../data/wedding'
import Skyline from '../decor/Skyline.vue'
import TimelineIcon from '../decor/TimelineIcon.vue'
</script>

<template>
  <div class="polaroids">
    <figure v-reveal="'left'" class="polaroid polaroid--1">
      <div class="polaroid__img polaroid__img--city"><Skyline water /></div>
      <figcaption>наш город</figcaption>
      <i class="tape" />
    </figure>
    <figure v-reveal="'right'" class="polaroid polaroid--2">
      <div class="polaroid__img polaroid__img--rings"><TimelineIcon name="rings" /></div>
      <figcaption>скажем «да»</figcaption>
      <i class="tape" />
    </figure>
    <div v-reveal="'zoom'" class="ticket">
      <span class="ticket__small">Наша свадьба</span>
      <span class="ticket__date">{{ wedding.dateShort }}</span>
      <span class="ticket__script">{{ coupleShort }}</span>
    </div>
  </div>
</template>
