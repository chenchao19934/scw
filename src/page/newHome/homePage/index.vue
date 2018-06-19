<template>
    <div style="padding-bottom:10px">
        <topLocation :title="addressName"></topLocation>
        <topTab ref='bar' :barIndex="bars" 
                          @getSeconData="getSecon"
                          :barItem="secondNav"></topTab>
        <mt-tab-container v-model="bars">
            <mt-tab-container-item id="0">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    <!-- <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus !== 'loading'">{{topStatusType}}</span>
                        <span v-show="topStatus === 'loading'">刷新中</span>
                    </div> -->
                    
                    <imgScroll :bannerList="bannerList"></imgScroll>

                    <div class="wx-imgList" 
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight">
                        <div @click="$router.push({name : 'Invited'})">
                            <img src="../../../assets/image/home/home_invited.png" alt="">
                        </div>
                        <div class="wx-imgList__second">
                            <li>
                                <img src="../../../assets/image/home/home_time.png" alt="">
                            </li>
                            <li class="min-warap">
                                <img src="../../../assets/image/home/home_user.png" alt="">
                            </li>
                            <li class="min-warap">
                                <img src="../../../assets/image/home/home_sign.png" alt="">
                            </li>
                        </div>
                    </div>

                    <div v-show="timeList.length !== 0">
                        <div class="wx-flipDown">
                            <div class="wx-flipDown__imgWrap">
                                <img src="../../../assets/image/time_sell.jpg" alt="">
                            </div>
                            <div class="wx-flipDown__txt">{{statrTitle}}</div>
                            <flip-countdown :deadline="timeDown"
                                            @timeEnd="changeTime"></flip-countdown>
                        </div>
                        <div class="wx-flipGood">
                            <TimeItem v-for="x in timeList" 
                                        :key="x.id"
                                        :isStart="statrSell" 
                                        :goodItemList="x"></TimeItem>
                        </div>
                    </div>

                    <NewBar :newArr="meiriNews"></NewBar>

                    <HotSell :goodsList="goodsList" 
                                :goodsPork="goodsPork" 
                                :goodsLike="goodsLike" 
                                :goodsFruit="goodsFruit"
                                v-swipeleft="sLeft" 
                                v-swiperight="sRight"></HotSell>
                </mt-loadmore>
            </mt-tab-container-item>

            <mt-tab-container-item id="1">

                <FruitSell :fruilts="fruilt"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></FruitSell>

            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <VegeSell  :fruilts="vege"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></VegeSell>
            </mt-tab-container-item>

            <mt-tab-container-item id="3">
                <PorkSell :fruilts="pork"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></PorkSell>
            </mt-tab-container-item>

            <mt-tab-container-item id="4">
                <SeaFoodSell :fruilts="seafood"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></SeaFoodSell>
            </mt-tab-container-item>

            <mt-tab-container-item id="5">
                <SnacksSell :fruilts="snack"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></SnacksSell>
            </mt-tab-container-item>

            <mt-tab-container-item id="6">
                <MildSell :fruilts="milk"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></MildSell>
            </mt-tab-container-item>

            <mt-tab-container-item id="7">
                <CoolFoodSell :fruilts="coolfood"
                            v-swipeleft="sLeft" 
                            v-swiperight="sRight"></CoolFoodSell>
            </mt-tab-container-item>
        </mt-tab-container>
        <fixedBar></fixedBar>
    </div>
</template>

