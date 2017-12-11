<template lang="html">
    <ul id="canvas__palette">
        <li class="canvas__palette-item"
            v-for="(color, idx) in colorList"
            :data-name="color.name"
            @click="changeStrokeColor(idx)">
            <span :style="{ color: color.color }"></span>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            strokeColor: 'getStrokeColor',
            colorList: 'getStrokeColorList'
        })
    },
    methods: {
        ...mapMutations([
            'changeStrokeColor'
        ]),
    }
}
</script>

<style lang="less">
#canvas__palette{
    position: absolute;
    margin-top: 8px;
}
.canvas__palette-item{

    border-radius: 6px;
    margin-left: 8px;
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
