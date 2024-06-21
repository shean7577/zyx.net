<template>
    <van-nav-bar :title="props.lan.position['mgrMember-detail']" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">
        <van-cell-group :border="false" style="border-radius: var(--R);overflow: hidden;">
            <!-- 账户 -->
            <van-cell :title="props.lan['member-data'].name" title-style="color:var(--A)" :border="false"
                :value="fullMemberData.name" />
            <!-- 积分 -->
            <van-field v-model="fullMemberData.integral" type="number" :label="props.lan['member-data'].integral"
                input-align="right" />
            <!-- 等级 -->
            <van-field v-model="fullMemberData.level" type="number" :label="props.lan['member-data'].level"
                input-align="right" />
            <!-- 邮件 -->
            <van-field v-model="fullMemberData.mail" :label="props.lan['member-data'].mail" input-align="right" />
            <!-- 网站 -->
            <van-field v-model="fullMemberData.site" :label="props.lan['member-data'].site" input-align="right" />
        </van-cell-group>

        <div class="columns">
            <div class="column col-10" style="margin:30px auto;">
                <div class="btn btn-theme btn-block" @click="updateMemberData">
                    {{ props.lan['action']['submit'] }}
                </div>
            </div>
        </div>
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

    const ID = ref("")
    const fullMemberData = ref({})

    onMounted(() => {
        chkSession()
        let v = com.bas.pageInput('id')
        if (v === false) {
            router.push('/mgr/member')
            props.doMessage({ show: true, message: props.lan.information[11] })
        } else {
            ID.value = v
            getMemberData()
        }
    })

    watch(() => props.logsta.logsta, () => {
        chkSession()
    })

    const chkSession = () => {
        if (props.logsta.logsta === false) {
            router.push('/')
        }
    }

    const getMemberData = () => {
        com.api('memberData', { id: ID.value }).then(e => {
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

    const updateMemberData = () => {
        let fd = fullMemberData.value
        fd.level = parseInt(fullMemberData.value.level)
        fd.integral = parseInt(fullMemberData.value.integral)
        fd.id = ID.value
        com.api('memberUpdate', fullMemberData.value).then(e => {
            props.doMessage({
                show: true,
                message: props.lan.information[e.status === '10101' ? 8 : 7]
            })
        })
    }
</script>

<style></style>