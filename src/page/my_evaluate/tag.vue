<template>
    <div class="wx-target" v-if="tags">
        <span v-for="x in tags" :key="x.id">{{x.tag}}</span>
    </div>
</template>

<script>
    export default {
        props : {
            tags: Array
        }
    }
</script>

<style lang="scss" scoped>
@include b(target) {
    min-height: rem(44);
    display: flex;
    flex-wrap: wrap;
    span {
        position: relative;
        flex: none;
        font-size: rem(26);
        color: #717171;
        margin-right: rem(20);
        margin-bottom: rem(10);
        padding-left: rem(32);
        &::before {
            content: "";
            position: absolute;
            top: 50%;
            left:0;
            width: rem(26);
            height: rem(26);
            background: url("../../assets/image/icon-feedback.png")center no-repeat;
            background-size: cover;
            transform: translateY(-50%);
        }
    }
}
</style>