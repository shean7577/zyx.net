<template>
    <van-nav-bar :title="props.lan['mgr-menu'].account" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">
        <van-cell-group :border="false" style="border-radius: var(--R);overflow: hidden;">
            <van-cell :title="props.lan['member-data'].name" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.name" />
            <van-cell :title="props.lan['member-data'].integral" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.integral" />
            <van-cell :title="props.lan['member-data'].level" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.level" />
            <van-cell :title="props.lan['member-data'].mail" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.mail" />
            <van-cell :title="props.lan['member-data'].site" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.site" />
        </van-cell-group>
    </div>
</template>

<script setup>
    import { ref, defineProps, onMounted } from 'vue'
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



    const fullMemberData = ref({})

    const getMemberData = () => {
        com.api('memberData', { id: props.userData.id }).then(e => {
            if (e.status !== '10101') {
                props.doMessage({
                    show: true,
                    message: props.lan.information[7],
                    close: () => {
                        messageData.value.show = false;
                    }
                })
            }
            fullMemberData.value = e.data;
        })
    }

    onMounted(() => {
        getMemberData();
    })
</script>

<style></style>