import { RouteRecordRaw } from "vue-router";

const RouterList: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => import ('../views/IndexView.vue')
    },
    {
        path: '/preview',
        name: 'preview',
        component: () => import ('../views/previewView.vue')
    },
];

export default RouterList;