<template>
    <div class="wx-priceCon">
        <div class="title">
            <span>订单合计</span><span>￥{{total}}</span>
        </div>
        <div v-for="(x) in list">
            <span>{{x.name}}</span>
            <span>{{x.money}}</span>
        </div>
        <div class="title" style="border-top:1px solid #ccc">
            <span>实际支付</span><span>￥{{actual}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            total : String,
            actual : String,
            list : Array
        }
    }
</script>

<style lang="scss" scoped>
@include b(priceCon) {
    >div {
        display : flex;
        justify-content: space-between;
        line-height: rem(56);
        font-size : rem(28);
        padding : rem(6) rem(16);
        color : #717171;
        background-color : #fff;
    }
    >div.title {
        font-size : rem(32);
        color : #333;
        span:nth-child(2) {
            color: #ff8e00;
        }
    }
}
</style>