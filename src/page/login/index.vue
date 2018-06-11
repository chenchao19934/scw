<template>
    <div class="wx-login">
        <TopNav></TopNav>
        <div class="wx-login__swipers">
            <mt-swipe 
                    :show-indicators="false" 
                    :continuous="false" 
                    :auto="0">
                <mt-swipe-item>
                    <InputItem type="text" 
                                placeholder="请输入手机号" 
                                :length=11
                                v-model="phone">
                        <span slot="img">
                            <img src="../../assets/image/icon-home-person.png" alt="">
                        </span>
                    </InputItem>
                    <InputItem type="text" 
                                placeholder="请输入验证码" 
                                :length=4
                                v-model="code">
                        <span slot="img">
                            <img src="../../assets/image/icon-message.png" alt="">
                        </span>
                        <em slot="code" @click.prevent="getCode">{{codeMsg}}</em>
                    </InputItem>
                    <p class="login-txt">首次用手机号登录将自动为您注册</p>
                    <div class="login-btn">
                        <mt-button type="primary" size="large" @click.native="Login">登录</mt-button>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <InputItem type="text" placeholder="手机号/用户名/账号">
                        <span slot="img">
                            <img src="../../assets/image/icon-home-person.png" alt="">
                        </span>
                    </InputItem>
                    <InputItem type="password" placeholder="请输入密码">
                        <span slot="img">
                            <img src="../../assets/image/icon-password.png" alt="">
                        </span>
                    </InputItem>
                    <p class="login-txt">忘记密码？</p>
                    <div class="login-btn">
                        <mt-button type="primary" size="large" @click.native="Login">登录</mt-button>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/back';
    import {login , loginCode ,getUser, addLocalToCark} from '@/api/newService';
    import InputItem from './user';
    export default {
        components : {
            TopNav,
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
                vuegConfig : {
                    forwardAnim:'bounceInUp',
                }
            }
        },
        methods : {
            // 登录按钮
            async Login() {
                if (/^1[34578]\d{9}$/.test(this.phone) && this.code !== '') {
                    let userInfo = await getUser({
                        phone : this.phone,
                        code : this.code
                    })
                    localStorage.userId = userInfo.user_id;
                    localStorage.userInfo_app = JSON.stringify(userInfo);
                }else {
                    this.$toast('请填写正确的手机号和验证码！');
                }
            },
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
            // 登录
            async Login() {
                if (this.phone === '' || this.code === '' || this.code.length !== 4) {
                    this.$toast("请填写正确的手机号或验证码！");
                }else {
                    await getUser({
                        phone : this.phone,
                        code : this.code
                    }).then(res => {
                        if (res.user_name) {
                            localStorage.logo = res.user_logo;
                            localStorage.userId = res.user_id;
                            localStorage.phone = res.user_name;
                            localStorage.userName = res.user_nick_name;
                            this.$store.commit('setLoginState',true);
                            this.$back(this.$router);
                        }else {
                            this.$toast(res.message)
                        }
                    })
                }
                // await addLocalToCark({
                //     user_id : localStorage.userId,
                //     list : JSON.parse(localStorage.ShoppingCart)
                // }).then(res=> {
                //     if (res.message === 1) {
                //         localStorage.ShoppingCart = '[]';
                //     }
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(login) {
    background: url('../../assets/image/bac_login.jpg') no-repeat;
    background-size: cover;
    @include e(swipers) {
        position: absolute;
        top: rem(300);
        left: 0;
        width: 100%;
        height: 300px;
        .login-btn {
            margin: 0 rem(60) 0;
            .mint-button--primary {
                background-color: #abd13e;
            }
        }
        .login-txt {
            font-size:rem(24);
            margin: 0 rem(60) rem(60);
            color: #ffffff;
        }
    }
}
</style>