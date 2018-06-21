<template>
    <div class="wx-pay">
        <div class="wx-pay__imgWrap" v-if="type == '0'">
            <span>
                <img src="../../assets/image/services/success_pay.png" alt="">
            </span>
            <p>订单支付成功</p>
        </div>
        <div class="wx-pay__imgWrap" v-else>
            <span>
                <img src="../../assets/image/services/failed_pay.png" alt="">
            </span>
            <p style="color:#E8243D">订单支付失败</p>
        </div>
        <div class="wx-pay__btn">
            <mt-button size="normal" @click.native="$router.push({name : 'Order',params: {type : 0}})">查看订单</mt-button>
            <mt-button size="normal" @click.native="$router.push({name : 'home'})">返回首页</mt-button>
        </div>
        <div class="wx-pay__service">
            <p>-添加专属客服微信-</p>
            <div class="service-copy">长按复制微信号：songcaiwa01</div>
        </div>
        <div class="wx-pay__swiper">
            <mt-swipe :auto="2000" :show-indicators="false">
                <mt-swipe-item>
                    <img src="../../assets/image/services/cus_scroll1.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../assets/image/services/cus_scroll2.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../assets/image/services/cus_scroll3.jpg" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <ul class="wx-pay__rules">
            <li>1、任何售后问题，联系小蛙享受无忧售后。</li>
            <li>2、专属的小区福利活动。</li>
            <li>3、加入小区交流区，饭前饭后唠唠嗑。</li>
        </ul>

        <MaskBox :isShow="showRedpack"
                 v-if="showRedpack">
            <RedPack slot="user"
                     @cancelMask="cancel"
                     @sureShare="share"></RedPack>
		</MaskBox>
    </div>
</template>

<script>
    import MaskBox from '@/page/compon/mask';
    import RedPack from '@/components/red_pack';
    import {redPack} from '@/api/newService';
    export default {
        components : {
            MaskBox,
            RedPack
        },
        data() {
            return {
                type: '',
                orderId : '',
                showRedpack : false
            }
        },
        created() {
            this.$nextTick(()=> {
                this.type = this.$route.query.type;
                if (this.type == '0') {
                    this.orderId = this.$route.query.orderId;
                    this.showRedpack = true;
                    this.initShare();
                }
            })
        },
        methods: {
            cancel() {
                this.showRedpack = false;
            },
            share() {
                this.showRedpack = false;
                setTimeout(() => {
                    this.$store.state.isShowMask = true;
                }, 300);
            },
            async initShare() {
                if (this.$device === 'wechat') {
                    let data = await redPack({
                        group_id : this.orderId,
                        user_id : localStorage.userId
                    })
                    const url = `${process.env.BASE_URL}/public/wScw/#/redPack?packId=${data.id}`;
                    this.wxShare(`【送菜蛙红包】第${data.max_user_order}个领取的人红包最大！`,'手速很重要，手气更重要！',url,'https://scwnew.oss-cn-shenzhen.aliyuncs.com/hongbao/orderhonebao.png',(res)=> {
                        if (res === 'shareSuccess') {
                            this.$toast('红包分享成功！')
                        }else {
                            this.$toast('取消分享！')
                        }
                        this.showRedpack = false;
                    })
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
@include b(pay) {
    padding: rem(80) rem(40) rem(20);
    background-color: #f0f0f0;
    text-align: center;
    img {
        display: block;
        width: 100%;
    }
    @include e(imgWrap) {
        height: rem(250);
        span {
            display: block;
            width: rem(120);
            height: rem(120);
            margin: 0 auto;
        }
        p {
            font-size: rem(40);
            color: #329d39;
            line-height: rem(120);
        }
    }
    @include e(btn) {
        display: flex;
        justify-content: space-around;
        height: 41px;
        button {
            border: 1px solid #329d39;
            color: #329d39;
        }
    }
    @include e(service) {
        margin: rem(20) 0 rem(40);
        >p {
            text-align: center;
            font-size: rem(40);
            color: #329d39;
            padding-top: 10px;
            margin-bottom: 0;
        }
        .service-copy {
            width: rem(660);
            height: 50px;
            line-height: 50px;
            margin-top: rem(20);
            box-shadow: 1px 3px 1px #ddd;
            text-align: center;
            font-size: 16px;
        }
    }
    @include e(swiper) {
        width: rem(580);
        margin: 0 auto;
        height: rem(730);
    }
    @include e(rules) {
        color: #000;
        text-align: left;
        li {
            line-height: rem(62);
            font-size: rem(28);
        }
    }
}
</style>