import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Reports from '../views/Reports.vue';
import Report from '../views/Report.vue';
import ReportEdit from '../views/ReportEdit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports,
  },
  {
    path: '/reports/:id(\\d+)',
    name: 'report',
    component: Report,
  },
  {
    path: '/reports/edit/:id(\\d+)',
    name: 'report-edit',
    component: ReportEdit,
  },
  {
    path: '/reports/add',
    name: 'report-add',
    component: ReportEdit,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
