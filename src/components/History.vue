<template lang="html">
    <aside id="history">
        <div :class="['history__toggle', isExpand ? 'history__toggle--expand' : '']" @click="toggleExpand">
            <span></span>
        </div>
        <div :class="[ 'history__content', isExpand ? 'history__content--close' : '']">
            <h2 class="history__title">History</h2>
            <div class="history__control">
                <Checkbox class="history__control-item"
                            :value="checkAll"
                            :indeterminate="indeterminate"
                            @click.prevent.native="handleCheckAll">{{ checkAll ? 'Uncheck All' : 'Check All'}}</Checkbox>
                <div>
                    <Upload class="history__control-item"
                            :before-upload="handleFile"
                            action=""
                            :show-upload-list="false">
                        <Button icon="ios-cloud-upload-outline"
                                type="text"
                                size="small">Import</Button>
                    </Upload>
                    <Button class="history__control-item"
                            icon="ios-cloud-download-outline"
                            type="text"
                            size="small"
                            :disabled="!record.length"
                            @click="exportExp">
                        Export
                    </Button>
                    <Button class="history__control-item"
                            icon="ios-trash-outline"
                            type="text"
                            size="small"
                            :disabled="!checkAllGroup.length"
                            @click="delRecords">
                        Delete
                    </Button>
                </div>
            </div>
            <ul class="history__record">
                <CheckboxGroup v-model="checkAllGroup"
                                @on-change="handleCheckAllChange">
                    <li class="history__record-item"
                        v-for="(item, idx) in record"
                        v-if="item.length"
                        @click.self="applyExp(item)">
                        <Checkbox :label="idx">{{item}}</Checkbox>
                    </li>
                </CheckboxGroup>
            </ul>
        </div>

    </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data: function() {
        return {
            checkAll: false,
            indeterminate: false,
            checkAllGroup: [],
        }
    },
    computed: {
        ...mapGetters({
            record: 'getRecord',
            isExpand: 'getExpand'
        })
    },
    methods: {
        ...mapMutations([
            'setCurrentExp',
            'addRecord',
            'delRecord',
            'delAllRecord',
            'toggleExpand'
        ]),
        handleCheckAll() {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                let group = [];
                for(let i = 0; i < this.record.length; i++) {
                    group.push(i)
                }
                this.checkAllGroup = group
            } else {
                this.checkAllGroup = []
            }
        },
        handleCheckAllChange(data) {
            if (data.length === this.record.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        applyExp(item) {
            let idx = item.indexOf('=');
            this.setCurrentExp(idx >= 0 ? item.slice(0, idx) : item)
        },
        exportExp() {
            let data = [];
            if(!this.checkAllGroup.length) data = this.record
            else {
                for(let idx of this.checkAllGroup) {
                    data.push(this.record[idx])
                }
            }

            let a = document.createElement('a')
            let url = URL.createObjectURL(new Blob([data.join('\n')], { type: "text/plain"}))
            a.classList.add('download-util')
            a.href = url
            a.download = 'exported_exp_record.txt'
            document.body.appendChild(a);
            a.click()
            URL.revokeObjectURL(url);
            document.body.removeChild(a)
            a = null;
        },
        handleFile(fd) {
            let expList = []
            let reader = new FileReader()
            reader.onload = () => {
                let data = reader.result
                expList = data.split('\n')
                this.addRecord(expList)
            }
            reader.readAsText(fd);
            return false;
        },
        delRecords() {
            this.delAllRecord(this.checkAllGroup)
            this.checkAllGroup = []
            this.checkAll = false
            this.indeterminate = false
        }
    }
}
</script>

<style lang="less">
@mainColor:     rgb(22, 155, 213);
@textColor:     #657180;
@bgColor:       #f8f8f9;
@shadowColor:   rgba(0, 0, 0, 0.2);

#history{
    position: relative;
    height: 100vh;
    border-radius: 20px 0 0 20px;
    background-color: @bgColor;
}
.history__toggle{
    position: absolute;
    height: 160px;
    width: 12px;
    padding: 0 3px;
    box-sizing: border-box;
    top: 50vh;
    left: 0;
    border-radius: 0 30px 30px 0;
    background-color: @shadowColor;
    transform: translateY(-50%);
    overflow: hidden;
    span{
        top: 80px;
        transform: translateY(-50%);
        position: relative;
        width: 6px;
        height: 6px;
        display: block;
        border: 6px solid transparent;
        border-left-color: @mainColor;
    }
    transition: width 0.5s
}
.history__toggle--expand{
    left: -12px;
    border-radius: 30px 0 0 30px;
    span {
        right: 6px;
        border-left-color: transparent;
        border-right-color: @mainColor;
        margin-left: 0;
    }
}
.history__content{
    width: 30vw;
    padding: 16px;
    box-sizing: border-box;
}
.history__content--close{
    // width: 0px;
    display: none;
    transition: display 0.5s;
}
.history__title{
    color: @mainColor;
    font-size: 2.4em;
    margin-bottom: 1rem;
}
.download-util{
    display: hidden;
}
.history__control{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.history__control-item{
    display: inline-block;
    // margin-right: 6px;
}
.history__record{
    max-height: 88vh;
    // overflow: auto;
}
.history__record-item{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px 0 12px;
    border-left: 3px solid rgba(22, 155, 213, 0.7);
    line-height: 2.8;
    color: @textColor;
    box-shadow: 2px 2px 5px @shadowColor;
    margin: 6px 0;
    background-color: white;
    .ivu-icon-navicon-round{
        color: rgba(22, 155, 213, 0.7);
    }

    &:hover{
        color: @mainColor;
        transition: color 0.5s;
    }
}
</style>
