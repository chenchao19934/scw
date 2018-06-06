<template>
    <div class="wx-evals" @click="$router.push({name : 'dishDetail',params : {pid:evalsArr.goods_id}})">
        <div class="wx-evals__tit">
            {{evalsArr.name}}
            <!-- <span class="right">></span> -->
        </div>
        <div class="wx-evals__start">
            <Statr :count="evalsArr.score"></Statr>
            <span class="right">2018-03-16 15:42:43</span>
        </div>
        <slot></slot>
        <div class="wx-evals__delete" @click.stop="isDelete(evalsArr.id)"></div>
    </div>
</template>

<script>
    import Statr from "@/page/compon/rate_start";
    export default {
        components : {
            Statr
        },
        props : {
            evalsArr : {
                type : Object
            }
        },
        methods : {
            isDelete(deleteID) {
                this.$emit('deleteEval',deleteID);
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(evals) {
    position: relative;
    min-height: rem(210);
    padding: 0 rem(20) rem(20);
    border: 1px solid #fafafa;
    margin-bottom: rem(20);
    @include e(tit) {
        line-height: rem(64);
        font-size: rem(32);
        padding: 0 rem(10); 
        border-bottom: 1px solid #fafafa;
        span {
            height: 100%;
        }
    }
    @include e(start) {
        line-height: rem(60);
        font-size: rem(40);
        display: flex;
        justify-content: space-between;
        span {
            color: #717171;
            font-size: rem(28);
        }
    }
    @include e(delete) {
        position: absolute;
        right: rem(30);
        bottom: rem(20);
        width: rem(32);
        height: rem(32);
        background: url("../../assets/image/icon_delete.png")center no-repeat;
        background-size: cover;
    }
}
</style>