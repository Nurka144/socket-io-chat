import { createApp } from 'vue'
import App from './App.vue'
import { io } from 'socket.io-client'
import axios from 'axios'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const socketio = io('ws://localhost:3000', {
    "force new connection": true,
    "reconnectionAttempts": "Infinity", 
    "timeout": 10001, 
    "transports": ["websocket"]
})

const app = createApp(App)
app.config.globalProperties.$http = axios;
app.use(store)
app.mount('#app')

