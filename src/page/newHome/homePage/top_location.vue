<template>
    <div class="wx-location">
        <div class="wx-location__title ellipsis" @click="$router.push({name : 'homeAddress'})">{{title}}▼</div>
        <div class="wx-location__icon"></div>
        <div class="wx-location__icon"></div>
    </div>
</template>

<script>
    export default {
        props : {
            title : String
        }
    }
</script>

<style lang="scss" scoped>
@include b(location) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 5px;
    height: 44px;
    z-index: 10; 
    background-color: #fff;
    @include e(title) {
        position: relative;
        float: left;
        width: rem(576);
        padding-left: rem(70);
        font-size: 16px;
        background-color: #f0f0f0;
        border-radius: 16px;
        text-align: center;
        color: #abd13e;
        line-height: 34px;
        &::before {
            content: "";
            position: absolute;
            left: rem(10);
            top: rem(0);
            width: 23px;
            height: 34px;
            background-color:tomato;
            background: url('../../../assets/image/scw/cus_location.png') center no-repeat;
            background-size: 100%;
        }
    }
    @include e(icon) {
        float: left;
        width: rem(40);
        height: 34px;
        margin-left: rem(30);
    }
    :nth-child(2) {
        background: url('../../../assets/image/scw/home_search.jpg') center no-repeat;
        background-size: contain;
    }
    :nth-child(3) {
        background: url('../../../assets/image/scw/home_cus.jpg') center no-repeat;
        background-size: contain;
    }
}
</style>