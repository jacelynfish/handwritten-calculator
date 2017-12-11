<template lang="html">
    <div id="expression-row-wrapper" ref="exp-wrapper">
        <Modal v-model="isShowEdit"
                title="Modify Operand"
                ok-text="Confirm"
                cancel-text="Cancel"
                @on-ok="modifyExpression({
                    idx: editIdx,
                    newOp: editText
                })">
            Please enter your new operand:
            <Input v-model="editText"></Input>
        </Modal>
        <div id="expression">
            <span class="expression__operand"
                v-for="(operand, key) in curExp"
                 v-html="output[key]"
                 @click="modifyOperand(operand, key)"></span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data: function() {
        return {
            output: [],
            isShowEdit: false,
            editText: '',
            editIdx: -1
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
        ...mapActions([
            'modifyExpression'
        ]),
        modifyOperand(operand, idx) {
            this.editIdx = idx;
            this.editText = operand;
            this.isShowEdit = true;
        }
    }
}
</script>

<style lang="css">
#expression{
    padding: 0 24px;
    box-sizing: border-box;
    width: 100%;
    text-align: right;
    height: 3em;
    line-height: 3em;
    font-size: 4rem;
    color: white;
    background-color: black;
}
.expression__operand{

}
.expression__operand:hover{
    background-color: white;
    color:black;
}
</style>
