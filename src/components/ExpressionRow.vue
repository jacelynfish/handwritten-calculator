<template lang="html">
    <div id="expression-row-wrapper">
        <span v-for="operand of curExp" class="operands">{{operand}}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            record: 'getRecord',
            curExp: 'getCurrentExp'
        })
    },
    watch: {
        curExp() {
            this.$forceUpdate();
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
</style>
