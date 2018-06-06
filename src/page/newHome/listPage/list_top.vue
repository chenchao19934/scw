<template>
    <div class="wx-listbar">
        <router-link to="/search">
            <div class="wx-listbar__icon"></div>
            <div class="wx-listbar__search">搜索你想要的</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@include b(listbar) {
    position: fixed;
    top: 0;
    left: 0;
    padding: 5px rem(30);
    background-color: #fff;
    height: 44px;
    box-shadow: inset 0px -1px 1px #abd13e;
    z-index : 1;
    @include e(icon) {
        position: absolute;
        top: 50%;
        left: 20%;
        width: 25px;
        height: 25px;
        background : url('../../../assets/image/icon-magnifying-glass.png');
        background-size : 100% 100%;
        transform: translateY(-50%);
    }
    @include e(search) {
        width: rem(690);
        height: 34px;
        line-height: 34px;;
        background-color: #ededed;
        text-align: center;
        color: #717171;
        border-radius: rem(20);
        font-size: 16px;
    }
}
</style>