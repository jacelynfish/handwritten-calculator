<template lang="html">
    <div id="expression-row-wrapper" ref="exp-wrapper">
        <span v-for="(operand, key) in curExp"
             v-html="output[key]" class="exp-operand"
             @click="modifyOperand(operand)"></span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: function() {
        return {
            output: []
        }
    },
    computed: {
        ...mapGetters({
            record: 'getRecord',
            curExp: 'getCurrentExp'
        })
    },
    watch: {
        curExp(val) {
            this.output = [];
            for(let key of Object.keys(val)) {
                this.output[key] = `\\(${val[key]}\\)`
            }
            this.$nextTick(function() {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub,"expression-row-wrappe"])
            })
        }
    },
    methods: {
        modifyOperand(operand) {
            console.log(operand)
        }
    }
}
</script>

<style lang="css">
#expression-row-wrapper{
    width: 100vw;
    height: 4em;
    font-size: 3em;
    color: white;
    background-color: black;
}
.exp-operand:hover{
    background-color: white;
    color:black;
}
</style>
