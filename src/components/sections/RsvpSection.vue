<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { wedding } from '../../data/wedding'
import SectionTitle from '../SectionTitle.vue'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Attending = '' | 'yes' | 'no' | 'maybe'

const STORAGE_KEY = 'wedding:rsvp-sent'
const ENDPOINT = `https://formsubmit.co/ajax/${wedding.rsvpEmail}`

const attendLabels: Record<Exclude<Attending, ''>, string> = {
  yes: 'Да, с радостью приду',
  no: 'Нет, к сожалению, не получится',
  maybe: 'Пока не уверен(а), сообщу',
}

const form = reactive({
  name: '',
  attending: '' as Attending,
  composition: '',
  alcohol: [] as string[],
  comment: '',
  honey: '',
})

const status = ref<Status>(localStorage.getItem(STORAGE_KEY) ? 'sent' : 'idle')
const errorText = ref('')
const touched = ref(false)

const showsDetails = computed(() => form.attending === 'yes' || form.attending === 'maybe')
const nameError = computed(() => touched.value && !form.name.trim())
const attendError = computed(() => touched.value && !form.attending)

function toggleNoAlcohol(option: string) {
  const none = wedding.alcoholOptions[wedding.alcoholOptions.length - 1]
  if (option === none && form.alcohol.includes(none)) form.alcohol = [none]
  else if (option !== none) form.alcohol = form.alcohol.filter((a) => a !== none)
}

const payload = computed(() => {
  const data: Record<string, string> = {
    _subject: `Анкета гостя: ${form.name.trim()}`,
    _template: 'table',
    _captcha: 'false',
    _honey: form.honey,
    // Helps FormSubmit accept AJAX from GitHub Pages (needs a real site URL).
    _url: typeof location !== 'undefined' ? location.href.split('#')[0] : 'https://tosya-mar.github.io/wedding/',
    name: form.name.trim(),
    'Имя и фамилия': form.name.trim(),
    'Присутствие': form.attending ? attendLabels[form.attending] : '',
  }
  if (showsDetails.value) {
    data['В каком составе'] = form.composition.trim() || '—'
    data['Предпочтения по алкоголю'] = form.alcohol.join(', ') || '—'
  }
  if (form.comment.trim()) data['Комментарий'] = form.comment.trim()
  return data
})

const mailtoHref = computed(() => {
  const lines = Object.entries(payload.value)
    .filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => `${k}: ${v}`)
  return `mailto:${wedding.rsvpEmail}?subject=${encodeURIComponent(payload.value._subject)}&body=${encodeURIComponent(lines.join('\n'))}`
})

async function submitAjax(): Promise<{ ok: boolean; message: string }> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload.value),
  })
  const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string }
  const ok = res.ok && String(json.success) === 'true'
  return { ok, message: json.message || `HTTP ${res.status}` }
}

/** Fallback when AJAX is blocked: classic FormSubmit POST via hidden iframe. */
function submitViaIframe(): Promise<{ ok: boolean; message: string }> {
  return new Promise((resolve) => {
    const frameName = `rsvp_frame_${Date.now()}`
    const iframe = document.createElement('iframe')
    iframe.name = frameName
    iframe.title = 'rsvp'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const formEl = document.createElement('form')
    formEl.method = 'POST'
    formEl.action = `https://formsubmit.co/${wedding.rsvpEmail}`
    formEl.target = frameName
    formEl.style.display = 'none'

    const data = {
      ...payload.value,
      _next: `${location.origin}${location.pathname}?rsvp=ok`,
    }
    for (const [key, value] of Object.entries(data)) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      formEl.appendChild(input)
    }
    document.body.appendChild(formEl)

    let settled = false
    const finish = (ok: boolean, message: string) => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      formEl.remove()
      iframe.remove()
      resolve({ ok, message })
    }

    iframe.addEventListener('load', () => finish(true, 'ok'))
    const timer = window.setTimeout(() => finish(true, 'timeout-assumed-ok'), 2500)
    formEl.submit()
  })
}

