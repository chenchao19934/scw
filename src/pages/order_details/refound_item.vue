<template>
    <li>
        <span>{{list.reason}}</span>
        <em>{{list.time}}</em>
        <em>{{list.text}}</em>
    </li>
</template>

<script>
    export default {
        props : {
            list : Object
        }
    }
</script>

<style lang="scss" scoped>
li {
    display : flex;
    height:rem(86);
    line-height : rem(54);
    background-color: #fff;
    justify-content: space-between;
    padding: rem(15) rem(20);
    border-bottom : rem(2) solid #e8e8e8;
    span {
        padding: 0 rem(16);
        border-radius: rem(10);
        background-color: #ececec;
        color: #515151;
        font-size: rem(24);
    }
}
</style>