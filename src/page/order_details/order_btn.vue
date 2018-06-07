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
                    @click.native="payOrder"
                    v-if="state == 10">立即支付</mt-button>

        <mt-button size="small" 
                    type="danger" 
                    @click.native="remindOrder"
                    v-if="state == 20 || state == 30 || state == 31">提醒送单</mt-button>
    </div>
</template>

<script>
    export default {
        props: {
            state : Number,
            payType : Number
        },
        methods: {
            // 立即支付
            payOrder() {
                this.$emit("pay");
            },
            // 分享订单
            shareOrder() {
                this.$emit("share");
            },
            // 评价订单
            evalOrder() {
                this.$emit("eval");
            },
            // 提醒送单
            remindOrder() {
                this.$emit("remind");
            }
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