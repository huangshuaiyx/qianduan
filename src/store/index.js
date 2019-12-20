//1、载入vue
import Vue from "vue";
// 2、载入vuex
import Vuex from "vuex";
// 3.使用vuex
Vue.use(Vuex);

// 4、创建仓库
const store = new Vuex.Store({
    // 状态
    state: {
        ggarr: [

        ]
    },
    // 异步方法
    actions: {},
    //改变 状态的方法
    mutations: {
        //增加一整项规格 
        addggarr(state, obj) {
            state.ggarr.push(obj);
        },
        //删除一整项规格 --下标
        delggarr(state, ggarrindex) {
            state.ggarr.splice(ggarrindex, 1)
        },
        //增加规格中 一项参数，价格
        addggarrcan(state, obj) {
            let { ggarrindex, canobj } = obj
            state.ggarr[ggarrindex].can.push(canobj)
        },
        //删除规格中 一项参数，价格
        delggarrcan(state, obj) {
            let { ggarrindex, canindex } = obj
            state.ggarr[ggarrindex].can.splice(canindex, 1)
        }
    },
    // 计算属性
    getters: {}

})

//5、导出

export default store;