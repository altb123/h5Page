<template>
    <div class="img-view">
        <div class="selected-active" v-if="isSelected">
            <div />
        </div>
        <el-image :src="require(`@/assets/img/${data.src}`)" v-if="!empty">
            <template #error>
                <div class="image-slot">
                    <el-icon>
                        <icon-picture />
                    </el-icon>
                </div>
            </template>
        </el-image>

        <div class="img-default-box" v-else>
            <div class="img-default">
                <div class="title">
                    可编辑图片
                </div>

                <div class="default-icon">
                    <el-icon>
                        <icon-picture />
                    </el-icon>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Picture as IconPicture } from '@element-plus/icons-vue';
import { deepClone } from '@/common/js/common';

const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    },
    isSelected: {
        type: Boolean,
        default: false
    }
});

const empty = computed(() => {
    return JSON.stringify(props.data) === '{}';
});

</script>

<style lang="scss" scoped>
.img-view {
    position: relative;

    .selected-active {
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 9;

        div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-color: #fff;
        }
    }

    .el-image {
        display: block;
        width: 100%;
        height: auto;
    }

    .img-default-box {
        padding: 10px;
    }
    .img-default {
        border: 1px dashed #409EFF;
        padding: 10px 0;
        .title {
            font-size: 16px;
            color: #409EFF;
        }

        .default-icon {
            margin-top: 10px;
        }

        .el-icon {
            font-size: 32px;
        }
    }
}
</style>