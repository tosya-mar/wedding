<script setup lang="ts">
import { wedding, coupleFull } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'
import DrawBridge from './DrawBridge.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))
</script>

<template>
  <IntroShell
    name="meet"
    :stage="stage"
    :leaving="leaving"
    hint="Навстречу друг другу"
    tap="Нажмите, чтобы свести мост"
    @skip="emit('open')"
  >
    <button type="button" class="meet" aria-label="Свести мост" @click="play([0, 1400, 3300], 1800)">
      <span class="meet__title">
        <span class="meet__names">{{ coupleFull }}</span>
        <span class="meet__date">{{ wedding.dateShort }}</span>
      </span>
      <span class="meet__cloud meet__cloud--a" />
      <span class="meet__cloud meet__cloud--b" />
      <Skyline class="meet__city" />
      <svg class="meet__svg" viewBox="0 0 400 300" aria-hidden="true">
        <rect x="0" y="206" width="400" height="94" class="meet__water" />
        <g class="meet__ripples">
          <line x1="30" y1="230" x2="110" y2="230" />
          <line x1="250" y1="238" x2="350" y2="238" />
          <line x1="120" y1="254" x2="230" y2="254" />
        </g>
        <DrawBridge :left="stage > 0 ? 0 : 58" :right="stage > 0 ? 0 : 58" />
        <g class="meet__walker meet__walker--groom">
          <g class="meet__bob">
            <rect x="-3.4" y="-13" width="2.6" height="13" class="meet__suit" />
            <rect x="0.8" y="-13" width="2.6" height="13" class="meet__suit" />
            <path d="M-6.5 -28 L6.5 -28 L5.5 -12 L-5.5 -12Z" class="meet__suit" />
            <path d="M-2 -28 L2 -28 L0 -21Z" fill="#fff" />
            <path d="M-1.2 -25 L1.2 -25 L0 -23Z" fill="#c9604f" />
            <circle cx="0" cy="-33" r="4.6" class="meet__skin" />
            <path d="M-4.6 -34 Q-4 -39 0 -39 Q4.6 -39 4.6 -34 Q2 -36.5 -4.6 -34Z" fill="#3b2a22" />
          </g>
        </g>
        <g class="meet__walker meet__walker--bride">
          <g class="meet__bob">
            <path d="M1 -35 Q12 -26 11 -4 L7 -5 Q8 -22 0 -31Z" class="meet__veil" />
            <path d="M-3 -27 L3 -27 L10 0 L-10 0Z" class="meet__dress" />
            <path d="M-3.4 -28 L3.4 -28 L3 -20 L-3 -20Z" class="meet__dress" />
            <circle cx="0" cy="-32.5" r="4.4" class="meet__skin" />
            <path d="M-4.4 -33 Q-4 -38 0 -38 Q4.4 -38 4.4 -33 Q1 -36 -4.4 -33Z" fill="#8a5a3c" />
            <circle cx="3.6" cy="-36" r="2.4" fill="#8a5a3c" />
            <circle cx="-4" cy="-17" r="2.2" fill="#e7a3a0" />
            <circle cx="-2" cy="-16" r="1.8" fill="#f5c7c0" />
          </g>
        </g>
        <path
          class="meet__heart"
          d="M200 134 C190 126 186 120 186 115 C186 110 190 107 194 107 C197 107 199 109 200 111 C201 109 203 107 206 107 C210 107 214 110 214 115 C214 120 210 126 200 134Z"
        />
      </svg>
    </button>
  </IntroShell>
</template>
