<template>
    <div class="wx-conect">
        <div class="wx-conect__heads">联系方式</div>
        <div class="wx-conect__bodys">
            <p>{{phone}}</p>
            <span>(点击或长按电话号码进行复制)</span>
            <span>(配送过程中可能无法接听电话，请您谅解！)</span>
        </div>
        <div class="wx-conect__btns">
            <span @click="clo">取消</span>
            <span @click="clo">确定</span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            phone : {
                type : String
            }
        },
        methods: {
            clo() {
               this.$emit('close'); 
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(conect) {
    width : 100%;
    height : rem(400);
    text-align: center;
    background-color : #fff;
    @include e(heads) {
        height : rem(100);
        line-height : rem(100);
        font-size : rem(32);
        color: #fff;
        background-color : #339d39;
    }
    @include e(bodys) {
        padding : rem(20) 0;
        height : rem(200);
        p {
            color: #339d39;
            line-height : rem(64);
            font-size : rem(40);
        }
        span {
            display : inline-block;
            font-size : rem(28);
        }
    }
    @include e(btns) {
        display : flex;
        height : rem(100);
        line-height : rem(100);
        align-items: center;
        font-size : rem(32);
        border-top : rem(2) solid #717171;
        span {
            flex : 1 1 auto;
        }
        span:first-child {
            box-shadow: 0 0 1px;
        }
    }
}
</style>