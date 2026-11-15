<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play, animations } = useIntro(() => emit('open'))

const canvas = ref<HTMLCanvasElement | null>(null)
const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ВАНЯТОСЯ♥15082027'
const FONT = 16
let raf = 0
let drops: number[] = []
let speed = 1
let last = 0

function resize() {
  const c = canvas.value
  if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = window.innerWidth * dpr
  c.height = window.innerHeight * dpr
  c.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
  const cols = Math.ceil(window.innerWidth / FONT)
  drops = Array.from({ length: cols }, () => Math.random() * -40)
}

function frame(now: number) {
  raf = requestAnimationFrame(frame)
  if (now - last < 50 / speed) return
  last = now
  const c = canvas.value
  const ctx = c?.getContext('2d')
  if (!c || !ctx) return
  ctx.fillStyle = 'rgba(2, 10, 4, 0.12)'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.font = `${FONT}px 'JetBrains Mono', monospace`
  drops.forEach((y, i) => {
    const ch = glyphs[Math.floor(Math.random() * glyphs.length)]
    ctx.fillStyle = Math.random() > 0.96 ? '#d6ffe4' : '#00e05a'
    ctx.fillText(ch, i * FONT, y * FONT)
    if (y * FONT > window.innerHeight && Math.random() > 0.975) drops[i] = 0
    else drops[i] = y + 1
  })
}

function wake() {
  speed = 0.45
  play([0, 1300, 2600], 1900)
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  if (animations.value) raf = requestAnimationFrame(frame)
  else {
    for (let i = 0; i < 60; i++) frame(i * 100)
    cancelAnimationFrame(raf)
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <IntroShell
    name="matrix"
    :stage="stage"
    :leaving="leaving"
    tap="Нажмите, чтобы проснуться"
    @skip="emit('open')"
  >
    <canvas ref="canvas" class="mx__rain" aria-hidden="true" />
    <button type="button" class="mx" aria-label="Проснуться" @click="wake">
      <span class="mx__line mx__line--1">Проснись, гость…</span>
      <span class="mx__line mx__line--2">Матрица выбрала тебя.</span>
      <span class="mx__names" :data-text="`${wedding.groom.short} + ${wedding.bride.short}`">
        {{ wedding.groom.short }} + {{ wedding.bride.short }}
      </span>
      <span class="mx__line mx__line--3">{{ wedding.dateShort }} · {{ wedding.city }}</span>
      <span class="mx__line mx__line--4">Следуй за белым кроликом ↓</span>
    </button>
  </IntroShell>
</template>
