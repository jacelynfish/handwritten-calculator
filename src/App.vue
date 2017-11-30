<template>
  <div id="app">
      <drawing-board width="800" height="500" stroke-color="#FF0000" ></drawing-board>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import DrawingBoard from '@components/DrawingBoard'
export default {
  name: 'app',
  components:{
      DrawingBoard
  }
}
</script>

<style>
</style>
