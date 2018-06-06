<template>
    <div class="wx-dishCon">
        <div class="wx-dishCon__title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props : {
            title : {
                type : String,
                default : '蔬菜瓜果'
            }
        }    
    }
</script>

<style lang="scss" scoped>
@include b(dishCon) {
    display: flex;
    flex-wrap: wrap;
    width: rem(562.5);
    @include e(title) {
        position: relative;
        text-align: center;
        width: 100%;
        padding: rem(42) 0 rem(28);
        height: rem(112);
        font-size: rem(32);
        &::before , &::after {
            position: absolute;
            top: 58%;
            content: "";
            width: 25px;
            height: 1px;
            background: #585858;
        }
        &::before {
            left: 24%;
        }
        &::after {
            right: 24%;
        }
    }
}
</style>