import Vue from 'vue'
import router from '@/router';
import App from './App';
// px转rem
import 'lib-flexible';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
