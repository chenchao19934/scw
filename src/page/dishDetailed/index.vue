<template>
    <div style="padding-top:40px;background-color:#fafafa">
        <TopHead style="box-shadow: none;" @navs="toNav" titles="" more="true"></TopHead>
        <TopNav :class="{ 'is-show' :showNav}"></TopNav>
        <mt-navbar v-model="selected">
            <mt-tab-item v-for="(x,index) in navArr" 
                            :id="index+''"
                            :key="index">{{x}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
                <imgScroll style="height:9rem" :bannerList="banner"></imgScroll>
                <div class="wx-dishDetial">
                    <h2>{{dataAll.name}}</h2>
                    <p>{{dataAll.description}}</p>
                    <div class="wx-dishDetial__price">
                        <span>￥{{dataAll.newprice}}</span><del v-if="dataAll.newprice !== dataAll.price">{{dataAll.price}}</del>
                    </div>
                    <div class="wx-dishDetial__unit">
                        <span>{{dataAll.goods_unit}}</span>
                    </div>
                    <p>{{dataAll.market}}</p>
                </div>
                <div class="wx-rules" @click="openRulePop">
                    <div v-for="(x,index) in rules" :key="index">
                        <em><img :src="x.img"></em>
                        <span>{{x.title}}</span>
                    </div>
                    <mt-button class="wx-rules__btn right" icon="more"></mt-button>
                </div>
                <mt-popup v-model="popupVisibleTop" position="top">
                    <rulePop></rulePop>
                </mt-popup>
                <comCon style="padding-bottom:48px" a="1" 
                            :commentLength="dataAll.comm_sum"
                            v-if="dataAll.comm_sum !== 0">
                    <comItem v-for="x in dataAll.comm" 
                            :key="x.id" 
                            :comment="x"></comItem>
                </comCon>
                <div style="padding-bottom:48px"  v-else>
                    <NoneData title="暂时还没有相关评论~"></NoneData>
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="1" ref="shopDetail">
                <comCon a="0" 
                        @barChange="changeComment" 
                        @contentChange="changeContent" 
                        :comAll="comData.sum" 
                        :comReco="comData.score_tj" 
                        :comImprove="comData.score_gj"></comCon>
                <div class="tab-con" ref="list" :style="{ height: listHeight, overflow: 'scroll'}">
                    <ul v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="loading"
                                infinite-scroll-distance="50">
                            <comItem  @openImg="showBigFn" v-for="x in comList" :key="x.id" :comment="x"></comItem>
                            
                            <div class="no-data" v-if="comList.length === 0" style="padding-top:45%" >
                                <NoneData title="暂时还没有相关评论~"></NoneData>
                            </div>
                            
                            <p class="page-infinite-loading"
                                v-show="loading">
                                <mt-spinner type="fading-circle"></mt-spinner>
                                <span class="loading-tips">{{infiniteScrollTips}}</span>
                            </p>
                    </ul>
                </div>
                <div class="page" v-show='showBImg' @click='closeBigFn()' id="bigImgPage">
                    <img src="" class="scale" ref="bigImg" />
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="2">
            </mt-tab-container-item>
        </mt-tab-container>
        <Cark :share="true"
              :collection="isCollections" 
              :goodItemList="dataAll" 
              @collectionGoods="collecTion"
              @shareTheDish="shareDish"
              @getPop="showPop"></Cark>

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
    import TopHead from '../compon/top_nav';
    import TopNav from './nav';
    import { dishDetial , dishComment ,isCollection , collection, cancelCollection} from '@/api/newService';
    import imgScroll from '@/page/compon/top_imgScroll';
    import rulePop from './pop_ruleCon';
    import Pop from '@/mixins/pop'

    import comCon from './comment_con';
    import comItem from './comment_item';
    import NoneData from '../compon/none';
    import loadMore from "@/mixins/loadMore.js";
    import { getStyle } from '@/utils/mUtils';
    export default {
        components : {
            TopHead,
            imgScroll,
            rulePop,
            comCon,
            comItem,
            TopNav,
            NoneData,
        },
        mixins: [loadMore, Pop],
        data() {
            return {
                selected: "0", // 当前导航索引
                id : '',    //商品id
                dataAll : [],   //该商品全部数据
                comData: [], //评论全部数据
                comList : [],
                navArr : ['食材','评价'],
                banner : [],
                attach : 1, // 是否只看有内容评论
                type : 3,
                isCollections : 0,//该商品是否收藏 0未收藏
                popupVisibleTop : false, //  48小时退换规则
                showBImg : false,   //  评论图片展示
                showNav : false, // 展开导航
                times : null,   // 导航计时器
                rules : [
                    {
                        title : '48小时退换货',
                        img : 'static/cus1.jpg'
                    },
                    {
                        title : '自建冷库',
                        img : 'static/cus2.jpg'
                    },
                    {
                        title : '无忧售后',
                        img : 'static/cus3.jpg'
                    }
                ]
            }
        },
        created() {
            this.id = this.$route.params.pid;
            this.$nextTick(() => {
                let top = 41 + 45 + 160/75 * getStyle(document.getElementsByTagName('html')[0],'fontSize');
                this.listHeight = document.documentElement.clientHeight - top + 'px';
            });
            this.initDish();
        },
        methods : {
            // 食材数据
            async initDish() {
                this.$indicator.open('加载中...');
                let data = await dishDetial({id:this.id});
                if (data.length === 0) {
                    this.$toast('该商品已下架，请联系客服。');
                    setTimeout(()=> {
                        this.$back(this.$router);
                    },3000)
                }else {
                    this.dataAll = data[0];
                    this.banner = this.dataAll.extimg;
                    if(this.dataAll.detail_url) {
                        this.navArr = ['食材','评价','详情']
                    }else {
                        this.navArr = ['食材','评价']
                    }
                    // 是否收藏
                    this.isCollections = await isCollection({user_id:'ee363d1cdb1d4e45a118cce9d9eb7ced',goods_id:this.id});
                }
                this.initShare();
                setTimeout(() => {
                     this.$indicator.close();
                }, 500);
            },
            // 收藏
            async collecTion() {
                if (this.$store.state.isLogin) {
                    if (this.isCollections === 0) {
                        await collection({eid : [this.id],user_id : localStorage.userId})
                        this.isCollections = 1;
                        this.$toast('收藏成功！');
                    } else {
                        this.$messagebox.confirm('是否取消收藏？').then(action => {
                            cancelCollection({eid : this.id})
                            this.isCollections = 0;
                        }).catch(()=> {})
                    }
                }else {
                    this.$router.push({name : 'Login'})
                }
            },
            async loadMore() {
                if (this.allLoaded) {
                    return;
                }
                this.loading = true;
                const data = await dishComment({id:this.id,attach:this.attach,type:this.type,page:this.count});
                this.comData = data;
                setTimeout(()=> {
                    if(data.length != 0 && data.list.length === 10){
                        this.comList.push(...data.list);
                        this.count++;
                        this.loading = false;
                    }else {
                        if(data.length === 0) {

                        }else {
                            this.comList.push(...data.list);
                        }
                        this.infiniteScrollTips = "数据加载完毕";
                        setTimeout(() => {
                            this.loading = false;
                            this.noData = true;
                            this.allLoaded = true;
                        }, 1000);
                    }
                },2500)
            },
            // 改变评论类型
            changeComment(comType,contents) {
                this.initScroll(comType,contents);
            },
            changeContent(comType,contents) {
                this.initScroll(comType,contents);
            },
            // 初始化评论分页
            initScroll(comType,contents) {
                this.comList = [];
                this.allLoaded = false;
                this.noData = false;
                this.count = 1;
                this.infiniteScrollTips = '加载中...';
                this.attach = !contents ? 1 : 2;
                this.type = comType;
                this.loadMore();
            },
            // 查看评论图片
            showBigFn(val) {
                const img = new Image();
                img.src = val;
                img.onload = () => {
                    this.showBImg = true;
                    this.$refs.bigImg.src = val;
                };
                this.$refs.shopDetail.ontouchmove = function () {
                    return false;
                };
                window.onorientationchange = function () {
                    document.body.scrollTop = 0;
                };
            },
            // 关闭评论图片
            closeBigFn() {
                this.showBImg = false;
                this.$refs.shopDetail.ontouchmove = function () {
                    return true;
                };
            },
            // 打开退换规则
            openRulePop() {
                this.popupVisibleTop = !this.popupVisibleTop;
            },
            initShare() {
                if (this.$device === 'wechat') {
                    const url = window.location.href;
                    this.wxShare(this.dataAll.name,this.dataAll.description,url,this.dataAll.extimg[0].image+"?x-oss-process=image/resize,w_300/format,jpg/quality,Q_80",(res)=> {
                        if (res === 'shareSuccess') {
                            this.$toast(`${this.dataAll.name},分享成功！`)
                        }else {
                            this.$toast('取消分享！')
                        }
                    })
                }
            },
            shareDish() {
                // 打开微信分享蒙版
                if (this.$device === 'wechat') {
                    this.$store.state.isShowMask = true;
                }
            },
            // 右上角导航
            toNav() {
                this.showNav = !this.showNav;
                clearTimeout(this.times);
                this.times = setTimeout(()=> {
                    this.showNav = false;
                },2500)
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(dishDetial) {
    height: rem(300);
    font-size: rem(28);
    color: #717171;
    text-align: center;
    background-color: #ffffff;
    margin-bottom: rem(30);
    h2 {
        font-size: rem(32);
        color: #000;
        padding: rem(10) 0;
    }
    :nth-child(2) {
        margin-bottom: rem(30);
    }
    @include e(price) {
        span {
            color: #ff8e00;
            font-size: rem(32);
        }
        del {
            margin-left: rem(15);
        }
    }
    @include e(unit) {
        span {
            display: inline-block;
            padding: 0 rem(20);
            color: #fff;
            background: #ff8e00;
            margin: rem(10) auto;
            text-align: center;
            border-radius: 5px; 
        }
    }
}
@include b(rules) {
    background-color: #ffffff;
    margin-bottom: rem(30);
    line-height: rem(90);
    >div {
        display: inline-block;
        padding: 0 rem(10);
        span {
            font-size: rem(26);
        }
        em {
            vertical-align: sub;
            display: inline-block;
            width: rem(30);
            margin: 0 rem(10);
            img {
                display: block;
                width: 100%;
            }
        }
    }
    @include e(btn) {
        background-color: transparent;
        border: 0;
        box-shadow: none;
    }
}
.mint-navbar {
    position: fixed;
    width: rem(360);
    z-index: 10001;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    .mint-tab-item {
        padding: 12px 0;
    }
    .mint-tab-item.is-selected {
        color: #abd13e;
        border-bottom-color: #abd13e
    }
}
.mint-tab-item-label{
    font-size: 16px;
}
.mint-popup-bottom,.mint-popup-top {
    width: 100%;
}
.tab-con {
    padding: rem(10) rem(20) rem(30);
}
.scale {
  animation: scale 0.5s ease;
}
@keyframes scale {
    from {
        width: 0;
    }
    to {
        width: 90%;
    }
}
#bigImgPage {
    background: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    img {
        width: 90%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
}
</style>