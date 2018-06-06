<template>
    <div class="wx-delete" v-if="deleteArr.length">
        <mt-cell :title="x"
                    @click.native="searchHot(x)"
                    v-for="(x,index) in deleteArr" :key="index">
            <img style="margin-right:10px;padding:1px" slot="icon" src="../../assets/image/icon-nav.png" width="20" height="20">
        </mt-cell>
        <mt-cell title="清空历史搜索" @click.native="clear">
            <img style="margin-right:10px;padding:1px" slot="icon" src="../../assets/image/icon-park-tips.png" width="20" height="20">
        </mt-cell>
    </div>
</template>

<script>
    export default {
        props: {
            deleteArr :{
                type : Array
            }
        },
        methods : {
            searchHot(name) {
                this.$emit('search',name)
            },
            clear() {
                this.$emit('clearHistory');
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(delete) {
    .mint-cell:last-child {
        text-align: center
    }
}
</style>