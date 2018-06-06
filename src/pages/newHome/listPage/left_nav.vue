<template>
    <div class="wx-left left">
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
}
</style>