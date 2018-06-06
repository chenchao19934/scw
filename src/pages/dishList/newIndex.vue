<template>
    <div>
        <div style="height:90px">
            <TopHead :titles="levelTitle" search="true"></TopHead>
            <BarHead ref='bar' :barItem="secondNav" :barIndex="levelIndex" @getSeconData="getSecon"></BarHead>
        </div>
        <div :style="setH" v-swipeleft="sLeft" v-swiperight="sRight">
            <iCon>
                <iConItem v-for="x in dishList" :key="x.id" :endX="ballEnd" :goodItemList="x" @ballOver="ballToCark"></iConItem>
            </iCon>
        </div>
        <div class="wx-shop" :class="{move_in_cart:receiveInCart}" ref="cartContainer">
            <span>13</span>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex';
    import TopHead from '../compon/top_nav';
    import BarHead from './bar_nav';
    import { listNav, secondNav, dishList } from '@/api/newService';

    import iCon from '../newHome/compoments/first/dangeCon';
    import iConItem from '../newHome/compoments/first/dangeItem';

    export default {
        components : {
            TopHead,
            BarHead,
            iCon,
            iConItem
        },
        data() {
            return {
                firstNav: [],   //一级导航
                secondNav : [], //二级导航
                dishList : [],  //指定类别全部商品
                ballEnd : window.innerWidth / 20 + 'px',  //小球下落位置
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置,
            }
        },
        computed : {
            ...mapGetters([
                'levelOne',
                'levelTwo',
                'levelIndex',
                'levelTitle',
                'pageOffset'
            ]),
            setH() {
                return {'min-height':window.innerHeight - 90 + 'px'}
            }
        },
        created() {
            this.init();
        },
        methods : {
            // 初始化分类页
            async init() {
                this.firstNav = await listNav({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                });
                this.secondNav = await secondNav({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                    id : this.levelTwo
                });
                this.dishList = await dishList({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                    type : 'undefined',
                    id : this.levelOne
                });
            },
            ...mapMutations([
                'setLevelIndex'
            ]),
            // 二级导航切换数据
            async getSecon(id,index,type) {
                this.$indicator.open('加载中...');
                this.setLevelIndex(index);
                if(type == 'all') {
                    this.dishList = await dishList({
                        lat : localStorage.lat,
                        lng : localStorage.lon,
                        type : 'all',
                        id : id
                    });
                }else {
                    this.dishList = await dishList({
                        lat : localStorage.lat,
                        lng : localStorage.lon,
                        type : 'undefined',
                        id : id
                    });
                }
                setTimeout(()=> {
                    this.$indicator.close();
                },500)
            },
            // 监听物品掉落到购物车
            ballToCark() {
                // if (!this.receiveInCart) {
                //     this.receiveInCart = true;
                //     this.$refs.cartContainer.addEventListener('animationend', () => {
                //         this.receiveInCart = false;
                //     })
                //     this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                //         this.receiveInCart = false;
                //     })
                // }
            },
            sLeft() {
                let index = this.levelIndex;
                    index++;
                if(index > this.secondNav.length-1){
                    index = 0;
                }
                this.setLevelIndex(index);
                this.$refs.bar.$emit('swiperLeft',index,this.secondNav[index].id,this.secondNav[index].pid);
            },
            sRight() {
                let index = this.levelIndex;
                    index--;
                if(index < 0){
                    index = this.secondNav.length-1;
                }
                this.setLevelIndex(index);
                this.$refs.bar.$emit('swiperLeft',index,this.secondNav[index].id,this.secondNav[index].pid);
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(shop) {
    position: fixed;
    bottom: rem(30);
    left: rem(30);
    width: rem(112);
    height: rem(112);
    background: url('../../assets/image/tab/shop_cark_2.png');
    background-size: cover;
    z-index: 10;
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
.move_in_cart{
    animation: mymove .5s ease-in-out;
}
@keyframes mymove{
    0%   { transform: scale(1) }
    25%  { transform: scale(.8) }
    50%  { transform: scale(1.1) }
    75%  { transform: scale(.9) }
    100% { transform: scale(1) }
}
</style>