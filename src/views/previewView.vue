<template>
    <div class="preview-box" :style="{width: `${bodyWidth}px`}">
        <show-model :isPreView="true" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import showModel from './component/showModel.vue';

const store = useStore();

const bodyWidth = computed(() => {
    return store.state.viewBodyWidth;
});
</script>

<style scoped lang="scss">
.preview-box {
    margin: 0 auto;
    overflow-x: hidden;
    border: 1px solid #909399;
}
</style>