import Vue from 'vue'
import Vuex from 'vuex'
import color from './color'
import expression from './expression'
import record from './record'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        color,
        expression,
        record
    },
    state: {
        currentIndex: 10,
        isExpand: false,
    },
    getters: {
        getCurrentIndex(state) {
          return state.currentIndex
        },
        getExpand(state) {
            return state.isExpand
        }
    },
    mutations: {
        toggleCurrentIndex(state) {
            let oldIdx = state.currentIndex
            state.currentIndex = oldIdx == 10 ? 2 : 10
        },
        toggleExpand(state) {
            state.isExpand = !state.isExpand
        },
    },

})
export default store;
