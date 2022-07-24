<template>
    <div class="element-view">
        <div class="element-title">元素列表</div>

        <ul class="element-box">
            <li class="element-item" @click="handleClick('imgView')">
                <div class="item-img">
                    <el-icon>
                        <Picture />
                    </el-icon>
                </div>
                <div class="item title">图片</div>
            </li>

            <li class="element-item" @click="handleClick('formView')">
                <div class="item-img">
                    <el-icon>
                        <Tickets />
                    </el-icon>
                </div>
                <div class="item title">表单</div>
            </li>

            <li class="element-item" @click="handleClick('swiperView')">
                <div class="item-img">
                    <el-icon>
                        <DataBoard />
                    </el-icon>
                </div>
                <div class="item title">轮播图</div>
            </li>
        </ul>
    </div>
</template>
 
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Picture, Tickets, DataBoard } from '@element-plus/icons-vue';

const store = useStore();

const elementView = computed(() => {
    return store.state.elementView;
});

const activeIndex = computed(() => {
    return store.state.activeIndex;
});

const formDfault = {
    title: '编辑表格标题，内容为空则不显示',
    columns: [
        {
        label: '姓名',
        prop: 'name',
        type: 'input',
        rules: [
            { required: true, message: '不能为空' },
        ]

    },
    {
        label: '电话',
        prop: 'phone',
        type: 'input',
        rules: [
            { required: true, message: '不能为空' },
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话号码',trigger: 'blur'},
        ]
    },
        {
            label: '提交',
            prop: 'submit',
            type: 'button',
        }
    ]
}

/**
 * @description 点击回调
 * @param {String} type
*/
const handleClick = (type: string) => {
    const { idIndex } = store.state;
    const obj: any = {
        id: `${type}${idIndex}`,
        type,
    };
    switch (type) {
        case 'imgView':
            obj.el = 'imgView';
            obj.contorller = 'imgController';
            break;
        case 'formView':
            obj.el = 'formView';
            obj.contorller = 'formController';
            obj.data = formDfault;
            break;
        case 'swiperView':
            obj.el = 'swiperView';
            obj.contorller = 'swiperController';
            break;
    }
    const arr = [...elementView.value];
    let number;
    if (activeIndex.value !== '' && activeIndex.value !== undefined) {
        arr.splice(activeIndex.value + 1, 0, obj);
        number = activeIndex.value + 1;
    } else {
        arr.push(obj);
        number = arr.length - 1;
    }
    store.commit('setActiveElement', obj);
    store.commit('setElementList', arr);
    store.commit('setActiveIndex', number);
};
</script>

<style lang="scss" scoped>
.element-view {
    height: 100vh;
    padding: 20px 0;

    .element-title {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .element-box {
        width: 120px;
        height: calc(100% - 76px);
        margin: 10px auto 0 auto;
        overflow-y: auto;
    }

    .element-box::-webkit-scrollbar {
        display: none;
    }

    .element-item {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        border-radius: 4px;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        padding: 10px 0;
        cursor: pointer;
    }

    .element-item:hover {
        border-color: #eee;
    }

    .item-img {
        margin: 0 auto;

        .el-icon {
            font-size: 26px;
        }
    }
}
</style>
