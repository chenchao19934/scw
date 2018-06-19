<template>
    <div class="wx-shop" 
         @click="$router.push({name : 'cark'})"
         :class="{move_in_cart : isEnd}">
        <span v-if="shopCarkLenth !== 0">{{shopCarkLenth}}</span>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        props : {
            number : {
                type : Number,
                default : 0
            },
            isEnd : {
                type : Boolean,
                default : false
            }
        },
        computed : {
            ...mapState([
                'shopCarkLenth'
            ])
        }
    }
</script>

<style lang="scss" scoped>
@include b(shop) {
    position: fixed;
    bottom: rem(30);
    left: rem(30);
    width: rem(112);
    height: rem(112);
    background: url('../../assets/image/tab/shop_cark_2.png');
    background-size: cover;
    z-index: 10;
    span {
        position: absolute;
        right: rem(-10);
        top: rem(10);
        width: rem(46);
        height: rem(46);
        border-radius: 50%;
        text-align: center;
        line-height: rem(46);
        background: #ff8e00;
        color: #fff;
    }

}
.move_in_cart{
    animation: mymove .5s ease-in-out;
}
@keyframes mymove{
    0%   { transform: scale(1) }
    25%  { transform: scale(.8) }
    50%  { transform: scale(1.1) }
    75%  { transform: scale(.9) }
    100% { transform: scale(1) }
}
</style>