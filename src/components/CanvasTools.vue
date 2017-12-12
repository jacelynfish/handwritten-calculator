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
          name: 'Full Screen',
          icon: 'arrow-expand',
          func: () => {
            this.expandFullScreen()
          }
        },
        {
          name: 'Color Palette',
          icon: 'android-color-palette',
          func: () => {}
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
          content: '10',
          func: () => {
            this.toggleCurrentIndex()
            this.utilList[4].content = this.curIndex;
          }
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      curIndex: 'getCurrentIndex'
    })
  },
  components: {
    Palette
  },
  methods: {
    ...mapMutations([
      'toggleCurrentIndex'
    ]),
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
  padding: 8px 12px;
  border-bottom-right-radius: 20px;
}
.canvas__tools-item{
  font-size: 3.2em;
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
