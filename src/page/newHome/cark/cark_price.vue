<template>
    <div class="wx-priceBar">
        <div class="wx-priceBar__choose">
            <input class="check-box" 
                    type="checkbox"
                    :class="{'is-check' : allCheck}"
                    @click="check">
            <span>全选</span>
        </div>
        <div class="wx-priceBar__total" v-show="removeAll">
            <span>￥{{total|toFixed}}</span>
            <em>(不包含运费)</em>
        </div>
        <div class="wx-priceBar__buy" v-if="removeAll" @click="confirm">结算</div>
        <div class="wx-priceBar__buy waring" v-if="!removeAll" @click="deletes">删除</div>
        <div class="wx-priceBar__buy" v-if="!removeAll" @click="collection">收藏</div>
    </div>
</template>

<script>
    export default {
        props : {
            allCheck : {
                type :Boolean,
                default : true
            },
            total : {
                type : Number,
                default : 0.00,
                required: true
            },
            removeAll : {
                type :Boolean,
                default : true
            }
        },
        methods : {
            check() {
                this.$emit('changeChoose',this.allCheck);
            },
            collection() {
                this.$emit('isCollection');
            },
            deletes() {
                this.$emit('isDelete');
            },
            confirm() {
                this.$emit('isConfirm');
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(priceBar) {
    position: fixed;
    display : flex;
    left: 0;
    bottom: 56px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #ece8e8;
    z-index:10;
    @include e(choose) {
        position: relative;
        width : rem(250);
        padding : 6px 10px;
        span {
            position: absolute;
            top: 50%;
            left : 50px;
            transform: translateY(-50%);
            font-size : 16px;
        }
    }
    @include e(total) {
        width : rem(350);
        span {
            color: #ff8e00;
            font-size: 14px;
        }
        em {
            color: #717171;
            font-size: 14px;
        }
    }
    @include e(buy) {
        width : rem(150);
        margin-left : rem(10);
        text-align: center;
        color: #fff;
        background: #abd13e;
        font-size : 14px;
    }
    .waring {
        background-color : #ff8e00;
        margin-left : rem(180);
    }
}
.check-box {
    position: relative;
    width: 26px;
    height: 26px;
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    &::before {
        display: block;
        width: 26px;
        height: 26px;
        border : 1px solid #ff8e00;
        border-radius: 26px;
        background: #fff;
        content: '';
        transition: background-color 0.5s ease-in-out;
    }
    &::after {
        position: absolute;
        top: 33%;
        left: 25%;
        display: table;
        width: 14px;
        height: 6px;
        border: 1px solid #fff;
        border-top: 0;
        border-right: 0;
        content: ' ';
        opacity: 0;
        transition: opacity 0.5s  ease-in-out;
        transform: rotate(-45deg);
    }
}
.is-check::before {
    background: #ff8e00;
    border-color: #ff8e00;
}
.is-check::after {
    opacity: 1;
}
</style>