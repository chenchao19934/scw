<template>
    <div style="padding:42px 0 50px;background-color:#f0f0f0" v-if="order !== ''">
        <TopNav titles="订单详情"></TopNav>
        <mt-cell :title="'订单号：'+ order.id" :value="order.status"></mt-cell>
        <TurnItem title="余额退款" v-if="order.refundList.length !== 0">
            <img slot="img" src="../../assets/image/icon/money.png" width="20" height="20" alt="">
            <ul slot="box">
                <RefoundItem v-for="(x,index) in order.refundList" 
                                :list="x"
                                :key="index"></RefoundItem>
            </ul>
        </TurnItem>

        <Address :user="order.name" 
                 :phone="order.phone_number" 
                 :address="order.detail_address"></Address>

        <mt-cell title="送达时间：" :value="order.delivery_time">
            <img slot="icon" src="../../assets/image/icon/time.png" width="20" height="20" style="margin-right:5px">
        </mt-cell>
        <AtCell title="留言：" :value="order.delivery_remark">
            <img slot="img" src="../../assets/image/icon/message.png" width="20" height="20" alt="">
        </AtCell>
        

        <PayList :total="order.total_price"
                 :actual="order.total_price"
                 :list="order.coupon"></PayList>

        <div style="background-color:#fff;margin-top:10px">
            <p class="listTit">共{{order.list.length}}种</p>
            <GoodItem v-for="x in order.list" 
                        :goodItemList="x"
                        :key="x.id"></GoodItem>
        </div>

        <BtnList @share="shareOrder"
                 @eval="evalOrder"
                 @remind="remindOrder"
                 @pay="payOrder"
                 :state="order.state"
                 :payType="order.pay_type"></BtnList>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import AtCell from '../compon/at_cell';
    import Address from '@/page/compon/address_item';
    import PayList from './pay_details';
    import GoodItem from './goods_item';
    import TurnItem from './turn_item';
    import RefoundItem from './refound_item';
    import BtnList from './order_btn';

    import { orderDetial,order,reminOrede } from "@/api/newService";
    export default {
        components :{
            TopNav,
            AtCell,
            Address,
            PayList,
            GoodItem,
            TurnItem,
            RefoundItem,
            BtnList
        },
        data() {
            return {
                order : '',
            }
        },
        created() {
            this.initPage();
            this.initShare();
        },
        methods: {
            async initPage() {
                let data = await orderDetial({
                    order_id : this.$route.params.groupId
                })
                this.order = data[0];
            },
            initShare() {
                if (this.$device === 'wechat') {
                    const url = `${process.env.BASE_URL}/public/activepage/share-order.html#?orderId=${this.$route.params.groupId}`;
                    this.wxShare('快来围观我今天买了什么菜！','送菜蛙！',url,'https://scw.new.songcaiwa.cn/public/static/home/images/scw_icon.png',(res)=> {
                        if (res === 'shareSuccess') {
                            this.$toast('分享成功！')
                        }else {
                            this.$toast('取消分享！')
                        }
                    })
                }
            },
            // 立即支付
            payOrder() {
                // window.location.href = `${process.env.BASE_URL}/public/cark-success-pay.html#?id=${this.$route.params.groupId}`
                this.$router.push({name : 'Pay', query: {orderId : this.$route.params.groupId}});
            },
            // 分享订单
            shareOrder() {
                if (this.$device === 'wechat') {
                    this.$store.state.isShowMask = true;
                }
            },
            // 评价订单
            evalOrder() {
                this.$router.push({name : 'OrderEval',params : {groupId : this.$route.params.groupId}})
            },
            // // 删除订单
            // deleteOrder() {
            //     this.$messagebox.confirm("确定删除该订单？").then( async action => {
            //         await deleteOrder({
            //             group_id :this.order.group_id,
            //             user_id : localStorage.userId
            //         }).then(res=> {
            //             this.$toast("删除成功！");
            //             this.$back(this.$router);
            //         })
            //     }).catch(()=> {})
            // },
            // // 取消订单
            // async cancelOrder() {
            //     this.$messagebox.confirm("确定取消该订单？").then( async action => {
            //         await deleteOrder({
            //             group_id :this.order.group_id,
            //             user_id : localStorage.userId
            //         }).then(res=> {
            //             this.$toast("取消成功！");
            //             this.$back(this.$router);
            //         })
            //     }).catch(()=> {})
            // },
            // 提醒送单
            remindOrder() {
                reminOrede({
                    group_id : this.order.group_id
                }).then(res => {
                    this.$toast(res.message);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.listTit {
    padding : rem(6) rem(16);
    font-size: rem(32);
    border-bottom : 1px solid #ccc;
}
</style>