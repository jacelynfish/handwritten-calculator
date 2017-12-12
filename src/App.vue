<template>
  <div id="app">
      <div :class="['calculator', isExpand ? 'calculator--expand':'']">
          <expression-row></expression-row>
          <drawing-board :width="canvas.maxWidth" :height="canvas.maxHeigth" :stroke-color="strokeColor.color" ></drawing-board>
      </div>
      <history></history>
      <Spin fix v-if="isCalculating"></Spin>
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
          },
          isCalculating: false,
          body: null
      }
  },
  mounted() {
      this.body = document.getElementsByTagName('body')[0]
      this.canvas.maxHeigth = document.body.clientHeight;
      this.canvas.maxWidth = document.body.clientWidth;

      document.addEventListener('keyup', this.handleKeyDown)
      document.addEventListener('keydown', this.suppressBackspace)
      document.addEventListener('keypress', this.suppressBackspace)
  },
  components:{
      DrawingBoard,
      ExpressionRow,
      History
  },
  computed: {
      ...mapGetters({
          isExpand: 'getExpand',
          curExp: 'expression/getCurrentExp',
          curIndex: 'getCurrentIndex',
          strokeColor: 'color/getStrokeColor',
      })
  },
  methods: {
      ...mapMutations('expression', [
          'addOperand',
          'delOperand',
          'setCurrentExp'
      ]),
      ...mapMutations('record', [
          'addRecord',
      ]),
      suppressBackspace(e) {
          if(e.key == 'Backspace' && e.target == this.body) {
              e.preventDefault();
              return false;
          }
      },
      handleKeyDown(e) {
          if(e.target == this.body) {
              e.preventDefault()
              e.stopPropagation()
              switch(e.key) {
                  case 'Enter': this.getCompleteRecord(); return;
                  case 'Backspace': this.delOperand(this.curExp.length - 1); return;
                  default: this.addOperand(e.key)
              }
          }
          return false
      },
      async getCompleteRecord() {
          let res;
          if(this.curExp.length) {
              this.isCalculating = true;
              try {
                let exp = this.curExp.join('')
                if(/[\\{]/.test(exp)) {
                  exp = encodeURIComponent(exp)
                  await fetch(`/eval_expr?exp=${exp}`).then(res => {
                      return res.json()
                  }).then(json =>{
                    let { exact, decimalApproximation } = json.data;
                    if(decimalApproximation.length) {
                      res = parseFloat(decimalApproximation).toFixed(5);
                    } else if(exact.length) {
                      res = exact
                    } else {
                      throw new Error();
                    }
                  })
                } else {
                  let operands = this.curExp.map((ope) => {
                    let r1 = /^([0-9]{1}|([1-9][0-9]+))\.[0-9]+$/.exec(ope),
                        r2 = /^([0-9]{1}|([1-9][0-9]+))$/.exec(ope)
                    if(r1 != null)
                      return parseFloat(ope, this.curIndex);
                    else if(r2 != null)
                      return parseInt(ope, this.curIndex)
                    else return ope
                  })
                  res = eval(operands.join(''));
                }
                this.addRecord(this.curExp.join(' ').concat(` = ${res}`));
                this.setCurrentExp(res.toString());
              }
              catch(e) {
                  this.addRecord(this.curExp.join(' '))
                  this.$Modal.error({
                      title: 'Calculation Failed',
                      content: 'Invalid expression. Please check again whether the expression is correct',
                      okText: 'Confirm',
                      cancelText: 'Cancel'
                  })
              } finally {
                this.isCalculating = false;
              }
          }
      },
  }
}
</script>

<style lang='less'>
#app{
    display: relative;
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
