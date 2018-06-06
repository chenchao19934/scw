<template>
    <div class="wx-item3">
        <div class="wx-item3__imgWrap">
            <span>满{{goodsLikeItem.full_money}}</span>
            <img v-lazy="goodsLikeItem.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-item3__text">
            <h2 class="ellipsis">{{goodsLikeItem.name}}</h2>
            <div class="wx-item__price">
                <span>￥{{goodsLikeItem.money}}</span>
                <del>￥{{goodsLikeItem.price}}</del>
                <em :class="{'isOutTime' : goodsLikeItem.oss !== 0}"
                    @click="change(goodsLikeItem.rid,goodsLikeItem.id,goodsLikeItem.full_money,goodsLikeItem.oss)">兑换</em>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            goodsLikeItem : Object,
            moneys : Number
        },
        methods: {
            change(id,goodsId,money,oss) {
                this.$emit("isFull",id,goodsId,money,oss);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(item3) {
    flex: 0 0 48%;
    margin: 0 1%;
    overflow: hidden;
    @include e(imgWrap) {
        position: relative;
        img {
            display: block;
            height: rem(360);
        }
        span {
            position: absolute;
            left: rem(-44);
            top: rem(22);
            width: rem(170);
            text-align: center;
            font-size: rem(26);
            color: #fff;
            background-color: #abd13e;
            transform: rotate(-45deg);
        }
    }
    @include e(text) {
        h2 {
            text-align: center;
            font-size: rem(28);
            line-height: rem(52);
            font-weight: bold;
        }
        p {
           color: #717171;
           font-size: rem(28);
           line-height: rem(38); 
           text-align: center;
        }
        .wx-item__price {
            position: relative;
            line-height: rem(52);
            text-align: left;
            span {
                font-size: rem(36);
                color: #ff8e00;
            }
            del {
                font-size: rem(28);
            }
            em {
                position: absolute;
                right: 0;
                padding: rem(2) rem(10);
                background: #f08919;
                color: #fff;
                font-size: rem(28);
                border-radius: 5px;
            }
            em.isOutTime {
                background: #717171;
                color: #fff;
            }
        }
    }
}
</style>