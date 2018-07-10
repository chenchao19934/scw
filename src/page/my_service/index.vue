<template>
    <div>
        <iframe ref="iframe" 
                :src="serviceUrl" 
                scrolling=false
                frameborder="0" 
                allowfullscreen="true"></iframe>
    </div>
</template>

<script>
    import { getUnionid } from "@/api/newService";
    export default {
        data() {
            return {
                serviceUrl: ''
            }
        },
        created() {
            this.initPage()
        },
        methods: {
            async initPage() {
                let data = await getUnionid({
                    user_id : localStorage.userId
                })
                this.serviceUrl = `https://www16.53kf.com/m.php?cid=72157084&arg=10157084&style=1&u_cust_id=${localStorage.userId}&u_cust_name=${data}&u_stat_id=123456`
            },
        },
    }
</script>

<style scoped>
    iframe {
        width: 100%;
        min-height: 100vh;
    }
</style>