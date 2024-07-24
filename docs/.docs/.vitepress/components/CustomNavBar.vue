<script lang="ts" setup>
import { ref } from "vue";
import { useData } from "vitepress";

const { page } = useData();
const classes = ref<Record<string, boolean>>({});
</script>

<template>
    <div class="VPNavBar" :class="classes">
        <div class="wrapper">
            <div class="container">
                <div class="title">
                    {{ page.titleTemplate }}
                </div>

                <div class="content">123</div>

                <div class="title">
                    {{ page.description }}
                </div>
            </div>
        </div>

        <div class="divider">
            <div class="divider-line" />
        </div>
    </div>
</template>

<style scoped>
.VPNavBar {
    position: relative;
    height: var(--vp-nav-height);
    pointer-events: none;
    white-space: nowrap;
    transition: background-color 0.25s;
}

.VPNavBar.screen-open {
    transition: none;
    background-color: var(--vp-nav-bg-color);
    border-bottom: 1px solid var(--vp-c-divider);
}

.VPNavBar:not(.home) {
    background-color: var(--vp-nav-bg-color);
}

.wrapper {
    padding: 0 24px 0 24px;
}

.container {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: calc(var(--vp-layout-max-width) - 64px);
    height: var(--vp-nav-height);
    pointer-events: none;
}

.container > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: -0.02em;
    line-height: 32px;
    font-size: 24px;
    font-weight: 600;
}

.container > .title,
.container > .content {
    pointer-events: none;
}

.container :deep(*) {
    pointer-events: auto;
}

.title {
    flex-shrink: 0;
    height: calc(var(--vp-nav-height) - 1px);
    transition: background-color 0.5s;
}

.content {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
}

.divider {
    width: 100%;
    height: 1px;
}

.divider-line {
    width: 100%;
    height: 1px;
    transition: background-color 0.5s;
}

.VPNavBar:not(.home) .divider-line {
    background-color: var(--vp-c-gutter);
}
</style>
