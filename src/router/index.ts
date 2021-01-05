import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import User from "@view/account/user.vue";
import BaseRouters from "./modules/base";
const routes: Array<RouteRecordRaw> = [
    ...BaseRouters,
    {
        path: "/mine/user",
        name: "user",
        component: User
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
