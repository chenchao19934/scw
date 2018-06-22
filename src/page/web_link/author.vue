<template>
    <div class="wx-author">
        
    </div>
</template>

<script>
    import {threePartLogin} from './api/newService';
    export default {
        async beforeCreate () {
            if (this.$device === 'wechat') {
                let url = this.$route.query.url || '';
                let wechat_nickname = this.$route.query.wechat_nickname || '';
                let wechat_headurl = this.$route.query.wechat_headurl || '';
                let open_id = this.$route.query.open_id || '';
                let union_id = this.$route.query.union_id || '';
                if (location.href.indexOf("dishDetail") < 0) {
                    if ( (localStorage.userId && localStorage.userId.length > 30  && localStorage.openId && localStorage.openId.length > 27) || (wechat_nickname && wechat_nickname.length >= 1 && open_id && open_id.length > 27)) {
                        localStorage.setItem('userName',wechat_nickname);
                        localStorage.setItem('union_id',union_id);
                        localStorage.setItem('openId',open_id);
                        localStorage.setItem('logo',wechat_headurl);
                        if(!(localStorage.userId && localStorage.userId.length > 30)){
                            console.log("userId 出错，重新或获取");
                            let LoginInfo = {
                                'userName': localStorage.userName,
                                'union_id': localStorage.union_id,
                                'userId': "noUserid",
                                'openId': localStorage.openId,
                                'logo': localStorage.logo,
                                'token': "999999",
                                'types': 2
                            }
                            let data = await threePartLogin({
                                data : LoginInfo
                            })
                            if (data.code == 200) {
                                localStorage.setItem('userName', data.date.user_nick_name);
                                localStorage.setItem('userId', data.date.user_id);
                                localStorage.setItem('logo', data.date.user_logo);
                            }
                        }
                    }else {
                        if (this.$device === 'miniprogram') {
                            
                        }else {
                            window.location.href='index.php/home/test/get_wx_code';
                        }
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(author) {
    height: 100vh;
}
</style>