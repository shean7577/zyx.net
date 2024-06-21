<template>
    <van-nav-bar :title="props.lan.position.home" />
    <div class="page-scroll-box">
        333

    </div>
</template>

<script setup>
    import { ref, defineProps } from 'vue'
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
</script>

<style></style>