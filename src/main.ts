import './class-component-hooks';

import Vue, { CreateElement, VNode } from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
