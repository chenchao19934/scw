<template>
    <div class="wx-orderBtn">
        <mt-button size="small">联系客服</mt-button>
        <mt-button size="small" 
                    type="primary" 
                    @click.native="shareOrder"
                    v-if="state == 20 || state == 30 || state == 31 || state == 40 || state == 60">分享订单</mt-button>

        <mt-button size="small" 
                    type="primary" 
                    @click.native="evalOrder"
                    v-if="state == 40">评价送分</mt-button>

        <mt-button size="small" 
                    type="primary" 
                    @click.native="evalOrder"
                    v-if="state == 10">立即支付</mt-button>

        <mt-button size="small" 
                    type="primary" 
                    @click.native="evalOrder"
                    v-if="state == 40">评价订单</mt-button>

        <mt-button size="small" 
                    type="danger" 
                    @click.native="evalOrder"
                    v-if="state == 20 || state == 30 || state == 31">提醒送单</mt-button>

        <mt-button size="small" 
                    type="danger" 
                    @click.native="evalOrder"
                    v-if="(state == 20 || state == 30) && payType != 30">取消订单</mt-button>

        <mt-button size="small" 
                    type="danger" 
                    @click.native="deleteOrder"
                    v-if="state == 50 || state == 60 || state == 80 || state == 110">删除订单</mt-button>
    </div>
</template>

<script>
    export default {
        props: {
            state : Number,
            payType : Number
        },
        methods: {
            shareOrder() {
                this.$emit("share");
            },
            evalOrder() {
                this.$emit("eval");
            },
            deleteOrder() {
                this.$emit("delete");
            },
        },
    }
</script>

<style lang="scss" scoped>
@include b(orderBtn) {
    position : fixed;
    left:0;
    bottom:0;
    width: 100%;
    height: 50px;
    padding : 0 10px;
    line-height: 50px;
    background: #fff;
    text-align: right;
}
</style>