import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/filters'

import App from './App.vue'
import moment from 'moment'

Vue.config.productionTip = false
moment.suppressDeprecationWarnings = true;
moment.locale('de');

new Vue({
  render: h => h(App)
}).$mount('#app')
