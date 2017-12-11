import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        operandIdx: 0,
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
            let idx = 0;
            let newRec = []
            for(let i = 0; i < state.record.length; i++) {
                if(i == checked[idx]) idx++;
                else newRec.push(state.record[i])
            }
            state.record = newRec
        },
        setCurrentExp(state, exp) {
            state.currentExp = Array.isArray(exp) ? exp : exp.split(' ')
            state.operandIdx = state.currentExp.length - 1;
        },
        modifyExp(state, { idx, newOp }) {
            state.currentExp.splice(idx, 1, newOp)
        },
        addOperand(state, ope) {
            if(!isNaN(+ope) || ope == '.') {
                let current = state.currentExp[state.operandIdx]
                if(current && current.length) state.currentExp.splice(state.operandIdx, 1, current + ope)
                else state.currentExp.push('' + ope)
            } else if(ope.length == 1){
                state.currentExp.push(ope)
                state.operandIdx += 2;
            } else {}
        },
        delOperand(state, idx) {
            state.currentExp.splice(idx, 1)
        }
    },
    actions: {
        modifyExpression({ state, commit }, { idx, newOp }) {
            if(newOp && newOp.length) {
                commit('modifyExp', { idx, newOp });
                // commit('addRecord', state.currentExp.join(' '));
            }
        }
    }
})
export default store;
