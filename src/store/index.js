import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        record: [],
        currentExp: []
    },
    getters: {
        getRecord(state) {
            return state.record
        },
        getCurrentExp(state) {
            return state.currentExp
        }
    },
    mutations: {
        addRecord(state, newRec) {
            state.record.push(newRec)
        },
        delRecord(state, idx) {
            state.record.splice(idx, 1);
        },
        setCurrentExp(state, exp) {
            state.currentExp = exp.split(' ')
        },
        modifyExp(state, { idx, newOp }) {
            if(newOp && newOp.length) state.currentExp.splice(idx, 1, newOp)
        },
        addOperand(state, ope) {
            state.currentExp.push(ope)
        }
    }
})
export default store;
