<template>
    <div class="Common-Form">
        <el-form ref="commonFromRef" :model="formModel" label-width="90px">
            <el-form-item class="form-item" v-for="item in config" :key="item.prop"
                :prop="item.prop"
                :label="item.type !== 'button' ? item.label : ''"
                :rules="item.rules"
                @click.stop="">
                <el-button v-if="item.type === 'button'" :loading="submitLoading" @click="handleSubit(item)">{{ item.label }}</el-button>
                <el-input v-else v-model="formModel[item.prop]" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps } from 'vue';
import { ElMessage } from 'element-plus'

const props = defineProps({
    config: {
        type: Object,
        default() {
            return {}
        }
    }
});

const commonFromRef = ref(null);
const submitLoading = ref(false);
const formModel = reactive<any>({});

/**
 * @description 点击提交回调
 * @param {Object} 当前项
*/
const handleSubit =  (item: any) => {
    commonFromRef.value && commonFromRef.value.validate((res: boolean) => {
        if (!res) return;
        const { url } = item;
        if (!url) {
            return ElMessage.warning('请输入提交地址!')
        }
        submitLoading.value = true;
        setTimeout(() => {
            ElMessage.success('提交成功');
            submitLoading.value = false;
            commonFromRef.value.resetFields()
        }, 500)
    })
};

</script>

<style scoped lang="scss">
.Common-Form {
    margin-top: 20px;
    padding-right: 30px;

    .form-item {
        position: relative;
    }

    .del-box {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: -30px;
        font-size: 20px;
        padding-top: 5px;
        color: #F56C6C;
    }
}
</style>