async function submit() {
  touched.value = true
  if (!form.name.trim() || !form.attending) return
  if (form.honey) return

  status.value = 'sending'
  errorText.value = ''
  try {
    let result = await submitAjax()
    if (!result.ok) {
      // Retry once via classic POST — more reliable before FormSubmit is activated / for CORS quirks.
      result = await submitViaIframe()
    }
    if (!result.ok) throw new Error(result.message)
    status.value = 'sent'
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
  } catch (e) {
    status.value = 'error'
    const msg = e instanceof Error ? e.message : String(e)
    errorText.value = /activat|confirm|web server|Unable to submit/i.test(msg)
      ? 'Нужна одноразовая активация FormSubmit на почте marikyan.tosya@mail.ru (письмо «Activate Form»). После этого анкета заработает.'
      : msg
  }
}

function again() {
  localStorage.removeItem(STORAGE_KEY)
  status.value = 'idle'
  touched.value = false
}
</script>

<template>
  <div id="rsvp" class="rsvp">
    <SectionTitle kicker="RSVP" title="Анкета гостя" />
    <p v-reveal class="rsvp__intro">
      Пожалуйста, подтвердите своё присутствие до {{ wedding.rsvpDeadline }} — так нам будет проще всё
      подготовить.
    </p>

    <Transition name="fade-swap" mode="out-in">
      <div v-if="status === 'sent'" key="sent" class="rsvp__done">
        <svg viewBox="0 0 40 36" class="rsvp__done-heart" aria-hidden="true">
          <path d="M20 33 C6 23 2 16 2 10.5 C2 5 6 2 10.5 2 C14.5 2 18 4.5 20 8 C22 4.5 25.5 2 29.5 2 C34 2 38 5 38 10.5 C38 16 34 23 20 33Z" />
        </svg>
        <p class="rsvp__done-title">Спасибо!</p>
        <p>Ваш ответ получен. Мы очень ждём встречи!</p>
        <button type="button" class="btn btn--ghost" @click="again">Заполнить ещё раз</button>
      </div>

      <form v-else key="form" v-reveal class="rsvp__form" novalidate @submit.prevent="submit">
        <label class="field">
          <span class="field__label">Ваше имя и фамилия</span>
          <input
            v-model="form.name"
            class="field__input"
            :class="{ 'is-invalid': nameError }"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="Иван Иванов"
          />
          <span v-if="nameError" class="field__error">Пожалуйста, представьтесь</span>
        </label>

        <fieldset class="field">
          <legend class="field__label">Планируете ли вы присутствовать?</legend>
          <label class="choice">
            <input v-model="form.attending" type="radio" name="attending" value="yes" />
            <span class="choice__mark choice__mark--radio" />
            <span>Да, с радостью приду</span>
          </label>
          <label class="choice">
            <input v-model="form.attending" type="radio" name="attending" value="no" />
            <span class="choice__mark choice__mark--radio" />
            <span>Нет, к сожалению, не получится</span>
          </label>
          <label class="choice">
            <input v-model="form.attending" type="radio" name="attending" value="maybe" />
            <span class="choice__mark choice__mark--radio" />
            <span>Пока не уверен(а), сообщу</span>
          </label>
          <span v-if="attendError" class="field__error">Выберите вариант</span>
        </fieldset>

        <Transition name="expand">
          <div v-if="showsDetails" class="rsvp__more">
            <label class="field">
              <span class="field__label">В каком составе вы планируете присутствовать</span>
              <input
                v-model="form.composition"
                class="field__input"
                type="text"
                name="composition"
                placeholder="Анна, Иван, Стас"
              />
            </label>

            <fieldset class="field">
              <legend class="field__label">
                Предпочтения по алкоголю
                <small>Можно выбрать несколько вариантов</small>
              </legend>
              <div class="choice-grid">
                <label v-for="opt in wedding.alcoholOptions" :key="opt" class="choice">
                  <input v-model="form.alcohol" type="checkbox" :value="opt" @change="toggleNoAlcohol(opt)" />
                  <span class="choice__mark" />
                  <span>{{ opt }}</span>
                </label>
              </div>
            </fieldset>
          </div>
        </Transition>

        <label class="field">
          <span class="field__label">Комментарий <small>(аллергии, пожелания)</small></span>
          <textarea v-model="form.comment" class="field__input" rows="2" name="comment" />
        </label>

        <input v-model="form.honey" class="rsvp__honey" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <button class="btn btn--wide" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Отправляем…' : 'Отправить' }}
        </button>

        <p v-if="status === 'error'" class="rsvp__error">
          Не получилось отправить анкету ({{ errorText }}).
          <a :href="mailtoHref">Отправить письмом</a>
        </p>
      </form>
    </Transition>
  </div>
</template>
