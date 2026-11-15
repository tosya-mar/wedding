<script setup lang="ts">
import { computed } from 'vue'
import type { ThemeDef } from '../data/themes'
import HeroSection from './sections/HeroSection.vue'
import GreetingSection from './sections/GreetingSection.vue'
import CalendarSection from './sections/CalendarSection.vue'
import Polaroids from './sections/Polaroids.vue'
import CountdownSection from './sections/CountdownSection.vue'
import LocationSection from './sections/LocationSection.vue'
import TimingSection from './sections/TimingSection.vue'
import DressCodeSection from './sections/DressCodeSection.vue'
import DetailsSection from './sections/DetailsSection.vue'
import RsvpSection from './sections/RsvpSection.vue'
import FinaleSection from './sections/FinaleSection.vue'

const props = defineProps<{ theme: ThemeDef }>()

const showGreeting = computed(() => props.theme.hero !== 'arch')
const showPolaroids = computed(
  () => props.theme.id === 'sage' || props.theme.id === 'petersburg' || props.theme.id === 'meet',
)
</script>

<template>
  <main class="invite">
    <HeroSection :theme="theme" />

    <section class="sec sec--edge sec--intro">
      <GreetingSection v-if="showGreeting" :theme="theme" />
      <CalendarSection />
      <Polaroids v-if="showPolaroids" />
    </section>

    <section class="sec sec--alt sec--edge sec--countdown">
      <CountdownSection />
    </section>

    <section class="sec sec--edge sec--location">
      <LocationSection />
    </section>

    <section class="sec sec--alt sec--edge sec--timing">
      <TimingSection :theme="theme" />
    </section>

    <section class="sec sec--edge sec--dress">
      <DressCodeSection :theme="theme" />
    </section>

    <section class="sec sec--alt sec--edge sec--details">
      <DetailsSection :theme="theme" />
    </section>

    <section class="sec sec--edge sec--rsvp">
      <RsvpSection />
    </section>

    <section class="sec sec--alt sec--edge sec--finale">
      <FinaleSection :theme="theme" />
    </section>
  </main>
</template>
