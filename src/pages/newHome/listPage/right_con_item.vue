<template>
    <div class="wx-rItem">
        <div class="wx-rItem__wrap">
            <img :src="item.image +'?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-rItem__text ellipsis">{{item.name}}</div>
    </div>
</template>

<script>
    export default {
        props : {
            item : Object
        }
    }
</script>

<style lang="scss" scoped>
@include b(rItem) {
    flex: 0 0 25.333%;
    margin: 0 4%;
    height: rem(208);
    overflow: hidden;
    @include e(wrap) {
        height: rem(150);
        overflow: hidden;
        img {
            display: block;
            width: 100%;
        }
    }
    @include e(text) {
        text-align: center;
        padding: rem(10) 0;
        font-size: rem(28);
    }
}
</style>