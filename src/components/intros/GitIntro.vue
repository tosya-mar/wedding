<script setup lang="ts">
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Confetti from './Confetti.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const checks = ['Любовь — проверено', 'Родители — одобрили', 'Кольца — готовы']
</script>

<template>
  <IntroShell
    name="git"
    :stage="stage"
    :leaving="leaving"
    hint="git merge"
    tap="Нажмите «Merge pull request»"
    @skip="emit('open')"
  >
    <div class="pr">
      <div class="pr__head">
        <h2 class="pr__title">Пожениться <span>#1508</span></h2>
        <p class="pr__meta">
          <span class="pr__badge">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM5 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.5 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /><path d="M4.25 4.5v7M11.75 11.5V7a3 3 0 0 0-3-3H6.5" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
            <b class="pr__open">Open</b><b class="pr__merged">Merged</b>
          </span>
          <span><b>vanya</b> хочет слить ветку <code>tosya</code> в <code>main</code></span>
        </p>
      </div>
      <svg class="pr__graph" viewBox="0 0 320 150" aria-hidden="true">
        <path class="pr__branch pr__branch--v" d="M20 40 H210" />
        <path class="pr__branch pr__branch--t" d="M20 110 H210" />
        <path class="pr__merge pr__merge--v" d="M210 40 C240 40 240 75 262 75" />
        <path class="pr__merge pr__merge--t" d="M210 110 C240 110 240 75 262 75" />
        <path class="pr__main" d="M262 75 H310" />
        <g class="pr__commits pr__commits--v">
          <circle cx="60" cy="40" r="6" /><circle cx="120" cy="40" r="6" /><circle cx="180" cy="40" r="6" />
        </g>
        <g class="pr__commits pr__commits--t">
          <circle cx="80" cy="110" r="6" /><circle cx="140" cy="110" r="6" /><circle cx="196" cy="110" r="6" />
        </g>
        <text x="20" y="26" class="pr__label pr__label--v">vanya</text>
        <text x="20" y="134" class="pr__label pr__label--t">tosya</text>
        <text x="120" y="60" text-anchor="middle" class="pr__note">знакомство · свидания</text>
        <text x="140" y="98" text-anchor="middle" class="pr__note">предложение · «да!»</text>
        <path
          class="pr__heart"
          d="M262 84 C254 78 251 74 251 70 C251 66 254 64 257 64 C259.5 64 261 65.5 262 67 C263 65.5 264.5 64 267 64 C270 64 273 66 273 70 C273 74 270 78 262 84Z"
        />
        <text x="262" y="104" text-anchor="middle" class="pr__note pr__note--merge">{{ wedding.dateShort }}</text>
      </svg>
      <ul class="pr__checks">
        <li v-for="c in checks" :key="c"><span class="pr__tick">✓</span>{{ c }}</li>
      </ul>
      <button type="button" class="pr__btn" :disabled="stage > 0" @click="play([0, 900, 2200], 1800)">
        <span class="pr__btn-idle">Merge pull request</span>
        <span class="pr__btn-busy">Merging…</span>
        <span class="pr__btn-done">✓ Merged</span>
      </button>
      <p class="pr__done">
        <b>{{ wedding.groom.short }} &amp; {{ wedding.bride.short }}</b>
        <span>Pull request успешно слит · {{ wedding.dateShort }}</span>
      </p>
    </div>
    <Confetti v-if="stage >= 3" :colors="['#8250df', '#1f883d', '#0969da', '#bf3989', '#fff']" />
  </IntroShell>
</template>
