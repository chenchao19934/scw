<template>
    <div class="wx-item3" @click="toPage(goodsLikeItem.id)">
        <div class="wx-item3__imgWrap">
            <span v-if="goodsLikeItem.tag">{{goodsLikeItem.tag}}</span>
            <img v-lazy="goodsLikeItem.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-item3__text">
            <h2 class="ellipsis">{{goodsLikeItem.name}}</h2>
            <p class="ellipsis">规格：{{goodsLikeItem.goods_unit}}</p>

            <div class="wx-item__price">
                <span :class="{'is-mulitype' : goodsLikeItem.is_multi_type == 1}">￥{{goodsLikeItem.newprice}}</span>
                <buyCark @showMoveDot="showMoveDotFun" @showMoveUnit="showMoveUnits" :shop="goodsLikeItem"></buyCark>
            </div>
        </div>


        <transition appear @after-appear = 'afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
            <span class="move_dot" v-if="item">
                <span class="svg move_liner"></span>
            </span>
        </transition>
    </div>
</template>

<script>
    import buyCark from '../buyCark';
    import ball from '@/mixins/ball';
    import pushPage from '@/mixins/toPage';
    export default {
        props : {
            goodsLikeItem : Object,
            endX : {
                type : String,
                default : window.innerWidth / 2 + 'px'
            }
        },
        components : {
            buyCark
        },
        mixins : [ ball, pushPage ]
    }
</script>

<style lang="scss" scoped>
@include b(item3) {
    flex: 0 0 48%;
    margin: 0 1%;
    overflow: hidden;
    @include e(imgWrap) {
        position: relative;
        img {
            display: block;
            height: rem(360);
        }
        span {
            position: absolute;
            left: rem(5);
            top: rem(5);
            background-color: #ff8e00;
            font-size: rem(28);
            border-radius: 10px;
            padding: 2px 10px;
            color: #fff;
        }
    }
    @include e(text) {
        h2 {
            text-align: center;
            font-size: rem(28);
            line-height: rem(52);
            font-weight: bold;
        }
        p {
           color: #717171;
           font-size: rem(28);
           line-height: rem(38); 
           text-align: center;
        }
        .wx-item__price {
            position: relative;
            line-height: rem(52);
            text-align: center;
            span {
                font-size: rem(38);
                color: #ff8e00;
            }
            .is-mulitype {
                font-size: rem(28);
            }
        }
    }
}
</style>