<template>
    <div class="wx-imgScroll">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(x,index) in bannerList" 
                            :key="index"
                            @click.native="goPage(x)">
                <img :src="x.image" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: {
            bannerList : {
                type:Array
            }
        },
        methods: {
            goPage(x) {
                console.log(x);
                if (x.jump_type == "goodsdetails") {
                    this.$router.push({name : 'dishDetail',params: {pid : x.goods_id}})
                }else if (x.jump_type == "tmrlistcat") {
                    switch(x.goods_id) {
                        case "scwshareactive" :
                            if (localStorage.userId) {
                                this.$router.push({name : 'Invited'})
                            }else {
                                this.$router.push({name : 'Login'})
                            }
                            break;
                        case 'inteStore' :
                            if (localStorage.userId) {
                                this.$router.push({name : 'Integral'})
                            }else {
                                this.$router.push({name : 'Login'})
                            }
                    }
                }else if (x.jump_type == "URL") {
                    this.$rouetr.push({name : 'ActiveLink', params : {urls : encodeURIComponent(x.url)}})
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.mint-swipe-indicator.is-active{
    background: #000;
    opacity: 0.8;
}
.mint-swipe-indicator {
    opacity: 0.8;
}
@include b(imgScroll) {
    position: relative;
    height: rem(360);
    background: #a6a6a4;
    img {
        display: block;
        width: 100%;
    }
}
</style>