<template>
    <div style="padding-top:40px;padding-bottom:10px;">
        <TonNav titles="邀请好友活动"></TonNav>
        <div class="invi-wrap">
            <img src="../../assets/image/invited/rule_1.png" alt="">
            <img src="../../assets/image/invited/rule_2.png" alt="">
            <img src="../../assets/image/invited/rule_3.png" alt="">
        </div>
    </div>
</template>

<script>
    import TonNav from '../compon/top_nav';
    export default {
        components : {
            TonNav
        },
    }
</script>

<style scoped>
.invi-wrap img {
    display : block;
    width: 100%;
}
</style>