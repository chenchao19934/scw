<template>
    <div>
        <TopNav></TopNav>
        <img src="../../assets/image/newUser/user_head.png" alt="">
        <img src="../../assets/image/newUser/user_pack.png" alt="">
        <div class="btn">
            <mt-button type="default" 
                        size="normal" 
                        @click.native="acceptCoupn">立即领取</mt-button>
        </div>
        <img src="../../assets/image/newUser/user_1.png" alt="">
        <img src="../../assets/image/newUser/user_2.png" alt="">
        <img src="../../assets/image/newUser/user_3.png" alt="">
        <img src="../../assets/image/newUser/user_4.png" alt="">
        <img src="../../assets/image/newUser/user_5.png" alt="">
        <MaskBox :isShow="showPop"
				v-if="showPop"
                @close="closePop">
            <div class="wx-newUser" slot="user" @click="closePop">
                <div class="wx-newUser__main">
                    <h1>咱们是老朋友啦</h1>
                    <p>送你一个小红包</p>
                    <img src="../../assets/image/newUser/user_old.png" alt="">
                    <div class="wx-newUser__main--btn">
                        <mt-button type="default" 
                            size="normal" 
                            @click.native.stop="acceptOldCoupn">立即领取</mt-button>
                    </div>
                </div>
            </div>
        </MaskBox>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/back';
    import { newUserCoupn,oldUserCoupn } from '@/api/newService';
    import MaskBox from '@/page/compon/mask';
    export default {
        components: {
            TopNav,
            MaskBox
        },
        data() {
            return {
                showPop: false
            }
        },
        activated() {
            this.showPop = false
        },
        methods: {
            async acceptCoupn() {
                let data = await newUserCoupn({
                    user_id : localStorage.userId
                })
                if (data.message === 1) {
                    this.$router.push({name : "Gift",params : {giftId : data.id}})
                }else if (data.message === 2) {
                    this.showPop = true
                }else if(data.message === 0){
                    this.$toast("已经领取过该优惠券，无法重复领取！");
                }
            },
            async acceptOldCoupn() {
                let data = await oldUserCoupn({
                    user_id : localStorage.userId
                })
                if (data.message === 0) {
                    this.closePop();
                    this.$toast("已经领取过该优惠券，无法重复领取！");
                }else {
                    this.$router.push({name : "Gift",params : {giftId : data.message}})
                }
            },
            closePop() {
                this.showPop = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
img {
    display: block;
    width: 100%;
}
.btn {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #fde4e8;
}
button {
    background-color: #ff4865;
    color: #fff;
}
@include b(newUser) {
    padding: rem(16);
    background-color: #fde4e8;
    min-height: rem(400);
    @include e(main) {
        height: 100%;
        border: rem(2) solid #ff4865;
        padding: rem(15) rem(10);
        border-radius: rem(16);
        text-align: center;
        h1,p {
            line-height: rem(66);
        }
        h1 {
            color: #093b66;
            font-weight: bold;
            font-size: rem(48);
        }
        p {
            color: #093b66;
            font-size: rem(40);
        }
        @include m(btn) {
            display: block;
            padding: rem(20) 0;
        }
    }
}
</style>