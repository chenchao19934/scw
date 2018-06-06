<template>
    <div style="padding-top:42px">
        <TopNav titles="积分规则"></TopNav>
        <div class="wx-intRule">
            <img src="../../assets/image/integral/inte_rule1.png" alt="">
            <img src="../../assets/image/integral/inte_rule2.png" alt="">
            <img src="../../assets/image/integral/inte_rule3.png" alt="">
            <img src="../../assets/image/integral/inte_rule4.png" alt="">
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    export default {
        components : {
            TopNav
        },
    }
</script>

<style lang="scss" scoped>
@include b(intRule) {
    img {
        display: block;
        width:100%;
    }
}
</style>