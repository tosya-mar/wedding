<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const command = './wedding.sh --invite'
const output = [
  '[ ok ] Загрузка любви ............ 100%',
  `[ ok ] Поиск пары ... найдено: ${wedding.groom.short} + ${wedding.bride.short}`,
  `[ ok ] Дата: ${wedding.dateShort}, ${wedding.ceremony.time}`,
  `[ ok ] Город: ${wedding.city}`,
  '[ .. ] Отправка приглашения гостю',
]
const typeMs = command.length * 55

const run = () => play([0, typeMs + 3400], 1700)
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Enter') run()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <IntroShell
    name="terminal"
    :stage="stage"
    :leaving="leaving"
    hint="guest@spb:~"
    tap="Нажмите Enter — или на экран"
    @skip="emit('open')"
  >
    <button
      type="button"
      class="term"
      :style="{ '--type-ms': typeMs + 'ms', '--chars': command.length }"
      aria-label="Запустить скрипт приглашения"
      @click="run"
    >
      <span class="term__screen">
        <span class="term__line">Last login: {{ wedding.dateLong }} on ttys015</span>
        <span class="term__line term__prompt">
          <b>guest@spb:~$</b>
          <span class="term__cmd">{{ command }}</span><i class="term__cursor" />
        </span>
        <span
          v-for="(line, i) in output"
          :key="i"
          class="term__line term__out"
          :style="{ '--d': `calc(var(--type-ms) + ${300 + i * 420}ms)` }"
        >{{ line }}</span>
        <span class="term__line term__out term__bar" :style="{ '--d': `calc(var(--type-ms) + ${300 + output.length * 420}ms)` }">
          [<span class="term__fill" />] <span class="term__pct">100%</span>
        </span>
        <span class="term__big">
          <span>{{ wedding.groom.short.toUpperCase() }} ♥ {{ wedding.bride.short.toUpperCase() }}</span>
          <small>Вы приглашены. Ждём вас {{ wedding.dateShort }}</small>
        </span>
      </span>
    </button>
  </IntroShell>
</template>
