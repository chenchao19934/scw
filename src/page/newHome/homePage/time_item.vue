<template>
    <div class="wx-timeItem">
        <div class="wx-timeItem__imgWrap">
            <img :src="goodItemList.img + '?x-oss-process=image/resize,w_150'" alt="">
        </div>
        <div class="wx-timeItem__txt">
            <h2 class="ellipsis">{{goodItemList.name}}</h2>
            <div>
                <span>￥{{goodItemList.newprice}}</span><del v-if="goodItemList.newprice != goodItemList.price">{{goodItemList.price}}</del>
            </div>
            <div>规格：{{goodItemList.goods_unit}}</div>
        </div>
        <div class="wx-timeItem__addToCark" v-if="isStart && goodItemList.oss === 0">
            <p>立即抢购</p>
            <buyCark @showMoveDot="showMoveDotFun" 
                         @showMoveUnit="showMoveUnits" 
                         :shop="goodItemList"></buyCark>
        </div>
        <div class="wx-timeItem__timeOut" v-else>
            <p v-if="goodItemList.oss === 1">已抢完</p>
            <p v-else>还未开始</p>
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
    import buyCark from '../compoments/buyCark2';
    import ball from '@/mixins/ball';
    export default {
        components : {
            buyCark
        },
        mixins : [ball],
        props: {
            goodItemList : Object,
            endX : {
                type : String,
                default : window.innerWidth / 2 + 'px'
            },
            isStart : {
                type : Boolean,
                default : false
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(timeItem) {
    flex: 0 0 33.333%;
    min-height: rem(200);
    padding: rem(10) rem(23);
    overflow: hidden;
    @include e(imgWrap) {
        width: rem(204);
        height: rem(204);
        img {
            display: block;
            width: 100%;
        }
    }
    @include e(txt) {
        text-align: center;
        h2 {
            font-weight: bold;
            line-height: rem(40);
            font-size: rem(28);
        }
        > div span {
            font-size: rem(28);
            color: #ff8e00;
            font-weight: bold;
            padding:0 rem(5);
        }
        > div del {
            font-size: rem(24);
            color: #515151;
        }
    }
    @include e(timeOut) {
        padding-top: rem(10);
        position: relative;
        p {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            line-height: rem(48);
            background-color: #515151;
            color: #fff;
            font-size: rem(28);
            border-radius: rem(20);
        }
    }
    @include e(addToCark) {
        padding-top: rem(10);
        position: relative;
        p {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            line-height: rem(48);
            background-color: #ff8e00;
            color: #fff;
            font-size: rem(28);
            border-radius: rem(20);
        }
        .wx-addcark {
            opacity: 0;
            width: 100%;
        }
    }
}
</style>