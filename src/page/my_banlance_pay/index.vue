<template>
    <div style="padding-top:48px">
        <TopNav titles="体验店优惠支付"></TopNav>
        <div class="wx-bPay">
            <div class="wx-bPay__code">
                <div><img :src="payInfo.url" alt=""></div>
                <p>{{payInfo.balance}}</p>
                <span>当前余额（元）</span>
            </div>
            <mt-button type="primary" 
                        size="large"
                        @click.native="$router.push({name : 'BalancedRecharge'})">充值</mt-button>
            <mt-button type="default" 
                        @click.native="$router.push({name : 'Balanced'})"
                        size="large">查看余额明细</mt-button>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import {BalancePay} from '@/api/newService';
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                payInfo : ''
            }
        },
        created() {
            this.initPage();
        },
        methods: {
            async initPage() {
                let data = await BalancePay({user_id : localStorage.userId});
                this.payInfo = data.data[0];
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(bPay) {
    padding: 0 rem(37.5);
    height: 92vh;
    @include e(code) {
        min-height: rem(400);
        padding: rem(56) rem(28);
        text-align: center;
        border-radius: rem(20);
        box-shadow: 2px 2px 3px #ccc;
        > div {
            width: 88%;
            margin: 0 auto;
            img {
                display: block;
                width: 100%;
            }
        }
        p {
            color: #ff8e00;
            font-size: rem(68);
        }
        span {
            font-size: rem(28);
            color: #717171;
        }
    }
    button {
        margin-top: rem(44);
    }
    .mint-button--primary {
        background-color: #33cd5f;
    }
}
</style>