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
            <!-- 其他 -->
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

            <!-- 语言 -->
            <div class="text-center border-bottom" style="margin:50px 0 20px 0;">{{ props.lan['leftPanel'].language }}
            </div>
            <div class="btn-group btn-group-block" style="margin:30px 0;">
                <template v-for="(item, index) in com.cfg.lanList">
                    <div :class="lanCurrentName === item.file ? 'btn btn-theme' : 'btn btn-link text-gray'"
                        @click="() => { lanCurrentName = item.file; props.onlanguagechange(item.file); }">
                        {{ item.name }}
                    </div>
                </template>
            </div>

            <!-- 用户菜单 -->
            <template v-if="props.logsta.isLogin === true">
                <div class="text-center border-bottom" style="margin:50px 0 20px 0;">
                    {{ props.lan.leftPanel['already-login'] }} ({{ props.userData.name }})
                </div>
                <van-grid :column-num="2" :border="false" style="margin: 50px 0;">
                    <template v-for="(item, index) in com.cfg.userMenu">
                        <template v-if="!item.onlyMgr || userData.type === 'manager'">
                            <van-grid-item @click="() => {
        if (item.icon === 'exit') {
            props.doLogout()
        } else if (item.icon === 'reset') {
            resetSession()
        } else {
            item.onClick()
        }
    }" class="c-hand">
                                <div :class="'-icon -icon-large -icon-' + item.icon"></div>
                                <div class="mt-2">{{ props.lan.userMenu[index] }}</div>
                            </van-grid-item>
                        </template>
                        <template v-else>
                            <van-grid-item class="c-hand">
                                <div class="-icon -icon-large -icon-home"></div>
                                <div class="mt-2">{{ props.lan.userMenu[index] }}</div>
                            </van-grid-item>
                        </template>
                    </template>
                </van-grid>
            </template>
            <template v-else>
                <div class="text-center border-bottom" style="margin:50px 0 20px 0;">
                    {{ props.lan.leftPanel.login }}
                </div>
                <div class="text-center" style="margin-bottom: 30px;">
                    <div @click="props.doLogin">
                        <div class="-icon -icon-user -icon-large"></div>
                    </div>
                </div>
            </template>
        </div>
    </div>


</template>

<script setup>
    import { ref, defineProps } from 'vue'
    import router from "../router";
    import com from "../common/com"

    const lanCurrentName = ref(localStorage.getItem('lan'))

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

    const resetSession = () => {
        const cond = (localStorage.getItem('memberData') && localStorage.getItem('memberData').length > 10);
        if (cond) {
            localStorage.removeItem('memberData')
            props.doMessage({ show: true, message: props.lan.information[5] + '<br/>' + props.lan.information[8] })
        } else {
            props.doMessage({ show: true, message: props.lan.information[5] + '<br/>' + props.lan.information[9] })
        }
    }

</script>

<style></style>