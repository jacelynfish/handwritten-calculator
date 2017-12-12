export default {
    namespaced: true,
    state: {
      operandIdx: 0,
      currentExp: []
    },
    getters: {
      getCurrentExp(state) {
          return state.currentExp
      },
    },
    mutations: {
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
}
