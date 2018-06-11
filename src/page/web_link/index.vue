<template>
    <div class="wx-login">
        <TopNav></TopNav>
        <iframe :src="url" frameborder="0"></iframe>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/back';
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                url: ''
            }
        },
        created() {
            this.url = this.$route.params.urls;
        }
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