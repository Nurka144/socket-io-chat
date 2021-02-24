import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)
app.config.globalProperties.$http = axios;
app.use(store)
app.mount('#app')

