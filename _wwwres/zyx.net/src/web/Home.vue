<template>
    <van-nav-bar :title="com.cfg.siteName" />
    <div class="page-scroll-box">
        333

    </div>
</template>

<script setup>
    import { ref, defineProps } from 'vue'
    import com from "../common/com"

    const props = defineProps({
        lan: Object,
        logsta: Boolean,
        theme: Object,
        device: Object
    })
</script>

<style></style>