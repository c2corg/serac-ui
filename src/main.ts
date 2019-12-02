import './class-component-hooks';

import Vue, { CreateElement, VNode } from 'vue';
import VueI18n from 'vue-i18n';
import VueProgressBar from 'vue-progressbar';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { Config } from 'dompurify';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import i18n from './i18n';

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
import {
  faExclamationCircle,
  faAngleLeft,
  faAngleRight,
  faCalendar,
  faEdit,
  faUpload,
  faInfo,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

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
  via_ferrata,

  faExclamationCircle,
  faAngleLeft,
  faAngleRight,
  faCalendar,
  faEdit,
  faUpload,
  faInfo,
  faPlus
);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.use(VueProgressBar, {});
const dompurifyOptions: Config = {
  FORBID_TAGS: ['style'],
  FORBID_ATTR: ['style'],
};
Vue.use(VueDOMPurifyHTML, dompurifyOptions);

//! FIXME optimize import, using only required components
Vue.use(Buefy, {
  defaultIconComponent: 'fa-icon',
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
