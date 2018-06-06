<template>
    <div class="wx-item">{{items.name}}</div>
</template>

<script>
    export default {
        props : {
            items : Object,
        }
    }
</script>

<style lang="scss" scoped>
@include b(item) {
    text-align: center;
    font-size: rem(32);
    padding: rem(20) rem(10);
    border-bottom: 1px solid #fff;
}
</style>