<template>
    <div style="background:#ececec;">
        <TopNav titles="我的余额"></TopNav>
        <div ref="list" style="padding-top:45px" :style="{ height: listHeight, overflow: 'scroll'}">
            <BalanceCark :money="moneys"></BalanceCark>
            <ul v-if="list.length !== 0"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="50">
                <li><p>余额变动明细</p></li>
                <BalanceItem v-for="(x,index) in list" 
                                :item="x"
                                :key="index"></BalanceItem>
            </ul>
            <NoneData v-else title="还没有余额相关信息~"></NoneData>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import BalanceCark from './banlace_pack';
    import BalanceItem from './ban_item';
    import { BalanceList } from "@/api/newService";
    import NoneData from '@/page/compon/none';
    import loadMore from "@/mixins/loadMore.js";
    export default {
        components : {
            TopNav,
            BalanceCark,
            BalanceItem,
            NoneData
        },
        data() {
            return {
                moneys: 0.00,
                list : []
            }
        },
        mixins : [loadMore],
        created() {
            this.$nextTick(()=> {
                this.listHeight = document.documentElement.clientHeight + 'px';
            })
            this.initPage();
        },
        methods: {
            async initPage() {
                let data = await BalanceList({
                    page : this.count,
                    user_id : localStorage.userId
                })
                this.list = data.list;
                this.count++;
                this.moneys = data.price*1;
            },
            async loadMore() {
                if (this.allLoaded) {
                    return;
                }
                this.loading = true;
                let data = await BalanceList({page:this.count,user_id : localStorage.userId});
                if(data.list.length !== 0 && data.list.length === 20){
                    this.list.push(...data.list);
                    this.count++;
                    this.loading = false;
                }else {
                    this.list.push(...data.list);
                    this.infiniteScrollTips = "数据加载完毕";
                    setTimeout(() => {
                        this.loading = false;
                        this.noData = true;
                        this.allLoaded = true;
                    }, 1000);
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
li {
    background-color: #fff;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: #E8E8E8;
    font-size: 16px;
    p {
        color : #333;
    }
}
</style>