<template>
    <div class="wx-balance">
        <p>账户余额</p>
        <h1>{{money | toFixed}}</h1>
        <span>账号余额可用于购买送菜蛙商品（支付时勾选即可抵扣订单金额）</span>
    </div>
</template>

<script>
    export default {
        props : {
            money : Number
        }
    }
</script>

<style lang="scss" scoped>
@include b(balance) {
    min-height : rem(300);
    width : 90%;
    margin : 0 auto rem(40);
    padding : rem(50) rem(75) 0;
    box-shadow: rem(10) rem(10) #e5e5e5;
    border-radius: rem(10);
    background-color: #fff;
    p,h1 {
        text-align : center;
        margin-bottom : rme(20);
    }
    p {
        color: #515151;
        font-size :rem(28);
    }
    h1 {
        color: #ff8e00;
        font-size :rem(56);
        font-weight: bold;
    }
    span {
        color: #717171;
        font-size :rem(24);
    }
}
</style>
