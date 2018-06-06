<template>
    <div style="padding-top:42px;padding-bottom:10px;background-color:#f0f0f0;">
        <TonNav titles="优惠券"></TonNav>
        <Exchange @successChage="refresh"></Exchange>
        <div class="wx-couWrap">
            <CouItem v-for="x in list" 
                        :obj="x"
                        :key="x.id"></CouItem>
        </div>
    </div>
</template>

<script>
    import TonNav from '../compon/top_nav';
    import CouItem from './coupon_item';
    import Exchange from './exchange';
    import {couponList} from '@/api/newService'
    export default {
        components : {
            TonNav,
            Exchange,
            CouItem
        },
        data() {
            return {
                list: [],
            }
        },
        created() {
            this.initPage();
        },
        methods: {
            async initPage() {
                let data = await couponList({user_id : localStorage.userId});
                this.list = data;
            },
            refresh() {
                this.initPage();
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(couWrap) {
    padding : 0 rem(30);
}
</style>