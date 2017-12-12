export default {
    namespaced: true,
    state: {
        record: [],
    },
    getters: {
        getRecord(state) {
            return state.record
        },
    },
    mutations: {
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
    }
}
