<template>
    <div class="wx-cark">
        <router-link to="/cark">
            <div class="wx-cark__ico">
                <span v-if="shopCarkLenth !== 0">{{shopCarkLenth}}</span>
            </div>
        </router-link>
        <div class="wx-cark__share left" v-if="collection != null" @click="collGoods">
            <span class="collection">
                <i :class="{'success':collection === 1}"></i>
            </span>
            <p v-if="collection === 0">收藏</p>
            <p v-else>已收藏</p>
        </div>
        <div class="wx-cark__share left" v-if="share" @click="shareDish">
            <span>
                <i></i>
            </span>
            <p>分享</p>
        </div>
        <div ref="cark" class="wx-cark__buy right" @click="addCark($event)">
            <buyCark @showMoveDot="showMoveDotFun" 
                     @showMoveUnit="showMoveUnits"
                     :shop="goodItemList"></buyCark>
            <p>加入购物车</p>
        </div>
        <transition appear @after-appear = 'afterEnter' 
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
    import buyCark from '@/pages/newHome/compoments/buyCark2';
    import { mapState } from "vuex";
    import ball from '@/mixins/ball';

    export default {
        props : {
            goodItemList : {},
            share : {
                type : Boolean,
                default : false
            },
            collection : {
                type : Number,
                default : null
            }
        },
        components : {
            buyCark
        },
        mixins : [ ball ],
        data() {
            return {
                endX : '20px',
                cubic : '0,3.95,1,.98'
            }
        },
        computed :{
            ...mapState([
                'shopCarkLenth'
            ])
        },
        methods : {
            addCark(event) {
                this.$children[0].addToCark(event);
            },
            collGoods() {
                this.$emit('collectionGoods');
            },
            shareDish() {
                this.$emit('shareTheDish');
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(cark) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    padding-left: rem(260);
    line-height: 45px;
    background: #fff;
    border-top: 1px solid #a7d0aa;
    @include e(ico) {
        position: absolute;
        left: 10px;
        top: -15px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: url('../../assets/image/tab/shop_cark.png') no-repeat;
        background-size: cover;
        span {
            position: absolute;
            right: rem(-10);
            top: rem(10);
            width: rem(46);
            height: rem(46);
            border-radius: 50%;
            text-align: center;
            line-height: rem(46);
            background: #ff8e00;
            color: #fff;
        }
    }
    @include e(share) {
        width: 50px;
        text-align: center;
        span {
            display: block;
            height: 25px;
            text-align: center;
            padding-top: 2.5px;
            i {
                display:block;
                width: 20px;
                height: 23px;
                margin: 0 auto;
                background-color: #a7d0aa;
                background: url('../../assets/image/shop_details_share.png') center no-repeat;
                background-size: contain;
            }
        }
        span.collection {
            i {
                background: url('../../assets/image/shop_details_collect.png') center no-repeat;
                background-size: contain;
            }
            i.success {
                background: url('../../assets/image/shop_details_collect_click.png') center no-repeat;
                background-size: contain;
            }
        }
        p {
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
        }
    }
    @include e(buy) {
        position: relative;
        background-color: #abd13e;
        p {
            padding: 0 15px;
            text-align: center;
            color: #ffffff;
            font-size: 16px;
        }
        .wx-addcark {
            opacity: 0;
            left: 50%;
            top: 0;
            width : 100%;
            height: 100%;
            transform: translate3d(-50%,-50%,0);
        }
    }
}
</style>