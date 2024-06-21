<template>
    <van-nav-bar :title="props.lan.position.mgr" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">
        <van-grid :column-num="2" :border="false" style="margin: 50px 0;" :gutter="10">
            <!-- 网站预览 -->
            <van-grid-item @click="router.push('/')" class="c-hand">
                <div class="-icon -icon-large -icon-home"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].home }}</div>
            </van-grid-item>
            <!-- 用户管理 -->
            <van-grid-item @click="router.push('/mgr/member')" class="c-hand">
                <div class="-icon -icon-large -icon-user"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].user }}</div>
            </van-grid-item>
            <!-- 栏目管理 -->
            <van-grid-item @click="router.push('/mgr/menu')" class="c-hand">
                <div class="-icon -icon-large -icon-menu"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].menu }}</div>
            </van-grid-item>
            <!-- 文章管理 -->
            <van-grid-item @click="router.push('/mgr/blog')" class="c-hand">
                <div class="-icon -icon-large -icon-archive"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].archive }}</div>
            </van-grid-item>
            <!-- 链接管理 -->
            <van-grid-item @click="router.push('/mgr/link')" class="c-hand">
                <div class="-icon -icon-large -icon-link"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].link }}</div>
            </van-grid-item>
            <!-- 相册管理 -->
            <van-grid-item @click="router.push('/mgr/photo')" class="c-hand">
                <div class="-icon -icon-large -icon-photo"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].photo }}</div>
            </van-grid-item>
            <!-- 我的账户 -->
            <van-grid-item @click="router.push('/account')" class="c-hand">
                <div class="-icon -icon-large -icon-account"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].account }}</div>
            </van-grid-item>
            <!-- 系统设置 -->
            <van-grid-item @click="router.push('/settings')" class="c-hand">
                <div class="-icon -icon-large -icon-setup"></div>
                <div class="mt-2">{{ props.lan['mgr-menu'].setup }}</div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script setup>
    import { ref, defineProps, watch, onMounted } from 'vue'
    import router from "../router";
    import com from "../common/com"

    const props = defineProps({
        lan: Object,
        logsta: Object,
        theme: Object,
        device: Object,
        userData: Object,
        doMessage: Function,
        onlanguagechange: Function,
        doLogin: Function,
        doLogout: Function
    })

    onMounted(() => {
        chkSession()
    })

    watch(() => props.logsta.logsta, () => {
        chkSession()
    })
    const chkSession = () => {
        if (props.logsta.logsta === false) {
            router.push('/')
        }
    }
</script>

<style></style>