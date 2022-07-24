<template>
    <div class="show-view">
        <div class="view-title">
            低代码实现h5落地页
        </div>

        <!-- 展示主体 -->
        <div class="body-box">
            <show-model />

            <!-- body控件 -->
            <div class="body-control">
                <!-- body选中按钮 -->
                <el-popover v-model:visible="bodyWidthShow" placement="right" trigger="click" :width="200">
                    <template #reference>
                        <el-button @click="bodyWidthShow = true">Body</el-button>
                    </template>
                    <div class="view-body">
                        <div>可设置预览频宽为：</div>
                        <el-input-number class="view-body-input"  v-model="viewWidth" :min="1" :max="1024" />
                    </div>
                    <div style="text-align: right; margin: 10px 0 0 0; ">
                        <el-button size="small" text @click="closeBodyRef">取消</el-button>
                        <el-button size="small" type="primary" @click="closeBodyRef(true)">确定</el-button>
                    </div>
                </el-popover>

                <el-button @click="handlePreview">预 览</el-button>

                <!-- 元素上移按钮 -->
                <el-button circle @click="handleUpMove">
                    <el-icon>
                        <ArrowUpBold />
                    </el-icon>
                </el-button>
                <!-- 元素下移按钮 -->
                <el-button circle @click="handleDownMove">
                    <el-icon>
                        <ArrowDownBold />
                    </el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
import { defineComponent, ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import { deepClone } from '@/common/js/common';
import showModel from './showModel.vue';
import router from '@/router/index';

export default defineComponent({
    name: 'showView',

    components: {
        showModel,
        ArrowDownBold,
        ArrowUpBold
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

        const viewBodyWidth = computed(() => {
            return store.state.viewBodyWidth;
        });

        const viewWidth = ref(viewBodyWidth);

        const bodyWidthShow = ref(false);

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

        /**
         * @description 上移回调
        */
        const handleUpMove = () => {
            const index = activeIndex.value;
            if (index === '' || index === undefined || index < 1) { return };
            const arr = deepClone(elementView.value);
            const active = arr.splice(index, 1, arr[index - 1]);
            arr.splice(index - 1, 1, ...active);
            store.commit('setActiveElement', ...active);
            store.commit('setElementList', arr);
            store.commit('setActiveIndex', index - 1);
        };

        /**
         * @description 下移回调
        */
        const handleDownMove = () => {
            const index = activeIndex.value;
            const arr = deepClone(elementView.value);
            if (index === '' || index === undefined || index >= elementView.value.length - 1) { return };
            const active = arr.splice(index, 1, arr[index + 1]);
            arr.splice(index + 1, 1, ...active);
            store.commit('setActiveElement', ...active);
            store.commit('setElementList', arr);
            store.commit('setActiveIndex', index + 1);
        }

        /**
         * @description 关闭bodyWidth popover
        */
        const closeBodyRef = (submit: boolean) => {
            if (submit) {
                store.commit('setViewBodyWidth', viewWidth.value);
            }
            bodyWidthShow.value = false;
        };

        /**
         * @description 预览
        */
       const handlePreview = () => {
        router.push('/preView');
       };

        return {
            handleUpMove,
            handleDownMove,
            closeBodyRef,
            viewWidth,
            bodyWidthShow,
            handlePreview
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
            margin: 0 0 10px 0;
        }
    }
    .active-item {
        box-shadow: inset 0 0 1px 1px rgba(64, 158, 255, .5);
    }
}

.view-body-input {
    display: block;
    width: 150px;
    margin: 10px auto 0 auto;
    text-align: center;
}
</style>