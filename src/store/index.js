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
            // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        },
        delRecord(state, idx) {
            state.record.splice(idx, 1);
        },
        setCurrentExp(state, exp) {
            state.currentExp = exp.split(' ');
            // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        },
        addOperand(state, ope) {
            state.currentExp.push(ope)
            // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
    }
})
export default store;