<script>
    import topLocation from './top_location';

    import {newHomeList, fruitList, vegeList, porkList, seafoodList, snacksList, milkList, coolfoodList, rushToBuy} from '@/api/newService.js'
    import {mapState} from 'vuex'
    import imgScroll from '@/page/compon/top_imgScroll';
    import NewBar from '@/page/compon/scroll_new';

    import FlipCountdown from '@/components/FlipCountdown';
    import TimeItem from './time_item';

    import HotSell from '../compoments/first/index';
    import FruitSell from '../compoments/fruit/index';
    import VegeSell from '../compoments/vegetable/index';
    import PorkSell from '../compoments/pork/index';
    import SeaFoodSell from '../compoments/seafood/index';
    import SnacksSell from '../compoments/snacks/index';
    import MildSell from '../compoments/milk/index';
    import CoolFoodSell from '../compoments/coolfood/index';

    import topTab from './top_link'
    import fixedBar from '../index';

    export default {
        components : {
            topLocation,
            topTab,
            HotSell,
            imgScroll,
            NewBar,
            fixedBar,
            FruitSell,
            VegeSell,
            PorkSell,
            SeaFoodSell,
            SnacksSell,
            MildSell,
            CoolFoodSell,
            FlipCountdown,
            TimeItem
        },
        data() {
            return {
                bars : '0',
                bannerList: [],     // 首页轮播
                goodsList: [],      // 今日热卖
                goodsPork : [],     // 壹号土猪
                goodsLike : [],     // 猜你喜欢
                goodsFruit: [],     // 水果专场
                meiriNews : [],     // 滚动新闻
                topStatus: '',      // 下拉刷新状态pull drop
                topStatusType: '',  // 下拉显示文字
                secondNav : ["小蛙推荐","新鲜水果","蔬菜瓜果","肉类禽蛋","水产海鲜","休闲零食","酒水茶饮","速食冷藏"],
                fruilt : [],
                vege : [],
                pork : [],
                seafood : [],
                snack : [],
                milk : [],
                coolfood : [],
                // 限时抢购
                statrTitle : '',
                timeDown : '0',
                timeList : [],
                statrSell :false
            }
        },
        computed : {
            ...mapState([
                'addressName'
            ])
        },
        created() {
            this.getRush();
            this.initPage();
        },
        watch : {
            bars(n) {
                window.scrollTo(0,0);
                switch(n) {
                    case '1' : 
                        this.getFruilt();
                        break;
                    case '2' : 
                        this.getVege();
                        break;
                    case '3' : 
                        this.getPork();
                        break;
                    case '4' : 
                        this.getSeafood();
                        break;
                    case '5' : 
                        this.getSnacks();
                        break;
                    case '6' : 
                        this.getMilk();
                        break;
                    case '7' : 
                        this.getCoolfood();
                        break;
                }
            }
        },
        methods : {
            async initPage() {
                const homeDate = await newHomeList({
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                });
                this.bannerList = homeDate.diyige;
                this.goodsList = homeDate.xiaowa;
                this.goodsPork = homeDate.pinpai;
                this.goodsLike = homeDate.rexiao;
                this.goodsFruit = homeDate.pinpai_to;
                this.meiriNews = homeDate.meiri;
            },
            loadTop() {
                this.initPage();
                setTimeout(() => {
                    this.$refs.loadmore.onTopLoaded();
                },2000);
            },
            handleTopChange(status) {
                console.log(status)
                this.topStatus = status;
                switch(status) {
                    case 'pull' :
                        this.topStatusType = '下拉刷新'
                        break;
                    case 'drop' :
                        this.topStatusType = '松开刷新'
                    default :
                        break
                }
            },
            sLeft() {
                this.bars++;
                if(this.bars > this.secondNav.length-1){
                    this.bars = 0;
                }
                this.$refs.bar.$emit('swiperLeft',this.bars+'');
            },
            sRight() {
                this.bars--;
                if(this.bars < 0){
                    this.bars = this.secondNav.length-1;
                }
                this.$refs.bar.$emit('swiperLeft',this.bars+'');
            },
            getSecon(e) {
                this.bars = e+'';
            },
            async getFruilt() {
                await fruitList({}).then(res => {
                    this.fruilt = res.data;
                });
            },
            async getVege() {
                await vegeList({}).then(res => {
                    this.vege = res.data;
                });
            },
            async getPork() {
                await porkList({}).then(res => {
                    this.pork = res.data;
                });
            },
            async getSeafood() {
                await seafoodList({}).then(res => {
                    this.seafood = res.data;
                });
            },
            async getSnacks() {
                await snacksList({}).then(res => {
                    this.snack = res.data;
                });
                console.log(this.snacks);
            },
            async getMilk() {
                await milkList({}).then(res => {
                    this.milk = res.data;
                });
            },
            async getCoolfood() {
                await coolfoodList({}).then(res => {
                    this.coolfood = res.data;
                });
            },
            // 限时抢购
            async getRush() {
                await rushToBuy({}).then(res => {
                    if (res.length === 0) {
                        this.timeList  = res;
                    }else {
                        this.timeList  = res.list;
                        if (res.start_time > 0) {
                            this.statrTitle = '即将开始';
                            this.timeDown = res.start_time+'';
                        }else {
                            this.statrTitle = '距离结束';
                            this.timeDown = res.end_time+'';
                            this.statrSell = true;
                        }
                    }
                })
            },
            changeTime() {
                this.getRush();
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-tab-container {
    margin-top: 74px;
    margin-bottom: 58px;
}
.mint-tab-container-item {
    min-height: 90vh;
}
@include b(flipGood) {
    display: flex;
    overflow: scroll;
    overflow-y: hidden;
}
@include b(imgList) {
    display: flex;
    justify-content: space-around;
    padding: rem(15) rem(10);
    img {
        display: block;
        width: 100%;
    }
    >div {
        flex: 0 0 rem(320);
        min-height: rem(275);
        overflow: hidden;
    }
    >div:nth-child(1) {
        flex: 0 0 rem(378);
    }
    @include e(second) {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        > li {
            flex: 0 0 rem(320);
            height: rem(140);
            border-radius: rem(5);
            background: #fff;
            overflow: hidden;
        }
        li.min-warap {
            flex: 0 0 rem(155);
            height: rem(130);
            margin-top: rem(5);
        } 
    }
}
@include b(flipDown) {
    display: flex;
    justify-content: space-around;
    padding: rem(20) 0;
    @include e(txt) {
        height: rem(66);
        line-height: rem(66);
        font-size: 0.48rem;
        padding: 0 rem(10);
    }
    @include e(imgWrap) {
        width: rem(225);
        height: rem(66);
        padding: rem(12) 0;
        img {
            display: block;
            width:100%;
        }
    }
}
</style>