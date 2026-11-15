<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import Skyline from '../decor/Skyline.vue'
import WaxSeal from '../decor/WaxSeal.vue'
import coupleImg from '../../assets/couple.png'

defineProps<{ theme: ThemeDef }>()
</script>

<template>
  <div class="finale">
    <WaxSeal v-if="theme.ornament === 'seal' || theme.ornament === 'stamp'" v-reveal="'zoom'" class="finale__seal" />
    <figure v-reveal="'zoom'" class="finale__photo">
      <img :src="coupleImg" :alt="`${wedding.groom.full} и ${wedding.bride.full}`" />
    </figure>
    <h2 v-reveal class="finale__title">До встречи!</h2>
    <p v-reveal class="finale__text">С нетерпением ждём вас {{ wedding.dateLong }}</p>
    <p v-reveal class="finale__sign">
      С любовью,<br />{{ wedding.groom.short }} и {{ wedding.bride.short }}
    </p>
    <Skyline class="finale__skyline" water />
  </div>
</template>
