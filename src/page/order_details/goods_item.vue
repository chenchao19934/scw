<template>
    <div class="wx-item">
        <div class="wx-item__imgWrap left">
            <span v-if="goodItemList.tag">{{goodItemList.tag}}</span>
            <img v-lazy="goodItemList.img +'?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-item__text left">
            <h2 class="ellipsis">{{goodItemList.goods_name}}</h2>
            <p class="ellipsis">{{goodItemList.description}}</p>
            <p class="ellipsis">规格：{{goodItemList.goods_unit}}</p>
            <em v-if="goodItemList.is_coupon == 1">红包不可用</em>
            <div class="wx-item__price">
                <span>￥{{goodItemList.newprice}}</span>
                <span class="right">X{{goodItemList.number}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            goodItemList : Object,
        }
    }
</script>

<style lang="scss" scoped>
@include b(item){
    width: 100%;
    height: rem(298);
    border-bottom: rem(2) solid #e8e8e8;
    padding: rem(20);
    @include e(imgWrap) {
        width: rem(256);
        height: rem(256);
        overflow: hidden;
        position: relative;
        img {
            display: block;
            width: 100%;
        }
        span {
            position: absolute;
            left: rem(5);
            top: rem(5);
            background-color: #ff8e00;
            font-size: rem(24);
            border-radius: 10px;
            padding: 2px 8px;
            color: #fff;
        }
        em {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            padding: rem(12);
        }
    }
    @include e(text) {
        position: relative;
        margin-left: rem(28);
        width: rem(405);
        height: rem(256);
        .wx-item__price {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            span {
                color: #ff8e00;
                font-size: rem(32);
                font-weight: bold;
            }
        }
        h2 {
            font-size: rem(32);
            margin-bottom: rem(5);
            color: #000;
        }
        p {
            color: #717171;
            font-size: rem(26);
            margin-bottom: rem(5);
        }
        >em {
            display: inline-block;
            color: #ff8e00;
            border-radius: 3px;
            padding: 2px 5px;
            box-shadow: 0 0 1px #ff8e00;
            padding: 0 5px;
            font-size: rem(24);
        }
    }
}
</style>