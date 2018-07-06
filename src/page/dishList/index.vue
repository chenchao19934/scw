<template>
    <div>
        <div style="height:90px">
            <TopHead :titles="levelTitle +'▼'"
                        search="true"></TopHead>
            <div @click="maskList" class="top_title"></div>
            <BarHead ref='bar' :barItem="secondNav" 
                                :barIndex="levelIndex" 
                                @getSeconData="getSecon"></BarHead>
        </div>
        <div v-swipeleft="sLeft" 
             v-swiperight="sRight" 
             :style="setH">
            <iCon v-if="dishList">
                <iConItem v-for="x in dishList" 
                            :key="x.id" 
                            :endX="ballEnd" 
                            :goodItemList="x" 
                            @getPop="showPop"
                            @ballOver="endBall"></iConItem>
            </iCon>
            <div style="padding-top:45%" v-if="dishList.length===0">
                <NoneData title="当前位置超出配送范围~"></NoneData>
            </div>
        </div>
        <CarkNumber :isEnd="receiveInCart"></CarkNumber>
        <mt-popup v-model="popupVisibleTop" position="top">
            <ul class="pop-list">
                <li v-for="x in firstNav" 
                            :key="x.id"
                            @click="changeFirst(x.name,x.id)"
                            :class="{'active': x.id == levelTwo}">{{x.name}}</li>
            </ul>
        </mt-popup>
        <mt-popup v-model="popupVisible" position="bottom">
            <div class="more-unit" v-if="popupVisible">
                <dl>
                    <dt>
                        <img :src="moreUnit.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
                    </dt>
                    <dd>
                        <h3>{{moreUnit.goods_name}}</h3>
                        <p>规格：{{moreUnit.goods_unit}}</p>
                        <p class="red">{{moreUnit.price}}</p>
                    </dd>
                </dl>
                <div class="unit-choose">
                    <p>规格：</p>
                    <div class="clearfix">
                        <span v-for="(x,index) in data" 
                                @click="changeIndex(index)"
                                :class="{'is-choose' : indexUnit === index}"
                                :key="index">{{x.goods_unit}}</span>
                    </div>
                </div>
                <div class="closePop" @click="closePop">X</div>
                <Cark :goodItemList="moreUnit"></Cark>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex';
    import TopHead from '../compon/top_nav';
    import BarHead from './bar_nav';
    import CarkNumber from './cark_number';
    import NoneData from '../compon/none';
    import { listNav, secondNav, dishList } from '@/api/newService';

    import iCon from '../newHome/compoments/first/dangeCon';
    import iConItem from '../newHome/compoments/first/dangeItem';
    import Pop from '@/mixins/pop';

    export default {
        components : {
            TopHead,
            BarHead,
            iCon,
            iConItem,
            CarkNumber,
            NoneData
        },
        mixins : [Pop],
        data() {
            return {
                firstNav: [],   //一级导航
                secondNav : [], //二级导航
                dishList : [],  //指定类别全部商品
                ballEnd : window.innerWidth / 20 + 'px',  //小球下落位置
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置,
                levelOne : '',  // 大类ID
                levelTwo : '',  // 二级分类ID
                levelIndex : 0,
                levelTitle :'',
                popupVisibleTop : false
            }
        },
        computed : {
            setH() {
                return {'min-height':window.innerHeight - 90 + 'px'}
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.name === 'dishDetail' || to.name === 'search') {
                from.meta.isBack = true;
            }else {
                from.meta.isBack = false;
            }
            next();  
        },
        activated() {
            if (!this.$route.meta.isBack) {
                this.levelOne = this.$route.params.id;
                this.levelIndex = this.$route.params.number*1;
                this.levelTwo = this.$route.params.childId;
                this.init();
            }
            this.popupVisibleTop = false;
        },
        methods : {
            // 初始化分类页
            async init() {
                this.$indicator.open('加载中...');
                this.firstNav = await listNav({});
                this.firstNav.forEach(element => {
                    if(element.id === this.levelTwo) {
                        this.levelTitle = element.name;
                    }
                });
                await secondNav({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                    id : this.levelTwo
                }).then(res=> {
                    if (res.code !== 44) {
                        this.secondNav = res;
                    }
                })
                await dishList({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                    type : 'undefined',
                    id : this.levelOne
                }).then(res=> {
                    if (res.code !== 44) {
                        this.dishList = res;
                    }
                })
                this.$indicator.close();
            },
            // 二级导航切换数据
            async getSecon(id,index,type) {
                this.$indicator.open('加载中...');
                this.levelIndex = index;
                this.levelOne = id;
                if(type == 'all') {
                    this.dishList = await dishList({
                        lat : localStorage.lat,
                        lng : localStorage.lon,
                        type : 'all',
                        id : this.levelOne
                    });
                }else {
                    this.dishList = await dishList({
                        lat : localStorage.lat,
                        lng : localStorage.lon,
                        type : 'undefined',
                        id : this.levelOne
                    });
                }
                this.$indicator.close();
            },
            //  左右滑动切换数据
            sLeft() {
                let index = this.levelIndex;
                    index++;
                if(index > this.secondNav.length-1){
                    index = 0;
                }
                this.levelIndex = index;
                this.$refs.bar.$emit('swiperLeft',index,this.secondNav[index].id,this.secondNav[index].pid);
            },
            sRight() {
                let index = this.levelIndex;
                    index--;
                if(index < 0){
                    index = this.secondNav.length-1;
                }
                this.levelIndex = index;
                this.$refs.bar.$emit('swiperLeft',index,this.secondNav[index].id,this.secondNav[index].pid);
            },
            // 显示头部列表
            maskList() {
                this.popupVisibleTop = !this.popupVisibleTop
            },
            // 切换整个分类
            async changeFirst(name,id) {
                this.popupVisibleTop = false;
                this.levelIndex = 0;
                this.levelTwo = id;
                this.firstNav.forEach(element => {
                    if(element.id === this.levelTwo) {
                        this.levelTitle = element.name;
                    }
                });
                await secondNav({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                    id : this.levelTwo
                }).then(res=> {
                    if (res.code !== 44) {
                        this.secondNav = res;
                        this.levelOne = this.secondNav[0].pid;
                    }
                })
                this.$refs.bar.$emit('swiperLeft',0,this.secondNav[0].id,this.secondNav[0].pid);
            },
            //  监听加入购物车动画
            endBall() {

            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-popup-top {
    width: 100%;
}
.pop-list {
    padding-top: 40px;
    li {
        line-height: 42px;
        font-size: 14px;
        background: #fff;
        text-align: center;
        border-bottom: 1px solid #f5f3f3;
    }
    li.active {
        color : #abd13e
    }
}
.top_title {
    position: fixed;
    top: 0;
    left: 50%;
    width:50%;
    margin:0 auto;
    padding : 0 10px;
    height : 40px;
    line-height : 40px;
    z-index:10001;
    font-size: 16px;
    color: #abd13e;
    text-align:center;
    transform : translateX(-50%);
}
</style>