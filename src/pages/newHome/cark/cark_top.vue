<template>
    <div class="wx-cTop">
        {{title}}
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        props : {
            title : {
                type : String,
                default : '购物车'
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(cTop) {
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 43px;
    line-height : 43px;
    text-align : center;
    color : #abd13e;
    background-color : #fff;
    font-size: 16px;
    border-bottom : 1px solid #abd13e;
    z-index : 6;
    span {
        position : absolute;
        right : 18px;
        top: 0;
        font-size : 14px;
    }
}
</style>