<template>
    <div class="wx-imgScroll">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="x in bannerList" :key="x.id">
                <img :src="x.value" alt="">
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
        }
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
    height: rem(230);
    background: #a6a6a4;
    img {
        display: block;
        width: 100%;
    }
}
</style>