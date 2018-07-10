<template>
    <div class="wx-orderItem">
        <div class="wx-orderItem__head">
            <span>{{orderArr.create_time}}</span><em>{{orderArr.status}}</em>
        </div>
        <ul class="wx-orderItem__imgWrap">
            <li v-for="x in orderArr.images">
                <img v-lazy="x.img + '?x-oss-process=image/resize,w_150'" alt="">
            </li>
        </ul>
        <div class="wx-orderItem__price">
            <span>共{{orderArr.number}}个商品</span><span>合计：￥{{orderArr.real_price}}</span>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state === 10">
            <mt-button size="small" 
                        type="primary"
                        @click.native="connect">联系客服</mt-button>
            <mt-button size="small" 
                        type="danger"
                        v-if="orderArr.pay_type != 30" 
                        @click.stop="cancels(orderArr.order_group_id)">取消订单</mt-button>
            <mt-button size="small" 
                        type="danger"
                        @click.stop="payOrder(orderArr.order_group_id)">立即支付</mt-button>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state === 20">
            <mt-button size="small" 
                        type="primary"
                        @click.native="connect">联系客服</mt-button>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state === 30">
            <mt-button size="small" 
                    type="primary" 
                    @click.stop="reminOrder(orderArr.order_group_id)">提醒送单</mt-button>
            <mt-button size="small" 
                    type="primary" 
                    @click.stop="contact(orderArr.order_group_id,orderArr.phone)">联系配送员</mt-button>
            <mt-button size="small" 
                        type="danger"
                        v-if="orderArr.pay_type != 30"
                        @click.stop="refund(orderArr.order_group_id)">申请退款</mt-button>
        </div>

        <div class="wx-orderItem__btn" v-if="orderArr.state === 40">
            <mt-button size="small" 
                        type="primary"
                        @click.native="connect">联系客服</mt-button>
            <mt-button size="small" 
                    type="primary" 
                    @click.stop="contact(orderArr.order_group_id,orderArr.phone)">联系配送员</mt-button>
            <mt-button size="small" 
                    type="primary" 
                    @click.stop="eval(orderArr.order_group_id)">评价送分</mt-button>
        </div>

        <div class="wx-orderItem__btn" v-if="orderArr.state >= 50 && orderArr.state!=100">
            <mt-button size="small" 
                        type="primary"
                        @click.native="connect">联系客服</mt-button>
            <mt-button size="small" 
                        type="danger"
                        @click.stop="deletes(orderArr.order_group_id)">删除订单</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            orderArr : {
                type : Object
            }
        },
        methods: {
            contact(id,phone) {
                this.$emit('contaction',id,phone)
            },
            deletes(id) {
                this.$emit('delOrder',id)
            },
            cancels(id) {
                this.$emit('canOrder',id)
            },
            refund(id) {
                this.$emit('refund',id)
            },
            reminOrder(id) {
                this.$emit('remin',id)
            },
            eval(id) {
                this.$emit('eval',id)
            },
            payOrder(id) {
                console.warn(id);
                localStorage.toPay = true;
                window.location.href = `${process.env.BASE_URL}/public/wxPay.html?orderId=${id}`
                // this.$router.push({name : 'Pay', query: {orderId : id}});
            },
            connect() {
                this.$router.push({name : 'Service'})
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(orderItem) {
    margin-top: rem(10);
    padding-bottom : rem(10);
    background-color : #fff;
    overflow:hidden;
    @include e(head) {
        display: flex;
        justify-content: space-between;
        height : rem(86);
        line-height : rem(84);
        padding : 0 rem(20);
        color: #717171;
        border-bottom: rem(2) solid rgba(0,0,0,0.1);
        font-size : rem(28);
    }
    @include e(imgWrap) {
        display: flex;
        // overflow: scroll;
        // overflow-y : hidden;
        height : rem(180);
        padding : 0 rem(20);
        li {
            width :rem(177.5);
            img {
                display :block;
                width :100%;
            }
        }
    }
    @include e(price) {
        text-align : right;
        height : rem(60);
        padding : 0 rem(20);
        line-height : rem(60);
        font-size : rem(32);
    }
    @include e(btn) {
        text-align : right;
        height : rem(76);
        padding : rem(10) rem(20);
        line-height : rem(52);
        font-size : rem(24);
        .mint-button--small {
            font-size: 12px;
            height: 28px;
        }
    }
}
</style>