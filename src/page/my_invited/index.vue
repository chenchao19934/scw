<template>
    <div style="padding-top:30px;padding-bottom:10px;">
        <TonNav titles="邀请有礼"></TonNav>
        <div class="wx-headWrap">
            <img src="../../assets/image/invited/share_head.jpg" alt="">
        </div>
        <div class="wx-mainWrap">
            <p @click="$router.push({name : 'InvitedRule'})">活动规则<span></span></p>
            <div class="wx-mainWrap__imgWrap">
                <img src="../../assets/image/invited/share_red_pack.png" alt="">
            </div>
            <h1>邀请新人下单</h1>
            <h2>立得满59立减<span>30</span>元红包</h2>
        </div>
        <div class="wx-giftWrap">
            <div class="wx-giftWrap__tit">
                <span>
                    <img src="../../assets/image/invited/share_tit.png" alt="">
                </span>
            </div>
            <div class="wx-giftWrap__count">
                <div>
                    <p>{{allInvited}}人</p>
                    <p>累计邀请</p>
                </div>
                <div>
                    <p>{{newInvited}}人</p>
                    <p>今日成功邀请</p>
                </div>
            </div>
            <div class="wx-giftWrap__list">
                <div class="load-border">
                    <div class="load-ings" :style="{width:percent}"></div>
                    <div class="inv-gift inv-gift-8"><span>2人</span></div>
                    <div class="inv-gift inv-gift-12"><span>5人</span></div>
                    <div class="inv-gift inv-gift-15"><span>10人</span></div>
                    <div class="inv-gift inv-gift-50"><span>50人</span></div>
                </div>
            </div>
            <mt-button size="large" type="primary" @click.native="share">立即邀请</mt-button>
        </div>
    </div>
</template>

<script>
    import TonNav from '../compon/top_nav';
    import { userInvited } from '@/api/newService'
    export default {
        components : {
            TonNav
        },
        data() {
            return {
                newInvited : 0,
                allInvited : 0,
                percent : '0%',
            }
        },
        created() {
            this.initPage();
            this.initShare();
        },
        methods: {
            async initPage() {
                let data = await userInvited({user_Id : localStorage.userId});
                this.newInvited = data.newOrder;
                this.allInvited = data.new;
                if (this.allInvited <= 2) {
                    this.percent = this.allInvited * 3 +'%'
                }else if(this.allInvited <= 5) {
                    this.percent = (this.allInvited - 2) * 5 + 6 +'%';
                }else if(this.allInvited <= 10){
                    this.percent = (this.allInvited - 5) * 4.4 + 26 +'%';
                }else {
                    this.percent = (this.allInvited - 10) * 1.3 + 48 +'%';
                }
            },
            initShare() {
                if (this.$device === 'wechat') {
                    const url = `${process.env.BASE_URL}/public/wScw/#/shareNewUser?uId=${localStorage.userId}`;
                    this.wxShare('新人专享，您已获得满59减30红包，戳我买买买!','看见好的，就想起你!',url,'https://scwnew.oss-cn-shenzhen.aliyuncs.com/lALPBbCc1UvSoEDMyMzI_200_200.png',(res)=> {
                        this.$store.state.isShowMask = false;
                        if (res === 'shareSuccess') {
                            this.$toast('分享成功！')
                        }else {
                            this.$toast('取消分享！')
                        }
                    })
                }
            },
            share() {
                if (this.$device === 'wechat') {
                    this.$store.state.isShowMask = true;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(headWrap) {
    img {
        display : block;
        width: 100%;
    }
}
@include b(mainWrap) {
    h1,h2,p {
        text-align : center;
        line-height : rem(80);
        font-size :rem(32);
    }
    h1 {
        font-size :rem(40);
    }
    h2 {
        span {
            color : #ff0000;
        }
    }
    > p {
        color : #717171;
        span {
            display : inline-block;
            vertical-align: unset;
            margin-left : rem(15);
            width : rem(28);
            height :rem(28);
            background : url('../../assets/image/invited/question.png') center no-repeat;
            background-size: 100%;
        }
    }
    @include e(imgWrap) {
        width : rem(450);
        height: rem(162);
        margin: 0 auto;
        overflow : hidden;
        img {
            display :block;
            width : 100%;
        }
    }
}
@include b(giftWrap) {
    padding: rem(20) rem(32);
    .mint-button--primary {
        background-color: #abd13e;
    }
    @include e(tit) {
        height : rem(86);
        padding : rem(20) 0;
        border-bottom: rem(2) solid #7c7c7c;
        span {
            display : inline-block;
            width : rem(204);
            img {
                display : block;
                width: 100%;
            }
        }
    }
    @include e(count) {
        display : flex;
        align-items : center;
        justify-content : center;
        > div {
            flex : 0 0 50%;
            height : rem(120);
            p {
                text-align : center;
                line-height : rem(60);
                font-size : rem(28);
            }
        }
    }
    @include e(list) {
        position : relative;
        width: rem(683);
        height : rem(170);
        margin-bottom : rem(30);
    }
}
.load-border {
    position: absolute;
    left: 0;
    bottom : rem(16);
    width: 100%;
    height: rem(16);
    background-color: #33a4d1;
    border: rem(2) solid #0e698d;
    border-radius: rem(10);
    .load-ings {
        position: relative;
        width: 20%;
        height: rem(12);
        border-radius: rem(6);
        background-image: linear-gradient(45deg,rgba(182,234,254,1) 25%,transparent 25%,transparent 50%,rgba(182,234,254,1) 50%,rgba(182,234,254,1) 75%,transparent 75%,transparent);
        background-color: #60D2FF;
        transition: width 3s ease;
        background-size: rem(42) rem(42);
        animation: warning-animation 1s infinite linear;
    }
}
.inv-gift {
    position: absolute;
    top : 0;
    width : rem(84);
    height : rem(150);
    transform: translateY(-92%);
    span {
        position: absolute;
        bottom: rem(-32);
        left: 50%;
        width: 100%;
        font-size: rem(24);
        text-align: center;
        transform: translateX(-50%);
    }
}
.inv-gift-8 {
    left : 0;
    background: url('../../assets/image/invited/s_8.png') center no-repeat;
    background-size: 100%;
}
.inv-gift-12 {
    left : 15%;
    background: url('../../assets/image/invited/s_12.png') center no-repeat;
    background-size: 100%;
}
.inv-gift-15 {
    left : 40%;
    background: url('../../assets/image/invited/s_15.png') center no-repeat;
    background-size: 100%;
}
.inv-gift-50 {
    right : 5%;
    background: url('../../assets/image/invited/s_50.png') center no-repeat;
    background-size: 100%;
}
@keyframes warning-animation {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: rem(42) 0;
    }
}
</style>