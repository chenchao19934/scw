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
                 @delete="deleteOrder"
                 @eval="evalOrder"
                 :state="order.state"
                 :payType="order.pay_type"></BtnList>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import AtCell from '../compon/at_cell';
    import Address from '@/pages/compon/address_item';
    import PayList from './pay_details';
    import GoodItem from './goods_item';
    import TurnItem from './turn_item';
    import RefoundItem from './refound_item';
    import BtnList from './order_btn';

    import { orderDetial } from "@/api/newService";
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
            this.initPage()
        },
        methods: {
            async initPage() {
                let data = await orderDetial({
                    order_id : this.$route.params.groupId
                })
                this.order = data[0];
            },
            shareOrder() {

            },
            deleteOrder() {

            },
            evalOrder() {

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