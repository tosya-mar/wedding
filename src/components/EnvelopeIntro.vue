<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { wedding } from '../data/wedding'
import { useSettings } from '../composables/useSettings'
import WaxSeal from './decor/WaxSeal.vue'

const emit = defineEmits<{ open: [] }>()
const { animations } = useSettings()

// 0 closed · 1 flap opens · 2 letter slides out · 3 overlay fades away
const stage = ref(0)
const timers: number[] = []

function open() {
  if (stage.value > 0) return
  if (!animations.value) {
    emit('open')
    return
  }
  stage.value = 1
  timers.push(window.setTimeout(() => (stage.value = 2), 750))
  timers.push(window.setTimeout(() => (stage.value = 3), 2100))
  timers.push(window.setTimeout(() => emit('open'), 2900))
}

onMounted(() => document.documentElement.classList.add('no-scroll'))
onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  document.documentElement.classList.remove('no-scroll')
})
</script>

<template>
  <div class="env-intro" :class="`stage-${stage}`">
    <p class="env-intro__hint">Вам письмо</p>
    <button type="button" class="envelope" aria-label="Открыть конверт" @click="open">
      <span class="envelope__back" />
      <span class="envelope__letter">
        <span class="envelope__letter-kicker">Приглашение на свадьбу</span>
        <span class="envelope__letter-names">{{ wedding.groom.short }} &amp; {{ wedding.bride.short }}</span>
        <span class="envelope__letter-date">{{ wedding.dateShort }}</span>
      </span>
      <svg class="envelope__front" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
        <polygon class="envelope__side" points="0,0 152,112 0,200" />
        <polygon class="envelope__side" points="300,0 148,112 300,200" />
        <polygon class="envelope__bottom" points="0,200 150,92 300,200" />
      </svg>
      <span class="envelope__flap"><span /></span>
      <WaxSeal class="envelope__seal" />
      <span class="envelope__address">
        <span>Самым близким</span>
        <span>{{ wedding.city }}</span>
      </span>
    </button>
    <p class="env-intro__tap">Нажмите на конверт, чтобы открыть</p>
  </div>
</template>
