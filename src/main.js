import 'primevue/resources/themes/aura-dark-amber/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Rating from 'primevue/rating'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'
import Skeleton from 'primevue/skeleton'

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Rating', Rating)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Paginator', Paginator)
app.component('Skeleton', Skeleton)

app.mount('#app')
