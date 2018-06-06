<template>
    <div style="padding-top:82px;background-color:#f0f0f0">
        <TopNav titles="我的订单"></TopNav>
        <TopList :arr="navList"
                 @order="nowOredr"></TopList>
        <div ref="list" 
                :style="{ height: listHeight, overflow: 'scroll', 'overflow-x': 'hidden'}">
            <ul 
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="50">
                    <div v-if="list.length === 0" style="padding-top:45%">
                        <NoneData title="您的订单空空如也~"></NoneData>
                    </div>    
                    <OrderItem v-for="x in list" 
                                :key="x.id"
                                @click.native="$router.push({name : 'OrderDetails', params : {groupId : x.order_group_id}})"
                                @contaction="conOrder"
                                @delOrder="deleteOrder"
                                @canOrder="cancelOrder"
                                @remin="reminder"
                                :orderArr="x"></OrderItem>
                    <p class="page-infinite-loading"
                        v-show="loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                        <span class="loading-tips">{{infiniteScrollTips}}</span>
                    </p>
            </ul>
        </div>
        <MaskBox  @close="closeMask"
                  :isShow="maskShow">
            <DisTor slot="user" 
                    :phone="contactPhone"
                    @close="closeMask"></DisTor>
        </MaskBox>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import TopList from './order_top';
    import NoneData from '../compon/none';
    import OrderItem from './order_item';
    import MaskBox from '../compon/mask';
    import DisTor from './distributor';

    import { order,deleteOrder,reminOrede } from "@/api/newService";
    import loadMore from '@/mixins/loadMore';
    export default {
        components : {
            TopNav,
            TopList,
            NoneData,
            OrderItem,
            MaskBox,
            DisTor
        },
        mixins :[ loadMore ],
        data() {
            return {
                navList: ["全部","待付款","待收货","待评价","售后"],
                list : [],
                type : 0,
                maskShow : false,
                contactPhone : '4008530360'
            }
        },
        created() {
            this.$nextTick(()=> {
                this.listHeight = document.documentElement.clientHeight - 80 + 'px';
            })
        },
        beforeRouteLeave(to, from, next) { 
            if (to.name === 'OrderDetails') {
                from.meta.isBack = true;
            }else {
                from.meta.isBack = false;
            }
            next();  
        },
        activated() {
            if (!this.$route.meta.isBack) {
                this.reset();
                this.type = this.$route.params.type;
                this.initPage();
            }
        },
        methods: {
            nowOredr(index) {
                this.reset();
                this.type = index;
                this.initPage();
            },
            async initPage() {
                this.$indicator.open('加载中...');
                this.list = await order({user_id : localStorage.userId,page : this.count,type : this.type});
                this.count++;
                this.$indicator.close();
            },
            // 加载更多
            async loadMore() {
                if (this.allLoaded) {
                    return;
                }
                this.loading = true;
                let data = await order({
                    page : this.count,
                    type : this.type,
                    user_id : localStorage.userId
                });
                if (data.length !== 0 && data.length === 10) {
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
            // 初始化分页数据
            reset() {
                this.allLoaded = false;
                this.loading = false;
                this.noData = false;
                this.count = 1;
                this.infiniteScrollTips = '加载中...';
                this.list = [];
            },
            findId(arr,id) {
                let index = arr.findIndex(element => {
                    return element.order_group_id === id;
                })
                return index;
            },
            // 联系配送员
            conOrder(id,phone) {
                console.log(phone);
                this.contactPhone = phone;
                this.maskShow = true;
            },
            // 删除订单
            deleteOrder(id) {
                let index = this.findId(this.list,id);
                this.$messagebox.confirm("确定删除该订单？").then( async action => {
                    await deleteOrder({
                        group_id :id,
                        user_id : localStorage.userId
                    }).then(res=> {
                        this.list.splice(index,1);
                    })
                }).catch(()=> {})
            },
            // 取消订单
            cancelOrder(id) {
                let index = this.findId(this.list,id);
                this.$messagebox.confirm("确定取消该订单？").then( async action => {
                    await deleteOrder({
                        group_id :id,
                        user_id : localStorage.userId
                    }).then(res=> {
                        this.list.splice(index,1);
                    })
                }).catch(()=> {})
            },
            // 催单
            reminder(id) {
                reminOrede({
                    group_id : id
                }).then(res => {
                    this.$toast(res.message);
                })
            },
            // 关闭联系配送员弹窗
            closeMask() {
                this.maskShow = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>