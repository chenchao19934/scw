<template>
    <div style="padding-top:45px">
        <TopNav titles="账户信息"></TopNav>
        <div>
            <mt-cell title="" is-link value="头像">
                <img slot="icon" 
                        :src="userInfo.user_logo + '?x-oss-process=image/resize,w_50'" 
                        width="40" 
                        height="40"
                        style="border-radius:50%">
            </mt-cell>
            <mt-cell title="用户名" :value="userInfo.user_name"></mt-cell>
            <mt-cell title="用户ID" :value="userInfo.sign"></mt-cell>
            <mt-cell title="昵称" is-link :value="userInfo.user_nick_name"></mt-cell>
            <mt-cell title="性别" 
                        is-link 
                        value="保密"
                        @click.native="sheetVisible = !sheetVisible"></mt-cell>
        </div>
        <mt-button type="danger" 
                    size="large" 
                    @click.native="exitLogin"
                    style="width:80%;margin:30px auto">退出登录</mt-button>
        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import { getUserInfo,setUserSex } from "@/api/newService";
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                userInfo: [],
                actions : [
                    {
                        name : '男',
                        method : this.setUserSex
                    },
                    {
                        name : '女',
                        method : this.setUserSex
                    },
                    {
                        name : '保密',
                        method : this.setUserSex
                    }
                ],
                sheetVisible : false
            }
        },
        created() {
            this.initPage();
        },
        methods: {
            async initPage() {
                await getUserInfo({user_id : localStorage.userId}).then(res=> {
                    this.userInfo = res.date;
                    localStorage.userId = res.date.user_id;
                    localStorage.logo = res.date.user_logo;
                    localStorage.phone = res.date.user_name;
                    localStorage.userName = res.date.user_nick_name;
                })
            },
            setUserSex(actions,index) {
                let sex;
                switch (actions.name) {
                    case '男':
                        sex = 10
                        break;
                    case '女':
                        sex = 20
                        break;
                    default:
                        sex = 30
                        break;
                }
                setUserSex({
                    sex : sex
                }).then(res => {
                    this.$toast("修改成功！");
                })
            },
            exitLogin() {
                localStorage.removeItem("userId");
                localStorage.removeItem("logo");
                localStorage.removeItem("phone");
                localStorage.removeItem("userName");
                this.$store.commit('setLoginState', false);
                this.$back(this.$router);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>