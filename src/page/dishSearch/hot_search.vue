<template>
    <div class="wx-history">
        <h2>热门搜索</h2>
        <ul class="wx-history__wrap">
            <li class="ellipsis" v-for="(x,index) in hotList" 
                                    @click="searchHot(x.name)"
                                    :key="index">{{x.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props : {
            hotList : {
                type :Array
            }
        },
        methods :{
            searchHot(name) {
                this.$emit('search',name)
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(history) {
    h2 {
        font-size: rem(28);
        color: #abd13e;
        padding: rem(20) rem(15) 0;
    }
    @include e(wrap) {
        display: flex;
        flex-wrap: wrap;
        li {
            flex: 0 0 31.3333%;
            line-height: rem(64);
            font-size: rem(28);
            text-align: center;
            margin: 2% 1%;
            background-color: #fff;
        }
    }
}
</style>