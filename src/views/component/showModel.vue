<template>
    <div id="view" class="view-body">
        <div v-for="(item, index) in elementView" :key="item.id" @click="handleSelect(index)"
            :class="['component-box', { 'active-item': index === activeIndex },]">
            <component :is="item.el" :key="item.id" :data="item.data" :isSelected="!isPreView && activeIndex === index">
            </component>
        </div>
    </div>
</template>

<script lang="ts">
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { deepClone } from '@/common/js/common';
import imgView from '../imgView/imgView.vue';
import swiperView from '../swiperView/swiperView.vue';
import formView from '../formView/formView.vue';

export default defineComponent({
    name: 'showModel',

    components: {
        imgView,
        swiperView,
        formView,
        ArrowDownBold,
        ArrowUpBold
    },

    props: {
        isPreView: {
            type: Boolean,
            default: false
        }
    },

    setup() {
        const store = useStore();

        const elementView = computed(() => {
            return store.state.elementView;
        });

        const activeElement = computed(() => {
            return store.state.activeElement;
        });

        const activeIndex = computed(() => {
            return store.state.activeIndex;
        });

        /**
         * @dedcript 点击选中回调
         * @param {Number} index 选中项下表
        */
        const handleSelect = (index: number) => {
            const elementViews = deepClone(elementView.value);
            const num = activeIndex.value;
            store.commit('setActiveIndex', num === index ? '' : index);
            store.commit('setActiveElement', num === index ? {} : elementViews[index]);
        }

        return {
            elementView,
            activeElement,
            activeIndex,
            handleSelect
        }
    }

});

</script>

<style lang="scss" scoped>
.show-view {
    height: 100vh;
    padding: 20px 0;

    .view-title {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .body-box {
        display: flex;
        width: 100%;
        height: calc(100% - 50px);
        justify-content: center;
        margin: 20px auto 0 auto;
    }

    .body-box::-webkit-scrollbar {
        display: none;
    }

    .view-body {
        display: block;
        width: 375px;
        height: 100%;
        max-height: 100%;
        border-radius: 6px;
        border: 1px solid #eee;
        overflow-y: auto;
    }

    .view-body::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
    }

    .body-control {
        width: 60px;
        height: 100%;
        margin-left: 20px;

        .el-button {
            margin-bottom: 10px;
        }
    }

    .active-item {
        box-shadow: inset 0 0 1px 1px rgba(64, 158, 255, .5);
    }
}
</style>