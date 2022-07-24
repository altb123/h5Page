<template>
    <div class="form-view">
        <div class="selected-active" v-if="isSelected">
            <div />
        </div>

        <div class="form-view">
            <div class="from-title" v-if="data.title">{{ data.title }}</div>
            <common-form :config="data.columns" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import CommonForm from '@/common/components/CommonForm.vue';

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

const storeModel = computed(() => {
    return props.data;
});

const formModel = ref<any>(storeModel);


</script>

<style lang="scss" scoped>
.form-view {
    padding: 10px;
    background-color: #fff;
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

    .form-default-box {
        .from-title {
            border: 1px solid #909399;
            color: #909399;
            padding: 6px 0;
        }
    }
}
</style>