import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        currentIndex: 10,
        strokeColorIdx: 0,
        strokeColorList: [
            {
                name: 'Blue',
                color: '#2D8CF0'
            },
            {
                name: 'Green',
                color: '#19BE6B'
            },
            {
                name: 'Orange',
                color: '#FF9900'
            },
            {
                name: 'Red',
                color: '#ED3F14'
            },
            {
                name: 'Grey',
                color: '#495060'
            }
        ],
        operandIdx: 0,
        isExpand: false,
        record: [],
        currentExp: []
    },
    getters: {
        getCurrentIndex(state) {
          return state.currentIndex
        },
        getStrokeColor(state) {
            return state.strokeColorList[state.strokeColorIdx]
        },
        getStrokeColorList(state) {
            return state.strokeColorList
        },
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
        toggleCurrentIndex(state) {
            let oldIdx = state.currentIndex
            state.currentIndex = oldIdx == 10 ? 2 : 10
        },
        changeStrokeColor(state, idx) {
            state.strokeColorIdx = idx
        },
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
