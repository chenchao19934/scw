<template>
    <div class="wx-goods">
        <div v-if="imgSrc" class="wx-goods__img"><img :src="imgSrc+'?x-oss-process=image/resize,w_750/format,jpg/quality,Q_80'"></div>
        <div v-if="title" class="wx-goods__title">{{title}}</div>
        <div v-if="txt" class="wx-goods__txt">{{txt}}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name : 'i-con',
        props : {
            title : String,
            imgSrc : String,
            txt : String
        }
    }
</script>

<style lang="scss" scoped>
@include b(goods) {
    display: flex;
    flex-wrap: wrap;
    @include e(img) {
        width: 100%;
        height: rem(240);
        overflow:hidden;
        img {
            display: block;
            width: 100%;
        }
    }
    @include e(title) {
        color: #fff;
        font-weight: bold;
        text-align: center;
        border-radius: 20px;
        height: rem(72);
        line-height: rem(72);
        background: #a4c842;
        width: rem(340);
        margin: rem(20) rem(205);
        font-size: rem(32);
    }
    @include e(txt) {
        width: 100%;
        text-align : center;
        padding : rem(30);
        font-size: rem(40);
        font-weight: bold;
    }
}
</style>