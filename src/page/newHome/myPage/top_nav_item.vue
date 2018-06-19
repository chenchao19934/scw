<template>
    <div class="wx-item">
        <h2>{{item.value}}</h2>
        <p>{{item.name}}</p>
        <span v-if="item.id===3 && giftCount !== 0">新礼品</span>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        props : {
            item : Object,
        },
        computed : {
            ...mapState([
                'giftCount'
            ])
        }
    }
</script>

<style lang="scss" scoped>
@include b(item) {
    position :relative;
    flex: 1 1 auto;
    h2 {
        font-size: rem(32);
        font-weight: bold;
        color: #333333;
        line-height: rem(55);
        text-align: center;
    }
    p {
        color: #ff8e00;
        font-size: rem(32);
        line-height: rem(55);
        text-align: center;
    }
    span {
        position: absolute;
        right: rem(-30);
        top: rem(-10);
        padding : 0 rem(6);
        background-color : #ff8e00;
        color : #fff;
        font-size: rem(24);
        border-radius : rem(6);
    }
}
</style>