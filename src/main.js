import { createApp } from 'vue'
import App from '@/App.vue'
import '@/main.css'
import router from '@/router.js'
import $ from 'jquery'

window.$ = window.jQuery = $
await import('bootstrap/dist/js/bootstrap.bundle.min.js')
await import('admin-lte/dist/js/adminlte.min.js')

createApp(App).use(router).mount('#app')
