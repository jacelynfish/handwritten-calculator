<template>
    <div class="">
        <tools></tools>
        <canvas id="canvas" :width="width" :height="height" ref="canvas"
            @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
        ></canvas>

    </div>
</template>

<script>
import Tools from './CanvasTools'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
        result: '',
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
  components: {
      Tools,
  },
  computed: {
      ...mapGetters({
          record: 'record/getRecord',
          curExp: 'expression/getCurrentExp'
      })
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

      this.eventHub.$on('recognize-canvas', this.recognize)
      this.eventHub.$on('clear-canvas', this.clearCanvas)
  },
  methods:{
      ...mapMutations({
          addRecord: 'record/addRecord',
          delRecord: 'record/delRecord',
          setCurrentExp: 'expression/setCurrentExp'
      }),
      clearCanvas() {
        this.matrix = [];
        this.ctx.clearRect(0,0, this.width, this.height);
      },
      recognize() {
        if(this.matrix.length) {
          this.request().then(json => {
            this.setCurrentExp(json.data);
            // this.addRecord(json.data);
          });
        }
      },
      handleMouseDown(e) {
          this.isDrawing = true;
          // clearTimeout(this.timeout);
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
              } else {
                  this.prev = { x, y };
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
      },
      request() {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          var opt = {
              method: 'POST',
              mode: 'cors',
              body: JSON.stringify({
                  strokes: this.matrix
              }),
              headers,
              cache: 'default',
          };
          return fetch('/get_expr', opt).then(res => {
              return res.json();
          })
      }
  }
}
</script>

<style scoped>
canvas{
    background-color: transparent;
    background: url('~@/assets/canvas-background.png') repeat;
}
</style>
