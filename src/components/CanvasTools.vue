<template lang="html">
  <div id="canvas__tools">
    <Tooltip v-for="(util, idx) in utilList"
              :key="idx" :content="util.name"
              placement="bottom-start">
      <Icon v-if="util.icon" :type="util.icon"
            :class="['canvas__tools-item']"
            @click.native.self="util.func"
      ></Icon>
      <span v-if="util.content"
            class="canvas__tools-item"
            @click.self="util.func">
            {{util.content}}
      </span>
    </Tooltip>
    <palette></palette>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Palette from './CanvasPalette'

export default {
  data: function() {
    return {
      utilList: [
        {
          name: 'Color Palette',
          icon: 'android-color-palette',
          func: () => {
            this.eventHub.$emit('palette-toggle')
          }
        },
        {
          name: 'Full Screen',
          icon: 'arrow-expand',
          func: () => {
            this.expandFullScreen()
          }
        },
        {
          name: 'Recognize',
          icon: 'ios-eye',
          func: () => {
            this.eventHub.$emit('recognize-canvas')
          }
        },
        {
          name: 'Clear Canvas',
          icon: 'android-delete',
          func: () => {
            this.eventHub.$emit('clear-canvas')
          }
        },
        {
          name: 'Decimal-Binary Convert',
          icon: 'shuffle',
          func: () => {
            this.toggleCurrentIndex()
              if(this.curExp.length == 1) {
                let res, num = Number(this.curExp[0])
                if(Number.isInteger(num)) {
                  res = this.curIndex == 10 ?
                        parseInt(this.curExp[0], 2) : num.toString(2)
                } else if(Number.isFinite(num)) {
                  res = this.curIndex == 10 ?
                        parseFloat(this.curExp[0], 2) : num.toString(2)
                }
                this.setCurrentExp([res])
            }
          }
        },
        {
          name: 'Calculate',
          icon: 'ios-calculator',
          func: () => {
            this.eventHub.$emit('calculate')
          }
        },
        {
          name: 'Backspace',
          icon: 'backspace',
          func: () => {
            this.delOperand(this.curExp.length - 1)
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      curIndex: 'getCurrentIndex',
      curExp: 'expression/getCurrentExp'
    })
  },
  components: {
    Palette
  },
  methods: {
    ...mapMutations({
      toggleCurrentIndex: 'toggleCurrentIndex',
      setCurrentExp: 'expression/setCurrentExp',
      delOperand: 'expression/delOperand'
    }),
    expandFullScreen() {
      if(document.body.webkitRequestFullscreen)
        document.body.webkitRequestFullscreen()
      else if(document.body.mozRequestFullScreen)
        document.body.mozRequestFullScreen()
      else document.body.msRequestFullscreen()
    }
  }
}
</script>

<style lang="less">
@mainColor:     rgb(22, 155, 213);
@textColor:     #657180;
@bgColor:       #f8f8f9;
@shadowColor:   rgba(0, 0, 0, 0.1);

#canvas__tools{
  position: absolute;
  background-color: @shadowColor;
  padding: 12px 16px;
  border-bottom-right-radius: 20px;
}
.canvas__tools-item{
  font-size: 3.6em;
  margin: 0 8px;

  &:hover {
    color: @mainColor;
  }
}
span.canvas__tools-item {
  font-size: 3em;
  font-weight: bold;
}
</style>
