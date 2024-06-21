<template>
    <van-nav-bar :title="props.lan.position.mgr" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">

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