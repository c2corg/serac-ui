import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Position } from 'vue-router/types/router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import FourOFour from '../views/FourOFour.vue';

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
    component: () =>
      import(/* webpackChunkName: "reports" */ '@/views/ReportsView.vue'),
  },
  {
    path: '/reports/add',
    name: 'report-add',
    component: () =>
      import(/* webpackChunkName: "reports" */ '@/views/ReportEdit.vue'),
  },
  {
    path: '/reports/edit/:id',
    name: 'report-edit',
    component: () =>
      import(/* webpackChunkName: "reports" */ '@/views/ReportEdit.vue'),
  },
  {
    path: '/reports/:id',
    name: 'report',
    component: () =>
      import(/* webpackChunkName: "reports" */ '@/views/ReportView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '*',
    name: 'four-o-four',
    component: FourOFour,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to: Route, from: Route, savedPosition: void | Position) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
