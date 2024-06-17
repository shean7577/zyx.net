<template>
    <div class="foot-nav">
        <div class="handler text-center">
            <div class="-icon -icon-large -icon-arrow-up c-hand"></div>
        </div>
    </div>
</template>

<script setup>
</script>

<style>
    .foot-nav {
        height: 60px;
    }

    .foot-nav>.handler {
        display: flex;
        align-items: center;
    }

    .foot-nav>.handler>.-icon {
        flex: 1;
        vertical-align: middle;
        margin-top: 10px;
    }
</style>