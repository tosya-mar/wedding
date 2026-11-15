<script setup lang="ts">
defineProps<{ title: string; kicker?: string; sub?: string }>()
</script>

<template>
  <header v-reveal class="sec-title">
    <p v-if="kicker" class="sec-title__kicker">{{ kicker }}</p>
    <h2 class="sec-title__main">{{ title }}</h2>
    <p v-if="sub" class="sec-title__sub">{{ sub }}</p>
  </header>
</template>
