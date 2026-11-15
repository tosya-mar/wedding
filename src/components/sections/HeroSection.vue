<script setup lang="ts">
import type { ThemeDef } from '../../data/themes'
import { wedding } from '../../data/wedding'
import Skyline from '../decor/Skyline.vue'
import Bouquet from '../decor/Bouquet.vue'
import heroBg from '../../assets/hero-bg.jpg'

defineProps<{ theme: ThemeDef }>()

const { groom, bride, dateShort, dateParts, city } = wedding
const postmark = `${city.toUpperCase()} • ${dateShort} • `

type Tok = [cls: '' | 'k' | 'p' | 's' | 'c' | 'n', text: string]
const code: Tok[][] = [
  [['k', 'const'], ['', ' wedding = {']],
  [['p', '  groom'], ['', ': '], ['s', `'${wedding.groom.full}'`], ['', ',']],
  [['p', '  bride'], ['', ': '], ['s', `'${wedding.bride.full}'`], ['', ',']],
  [['p', '  date'], ['', ': '], ['s', `'${dateShort}'`], ['', ',']],
  [['p', '  time'], ['', ': '], ['s', `'${wedding.ceremony.time}'`], ['', ',']],
  [['p', '  city'], ['', ': '], ['s', `'${city}'`], ['', ',']],
  [['p', '  guests'], ['', ': ['], ['s', "'вы'"], ['', '], '], ['c', '// ждём!']],
  [['', '}']],
]
</script>

