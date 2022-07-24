import { createStore } from "vuex";
import { deepClone } from '../common/js/common';

export default createStore({
  state: {
    elementView: [],
    activeElement: {},
    activeIndex: '',
    idIndex: 0,
    viewBodyWidth: 375
  },
  getters: {
  },
  mutations: {
    // 设置组件列表
    setElementList(state: any, data: any) {
      if (data.length > state.elementView.length) {
        state.idIndex ++;
      }
      state.elementView = deepClone(data);      
    },

    // 设置当前组件(active)
    setActiveElement(state: any, data: any) {
      state.activeElement = deepClone(data);

    },

    // 设置activeIndex
    setActiveIndex(state: any, data: any) {
      state.activeIndex = data;
    },

    // 设置预览屏宽
    setViewBodyWidth(state: any, data: any) {
      state.viewBodyWidth = data;
    }
  },
  actions: {},
  modules: {},
});
