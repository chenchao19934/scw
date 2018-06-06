<template>
    <div class="at-cell" @click="show">
        <div class="wx-wrapper">
            <div class="wx-wrapper__title">
                <slot name="img"></slot>
                <span>{{title}}</span>
            </div>
            <div class="wx-wrapper__value" v-if="value">
                <span>{{value}}</span>
            </div>
            <div class="wx-wrapper__state" :class="{'close':isShow}"></div>
        </div>
        <slot name="box" v-if="isShow"></slot>
    </div>
</template>

<script>
    export default {
        props : {
            title : String,
            value : String,
            state : String,
        },
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            show() {
                this.isShow = !this.isShow
            }
        },
    }
</script>

<style lang="scss" scoped>
.at-cell {
    background-color: #fff;
    box-sizing: border-box;
    min-height: 48px;
    overflow: hidden;
    position: relative; 
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top;
}
@include b(wrapper) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 5px 10px;
    width: 100%;
    @include e(title) {
        flex: 0 0 auto;
        span,img {
            vertical-align: middle;
        }
    }
    @include e(value) {
        font-size : 14px;
        color :#a99e9e;
    }
    @include e(state) {
        width : 13px;
        height: 22px;
        background:url('../../assets/image/icon/icon-arrow-down.png') center no-repeat;
        transform:rotate(-90deg);
        transition: all 0.3s linear;
    }
    .close {
        transform:rotate(0);
    }
}
.wx-box {
    transition: all .5s linear;
}
</style>