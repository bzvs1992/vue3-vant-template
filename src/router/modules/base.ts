/**
 * 基础路由
 */
import { RouteRecordRaw } from "vue-router";
import Tabbar from "@view/tabbar/index.vue";
import Home from "@view/tabbar/home.vue";
import Intro from "@view/tabbar/intro.vue";
import Publish from "@view/tabbar/publish.vue";
import Discover from "@view/tabbar/discover.vue";
import Mine from "@view/tabbar/mine.vue";
const BASE_ROUTERS: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "tabbar",
        component: Tabbar,
        redirect: { name: "home" },
        children: [
            {
                path: "home",
                name: "home",
                component: Home
            },
            {
                path: "intro",
                name: "intro",
                component: Intro
            },
            {
                path: "publish",
                name: "publish",
                component: Publish
            },
            {
                path: "discover",
                name: "discover",
                component: Discover
            },
            {
                path: "mine",
                name: "mine",
                component: Mine
            }
        ]
    },
    {
        path: "/account",
        name: "account",
        redirect: { name: "login" },
        component: () =>
            import(
                /* webpackChunkName: "account" */ `@/views/account/index.vue`
            ),
        children: [
            {
                path: "login",
                name: "login",
                component: () =>
                    import(
                        /* webpackChunkName: "account" */ `@/views/account/login.vue`
                    )
            }
        ]
    }
];

export default BASE_ROUTERS;
