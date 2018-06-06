<template>
    <div @click="show">
        <div class="wx-address" v-if="user">
            <div class="wx-address__icon"></div>
            <div class="wx-address__detail">
                <div>
                    <span class="user">{{user}}</span>
                    <span class="phone">{{phone}}</span>
                </div>
                <div>收货地址：{{address}}</div>
            </div>
        </div>
        <div v-else class="none-address">
            <p>请选择收货地址</p>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            user:String,
            phone : String,
            address : String
        },
        methods: {
            show() {
                this.$emit('selectAddress');
            },
        },
    }
</script>

<style lang="scss" scoped>
@include b(address) {
    position: relative;
    display : flex;
    padding: rem(16);
    border-bottom: 2px solid;
    border-top: 0 solid;
    border-image : url('../../assets/image/icon/cark_border.png') 4 0 repeat;
    background: #fff;
    margin: rem(20) 0;
    @include e(icon) {
        width : rem(96);
        height : rem(96);
        margin-right : rem(20);
        background : url("../../assets/image/icon/address.png") center no-repeat;
        background-size : 70% 70%;
    }
    @include e(detail) {
        font-size : rem(28);
        width : rem(620);
        overflow: hidden;
        div {
            line-height : rem(48);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span {
                position:relative;
                padding-left : rem(52);
            }
            span.user::before,span.phone::before {
                position:absolute;
                left:0;
                content :'';
                width:rem(48);
                height :rem(48);
            }
            span.user::before {
                background: url('../../assets/image/icon/user.png') center no-repeat;
                background-size : 80%
            }
            span.phone::before {
                background: url('../../assets/image/icon/telephone.png') center no-repeat;
                background-size : 75%
            }
        }
    }
}
.none-address {
    position: relative;
    display : flex;
    padding: rem(16);
    border-bottom: 2px solid;
    border-top: 0 solid;
    border-image : url('../../assets/image/icon/cark_border.png') 4 0 repeat;
    background: #fff;
    margin: rem(20) 0;
    justify-content: center;
    align-items: center;
    p {
        padding: rem(30) 0;
        font-size: rem(32);
    }
}
</style>