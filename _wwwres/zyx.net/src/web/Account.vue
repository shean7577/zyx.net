<template>
    <van-nav-bar :title="props.lan['mgr-menu'].account" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">
        333

    </div>
</template>

<script setup>
    import { ref, defineProps } from 'vue'
    import router from "../router";
    import com from "../common/com"

    const props = defineProps({
        lan: Object,
        logsta: Boolean,
        theme: Object,
        device: Object
    })
</script>

<style></style>