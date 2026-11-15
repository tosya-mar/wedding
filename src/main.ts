import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import './styles/base.css'
import './styles/components.css'
import './styles/themes.css'
import './styles/themes-interactive.css'
import './styles/intros.css'

createApp(App).directive('reveal', vReveal).mount('#app')
