<template lang="html">
    <ul id="canvas__palette"
        :class="[ isExpand ? 'canvas__palette--expand' : '']">
        <li class="canvas__palette-item"
            v-for="(color, idx) in colorList"
            :data-name="color.name"
            @click="selectColor(idx)">
            <span :style="{ color: color.color }"></span>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data: function() {
        return {
            isExpand: false
        }
    },
    computed: {
        ...mapGetters('color', {
            strokeColor: 'getStrokeColor',
            colorList: 'getStrokeColorList'
        })
    },
    methods: {
        ...mapMutations('color', [
            'changeStrokeColor'
        ]),
        selectColor(idx) {
          this.changeStrokeColor(idx)
          this.eventHub.$emit('palette-toggle')
        },
        togglePalette() {
            this.isExpand = !this.isExpand
        }
    },
    mounted() {
      this.eventHub.$on('palette-toggle', this.togglePalette)
    },
    beforeDestroy() {
      this.eventHub.$off('palette-toggle')
    }
}
</script>

<style lang="less">
#canvas__palette{
    position: absolute;
    margin-top: 8px;
    opacity: 0;
    transition: opacity 0.2s;
}
#canvas__palette.canvas__palette--expand{
    opacity: 1;
    transition: opacity 0.2s;
}
.canvas__palette-item{
    border-radius: 6px;
    padding: 4px;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
    span {
        display: block;
        box-shadow: 0 0 1px currentColor;
        border: 2px solid white;
        width: 36px;
        height: 36px;
        border-radius: 20px;
        background-color: currentColor;
    }
}
</style>
