<template>
    <div class="wx-goods">
        <div class="wx-goods__mask" v-if="!goods.delete_flag">
            <p>{{goods.content}}<span>{{goods.content_pay}}</span>元</p>
        </div>
        <div class="wx-goods__choose"></div>
        <div class="wx-goods__img">
            <span>{{goods.tag}}</span>
            <img v-lazy="goods.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'" alt="">
        </div>
        <div class="wx-goods__tet">
            <h2 class="ellipsis">{{goods.goods_name}}</h2>
            <div class="btn">
                <span v-if="goods.is_coupon == 1">红包不可用</span>
                <span v-if="goods.tag_name">{{goods.tag_name}}</span>
            </div>
            <p>{{goods.goods_unit}}<span class="right">X{{goods.number}}</span></p>
            <div class="price">
                <span>￥</span><em>{{goods.price | toFixed}}</em>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            goods : {
                type : Object
            }
        },
        methods: {
            
        },
    }
</script>

<style lang="scss" scoped>
@include b(goods) {
    position: relative;
    display : flex;
    height : rem(200);
    background-color : #fff;
    border-color: #E8E8E8;
    border-width: rem(1);
    border-style: solid;
    @include e(mask) {
        position: absolute;
        left: 0;
        top : 0;
        right : 0;
        bottom : 0;
        background-color:rgba(0,0,0,.3);
        z-index: 1;
        p {
            position: absolute;
            bottom : rem(10);
            right : 0;
            color: #585858;
            font-size : rem(28);
            span {
                color: #ff0000;
            }
        }
    }
    @include e(choose) {
        width : rem(90);
        line-height: rem(200);
        padding : rem(72) rem(17);
    }
    @include e(img) {
        position: relative;
        width : rem(200);
        background-color : #fff;
        overflow : hidden;
        img {
            display :block;
            width : 100%;
            border : 0;
        }
        span {
            background-color: #abd13e;
            border-radius: 0 0 rem(42) 0;
            color: #fff;
            padding : rem(10) rem(16);
            font-size: rem(24);
        }
    }
    @include e(tet) {
        position :relative;
        width : rem(460);
        padding : rem(10) rem(30);
        background-color : #fff;
        overflow : hidden;
        h2 {
            font-size : rem(32);
        }
        p {
            color: #717171;
            font-size : rem(24);
        }
        >div {
            color: #ff8e00;
        }
        >div.btn{
            min-height : rem(50);
            padding : rem(10) 0;
            span {
                box-shadow: 0 0 1px #ff8e00;
                padding: 0 rem(10);
                margin-right : rem(10);
            }
        }
        >div.price {
            padding : rem(5) 0;
            span {
                font-size : rem(24);
            }
            em {
                font-size : rem(32);
            }
        }
    }
}
</style>