<template>
    <div style="padding-top:42px">
        <TopNav titles="我的积分"></TopNav>
        <div ref="list" :style="{ height: listHeight, overflow: 'scroll', 'overflow-x': 'hidden'}">
            <div class="wx-count" ref="counts">
                <h2>{{number}}</h2>
                <p>我的积分</p>
            </div>
            <ul 
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="50">
                    <div v-if="list.length === 0" style="padding-top:45%">
                        <NoneData title="您还没有获得积分哦~"></NoneData>
                    </div>    

                    <li v-for="x in list" :key="x.id">
                        <p>{{x.content}}</p>
                        <p>{{x.create_time}}</p>
                        <span>{{x.number}}</span>
                    </li>

                    <p class="page-infinite-loading"
                        v-show="loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                        <span class="loading-tips">{{infiniteScrollTips}}</span>
                    </p>
            </ul>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import {intList} from '@/api/newService';
    import loadMore from '@/mixins/loadMore';
    import NoneData from '../compon/none'
    import {getStyle} from '@/utils/mUtils'
    export default {
        components : {
            TopNav,
            NoneData
        },
        mixins : [loadMore],
        data() {
            return {
                number: 0,
                list : []
            }
        },
        created() {
            this.initPage();
            this.$nextTick(()=> {
                this.listHeight = document.documentElement.clientHeight - 42 + 'px';
            })
        },
        methods: {
            async initPage() {
                let data = await intList({user_id : localStorage.userId});
                this.count++;
                this.number = data.zong;
                this.list = data.list;
            },
            async loadMore() {
                if (this.allLoaded) {
                    return;
                }
                this.loading = true;
                let data = await intList({page : this.count,user_id : localStorage.userId});
                if (data.list.length !== 0 && data.list.length === 20) {
                    this.list.push(...data.list);
                    this.count++;
                    this.loading = false;
                }else {
                    if(data.length !== 0) {
                        this.list.push(...data);
                    }
                    this.infiniteScrollTips = "数据加载完毕";
                    setTimeout(() => {
                        this.loading = false;
                        this.noData = true;
                        this.allLoaded = true;
                    }, 1000);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(count) {
    text-align:center;
    h2 {
        line-height : rem(96);
        color : #f08919;
        padding-top : rem(40);
        font-size : rem(76);
        font-weight : bold;
        span {
            vertical-align: text-bottom;
            font-size : rem(48);
            color : #c1c1c1;
        }
    }
    p {
        line-height : rem(56);
        color: #c1c1c1;
        font-size : rem(32);
    }
}
li {
    border-color: #E8E8E8;
    color: #666666;
    position: relative;
    z-index: 2;
    display: block;
    margin: -1px;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    font-size: 16px;
    span {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        color: #f08919;
    }
}
</style>