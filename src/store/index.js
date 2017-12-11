import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isExpand: false,
        record: [],
        currentExp: []
    },
    getters: {
        getRecord(state) {
            return state.record
        },
        getCurrentExp(state) {
            return state.currentExp
        },
        getExpand(state) {
            return state.isExpand
        }
    },
    mutations: {
        toggleExpand(state) {
            state.isExpand = !state.isExpand
        },
        addRecord(state, newRec) {
            if(Array.isArray(newRec)) state.record.push(...newRec)
            else state.record.push(newRec)
        },
        delRecord(state, idx) {
            state.record.splice(idx, 1);
        },
        delAllRecord(state, checked) {
            let idx = checked[0];
            let newRec = []
            for(let i = 0; i < state.record.length; i++) {
                if(i == idx) idx++;
                else newRec.push(state.record[i])
            }
            state.record = newRec
        },
        setCurrentExp(state, exp) {
            state.currentExp = Array.isArray(exp) ? exp : exp.split(' ')
        },
        modifyExp(state, { idx, newOp }) {
            state.currentExp.splice(idx, 1, newOp)
        },
        addOperand(state, ope) {
            state.currentExp.push(ope)
        },
    },
    actions: {
        modifyExpression({ state, commit }, { idx, newOp }) {
            if(newOp && newOp.length) {
                commit('modifyExp', { idx, newOp });
                commit('addRecord', state.currentExp.join(' '));
            }
        }
    }
})
export default store;
