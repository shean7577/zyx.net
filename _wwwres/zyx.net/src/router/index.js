import { createRouter, createWebHistory } from "vue-router";

// 用户页面
import webHome from "../web/Home.vue"
import nav from "../components/nav.vue"
import blog from "../web/Blog.vue"
import media from "../web/Media.vue"
import lab from "../web/Lab.vue"
import account from "../web/Account.vue"
import settings from "../web/Settings.vue"

// 管理页面
import mgrHome from "../mgr/Home.vue"
import mgrMember from "../mgr/Member.vue"
import gmrMemberDetail from "../mgr/member-detail.vue"
import gmrMenu from "../mgr/Menu.vue"
import gmrMenuAdd from "../mgr/menu-add.vue"

const routes = [
    //首页
    {
        path: "/",
        name: "webHome",
        component: webHome
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
    //管理首页
    {
        path: "/mgr",
        name: "mgrHome",
        component: mgrHome
    },
    //管理会员页
    {
        path: "/mgr/member",
        name: "mgrMenber",
        component: mgrMember
    },
    //会员详情
    {
        path: "/mgr/member/detail",
        name: "mgrMemberDetail",
        component: gmrMemberDetail
    },
    //分类管理
    {
        path: "/mgr/menu",
        name: "mgrMenu",
        component: gmrMenu
    },
    // 分类新增
    {
        path: "/mgr/menu/add",
        name: "mgrMenuAdd",
        component: gmrMenuAdd
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

