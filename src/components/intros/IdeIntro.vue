<script setup lang="ts">
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Confetti from './Confetti.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

type Tok = [cls: '' | 'k' | 'p' | 's' | 'c' | 'f', text: string]
const code: Tok[][] = [
  [['k', 'import'], ['', ' { marry } '], ['k', 'from'], ['s', " 'life'"]],
  [],
  [['k', 'const'], ['', ' groom = '], ['s', `'${wedding.groom.short}'`]],
  [['k', 'const'], ['', ' bride = '], ['s', `'${wedding.bride.short}'`]],
  [],
  [['k', 'const'], ['', ' wedding = '], ['f', 'marry'], ['', '(groom, bride, {']],
  [['p', '  date'], ['', ': '], ['s', `'${wedding.dateShort}'`], ['', ',']],
  [['p', '  time'], ['', ': '], ['s', `'${wedding.ceremony.time}'`], ['', ',']],
  [['p', '  city'], ['', ': '], ['s', `'${wedding.city}'`], ['', ',']],
  [['', '})']],
  [],
  [['', 'wedding.'], ['f', 'invite'], ['', '(you) '], ['c', '// ← это вы!']],
]
const out = [
  '$ npm run wedding',
  '> compiling love.ts …',
  '✓ 0 errors, 0 warnings',
  `✓ ${wedding.groom.short} + ${wedding.bride.short} = ♥`,
  `▶ Свадьба запущена: ${wedding.dateShort}, ${wedding.ceremony.time}`,
]
</script>

<template>
  <IntroShell
    name="ide"
    :stage="stage"
    :leaving="leaving"
    hint="wedding.ts"
    tap="Нажмите ▶ Run"
    @skip="emit('open')"
  >
    <button type="button" class="ide" aria-label="Запустить код свадьбы" @click="play([0, 2600], 1700)">
      <span class="ide__titlebar">
        <i /><i /><i />
        <span class="ide__tab is-active">wedding.ts</span>
        <span class="ide__tab">guests.json</span>
        <span class="ide__run">▶ Run</span>
      </span>
      <span class="ide__editor">
        <span v-for="(line, i) in code" :key="i" class="ide__line"><span v-for="(tok, j) in line" :key="j" :class="tok[0] && `syn-${tok[0]}`">{{ tok[1] }}</span><i v-if="i === code.length - 1" class="ide__caret" /></span>
      </span>
      <span class="ide__panel">
        <span class="ide__panel-title">TERMINAL</span>
        <span v-for="(l, i) in out" :key="i" class="ide__out" :style="{ animationDelay: 0.35 + i * 0.4 + 's' }">{{ l }}</span>
      </span>
      <span class="ide__status">
        <span>⎇ main</span>
        <span>TypeScript</span>
        <span>Ln {{ code.length }}, Col 24</span>
      </span>
    </button>
    <Confetti v-if="stage >= 2" :colors="['#89b4fa', '#cba6f7', '#f5c2e7', '#a6e3a1', '#f9e2af']" />
  </IntroShell>
</template>
