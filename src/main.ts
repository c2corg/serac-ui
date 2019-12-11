import './class-component-hooks';

import Vue, { CreateElement, VNode } from 'vue';
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

import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  faExpand,
  faBold,
  faItalic,
  faHeading,
  faListUl,
  faListOl,
  faEye,
  faCode,
  faCompress,
  faLink,
  faArrowUp,
  faTrash,
  faGlobeEurope,
  faUserFriends,
  faComments,
  faQuestionCircle,
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
  faPlus,
  faExpand,
  faBold,
  faItalic,
  faHeading,
  faListUl,
  faListOl,
  faEye,
  faCode,
  faCompress,
  faLink,
  faArrowUp,
  faTrash,
  faGlobeEurope,
  faUserFriends,
  faComments,
  faQuestionCircle
);

Vue.component('fa-icon', FontAwesomeIcon);

// this part resolve an issue where the markers would not appear
// delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.use(VueProgressBar, {
  color: '#f93',
});

const dompurifyOptions: Config = {
  FORBID_TAGS: ['style'],
  FORBID_ATTR: ['style'],
};
Vue.use(VueDOMPurifyHTML, dompurifyOptions);

Vue.use(Buefy, {
  defaultIconComponent: 'fa-icon',
  defaultIconPack: 'fas',
});

require('./assets/scss/main.scss');

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
