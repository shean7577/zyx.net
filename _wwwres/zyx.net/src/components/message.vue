<template>
    <div v-if="props.show === true" class="-window">
        <div class="inner">
            <div class="scroll-box" v-html="props.message" style="height:calc(100% - 65px);margin:10px;"></div>
            <div class="-window-panel" style="height:45px;">
                <template v-for="item in props.buttons">
                    <div class="item">
                        <div class="-window-btn" @click="item.onClick()">{{ item.text }}</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted } from 'vue';
    const props = defineProps({
        message: String,
        show: Boolean,
        buttons: Array,
        close: Function
    })
</script>

<style></style>