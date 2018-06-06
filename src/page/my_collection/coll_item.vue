<template>
    <div class="wx-collection" @click="$router.push({name : 'dishDetail',params : {pid:item.goods_id }})">
        <div class="wx-collection__imgWrap">
            <img v-lazy="item.img +'?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-collection__title">
            <h2 class="ellipsis">{{item.name}}</h2>
            <p class="ellipsis">{{item.time}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            item : {
                type : Object
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(collection) {
    display : flex;
    height: rem(198);
    background-color: #ffffff;
    border-bottom: rem(2) solid #E8E8E8;
    @include e(imgWrap) {
        width: rem(196);
        height: rem(196);
        overflow: hidden;
        >img {
            display: block;
            width: 100%;
        }
    }
    @include e(title) {
        
        margin-left : rem(20);
        h2 {
            line-height: rem(120);
            font-size: rem(32);
        }
        p {
            line-height: rem(76);
            font-size: rem(28);
            color: #717171;
        }
    }
}
</style>