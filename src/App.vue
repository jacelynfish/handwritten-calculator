<template>
  <div id="app">
      <div :class="['calculator', isExpand ? 'calculator--expand':'']">
          <expression-row></expression-row>
          <drawing-board :width="canvas.maxWidth" :height="canvas.maxHeigth" stroke-color="#FF0000" ></drawing-board>
      </div>

      <history></history>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import ExpressionRow from '@components/ExpressionRow'
import DrawingBoard from '@components/DrawingBoard'
import History from '@components/History'

import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  data: function() {
      return {
          canvas: {
              maxHeigth: 0,
              maxWidth: 0
          }
      }
  },
  mounted() {
      this.canvas.maxHeigth = document.body.clientHeight;
      this.canvas.maxWidth = document.body.clientWidth;
  },
  components:{
      DrawingBoard,
      ExpressionRow,
      History
  },
  computed: {
      ...mapGetters({
          isExpand: 'getExpand'
      })
  },
}
</script>

<style lang='less'>
#app{
    display: flex;
    flex-direction: row;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
}
.calculator{
    width: 70vw;
}
.calculator--expand{
    width: 100vw;
    transition: width 0.5s;
}
</style>
