import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RouterList from './view';

const routes: Array<RouteRecordRaw> = [
  ...RouterList
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
