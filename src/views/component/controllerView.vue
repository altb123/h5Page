<template>
    <div class="controller-view">
        <div class="controller-title">控制器</div>

        <div class="controller-body">
            <component :is="activeElement.contorller" :data="activeElement.data" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import imgController from '../imgView/imgController.vue';
import swiperController from '../swiperView/swiperController.vue';
import formController from '../formView/formController.vue';

export default defineComponent({
    name: 'controllerView',
    components: {
        imgController,
        swiperController,
        formController
    },

    setup() {
        const store = useStore();

        const activeElement = computed(() => {
            const { activeElement, activeIndex } = store.state;
            return activeIndex !== '' && activeIndex !== undefined ? activeElement : {};
        });

        return {
            activeElement
        }
    }
});

</script>

<style lang="scss" scoped>
.controller-view {
    height: 100vh;
    padding: 20px 0;

    .controller-title {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .controller-body {
        width: 100%;
        height: calc(100% - 86px);
        justify-content: center;
        margin: 20px auto 0 auto;
        overflow-y: auto;
    }
}
</style>