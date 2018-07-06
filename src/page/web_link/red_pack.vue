<template>
    <div class="wx-pack">
        <div class="wx-pack__imgWrap">
            <img :src="packImg + '?x-oss-process=image/resize,w_750'">
        </div>
        <div class="wx-pack__main">
            <div class="pack_content">
                <div class="pack_money">
                    <div>
                        <h1>{{packInfo.name}}</h1>
                        <p>满{{packInfo.full_money}}可用</p>
                    </div>
                    <div class="reduce">
                        <span>￥</span><em>{{packInfo.cut_money}}</em>
                    </div>
                </div>
                <div class="pack_time">有效期至{{packInfo.end_time}}</div>
            </div>
            <div class="pack_user ellipsis">红包已放入账号：{{packInfo.nick_name}}</div>
            <mt-button type="danger" 
                        size="large" 
                        @click.native="$router.push({name : 'home'})">立即使用</mt-button>
        </div>
        <div class="wx-pack__rank" v-if="packList.length !== 0">
            <h1>看看大家的手气</h1>
            <UserItem v-for="x in packList" 
                        :key="x.red_bag_order"
                        :item="x"
                        :tag="maxUser"></UserItem>
        </div>
        <div class="wx-pack__rules">
            <h2>活动规则</h2>
            <p>1、下单成功即可获得分享红包资格</p>
            <p>2、用户点开界面自动获得优惠券，优惠券存放的账号默认是其微信账户</p>
            <p>3、分享的优惠券有效期2天</p>
            <p>4、优惠券随机领取金额1-5元，满35元可使用</p>
            <p>5、每个链接仅限20人领取</p>
            <p>6、每人每天仅可领取5次</p>
            <p>7、未尽事宜烦请咨询小蛙客服</p>
        </div>
    </div>
</template>

<script>
    import UserItem from './user_item'
    import {redPackInfo, receivePack} from '@/api/newService'
    export default {
        components: {
            UserItem
        },
        data() {
            return {
                packInfo: '',
                packImg : '',
                maxUser : 0,
                packList : [],
                packId : ''
            }
        },
        created() {
            this.packId = this.$route.query.packId || localStorage.packId;
            this.receivePack();
        },
        methods: {
            receivePack() {
                receivePack({
                    share_id : this.packId,
                    user_id : localStorage.userId
                }).then(res => {
                    if (res.code === 200) {
                        this.packInfo = res.coupon;
                    }else {
                        this.$toast(res.message);
                        setTimeout(() => {
                            this.$router.push({name : 'home'})
                        }, 2000);
                    }
                    this.initPage();
                })
            },
            async initPage() {
                const data = await redPackInfo({
                    share_id : this.packId
                })
                if (data.code === 200) {
                    this.packImg = data.image;
                    this.maxUser =data.data.max_user_order;
                    this.packList = data.data.list;
                }
                this.initShare();
            },
            initShare() {
                if (this.$device === 'wechat') {
                    const url = `${process.env.BASE_URL}/public/wScw/#/redPack?packId=${this.packId}`;
                    this.wxShare(`【送菜蛙红包】第${this.maxUser}个领取的人红包最大！`,'手速很重要，手气更重要！',url,'https://scwnew.oss-cn-shenzhen.aliyuncs.com/hongbao/orderhonebao.png',(res)=> {
                        this.showRedpack = false;
                        this.$store.state.isShowMask = false;
                        if (res === 'shareSuccess') {
                            this.$toast('红包分享成功！')
                        }else {
                            this.$toast('取消分享！')
                        }
                    })
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @include b(pack) {
        background-color: #fdba88;
        padding-bottom: rem(20);
        img{
            display: block;
            width: 100%;
        }
        @include e(imgWrap) {
            height: rem(360);
        }
        @include e(main) {
            width: 90%;
            height: rem(420);
            margin: rem(20) auto;
            padding: rem(20);
            border-radius: rem(20);
            background-color: #fee7d5;
            .pack_content {
                position: relative;
                background: #fff;
                height: rem(200);
                padding: rem(20) rem(30) 0;
                border-radius: rem(20);
                overflow: hidden;
                &::before, &::after {
                    position: absolute;
                    content: "";
                    width: rem(32);
                    height: rem(32);
                    border-radius: 50%;
                    background: #fee7d5;
                    transform: translateY(-50%);
                }
                &::before {
                    left: rem(-16);
                    top: 50%;
                }
                &::after {
                    right: rem(-16);
                    top: 50%;
                }
            }
            .pack_money {
                display: flex;
                height: rem(120);
                border-bottom: 1px dotted #ccc;
                >div {
                    flex: 0 0 50%;
                    h1,p {
                        line-height: rem(60);
                    }
                    h1 {
                        font-size: rem(32);
                        color: #ef3a23
                    }
                    p {
                        font-size: rem(28);
                    }
                }
                >div.reduce {
                    line-height: rem(120);
                    text-align: right;
                    span,em {
                        color: #ef3a23;
                        font-size: rem(54);
                    }
                    em {
                        font-size: rem(64);
                    }
                }
            }
            .pack_time {
                height: rem(60);
                line-height: rem(60);
                font-size: rem(24);
            }
            .pack_user {
                line-height: rem(100);
                text-align: center;
                font-size: rem(28);
            }
        }
        @include e(rank) {
            width: 90%;
            min-height: rem(280);
            margin: rem(20) auto;
            padding: rem(20);
            border-radius: rem(20);
            background-color: #fee7d5;
            h1 {
                line-height: rem(100);
                font-size: rem(36);
                text-align: center;
            }
        }
        @include e(rules) {
            width: 90%;
            margin: rem(20) auto;
            color: #fff;
            h2 {
                text-align: center;
                font-size: rem(36);
                line-height: rem(64);
                font-weight: bold;
            }
            p {
                font-size: rem(28);
                line-height: rem(48);
            }
        }
    }
</style>