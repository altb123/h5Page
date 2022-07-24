<template>
    <div class="home-view">
        <!-- 元素表(element-list) -->
        <div class="element-view">
            <element-view></element-view>
        </div>

        <!-- 展示页 -->
        <div class="show-view">
            <show-view></show-view>
        </div>

        <!-- 控件 -->
        <div class="controller-view">
            <controller-view></controller-view>
        </div>
    </div>
</template>


<script setup lang="ts">
import elementView from './component/elementView.vue';
import showView from './component/showView.vue';
import controllerView from './component/controllerView.vue';
</script>

<style lang="scss" scope>
.home-view {
    display: flex;
    width: 100vw;
    height: 100vh;

    .element-view, .show-view, .controller-view {
        display: block;
        height: 100%;
    }

    .element-view {
        width: 15vw;
    }

    .show-view {
        width: 50vw;
        border-left: 1px solid #f1f1f1;
        border-right: 1px solid #f1f1f1;
    }

    .controller-view {
        width: 35vw;
    }
}
</style>