<template>
  <section class="sec hero" :class="`hero--${theme.hero}`">
    <!-- Illustrated full-bleed scene -->
    <template v-if="theme.hero === 'scene'">
      <div class="hero__photo-bg" aria-hidden="true">
        <img class="hero__photo-bg-img" :src="heroBg" alt="" />
      </div>
      <div class="hero__photo-shade" aria-hidden="true" />
      <div class="hero__sky" />
      <div class="hero__glow" />
      <Bouquet v-if="theme.heroArt === 'bouquet'" class="hero__bouquet hero__bouquet--l" />
      <Bouquet v-if="theme.heroArt === 'bouquet'" class="hero__bouquet hero__bouquet--r" />
      <div class="hero__content">
        <p class="hero__kicker hero-in" style="--d: 0.1s">Приглашение на свадьбу</p>
        <h1 class="hero__names hero-in" style="--d: 0.3s">
          <span>{{ theme.id === 'meet' ? groom.full : groom.short }}</span>
          <span class="hero__amp">&amp;</span>
          <span>{{ theme.id === 'meet' ? bride.full : bride.short }}</span>
        </h1>
        <p class="hero__date hero-in" style="--d: 0.5s">{{ dateShort }}</p>
        <p class="hero__city hero-in" style="--d: 0.65s">{{ city }}</p>
      </div>
      <Skyline class="hero__skyline" water />
      <div class="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </template>

    <!-- Black & white arch + stacked date -->
    <template v-else-if="theme.hero === 'arch'">
      <div class="hero__arch hero-in" style="--d: 0.1s">
        <h1 class="hero__names">
          <span>{{ groom.short }}</span>
          <span class="hero__amp">&amp;</span>
          <span>{{ bride.short }}</span>
        </h1>
        <Skyline class="hero__skyline" water />
        <p class="hero__love" aria-hidden="true">love love love<br />love love love</p>
      </div>
      <div class="hero__row">
        <div class="hero__friends hero-in" style="--d: 0.4s">
          <h2>Друзья!</h2>
          <p>{{ wedding.greeting.text[0] }} {{ wedding.greeting.text[1] }}</p>
        </div>
        <div class="hero__stack hero-in" style="--d: 0.6s" aria-label="15 августа 2027">
          <span>{{ dateParts.day }}</span>
          <span>{{ dateParts.month }}</span>
          <span>{{ dateParts.year.slice(2) }}</span>
        </div>
      </div>
    </template>

    <!-- Centered classic composition with framed artwork -->
    <template v-else-if="theme.hero === 'classic'">
      <p class="hero__kicker hero-in" style="--d: 0.1s">Наша свадьба</p>
      <h1 class="hero__names hero-in" style="--d: 0.3s">
        <span>{{ groom.short }}</span>
        <span class="hero__amp">и</span>
        <span>{{ bride.short }}</span>
      </h1>
      <div class="hero__frame hero-in" style="--d: 0.55s">
        <div class="hero__frame-inner">
          <Skyline class="hero__skyline" water />
          <Bouquet v-if="theme.heroArt === 'bouquet'" class="hero__bouquet" />
        </div>
      </div>
      <p class="hero__date hero-in" style="--d: 0.8s">{{ dateShort }}</p>
      <p class="hero__city hero-in" style="--d: 0.9s">{{ city }}</p>
    </template>

    <!-- Collage: "Петербург украл наши сердца" -->
    <template v-else-if="theme.hero === 'polaroid'">
      <div class="hero__photo hero-in" style="--d: 0.1s">
        <div class="hero__sky" />
        <h1 class="hero__headline">
          Наши сердца<br />украл Петербург
        </h1>
        <span class="hero__tag hero__tag--g">{{ groom.short }}</span>
        <span class="hero__tag hero__tag--b">{{ bride.short }}</span>
        <svg class="hero__doodle" viewBox="0 0 80 60" aria-hidden="true">
          <path d="M20 50 C4 38 2 28 6 20 C10 12 20 12 24 22 C28 12 38 12 40 22 C42 30 34 40 20 50Z" />
          <path d="M56 40 C46 32 44 26 47 21 C50 16 56 16 58 22 C60 16 66 16 68 21 C70 26 66 32 56 40Z" />
        </svg>
        <Skyline class="hero__skyline" water />
      </div>
      <div class="hero__caption hero-in" style="--d: 0.4s">
        <p class="hero__names">
          {{ groom.short }} <span class="hero__amp">&amp;</span> {{ bride.short }}
        </p>
        <p class="hero__date">{{ dateShort }}</p>
      </div>
    </template>

    <!-- Code editor window for the developer themes -->
    <template v-else-if="theme.hero === 'code'">
      <p class="hero__kicker hero-in" style="--d: 0.1s">// приглашение на свадьбу</p>
      <h1 class="hero__names hero-in" style="--d: 0.3s">
        <span>{{ groom.short }}</span>
        <span class="hero__amp">&amp;</span>
        <span>{{ bride.short }}</span>
      </h1>
      <div class="code-card hero-in" style="--d: 0.55s">
        <div class="code-card__bar">
          <i /><i /><i />
          <span>wedding.config.ts</span>
        </div>
        <pre class="code-card__body"><code><span v-for="(line, i) in code" :key="i" class="code-card__line"><span v-for="(tok, j) in line" :key="j" :class="tok[0] && `syn-${tok[0]}`">{{ tok[1] }}</span><span v-if="i === code.length - 1" class="code-card__cursor" /></span></code></pre>
      </div>
      <p class="hero__date hero-in" style="--d: 0.8s">{{ dateShort }}</p>
      <p class="hero__city hero-in" style="--d: 0.9s">{{ city }}</p>
    </template>

    <!-- Postcard for the envelope theme -->
    <template v-else>
      <div class="postcard hero-in" style="--d: 0.1s">
        <div class="postcard__left">
          <p class="hero__kicker">Приглашение</p>
          <h1 class="hero__names">
            <span>{{ groom.short }}</span>
            <span class="hero__amp">&amp;</span>
            <span>{{ bride.short }}</span>
          </h1>
          <p class="hero__date">{{ dateShort }}</p>
        </div>
        <div class="postcard__right">
          <div class="postcard__stamp">
            <Skyline />
            <span>2027</span>
          </div>
          <svg class="postcard__postmark" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="pm-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <circle cx="60" cy="60" r="54" />
            <circle cx="60" cy="60" r="34" />
            <text><textPath href="#pm-circle">{{ postmark }}</textPath></text>
            <text x="60" y="66" text-anchor="middle" class="postcard__pm-center">15·08</text>
          </svg>
          <div class="postcard__lines">
            <span>Кому: самым близким</span>
            <span>Куда: {{ city }}</span>
            <span />
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
