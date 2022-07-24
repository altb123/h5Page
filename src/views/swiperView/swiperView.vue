<template>
    <div class="swiper-view">
        <div class="selected-active" v-if="isSelected">
            <div />
        </div>
        <div class="swiper" v-if="!empty">
            <el-carousel
                :height="`${swiperHeight}px`"
                :autoplay="swiperSetting.autoplay"
                :interval="swiperSetting.interval"
                :loop="swiperSetting.loop"
                :type="swiperSetting.type"
                :direction="swiperSetting.direction"
                arrow="hover"
                indicator-position="none">
                <el-carousel-item v-for="item in swiperList" :key="item.name">
                    <el-image class="swiperImg" :src="require(`@/assets/img/${item.src}`)" alt="" @load="imgLoad" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="swiper-default-box" v-else>
            <div class="img-default">
                <div class="title">轮播图控件</div>

                <div class="default-icon">
                    <el-icon>
                        <DataBoard />
                    </el-icon>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { DataBoard } from '@element-plus/icons-vue';
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

const swiperHeight = ref(0);


// 获取轮播图片
const swiperList = computed(() => {
    return props.data.list;
});

// 获取轮播控件设置
const swiperSetting = computed(() => {
    return props.data.setting;
});


// 获取轮播图高度
const imgLoad = () => {
    const imgList = document.querySelectorAll('.swiperImg');
    
    let maxHeight = 0;

    if (imgList.length > 0) {
        for(const i in imgList) {
            const height = imgList[i].offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        }
    }

    swiperHeight.value = maxHeight;
};

// 判断是否为空轮播图
const empty = computed(() => {
    return JSON.stringify(props.data) === '{}';
});

</script>

<style lang="scss" scoped>
.swiper-view {
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

    .swiper-default-box {
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

    .el-carousel__item.is-animating {
        height: auto;
    }

    .el-carousel__item {
        height: auto;
    }

    .el-carousel--horizontal {
        overflow-x: visible;
    }
}
</style>

