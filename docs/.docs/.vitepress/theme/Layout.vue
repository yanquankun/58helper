<script setup>
// 导入默认主题
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";

const { page } = useData();
</script>

<template>
    <div v-if="page.isNotFound">页面未找到，请联系开发者</div>
    <DefaultTheme.Layout v-else />
</template>
<style>
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
    z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
    z-index: 9999;
}

.VPLocalNav {
    display: none;
}

.VPSwitchAppearance {
    width: 22px !important;
}

.VPSwitchAppearance .check {
    transform: none !important;
}
</style>
