<template>
    <div class="img-contorller">
        <div class="contorller-title">
            可编辑图片
        </div>

        <div class="contorller-body">
            <div class="bth-box">
                <div class="remind">提示：仅支持单张图片上传</div>

                <div class="btn-box">
                    <el-button type="success" size="small" plain @click="handleKeep">保存</el-button>
                    <el-popconfirm title="请确认删除当前组件？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelte">
                        <template #reference>
                            <el-button type="danger" size="small">
                                删除组件
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </div>
            <!-- 图片列表 -->
            <div class="img-list">
                <div class="img-item" v-for="item in fileList" :key="item.name">
                    <img :src="require(`@/assets/img/${item.src}`)" alt="" />
                    <div class="operate-box">
                        <div class="operate-btns">
                            <div class="edit">
                                <el-popover placement="bottom" :width="420" trigger="click">
                                    <template #reference>
                                        <el-icon>
                                            <EditPen />
                                        </el-icon>
                                    </template>

                                    <pub-picture @handleSelect="handleSelect"></pub-picture>
                                </el-popover>

                            </div>
                            <div class="check" @click="handlePictureCardPreview(item)">
                                <el-icon>
                                    <ZoomIn />
                                </el-icon>
                            </div>
                            <div class="delete" @click="handleRemove(item)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </div>

                <el-popover placement="bottom" :width="420" trigger="click" v-if="!fileList.length">
                    <template #reference>
                        <div class="add-item">+</div>
                    </template>

                    <pub-picture @handleSelect="handleSelect"></pub-picture>
                </el-popover>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="require(`@/assets/img/${dialogImageUrl}`)" alt="Preview Image" />
                </el-dialog>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';
import { useStore } from 'vuex';
import { Delete, EditPen, ZoomIn } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import PubPicture from '@/common/components/PubPicture.vue'
import { deepClone } from '@/common/js/common';

const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    }
});

const store = useStore();
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const elementView = computed(() => {
    return store.state.elementView;
});

const activeIndex = computed(() => {
    return store.state.activeIndex;
});

const activeElement = computed(() => {
    return store.state.activeElement;
});

const fileList = ref<any>([]);

watch(() => props.data, (newVal) => {
    if (JSON.stringify(newVal) !== '{}') {
        fileList.value = [newVal];
    } else {
        fileList.value = [];
    }
}, {deep: true, immediate: true})

/**
 * @description 勾选图片回调
 * @param {Object} item 勾选实例
*/
const handleSelect = (item: { name: string, src: string }) => {
    if (fileList.value.length > 0) {
        fileList.value[0] = item;
    } else {
        fileList.value.push(item);
    }
}

/**
 * @description 删除图片(单张)
 * @param {Object} file 当前图片实例
*/
const handleRemove = (file: UploadFile) => {
    const delIndex = fileList.value.findIndex((item: any) => item.name === file.name);
    if (delIndex !== -1) {
        fileList.value.splice(delIndex, 1);
    }
}

/**
 * @description 预览图片
 * @param {Object} item 当前图片实例
*/
const handlePictureCardPreview = (item: { name: string, src: string }) => {
    dialogImageUrl.value = item.src!
    dialogVisible.value = true
}

/**
 * @description 保存
*/
const handleKeep = () => {
    const element = deepClone(elementView.value);
    let active = deepClone(activeElement.value);
    const num = activeIndex.value;
    if (fileList.value.length > 0) {
        const obj = {
            name: fileList.value[0].name,
            src: fileList.value[0].src
        }
        active.data = obj;
        element[num].data = obj;
    } else {
        element.splice(num, 1);
        active = {};
        store.commit('setActiveIndex', '');
    }
    store.commit('setActiveElement', active);
    store.commit('setElementList', element);
}

/**
 * @descript 删除当前组件
*/
const handleDelte = () => {
    const element = deepClone(elementView.value);
    const num = activeIndex.value;
    element.splice(num, 1);
    store.commit('setActiveIndex', '');
    store.commit('setElementList', element);
};

</script>

<style lang="scss" scoped>
.img-contorller {
    padding: 10px;

    .contorller-title {
        font-weight: bold;
        font-size: 16px;
        color: #409EFF;
    }

    .bth-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        margin-top: 10px;

        .remind {
            font-size: 14px;
            color: #F56C6C;
        }
    }

    .img-list {
        display: flex;
        width: 100%;
        min-height: 200px;
        border-radius: 4px;
        border: 1px solid #eee;
        margin-top: 10px;
        padding: 10px;

        .img-item,
        .add-item {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            border: 1px solid #909399;
        }

        .img-item {
            position: relative;
            overflow: hidden;
            margin: 0 6px 6px 0;
        }

        .add-item {
            color: #909399;
            text-align: center;
            line-height: 100px;
            font-size: 30px;
            cursor: pointer;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -o-user-select: none;
            -webkit-touch-callout: none;
        }

        .operate-box,
        .operate-btns {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .operate-box {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .5);
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            transition: ease .3s all;
        }

        .operate-box:hover {
            opacity: 1;
        }

        .operate-btns {
            color: #fff;

            .check,
            .delete,
            .edit {
                padding: 3px;
                margin: 0 3px;
                cursor: pointer;
            }
        }
    }
}
</style>