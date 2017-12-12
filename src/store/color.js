export default {
    namespaced: true,
    state: {
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
    },
    getters: {
      getStrokeColor(state) {
          return state.strokeColorList[state.strokeColorIdx]
      },
      getStrokeColorList(state) {
          return state.strokeColorList
      }
    },
    mutations: {
      changeStrokeColor(state, idx) {
          state.strokeColorIdx = idx
      },
    }
}
