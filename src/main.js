import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'moment'

/* import  'vee-validate/dist/vee-validate.full.esm' */



const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)
app.mount('#app')

