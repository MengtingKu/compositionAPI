import './assets/main.css'
import "./assets/all.scss";
import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(XEUtils, VXEUtils)

app.mount('#app')
