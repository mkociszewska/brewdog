import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    meta: { darkMode: false },
    component: () => import(/* webpackChunkName: "catalogue" */ '../views/Catalogue.vue'),
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import(/* webpackChunkName: "favourites" */ '../views/Favourites.vue'),
  },
  {
    path: '/deciding',
    name: 'HardTimeDeciding',
    meta: { darkMode: false },
    component: () => import(/* webpackChunkName: "deciding  " */ '../views/HardTimeDeciding.vue'),
  },
  {
    path: '/strongest',
    name: 'StrongestBeers',
    meta: { containerSmall: true },
    component: () => import(/* webpackChunkName: "strongest" */ '../views/StrongestBeers.vue'),
  },
  {
    path: '/mildest',
    name: 'MildestBeers',
    meta: { containerSmall: true },
    component: () => import(/* webpackChunkName: "mildest" */ '../views/MildestBeers.vue'),
  },
  {
    path: '/compromise',
    name: 'CompromiseBeers',
    meta: { containerSmall: true },
    component: () => import(/* webpackChunkName: "compromise" */ '../views/CompromiseBeers.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

});

export default router;
