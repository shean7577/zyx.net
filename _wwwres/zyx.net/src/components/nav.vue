<template>
    <van-nav-bar :title="props.lan.position.nav" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />

    <div class="page-scroll-box">
        <!-- 公用 -->
        <div>
            <van-grid :column-num="2" :border="false" style="margin: 50px 0;">
                <van-grid-item @click="router.push('/')" class="c-hand">
                    <div class="-icon -icon-large -icon-home"></div>
                    <div class="mt-2">{{ props.lan.position.home }}</div>
                </van-grid-item>
                <van-grid-item @click="router.push('/blog')" class="c-hand">
                    <div class="-icon -icon-large -icon-blog"></div>
                    <div class="mt-2">{{ props.lan.position.blog }}</div>
                </van-grid-item>
                <van-grid-item @click="router.push('/media')" class="c-hand">
                    <div class="-icon -icon-large -icon-media"></div>
                    <div class="mt-2">{{ props.lan.position.media }}</div>
                </van-grid-item>
                <van-grid-item @click="router.push('/lab')" class="c-hand">
                    <div class="-icon -icon-large -icon-lab"></div>
                    <div class="mt-2">{{ props.lan.position.lab }}</div>
                </van-grid-item>
            </van-grid>
        </div>

        <!-- 移动端才显示 -->
        <div class="show-md">
            <div class="text-center border-bottom" style="margin:50px 0 20px 0;">{{ props.lan['device-menu'].other }}
            </div>
            <van-grid :column-num="2" :border="false" style="margin-bottom:50px;">
                <!-- 主题 -->
                <van-grid-item>
                    <div :class="props.theme.icon"></div>
                    <div class="mt-2 text-small">{{ props.lan['device-menu'].theme }}</div>
                    <div class="text-uppercase text-bold">{{ props.theme.text }}</div>
                </van-grid-item>
                <!-- 设备 -->
                <van-grid-item>
                    <div :class="props.device.icon"></div>
                    <div class="mt-2 text-small">{{ props.lan['device-menu'].device }}</div>
                    <div class="text-uppercase text-bold">{{ props.device.text }}</div>
                </van-grid-item>
            </van-grid>
        </div>

        <!-- img cover -->
        <div class="text-center">
            <van-image style="filter:opacity(.3) grayscale(1)" height="30vh" :round="true" fit="contain"
                :src="com.bas.getPath('images/menu.png')" />
            <div class="text-gray">{{ com.cfg.siteName }}</div>
            <div class="text-gray text-small">{{ com.cfg.siteURL }}</div>
        </div>

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