<script setup lang="ts">
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const bars = Array.from({ length: 13 }, (_, i) => 6 + i * 24)
const heart =
  'M50 90 C18 68 4 52 4 32 C4 16 16 6 30 6 C39 6 46 11 50 18 C54 11 61 6 70 6 C84 6 96 16 96 32 C96 52 82 68 50 90Z'
</script>

<template>
  <IntroShell
    name="lock"
    :stage="stage"
    :leaving="leaving"
    hint="Замок на счастье"
    tap="Нажмите на ключ, чтобы запереть замок"
    @skip="emit('open')"
  >
    <button type="button" class="lock" aria-label="Запереть замок" @click="play([0, 800, 1600], 1700)">
      <svg class="lock__svg" viewBox="0 0 300 320" aria-hidden="true">
        <defs>
          <linearGradient id="lock-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f1d58e" />
            <stop offset="0.5" stop-color="#c9973f" />
            <stop offset="1" stop-color="#8a6420" />
          </linearGradient>
          <linearGradient id="lock-steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#8e969c" />
            <stop offset="0.5" stop-color="#e3e6e8" />
            <stop offset="1" stop-color="#7b8288" />
          </linearGradient>
        </defs>
        <g class="lock__rail">
          <rect x="0" y="40" width="300" height="10" rx="2" />
          <rect x="0" y="262" width="300" height="8" rx="2" />
          <rect v-for="x in bars" :key="x" :x="x" y="50" width="5" height="212" />
          <circle v-for="x in bars.slice(0, -1)" :key="'c' + x" :cx="x + 14.5" cy="156" r="8" class="lock__ring" />
        </g>
        <g class="lock__shackle">
          <path d="M128 124 V60 A22 22 0 0 1 172 60 V124" fill="none" stroke="url(#lock-steel)" stroke-width="9" stroke-linecap="round" />
        </g>
        <rect class="lock__rail" x="0" y="40" width="300" height="10" rx="2" />
        <g class="lock__body">
          <path :d="heart" transform="translate(95 104) scale(1.1)" fill="url(#lock-brass)" />
          <path :d="heart" transform="translate(103 112) scale(0.94)" fill="none" class="lock__engrave-line" />
          <text x="150" y="150" text-anchor="middle" class="lock__engrave lock__engrave--big">
            {{ wedding.monogram.left }} ♥ {{ wedding.monogram.right }}
          </text>
          <text x="150" y="170" text-anchor="middle" class="lock__engrave">15·08·2027</text>
          <circle cx="150" cy="188" r="5" class="lock__hole" />
          <rect x="148" y="188" width="4" height="10" class="lock__hole" />
        </g>
        <g class="lock__key">
          <circle cx="0" cy="0" r="11" fill="none" stroke="url(#lock-brass)" stroke-width="5" />
          <rect x="-44" y="-2.5" width="33" height="5" rx="2" fill="url(#lock-brass)" />
          <rect x="-40" y="2" width="4" height="7" fill="url(#lock-brass)" />
          <rect x="-32" y="2" width="4" height="5" fill="url(#lock-brass)" />
          <path d="M-5 -5 C-2 -9 2 -9 4 -5 C6 -9 10 -8 9 -4 C8 0 2 3 0 5 C-2 3 -8 0 -9 -4 C-10 -8 -6 -9 -5 -5Z" transform="scale(.5)" fill="#e8656b" />
        </g>
      </svg>
      <span class="lock__splash" aria-hidden="true"><i /><i /><i /></span>
      <span class="lock__caption">
        <span class="lock__names">{{ wedding.groom.short }} &amp; {{ wedding.bride.short }}</span>
        <span class="lock__date">навсегда · {{ wedding.dateShort }}</span>
      </span>
    </button>
  </IntroShell>
</template>
