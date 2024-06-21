<template>
    <van-nav-bar :title="props.lan.position.mgrMember" :left-text="props.lan.position.back" left-arrow
        @click-left="() => { router.go(-1) }" />
    <div class="page-scroll-box">
        <van-list v-model:loading="loading" :finished="finished" :finished-text="props.lan.information[10]"
            @load="getMemberList">
            <van-cell v-for="item in memberList" title-style="color:var(--A)" :border="false" is-link
                :to="'/mgr/member/detail?id=' + item.id">
                <template #title>
                    <span class="custom-title">{{ item.name }}</span>
                    <span class="badge" v-if="item.type === 'manager'"></span>
                </template>
                <template #right-icon>
                    <span class="chip">
                        {{ item.level + ' / ' + item.integral }}
                    </span>
                </template>
            </van-cell>
        </van-list>
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

    const currentPage = ref(0)
    const pageSize = ref(5)
    const memberList = ref([])
    const loading = ref(false)
    const finished = ref(false)

    onMounted(() => {
        chkSession()
        getMemberList()
    })

    watch(() => props.logsta.logsta, () => {
        chkSession()
    })

    const chkSession = () => {
        if (props.logsta.logsta === false) {
            router.push('/')
        }
    }

    const getMemberList = () => {
        loading.value = true
        currentPage.value += 1;
        com.api('memberList', { currentPage: currentPage.value, pageSize: pageSize.value }).then(e => {
            loading.value = false
            if (e.status !== '10101') {
                props.doMessage({
                    show: true,
                    message: props.lan.information[7]
                })
                finished.value = true
            }
            memberList.value = e.data;
            if (e.data.length < pageSize.value) finished.value = true
        })
    }
</script>

<style></style>