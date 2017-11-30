<template>
    <canvas id="canvas" :width="width" :height="height" ref="canvas"
        @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
    ></canvas>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      canvas: null,
      offset: {
          top: 0,
          left: 0
      },
      ctx: null,
      isDrawing: false,
      matrix: [],
      timeout: undefined,
      prev: {
          x: -1,
          y: -1
      }
    }
  },
  props: [
      'height',
      'width',
      'strokeColor',
  ],
  mounted() {
      this.canvas = this.$refs.canvas;
      this.offset.top = this.canvas.offsetTop;
      this.offset.left = this.canvas.offsetLeft;
      this.ctx = this.canvas.getContext('2d');
  },
  methods:{
      handleMouseDown(e) {
          this.isDrawing = true;
          clearTimeout(this.timeout);
          this.ctx.beginPath();
          this.ctx.moveTo(e.pageX - this.offset.left, e.pageY - this.offset.top);
          this.matrix.push([]);
      },
      handleMouseMove(e) {
          let ctx = this.ctx;
          let currentStroke = this.matrix.length - 1;
          if(this.isDrawing) {
              let x = e.pageX - this.offset.left;
              let y = e.pageY - this.offset.top;

              if(this.prev.x == x && this.prev.y == y){
                  return;
              }
              ctx.lineTo(x, y);
              ctx.lineWidth = 5;
              ctx.strokeStyle = this.strokeColor;
              ctx.stroke();
              ctx.save();

              this.matrix[currentStroke].push([x, y]);
          }
      },
      handleMouseUp(e) {
          this.isDrawing = false;
          this.timeout = setTimeout(() => {
              this.ctx.clearRect(0,0, this.width, this.height);
              this.strokesToScg(this.matrix)
              this.matrix = [];
          }, 3000)
      },
      strokesToScg(strokes) {
          var scg = 'SCG_INK\n' + strokes.length + '\n'
          strokes.forEach(function (stroke) {
              scg += stroke.length + '\n'
              stroke.forEach(function (p) {
                  scg += p[0] + ' ' + p[1] + '\n'
              })
          })
          return scg
      }
  }
}
</script>

<style scoped>
canvas{
    background-color: transparent;
}
</style>
