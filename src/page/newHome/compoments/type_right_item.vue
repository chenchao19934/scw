<template>
    <div class="wx-leftItem" @click="$router.push({name : 'dishDetail', params:{pid:goodItemList.id}})">
        <div class="wx-leftItem__text">
            <h2 class="ellipsis">{{goodItemList.name}}</h2>
            <p class="ellipsis">{{goodItemList.description}}</p>
            <p class="ellipsis">规格：{{goodItemList.goods_unit}}</p>
            <div class="price">
                <span>￥{{goodItemList.newprice}}</span>
                <del v-if="goodItemList.newprice !== goodItemList.price">{{goodItemList.price}}</del>
                <buyCark @showMoveDot="showMoveDotFun" 
                         @showMoveUnit="showMoveUnits" 
                         :shop="goodItemList"></buyCark>
            </div>
        </div>
        <div class="wx-leftItem__img">
            <img class="class="page-lazyload-image"" v-lazy="goodItemList.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>

        <transition appear 
                    @after-appear="afterEnter" 
                    @before-appear="beforeEnter" 
                    v-for="(item,index) in showMoveDot" 
                    :key="index">
            <span class="move_dot" v-if="item">
                <span class="svg move_liner"></span>
            </span>
        </transition>
    </div>
</template>

<script>
    import buyCark from './buyCark';
    import ball from '@/mixins/ball';
    export default {
        components : {
            buyCark
        },
        mixins : [ ball ],
        data() {
            return {

            }
        },
        props: {
            goodItemList : Object,
            endX : {
                type : String,
                default : window.innerWidth / 2 + 'px'
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(leftItem) {
    width: 100%;
    height : rem(256);
    display : flex;
    justify-content: space-between;
    padding: rem(10) 1%;
    overflow : hidden;
    @include e(img) {
        position: relative;
        width : rem(234);
        height : rem(234);
        border: rem(2) solid #ddd;
        img {
            display : block;
            width : 100%;
        }
        span {
            position: absolute;
            left: 0;
            top: 0;
            padding: 0 rem(16);
            font-size: rem(28);
            color: #fff;
            background-color: #abd13e;
            border-radius: rem(16);
            z-index: 1;
        }
    }
    @include e(text) {
        position: relative;
        width : rem(400);
        height : rem(236);
        padding : rem(20) 0;
        > h2 {
            font-size : rem(32);
            font-weight:bold;
        }
        > p {
            color: #717171;
            line-height : rem(42);
            min-height : rem(42);
            font-size : rem(24);
        }
        .price {
            position: absolute;
            left: 0;
            bottom: rem(20);
            width: 100%;
            span {
                color: #ff8e00;
                font-size: rem(36);
                font-weight: bold;
            }
            em {
                padding: rem(10) rem(16);
                color: #fff;
                background-color: #329d39;
                border-radius: rem(10);
                font-size: rem(20);
                vertical-align: text-top;
            }
        }
    }
}
</style>