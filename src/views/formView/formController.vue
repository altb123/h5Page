<template>
    <div class="form-contorller">

        <div class="btns-box">
            <el-popover ref="addPopoverRef" placement="bottom" :width="400" trigger="click">
                <template #reference>
                    <el-button type="success" size="small" plain>新增</el-button>
                </template>

                <div class="add-item-list">
                    <div v-for="item in formList" :key="item.prop">
                        <el-button
                            class="add-item"
                            :disabled="isShowAddItem(item)"
                            @click="handleAddClick(item)">
                            {{ item.label }}
                        </el-button>
                    </div>
                </div>
            </el-popover>

            <el-button size="small" plain @click="handleKeep">保存</el-button>

            <el-popconfirm title="请确认删除当前组件？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelte">
                <template #reference>
                    <el-button type="danger" size="small">
                        删除组件
                    </el-button>
                </template>
            </el-popconfirm>
        </div>

        <div class="form-title">
            <el-input  v-model="dataModel.title" placeholder="编辑表格标题，内容为空则不显示" />
        </div>

        <div class="form-box">
            <div
                :class="['form-item', {'active-item': activeItemIndex === index},]"
                v-for="(item, index) in dataModel.columns"
                :key="item.prop">
                <el-row :gutter="10" v-if="item.type !== 'button'">
                    <el-col :span="10" 
                @click="handleSetActive(index)">
                        <div class="item-label">
                            <el-input type="text" v-model="item.label" />
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="item-form">
                            <el-input disabled />
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="del-box" @click.stop="handleDelItem(item, index)">
                            <el-icon>
                                <CircleCloseFilled />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>

                <div class="btn-box" v-else>
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <div class="item-label">
                                <el-input type="text" v-model="item.label" />
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="item-form">
                                <el-input v-model="item.url" placeholder="提交地址：http:/https:" />
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="del-box" @click.stop="handleDelItem(item, index)">
                                <el-icon>
                                    <CircleCloseFilled />
                                </el-icon>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { deepClone } from '@/common/js/common';
import { formList } from './formController.js';

const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    }

});

const store = useStore();

const dataModel = ref(deepClone(props.data));

const addPopoverRef = ref(null);

const activeItemIndex = ref<null | number>(null);


/**
 * @description 点击新增回调
 * @param {Object} row 选中项回调
*/
const handleAddClick = (row: any) => {
    let index: null | number = null;
    if (activeItemIndex.value !== null) {
        index = activeItemIndex.value;
    } else {
        const length = dataModel.value.columns.length;
        if (length) {
            index = length - 1;
        } else {
            index = 0;
        }
    }
    dataModel.value.columns.splice(index + 1, 0, row);
    activeItemIndex.value = null;
    addPopoverRef.value && addPopoverRef.value.hide();
}

/**
 * @description 设置activex项
 * @param {number} index 选中项
*/
const handleSetActive = (index: number) => {
    activeItemIndex.value = index === activeItemIndex.value ? null : index;
};

/**
 * @description 点击保存按钮回调
*/
const handleKeep = () => {
    const { elementView, activeElement, activeIndex } = store.state;
    activeElement.data = dataModel;
    elementView[activeIndex] = activeElement;
    store.commit('setActiveElement', activeElement);
    store.commit('setElementList', elementView);

};

/**
 * @description 点击删除组件
*/
const handleDelte = () => {
    const { elementView, activeIndex  } = store.state;
    elementView.splice(activeIndex, 1);
    store.commit('setActiveIndex', '');
    store.commit('setElementList', elementView);
};

/**
 * @description 删除当前项
 * @param {Object} row 当前项
 * @param {nubmer} index 下标
*/
const handleDelItem = (row: any, index: number) => {
    dataModel.value.columns.splice(index, 1);
    activeItemIndex.value = null;
}

/**
 * @description 判断是否显示新增项
 * @param {Object} row 选中项
*/
const isShowAddItem = (row: any) => {
    const index = dataModel.value.columns.findIndex((item: any) => item.prop === row.prop);
    return index !== -1;
}
</script>

<style scoped lang="scss">
.form-contorller {
    padding: 0 10px;
    .form-title {
        margin-top: 10px;
        padding: 0 10px
    }

    .del-box {
        font-size: 20px;
        padding-top: 5px;
        color: #F56C6C;
    }

    .btns-box {
        width: 100%;
        padding: 0 20px;
        margin-top: 5px;
        text-align: right;

        .remind {
            font-size: 14px;
            color: #F56C6C;
        }
    }

    .btn-box {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;

        .submit {
            display: block;
            width: 150px;
            border-radius: 4px;
        }
    }

    .form-box {
        margin-top: 20px;
    }

    .el-row {
        margin-bottom: 10px;
    }

    .form-item {
        padding: 0 10px;
    }

    .active-item {
        box-shadow: 0 0 1px 1px rgba(64, 158, 255, .5);
    }
}

.add-item-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        >div {
            margin: 0 10px 10px 0;
        }
    }

    .add-item {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
    }
</style>

<style lang="scss">
.form-contorller {
    .btn-box .el-input__inner {
        text-align: center;
    }
}
</style>