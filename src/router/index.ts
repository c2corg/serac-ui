import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import Home from '../views/Home.vue';
import ReportsView from '../views/ReportsView.vue';
import ReportView from '../views/ReportView.vue';
import ReportEdit from '../views/ReportEdit.vue';
import { Position } from 'vue-router/types/router';

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
    component: ReportsView,
  },
  {
    path: '/reports/add',
    name: 'report-add',
    component: ReportEdit,
  },
  {
    path: '/reports/edit/:id',
    name: 'report-edit',
    component: ReportEdit,
  },
  {
    path: '/reports/:id',
    name: 'report',
    component: ReportView,
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
  scrollBehavior: (to: Route, from: Route, savedPosition: void | Position) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
