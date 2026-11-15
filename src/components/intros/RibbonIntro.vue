<script setup lang="ts">
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Bouquet from '../decor/Bouquet.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))
</script>

<template>
  <IntroShell
    name="ribbon"
    :stage="stage"
    :leaving="leaving"
    hint="Письмо для вас"
    tap="Потяните за бант"
    @skip="emit('open')"
  >
    <button type="button" class="rb" aria-label="Развязать бант и открыть письмо" @click="play([0, 700, 1400, 2300], 1500)">
      <span class="rb__env">
        <span class="rb__back" />
        <span class="rb__letter">
          <span class="rb__letter-body">
            <Bouquet class="rb__bouquet" />
            <span class="rb__kicker">Приглашение на свадьбу</span>
            <span class="rb__names">{{ coupleShort }}</span>
            <span class="rb__date">{{ wedding.dateShort }}</span>
            <span class="rb__city">{{ wedding.city }}</span>
          </span>
        </span>
        <svg class="rb__front" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
          <polygon class="rb__side" points="0,0 152,108 0,200" />
          <polygon class="rb__side" points="300,0 148,108 300,200" />
          <polygon class="rb__bottom" points="0,200 150,90 300,200" />
        </svg>
        <span class="rb__flap">
          <span class="rb__flap-face rb__flap-face--out" />
          <span class="rb__flap-face rb__flap-face--in" />
        </span>
      </span>
      <span class="rb__band rb__band--h" />
      <span class="rb__band rb__band--v" />
      <span class="rb__bow">
        <i class="rb__loop rb__loop--l" />
        <i class="rb__loop rb__loop--r" />
        <i class="rb__tail rb__tail--l" />
        <i class="rb__tail rb__tail--r" />
        <b class="rb__knot" />
      </span>
    </button>
  </IntroShell>
</template>
