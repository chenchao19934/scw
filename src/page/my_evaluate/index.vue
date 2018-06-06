<template>
    <div>
        <TopNav titles="我的评价"></TopNav>
        <div ref="list" style="padding-top:45px" :style="{ height: listHeight, overflow: 'scroll'}">
            <ul v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="50">
                <EvaItem v-for="x in list" :evalsArr="x" @deleteEval="isDelete" :key="x.id">
                    <Tag :tags="x.tag"></Tag>
                </EvaItem>
                <div v-if="list.length === 0" style="padding-top:45%">
                    <NoneData title="您还没有评价商品~"></NoneData>
                </div>
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
    import NoneData from '../compon/none';
    import EvaItem from './evals_item';
    import Tag from './tag';
    import {evals, deleteEval} from '@/api/newService';
    import loadMore from "@/mixins/loadMore.js";
    
    export default {
        components :{
            TopNav,
            NoneData,
            EvaItem,
            Tag
        },
        mixins : [loadMore],
        data() {
            return {
                list : []
            }
        },
        created() {
            this.$nextTick(()=> {
                this.listHeight = document.documentElement.clientHeight + 'px';
            })
            this.getEval();
        },
        methods : {
            getEval() {
                this.$indicator.open('加载中...');
                evals({page : this.count,user_id : localStorage.userId}).then(res =>{
                    this.$indicator.close();
                    this.list = res;
                    this.count++;
                })
            },
            async loadMore() {
                if (this.allLoaded) {
                    return;
                }
                this.loading = true;
                let data = await evals({page:this.count,user_id : localStorage.userId});
                if(data.length != 0 && data.length === 10){
                    this.list.push(...data);
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
            },
            isDelete(deleteId) {
                let index = this.list.findIndex(ele => {
                    return ele.id === deleteId;
                })
                this.$messagebox.confirm("确定删除该评论？").then(actions=> {
                    deleteEval({comm_id : deleteId}).then(res=> {
                        if (res.message == 1) {
                            this.list.splice(index,1);
                        }else {
                            this.$toast(res.message);
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>