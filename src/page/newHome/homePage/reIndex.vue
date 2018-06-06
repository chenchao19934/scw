<template>
    <div>
        <topLocation :title="title"></topLocation>
        <topTab ref='bar' :barIndex="bars" 
                          @getSeconData="getSecon"
                          :barItem="secondNav"></topTab>
        <mt-tab-container v-model="bars">
            <mt-tab-container-item id="0">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    
                    <!-- <topTab @changeBar="changeBar" :bars="bars"></topTab> -->

                    <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus !== 'loading'">{{topStatusType}}</span>
                        <span v-show="topStatus === 'loading'">刷新中</span>
                    </div>
                    
                    <imgScroll :bannerList="bannerList"></imgScroll>
                
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
                <p>22222222222222</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <p>22222222222222</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <p>3333333333333333333333333</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <p>4444444444444444</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <p>555555555555555555</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="6">
                <p>666666666666666</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="7">
                <p>777777777777777777777</p>
            </mt-tab-container-item>
        </mt-tab-container>
        <fixedBar></fixedBar>
    </div>
</template>

<script>
    import topLocation from './top_location';
    import {newHomeList} from '@/api/newService.js'
    import imgScroll from '@/page/compon/top_imgScroll';
    
    import NewBar from '@/page/compon/scroll_new';

    import HotSell from '../compoments/first/index';
    import topTab from './top_link'
    import fixedBar from '../index';

    export default {
        components : {
            topLocation,
            topTab,
            HotSell,
            imgScroll,
            NewBar,
            fixedBar
        },
        data() {
            return {
                bars : '0',
                title: '',
                bannerList: [],     // 首页轮播
                goodsList: [],      // 今日热卖
                goodsPork : [],     // 壹号土猪
                goodsLike : [],     // 猜你喜欢
                goodsFruit: [],     // 水果专场
                meiriNews : [],     // 滚动新闻
                topStatus: '',      // 下拉刷新状态pull drop
                topStatusType: '',  // 下拉显示文字
                secondNav : ["小蛙推荐","酒水茶饮","休闲零食","新鲜水果","水产海鲜","肉类禽蛋","速食冷藏","蔬菜瓜果"]
            }
        },
        async created() {
            if (this.$device === 'browser') {
                
            }
            this.initPage();
        },
        activated() {
            this.title = localStorage.locationName || '定位中。。。';
        },
        methods : {
            async initPage() {
                const homeDate = await newHomeList({
                    lat : '22.554575',
                    lng : '113.887233'
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
                let index = this.bars;
                    index++;
                if(index > this.secondNav.length-1){
                    index = 0;
                }
                this.bars = index;
                this.$refs.bar.$emit('swiperLeft',index+'');
            },
            sRight() {
                let index = this.bars;
                    index--;
                if(index < 0){
                    index = this.secondNav.length-1;
                }
                this.bars = index;
                this.$refs.bar.$emit('swiperLeft',index+'');
            },
            getSecon(e) {
                this.bars = e+'';
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-tab-container {
    margin-top: 78px;
    margin-bottom: 58px;
}
.mint-tab-container-item {
    min-height: 90vh;
}
</style>