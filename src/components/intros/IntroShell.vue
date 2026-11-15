<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

defineProps<{ name: string; stage: number; leaving: boolean; hint?: string; tap?: string }>()
defineEmits<{ skip: [] }>()

onMounted(() => document.documentElement.classList.add('no-scroll'))
onBeforeUnmount(() => document.documentElement.classList.remove('no-scroll'))
</script>

<template>
  <div class="intro" :class="[`intro--${name}`, `stage-${stage}`, { 'is-leaving': leaving, 'is-started': stage > 0 }]">
    <p v-if="hint" class="intro__hint">{{ hint }}</p>
    <div class="intro__scene">
      <slot />
    </div>
    <p v-if="tap" class="intro__tap">{{ tap }}</p>
    <button type="button" class="intro__skip" @click="$emit('skip')">Пропустить</button>
  </div>
</template>
