<template>
    <div style="padding-top:42px">
        <TopNav titles="加价换购商品"></TopNav>
        <div class="wx-exImg">
            <img src="../../assets/image/change_goods.png">
            <p>优惠价：换购产品可以优惠价购买单件</p>
        </div>
        <div class="wx-boxs">
            <GoodsItem v-for="x in list" 
                        :key="x.rid" 
                        :moneys="money"
                        :goodsLikeItem="x"
                        @isFull="exchange"></GoodsItem>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/pages/compon/top_nav';
    import GoodsItem from './goods_item';
    import {changeList, addExCark} from '@/api/newService';
    changeList
    export default {
        components : {
            TopNav,
            GoodsItem
        },
        data() {
            return {
                money : 0.00,
                list : []
            }
        },
        created() {
            this.initPage();
        },
        activated() {
            this.money = this.$route.params.money*1;
        },
        methods: {
            async initPage() {
                await changeList({}).then(res=> {
                    this.list = res.list
                })
            },
            async exchange(id,goodsId,money,oss) {
                if (oss == 0) {
                    if (this.money < money) {
                        this.$toast(`购物车金额不足${money}`);
                    }else {
                        await addExCark({
                            goods_id : goodsId,
                            markup_id : id,
                            user_id : localStorage.userId,
                        }).then(res => {
                            this.$store.state.shopCarkLenth = res.number;
                            this.$toast('兑换成功，所有兑换商品只限一份！');
                            setTimeout(() => {
                                this.$back(this.$router);
                            }, 2000);
                        })
                    }
                }else {
                    this.$toast("商品库存不足，请兑换其他商品。")
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(exImg) {
    position : relative;
    height : rem(280);
    img {
        display : block;
        width:100%;
    }
    p {
        position: absolute;
        left: 0;
        top : 0;
        width:100%;
        padding : 0 rem(20);
        line-height : rem(64);
        font-size: rem(28);
        background-color : rgba(255,255,255,.5);
        color: #ff8e00;
    }
}
@include b(boxs) {
    display : flex;
    justify-content : space-between;
    padding: 0 rem(20);
    margin-top :rem(20);
}
</style>