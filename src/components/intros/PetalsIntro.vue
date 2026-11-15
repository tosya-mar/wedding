<script setup lang="ts">
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import WaxSeal from '../decor/WaxSeal.vue'
import Skyline from '../decor/Skyline.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const flaps = ['l', 'r', 'b', 't'] as const
</script>

<template>
  <IntroShell
    name="petals"
    :stage="stage"
    :leaving="leaving"
    hint="Конверт раскроется, как цветок"
    tap="Нажмите на печать"
    @skip="emit('open')"
  >
    <button type="button" class="pf" aria-label="Раскрыть конверт" @click="play([0, 450, 2050], 1400)">
      <span class="pf__card">
        <span class="pf__kicker">Мы женимся</span>
        <span class="pf__names">{{ coupleShort }}</span>
        <span class="pf__date">{{ wedding.dateShort }}</span>
        <Skyline class="pf__skyline" water />
      </span>
      <span v-for="f in flaps" :key="f" class="pf__flap" :class="`pf__flap--${f}`">
        <i class="pf__face pf__face--out" />
        <i class="pf__face pf__face--in" />
      </span>
      <WaxSeal class="pf__seal" />
    </button>
  </IntroShell>
</template>
