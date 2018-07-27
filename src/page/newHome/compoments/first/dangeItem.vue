<template>
    <div class="wx-item" @click="toPage(goodItemList.id)">
        <div class="wx-item__imgWrap left">
            <span v-if="goodItemList.tag">{{goodItemList.tag}}</span>
            <em v-if="goodItemList.oss == 1">
                <img src="static/quehuo.png">
            </em>
            <img class="page-lazyload-image" v-lazy="goodItemList.img +'?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-item__text left">
            <h2 class="ellipsis">{{goodItemList.name}}</h2>
            <p class="ellipsis">{{goodItemList.description}}</p>
            <p class="ellipsis">规格：{{goodItemList.goods_unit}}</p>
            <em v-if="goodItemList.is_coupon == 1">红包不可用</em>
            <div class="wx-item__price">
                <span :class="{'is-small' : goodItemList.newprice != goodItemList.price}">￥{{goodItemList.newprice}}</span>
                <del v-if="goodItemList.newprice != goodItemList.price">￥{{goodItemList.price}}</del>
                <buyCark @showMoveDot="showMoveDotFun" 
                         @showMoveUnit="showMoveUnits" 
                         :shop="goodItemList"></buyCark>
            </div>
        </div>


        <transition appear @after-appear="afterEnter" 
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
    import buyCark from '../buyCark';
    import ball from '@/mixins/ball';
    import toPage from '@/mixins/toPage';
    import {mapMutations} from 'vuex';
    export default {
        components : {
            buyCark
        },
        mixins : [  ball,toPage ],
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
@include b(item){
    width: 100%;
    height: rem(298);
    border-bottom: rem(2) solid #e8e8e8;
    padding: rem(20);
    @include e(imgWrap) {
        width: rem(256);
        height: rem(256);
        overflow: hidden;
        position: relative;
        img {
            display: block;
            width: 100%;
        }
        span {
            position: absolute;
            left: rem(5);
            top: rem(5);
            background-color: #ff8e00;
            font-size: rem(24);
            border-radius: 10px;
            padding: 2px 8px;
            color: #fff;
            z-index: 1;
        }
        em {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            padding: rem(12);
        }
    }
    @include e(text) {
        position: relative;
        margin-left: rem(28);
        width: rem(405);
        height: rem(256);
        .wx-item__price {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            span {
                color: #ff8e00;
                font-size: rem(36);
                font-weight: bold;
            }
            del {
                font-size: rem(28);
            }
            span.is-small {
                font-size: rem(32);
            }
        }
        h2 {
            font-size: rem(32);
            margin-bottom: rem(5);
            color: #000;
        }
        p {
            color: #717171;
            font-size: rem(26);
            margin-bottom: rem(5);
        }
        >em {
            display: inline-block;
            color: #ff8e00;
            border-radius: 3px;
            padding: 2px 5px;
            box-shadow: 0 0 1px #ff8e00;
            padding: 0 5px;
            font-size: rem(24);
        }
    }
}
</style>