import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false

Vue.use(require("vue-moment"));

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
