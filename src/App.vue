<script setup lang="ts">
import { computed, ref, watch, type Component } from 'vue'
import { useSettings } from './composables/useSettings'
import type { IntroType } from './data/themes'
import Invitation from './components/Invitation.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import EnvelopeIntro from './components/EnvelopeIntro.vue'
import BridgeIntro from './components/intros/BridgeIntro.vue'
import HeartIntro from './components/intros/HeartIntro.vue'
import RibbonIntro from './components/intros/RibbonIntro.vue'
import PetalsIntro from './components/intros/PetalsIntro.vue'
import DawnIntro from './components/intros/DawnIntro.vue'
import SailsIntro from './components/intros/SailsIntro.vue'
import MeetIntro from './components/intros/MeetIntro.vue'
import LineartIntro from './components/intros/LineartIntro.vue'
import PapercutIntro from './components/intros/PapercutIntro.vue'
import BlueprintIntro from './components/intros/BlueprintIntro.vue'
import GarlandIntro from './components/intros/GarlandIntro.vue'
import TerminalIntro from './components/intros/TerminalIntro.vue'
import IdeIntro from './components/intros/IdeIntro.vue'
import GitIntro from './components/intros/GitIntro.vue'
import PixelIntro from './components/intros/PixelIntro.vue'
import MatrixIntro from './components/intros/MatrixIntro.vue'
import HalvesIntro from './components/intros/HalvesIntro.vue'
import LockIntro from './components/intros/LockIntro.vue'
import Particles from './components/decor/Particles.vue'

const intros: Record<IntroType, Component> = {
  envelope: EnvelopeIntro,
  ribbon: RibbonIntro,
  petals: PetalsIntro,
  bridge: BridgeIntro,
  dawn: DawnIntro,
  sails: SailsIntro,
  meet: MeetIntro,
  lineart: LineartIntro,
  papercut: PapercutIntro,
  blueprint: BlueprintIntro,
  garland: GarlandIntro,
  heart: HeartIntro,
  halves: HalvesIntro,
  lock: LockIntro,
  terminal: TerminalIntro,
  ide: IdeIntro,
  git: GitIntro,
  pixel: PixelIntro,
  matrix: MatrixIntro,
}

const { theme, animations } = useSettings()

const introOpened = ref(false)
watch(
  () => theme.value.id,
  () => (introOpened.value = false),
)

const intro = computed(() => (theme.value.intro ? intros[theme.value.intro] : null))
const showIntro = computed(() => !!intro.value && !introOpened.value)

const replayIntro = () => {
  introOpened.value = false
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <div class="app" :class="`theme-${theme.id}`">
    <div class="backdrop" aria-hidden="true" />
    <Particles v-if="animations && !showIntro" :key="theme.id" :type="theme.particles" />

    <Transition name="fade">
      <component :is="intro" v-if="showIntro" :key="theme.id" @open="introOpened = true" />
    </Transition>

    <Invitation v-if="!showIntro" :key="theme.id" :theme="theme" />

    <button
      v-if="intro && introOpened"
      type="button"
      class="reopen"
      title="Показать заставку ещё раз"
      aria-label="Показать заставку ещё раз"
      @click="replayIntro"
    >
      ↺
    </button>

    <ThemeSwitcher />
  </div>
</template>
