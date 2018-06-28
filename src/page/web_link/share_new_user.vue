<template>
    <div>
        <img src="../../assets/image/share.png" alt="">
    </div>
</template>

<script>
    import { threePartLogin, userBindInvited } from "@/api/newService";
    export default {
        data() {
            return {
                uId: ''
            }
        },
        created() {
            this.uId = this.$route.query.uId || localStorage.uId;
            if (this.$device == 'wechat') {
                this.initPage();
            }
        },
        methods: {
            async initPage() {
                userBindInvited({
                    user_id : this.uId,
                    invit_id : localStorage.userId
                }).then(res=> {
                    this.$toast(res.message);
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
img {
    display: block;
    width: 100%;
}
</style>