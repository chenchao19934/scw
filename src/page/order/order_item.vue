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
            <span>联系客服</span>
            <span v-if="orderArr.pay_type != 30" @click.stop="cancels(orderArr.order_group_id)">取消订单</span>
            <span class="btn-green" @click.stop="payOrder(orderArr.order_group_id)">立即支付</span>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state === 20">
            <span>联系客服</span>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state === 30">
            <span>联系客服</span>
            <span class="btn-green" @click.stop="contact(orderArr.order_group_id,orderArr.phone)">联系配送员</span>
            <span @click.stop="reminOrder(orderArr.order_group_id)">提醒送单</span>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state === 40">
            <span>联系客服</span>
            <span class="btn-green" @click.stop="contact(orderArr.order_group_id,orderArr.phone)">联系配送员</span>
            <span class="btn-green" @click.stop="eval(orderArr.order_group_id)">评价送分</span>
        </div>
        <div class="wx-orderItem__btn" v-if="orderArr.state >= 50 && orderArr.state!=100">
            <span>联系客服</span>
            <span @click.stop="deletes(orderArr.order_group_id)">删除订单</span>
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
        height : rem(56);
        padding : 0 rem(20);
        line-height : rem(52);
        font-size : rem(28);
        span {
            display : inline-block;
            padding: 0px rem(12);
            border-radius: 4px;
            border: 1px solid #717171;
            margin-left : rem(10);
        }
        span.btn-green {
            border-color :#abd13e;
            color : #abd13e;
        }
    }
}
</style>