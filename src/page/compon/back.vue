<template>
    <div class="wx-back" @click="back"></div>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style lang="scss" scoped>
@include b(back) {
    position: fixed;
    left: 5px;
    top: 5px;
    width: rem(80);
    height: rem(80);
    background: url("../../assets/image/h_five_back.png") no-repeat;
    background-size: 100%;
}
</style>