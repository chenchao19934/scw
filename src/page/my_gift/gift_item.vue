<template>
    <div class="wx-gift clearfix"
            :class="{'gift-select' : obj.gift_id === coupnId}">
        <div class="wx-gift__img">
            <img v-lazy="obj.image + '?x-oss-process=image/resize,w_240,h_240'" alt="">
        </div>
        <div class="wx-gift__txt">
            <h3 class="ellipsis">{{obj.title}}</h3>
            <p class="ellipsis">{{obj.describe}}</p>
            <p class="ellipsis">有效期至：{{obj.expire}}</p>
        </div>
        <div class="wx-gift__btn" :class="(obj.is_received > 0) ? 'gift-faile' : 'gifts'">
            <span v-if="obj.is_received == 1">已领取</span>
            <span v-else-if="obj.is_received == 2">已失效</span>
            <span v-else @click="receiveGift(obj.gift_id)">领取</span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            obj : {
                type : Object
            },
            coupnId : {
                type : Number
            }
        },
        methods: {
            receiveGift(gift_id) {
                this.$emit('receive',gift_id);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(gift) {
    position: relative;
    height : rem(200);
    border-radius: 8px;
    box-shadow: 0 0 1px #717171;
    margin-top : rem(20);
    overflow:hidden;
    @include e(img) {
        float : left;
        width : rem(200);
        height : rem(200);
        padding : rem(16);
        img {
            display : block;
            width : 100%;
        }
    }
    @include e(txt) {
        float : left;
        width : rem(372);
        height : rem(200);
        padding : rem(16) 0;
        overflow : hidden;
        h3 {
            font-size: rem(40);
        }
        p:nth-child(2) {
            color: #a7a0a0;
            font-size: rem(20);
            line-height:rem(48);
            margin-bottom : rem(30);
        }
        p:nth-child(3) {
            color: #444;
            font-size: rem(24);
        }
    }
    @include e(btn) {
        position : relative;
        float : left;
        width : rem(114);
        height : rem(200);
        background : #61b56a;
        font-size : rem(40);
        line-height: rem(48);
        text-align: center;
        color: #fff;
        span {
            position : absolute;
            width : rem(57);
            top : 50%;
            left : 50%;
            transform: translate(-50%,-50%);
        }
    }
}
.gift-select {
    animation-name: bigAssButtonPulse;
    animation-duration:2.5s;
    animation-iteration-count:3;  
}
.gift-faile {
    background-color: #9d9d9d;
}
@keyframes bigAssButtonPulse {
    from { -webkit-box-shadow: 0 0 15px #fff; }
    50% { -webkit-box-shadow: 0 0 25px #ff8e00; }
    to { -webkit-box-shadow: 0 0 15px #fff; }
}
</style>