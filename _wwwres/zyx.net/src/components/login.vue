<template>
    <div v-if="props.show === true" class="-window -window-login">
        <div class="inner">
            <div style="margin:20px;">
                <div class="text-bold text-large mb-2">{{ props.text[0] }}</div>
                <div class="form-group">
                    <input class="form-input" type="text" :placeholder="props.text[1]" v-model="formData.name">
                </div>
                <div class="form-group">
                    <input class="form-input" type="password" :placeholder="props.text[2]" v-model="formData.pswd">
                </div>
                <div class="form-group">
                    <label class="form-switch">
                        <input type="checkbox" v-model="formData.keepSession">
                        <i class="form-icon"></i> {{ props.text[5] }}
                    </label>
                </div>
            </div>

            <div class="-window-panel" style="height:45px;">
                <div class="item">
                    <div class="-window-btn" @click="() => { props.submit(formData); clearData(); props.cancle(); }">
                        {{ props.text[3] }}
                    </div>
                </div>
                <div class="item">
                    <div class="-window-btn" @click="props.cancle">{{ props.text[4] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, defineProps } from 'vue'
    const props = defineProps({
        show: Boolean,
        submit: Function,
        text: Array,
        cancle: Function
    })
    const clearData = () => {
        formData.value = { name: "", pswd: "", keepSession: false }
    }

    const formData = ref({
        name: "",
        pswd: "",
        keepSession: false
    })
</script>

<style></style>