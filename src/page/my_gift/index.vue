<template>
    <div style="padding-top:42px;padding-bottom:10px;">
        <TonNav titles="礼品盒"></TonNav>
        <div class="gift-wrap">
            <GiftItem v-for="x in list" 
                        :obj="x"
                        :coupnId = "giftId"
                        @receive="getGift"
                        :key="x.gift_id"></GiftItem>
        </div>
    </div>
</template>

<script>
    import TonNav from '../compon/top_nav';
    import GiftItem from './gift_item';
    import { giftList,giftRecive } from '@/api/newService'
    export default {
        components : {
            TonNav,
            GiftItem
        },
        data() {
            return {
                list: [],
                giftId : ''
            }
        },
        created() {
            this.giftId = this.$route.query.coupnId*1 || 0;
            this.initPage();
        },
        methods: {
            async initPage() {
                let data = await giftList({user_id : localStorage.userId});
                this.list = data.list;
            },
            async getGift(id) {
                await giftRecive({
                    gift_id : id,
                    user_id : localStorage.userId
                }).then(res=> {
                    if (res.code === 200) {
                        this.$toast("领取成功！");
                        this.initPage();
                    }else {
                        this.$toast(res.message);
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.gift-wrap {
    padding : 0 rem(32);
}
</style>