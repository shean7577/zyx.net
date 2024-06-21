<template>
    <van-nav-bar :title="props.lan.position.nav" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">
        <!-- 宫格 -->
        <van-grid :column-num="2" :border="false" style="margin: 50px 0;" :gutter="10">
            <!-- 新建 -->
            <van-grid-item @click="router.push('/mgr/menu/add')" class="c-hand">
                <div class="-icon -icon-large -icon-menu-add"></div>
                <div class="mt-2">{{ props.lan['mgr-menu']['menu-add'] }}</div>
            </van-grid-item>
            <!-- 列表 -->
            <van-grid-item @click="router.push('/mgr/menu')" class="c-hand">
                <div class="-icon -icon-large -icon-menu-list"></div>
                <div class="mt-2">{{ props.lan['mgr-menu']['menu-list'] }}</div>
            </van-grid-item>
        </van-grid>

        <!-- 列表 -->
        <van-cell-group :border="false" style="border-radius: var(--R);overflow: hidden;">
            <!-- <van-cell :title="props.lan['member-data'].name" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.name" /> -->
        </van-cell-group>
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

    const menuList = ref([])

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

    const loadData = () => {
        com.api('menuList', {}).then(e => {
            if (e.status !== '10101') {
                props.doMessage({
                    show: true,
                    message: props.lan.information[7],
                    close: () => {
                        messageData.value.show = false;
                    }
                })
            }
            menuList.value = e.data;
        })
    }
</script>

<style></style>