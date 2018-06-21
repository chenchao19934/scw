<template>
    <div class="wx-item">
        <div class="wx-item__userLogo">
            <img :src="item.logo + '?x-oss-process=image/resize,w_200'">
        </div>
        <div class="wx-item__time">
            <p>{{item.nick_name}}</p>
            <p>{{item.time}}</p>
        </div>
        <div class="wx-item__money">
            <p>{{item.coupon}}元</p>
            <p v-if="tag === item.red_bag_order">
                <img src="../../assets/image/services/red_pack_one.png" alt="">
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            item : {
                type : Object
            },
            tag : {
                type : Number
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(item) {
    display: flex;
    height: rem(130);
    border-bottom: 1px solid #a2a2a2;
    padding: rem(20);
    img {
        display: block;
        width: 100%;
    }
    @include e(userLogo) {
        flex-basis: rem(90);
        height: rem(90);
        border-radius: 50%;
        overflow: hidden;
    }
    @include e(time) {
        flex-basis: rem(400);
        height: rem(90);
        overflow: hidden;
        padding-left: rem(20);
        p {
            line-height: rem(45);
            font-size: rem(24);
        }
    }
    @include e(money) {
        flex-basis: rem(120);
        p {
            line-height: rem(60);
            font-size: rem(24);
            text-align: right;
        }
    }
}
</style>