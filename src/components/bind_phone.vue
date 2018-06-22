<template>
    <div class="wx-phone">
        <h1>还没绑定您的手机号</h1>
        <p>买菜前要确认您已绑定了手机哦</p>
        <span @click="closeMask">×</span>
        <InputItem type="text" 
                    placeholder="请输入手机号" 
                    :length=11
                    v-model="phone">
            <span slot="img">
                <img src="../assets/image/icon-home-person.png" alt="">
            </span>
        </InputItem>
        <InputItem type="text" 
                    placeholder="请输入验证码" 
                    :length=4
                    v-model="code">
            <span slot="img">
                <img src="../assets/image/icon-message.png" alt="">
            </span>
            <em slot="code" @click.prevent="getCode">{{codeMsg}}</em>
        </InputItem>
        <mt-button type="primary" 
                    size="large" 
                    @click.native="checkLogin">绑定</mt-button>
</div>
</template>

<script>
import {login , loginCode ,bingToPhone} from '@/api/newService';
import InputItem from './user';
export default {
    components : {
        InputItem
    },
    data() {
        return {
            phone : '',              // 手机号
            code : '',               // 验证码
            codeMsg : '获取验证码',
            codeAble : true,         // 获取验证码按钮是否可点击
            codeTime : 30,           // 验证码倒计时
            time : null,             // 计时器
        }
    },
    methods: {
        // 获取验证码
        getCode() {
            if(this.codeAble) {
                if (!/^1[34578]\d{9}$/.test(this.phone)) {
                    this.$toast('请填写正确的手机号码！')
                }else {
                    this.receiveCode();
                    this.time = setInterval(()=> {
                        this.codeChange();
                    },1000)
                }
            }
        },
        // 验证码获取按钮状态
        codeChange() {
            this.codeAble = false;
            this.codeTime --;
            if (this.codeTime <= 0) {
                this.codeMsg = '获取验证码';
                this.codeAble = true;
                this.codeTime = 30;
                clearInterval(this.time);
            } else {
                this.codeMsg = `${this.codeTime}s 重新获取`
            }
        },
        // 验证码获取请求
        receiveCode() {
            let code = login({phone : this.phone}).then(res => {
                loginCode({
                    phone : this.phone,
                    code : res
                }).then(res => {
                    this.$toast(res.message);
                })
            });
        },
        // 绑定手机号
        checkLogin() {
            if (this.phone === '' || this.code === '' || this.code.length !== 4) {
                this.$toast('请输入正确的手机号和验证码！')
            }else {
                bingToPhone({
                    user_id : localStorage.userId,
                    phone : this.phone,
                    code : this.code
                }).then(res => {
                    this.$toast(res.message);
                    if (res.code === 200) {
                        localStorage.setItem('userId',res.user_id);
                        this.$store.state.isBindPhone = true;
                        this.$store.state.isShowBindPhone = false;
                    }
                })
            }
        },
        closeMask() {
            this.$store.state.isShowBindPhone = false;
        }
    },
};
</script>

<style lang="scss" scoped>
@include b(phone) {
    position: relative;
    width: rem(600);
    padding: rem(60) rem(30);
    text-align: center;
    background: #fff;
    h1 {
        font-size: rem(32);
        line-height: rem(68);
        font-weight: bold;
    }
    p {
        font-size: rem(28);
        line-height: rem(48);
        margin-bottom: rem(30);
    }
    > span {
        position: absolute;
        top: rem(30);
        right: rem(30);
        width: rem(60);
        height: rem(60);
        text-align: center;
        line-height: rem(60);
        border: rem(2) solid #717171;
        border-radius: 50%;
        color: #717171;
        font-size: rem(48);
    }
}
.mint-button--primary {
    width: 90%;
    margin: 0 auto;
    margin-top: rem(40);
    background-color: #abd13e;
}
</style>