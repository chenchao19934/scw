<template>
    <div class="wx-left">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@include b(left) {
    width: rem(187.5);
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #f5f5f5;
    padding-bottom: rem(228);
}
</style>