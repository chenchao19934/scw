<template>
    <li>
        <p>{{item.title}}</p>
        <p>{{item.time}}</p>
        <span :class="{'banAdd' : item.type !== 20}">{{item.money}}</span>
    </li>
</template>

<script>
    export default {
        props : {
            item : Object
        }
    }
</script>

<style lang="scss" scoped>
li {
    color: #666666;
    position: relative;
    z-index: 2;
    display: block;
    background-color: #fff;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: #E8E8E8;
    font-size: 16px;
    span {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: #f08919;
    }
    span.banAdd {
        color: #abd13e;
    }
}
</style>