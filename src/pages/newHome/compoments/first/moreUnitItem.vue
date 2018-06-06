<template>
    <div class="wx-item3"  @click="toPage(porkItemList.id)">
        <div class="wx-item3__imgWrap">
            <span v-if="porkItemList.tag">{{porkItemList.tag}}</span>
            <img v-lazy="porkItemList.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-item3__text">
            <h2 class="ellipsis">{{porkItemList.name}}</h2>
            <p class="ellipsis">规格：{{porkItemList.goods_unit}}</p>

            <div class="wx-item__price">
                <span :class="{'is-mulitype' : porkItemList.is_multi_type == 1}">￥{{porkItemList.newprice}}</span>
                <!-- <del v-if="porkItemList.newprice != porkItemList.price">￥{{porkItemList.price}}</del> -->
                <buyCark @showMoveDot="showMoveDotFun" @showMoveUnit="showMoveUnits" :shop="porkItemList"></buyCark>
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
    import toPage from '@/mixins/toPage';
    export default {
        props : {
            porkItemList : Object,
            endX : {
                type : String,
                default : window.innerWidth / 2 + 'px'
            }
        },
        components : {
            buyCark
        },
        mixins : [ ball,toPage ],
        created() {

        }
    }
</script>

<style lang="scss" scoped>
@include b(item3) {
    flex: 0 0 31.3333%;
    margin: 0 1%;
    overflow: hidden;
    @include e(imgWrap) {
        position: relative;
        img {
            display: block;
            height: rem(230);
        }
        span {
            position: absolute;
            left: rem(5);
            top: rem(5);
            background-color: #ff8e00;
            font-size: rem(28);
            border-radius: 16px;
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
           font-size: rem(20);
           line-height: rem(38); 
        }
        .wx-item__price {
            position: relative;
            margin-bottom: 6px;
            span {
                font-size: rem(32);
                color: #ff8e00;
            }
            .is-mulitype {
                font-size: rem(24);
            }
        }
    }
}
</style>