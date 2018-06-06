<template>
    <ul class="wx-orderTop">
        <li v-for="(x,index) in arr" 
            class="ellipsis"
            @click="changeIndex(index)"
            :class="{'active' : indexType === index}"
            :key="index">{{x}}</li>
        <div class="wx-orderTop__scroll" ref="scroll">
            <span></span>
        </div>
    </ul>
</template>

<script>
    export default {
        props : {
            arr :{
                type : Array
            }
        },
        data() {
            return {
                indexType: 0
            }
        },
        activated() {
            if (!this.$route.meta.isBack) {
                this.$nextTick(()=> {
                    this.indexType = this.$route.params.type*1;
                    this.$refs.scroll.style.left = this.indexType*20 +'%';
                })
            }
        },
        methods: {
            changeIndex(index) {
                this.indexType = index;
                this.$emit('order',this.indexType);
                this.$refs.scroll.style.left = this.indexType*20 +'%';
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(orderTop) {
    position: fixed;
    top : 40px;
    display : flex;
    width : 100%;
    height : 42px;
    background: #fff;
    z-index : 1;
    border-bottom: 1px solid #d8d8d8;
    li {
        flex: 1 1 0%;
        text-align: center;
        color: rgb(171, 209, 62);
        padding : 10px 0;
        font-size : rem(28);
        font-weight: bold;
    }
    @include e(scroll) {
        position : absolute;
        width : 20%;
        bottom : 0;
        left : 0;
        transition: all .6s;
        span {
            display : block;
            width : 70%;
            height : rem(4);
            margin : 0 auto;
            background-color :rgb(171, 209, 62);
        }
    }
}
</style>