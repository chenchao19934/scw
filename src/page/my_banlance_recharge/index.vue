<template>
    <div style="padding-top:48px;background-color:#ececec">
        <TopNav titles="充值"></TopNav>
        <div class="wx-bPay">
            <div class="wx-bPay__code">
                <span>账号余额（元）</span>
                <p>{{payInfo.balabce}}</p>
                <em>账号余额可用于线上购买送菜蛙商品，以及线下送菜蛙体验店优惠支付</em>
            </div>
            <div class="wx-bPay__list">
                <li v-for="(x,index) in payArr" 
                    @click="changeTag(index)"
                    :class="{active:tag === index}">{{x}}元</li>
            </div>
            <div class="wx-bPay__inputs">
                <input type="number" 
                        v-model="money"
                        placeholder="请输入其他金额">
            </div>
            <div class="wx-bPay__realPay">
                <span>{{payInfo.money}}</span><em>元</em>
            </div>
            <mt-button type="primary" 
                        size="large"
                        @click.native="recharge">充值</mt-button>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import {BalanceNow} from '@/api/newService';
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                payInfo : '',
                payArr : [50,100,200,300],
                money : '',
                tag : 0
            }
        },
        created() {
            this.initPage();
        },
        watch: {
            money(n) {
                BalanceNow({user_id : localStorage.userId,money:n}).then(res => {
                    this.payInfo = res.data[0];
                })
            }
        },
        methods: {
            async initPage() {
                let data = await BalanceNow({user_id : localStorage.userId});
                this.payInfo = data.data[0];
            },
            changeTag(index) {
                this.tag = index;
                this.money = this.payArr[index];
            },
            recharge() {
                console.log(this.money);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(bPay) {
    padding: 0 rem(37.5);
    height: 92vh;
    @include e(code) {
        min-height: rem(300);
        padding: rem(56) rem(28);
        margin-bottom: rem(44);
        text-align: center;
        border-radius: rem(20);
        box-shadow: 2px 2px 3px #ccc;
        background-color: #fff;
        p {
            color: #ff8e00;
            font-size: rem(68);
        }
        span,em {
            font-size: rem(28);
            color: #717171;
        }
    }
    @include e(list) {
        display: flex;
        li {
            flex: 0 0 23%;
            margin: rem(20) 1%;
            text-align: center;
            background: #fff;
            line-height: rem(60);
            box-shadow: 0 0 1px #ccc;
            border-radius: 4px;
            font-size: rem(28);
        }
        li.active {
            color: #fff;
            background-color: #abd13e;
        }
    }
    @include e(inputs) {
        padding: rem(20) 0;
        input {
            outline: none;
            border: none;
            width: 100%;
            padding-left: rem(20);
            height: 32px;
            font-size: 14px;
            border-radius: 5px;
        }
    }
    @include e(realPay) {
        span {
            color: #ff8e00;
            font-size: rem(36);
            margin-right: rem(10);
        }
        em {
            font-size: rem(36);
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