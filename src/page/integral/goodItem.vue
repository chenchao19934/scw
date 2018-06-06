<template>
    <div class="wx-goods">
        <div class="wx-goods__imgWrap">
            <img v-lazy="obj.img +'?x-oss-process=image/resize,w_240'">
        </div>
        <p class="wx-goods__titles ellipsis">{{obj.name}}</p>
        <div class="wx-goods__count">
            {{obj.integral}}积分<del>{{obj.price}}</del>
            <span @click="exchange(obj.rid)">兑换</span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            obj : {
                type : Object
            }
        },
        methods: {
            exchange(id) {
                this.$emit('exchange',id);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(goods) {
    flex : 0 0 42%;
    margin : rem(20) 4% rem(20);
    overflow : hidden;
    @include e(imgWrap) {
        width :100%;
        height : rem(324);
        overflow : hidden;
        img {
            display: block;
            width : 100%;
        }
    }
    @include e(titles) {
        display : block;
        width : 100%;
        text-align : center;
        font-size: rem(32);
        line-height :rem(48);
    }
    @include e(count) {
        position : relative;
        width: 100%;
        text-align: left;
        color : #272727;
        line-height : rem(52);
        font-size: rem(30);
        del {
            color: #aaaaaa;
        }
        span {
            position: absolute;
            right: 0;
            top: 0;
            width : rem(76);
            height : rem(52);
            text-align: center;
            background: #f08919;
            color : #ffffff;
            border-radius: 5px;
            font-size: rem(28);
        }
    }
}
</style>