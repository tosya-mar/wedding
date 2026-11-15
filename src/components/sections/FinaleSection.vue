<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import Skyline from '../decor/Skyline.vue'
import WaxSeal from '../decor/WaxSeal.vue'

defineProps<{ theme: ThemeDef }>()
</script>

<template>
  <div class="finale">
    <WaxSeal v-if="theme.ornament === 'seal' || theme.ornament === 'stamp'" v-reveal="'zoom'" class="finale__seal" />
    <h2 v-reveal class="finale__title">До встречи!</h2>
    <p v-reveal class="finale__text">С нетерпением ждём вас {{ wedding.dateLong }}</p>
    <p v-reveal class="finale__sign">
      С любовью,<br />{{ wedding.groom.short }} и {{ wedding.bride.short }}
    </p>
    <Skyline class="finale__skyline" water />
  </div>
</template>
