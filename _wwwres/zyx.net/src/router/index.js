import { createRouter, createWebHistory } from "vue-router";

import webHome from "../web/Home.vue"
import mgrHome from "../mgr/Home.vue"
import nav from "../components/nav.vue"
import blog from "../web/Blog.vue"
import media from "../web/Media.vue"
import lab from "../web/Lab.vue"
import account from "../web/Account.vue"
import settings from "../web/Settings.vue"
const routes = [
    //首页
    {
        path: "/",
        name: "webHome",
        component: webHome
    },
    //管理首页
    {
        path: "/mgr",
        name: "mgrHome",
        component: mgrHome
    },
    //导航页
    {
        path: "/nav",
        name: "nav",
        component: nav
    },
    //博客首页
    {
        path: "/blog",
        name: "blog",
        component: blog
    },
    //媒体首页
    {
        path: "/media",
        name: "media",
        component: media
    },
    //实验室首页
    {
        path: "/lab",
        name: "lab",
        component: lab
    },
    //我的账户
    {
        path: "/account",
        name: "account",
        component: account
    },
    //系统设置
    {
        path: "/settings",
        name: "settings",
        component: settings
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

