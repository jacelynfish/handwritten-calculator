<template>
  <div id="app">
      <expression-row></expression-row>
      <drawing-board width="800" height="500" stroke-color="#FF0000" ></drawing-board>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import ExpressionRow from '@components/ExpressionRow'
import DrawingBoard from '@components/DrawingBoard'
export default {
  name: 'app',
  components:{
      DrawingBoard,
      ExpressionRow
  }
}
</script>

<style>
</style>
