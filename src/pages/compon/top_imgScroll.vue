<template>
    <div class="wx-imgScroll">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(x,index) in bannerList" 
                            :key="index"
                            @click.native="goPage(x.goods_id)">
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
            goPage(id) {
                console.log(id);
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