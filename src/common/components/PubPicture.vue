<template>
    <div class="pub-pic">
        <div class="pub-pic-item" v-for="item in pictureList" :key="item.name" @click="handleSelect(item)">
            <img :src="require(`@/assets/img/${item.src}`)" alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive } from 'vue';
import { PictureList } from '../js/common';

const pictureList = reactive(PictureList);

const emit = defineEmits(['handleSelect']);


/**
 * @description 选择图片回调
 * @param {Object} item 选中图片实例
*/
const handleSelect = (item: any) => {
    emit('handleSelect', item);
}

</script>

<style lang="scss" scoped>
.pub-pic {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    overflow-y: auto;

    .pub-pic-item {
        display: flex;
        width: 70px;
        height: 70px;
        border: 1px solid #909399;
        margin: 0 8px 8px 0;
        border-radius: 10px;
        overflow: hidden;

        img {
            display: block;
            width: 100%;
            height: 100%;
            margin: auto;
            object-fit: cover;
            pointer-events: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -o-user-select: none;
            -webkit-touch-callout: none;
        }
    }
}
</style>