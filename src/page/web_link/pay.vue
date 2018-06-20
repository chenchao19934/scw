<template>
    <div class="wx-login">
        <TopNav titles="支付"></TopNav>
        <iframe ref="iframe" 
                :src="url" 
                scrolling=false
                frameborder="0" 
                @load="loadiframe"
                allowfullscreen="true"></iframe>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/top_nav';
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                orderId : '',
                url : process.env.BASE_URL +'/public/wxPay.html'
            }
        },
        beforeRouteLeave(to, from, next) {
            console.log(to);
            if (to.name === 'carkOrder' || to.name === 'Order') {
                if (to.path === '/Order/0') {
                    next()
                }else {
                    this.$messagebox.confirm('订单提交中，确定要退出吗？').then(action => {
                        next('/Order/0');
                    }).catch(()=>{
                        next(false);
                    })
                }
            }else {
                next();
            }
        },
        created() {
            this.orderId = this.$route.query.orderId;
        },
        methods: {
            loadiframe() {
                window.addEventListener("message", e => {
                    console.log(e);
                    // 支付成功或失败回调
                    if (e.data === 'success') {
                        this.$router.push({name :'Order',params : {type : 0}});
                    }else {
                        this.$router.push({name :'Order',params : {type : 0}});
                    }
                },false);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(login) {
    iframe {
        width: 100%;
        min-height: 100vh;
    }
}
</style>