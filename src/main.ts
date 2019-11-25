import './class-component-hooks';

import Vue, { CreateElement, VNode } from 'vue';
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';

import {
  hiking,
  ice_climbing,
  mountain_biking,
  mountain_climbing,
  paragliding,
  rock_climbing,
  skitouring,
  slacklining,
  snowshoeing,
  snow_ice_mixed,
  via_ferrata,
} from '@/assets/font-awesome-custom/js/activity';

library.add(
  hiking,
  ice_climbing,
  mountain_biking,
  mountain_climbing,
  paragliding,
  rock_climbing,
  skitouring,
  slacklining,
  snowshoeing,
  snow_ice_mixed,
  via_ferrata
);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
