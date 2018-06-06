<template>
    <ul class="wx-nav">
        <li><span></span>搜索</li>
        <li><span></span>分类</li>
        <li><span></span>首页</li>
        <div></div>
    </ul>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@include b(nav) {
    position: absolute;
    top: -170px;
    right: 0;
    width: rem(200);
    line-height: rem(56);
    background: rgba(0,0,0,0.8);
    border-radius: rem(10);
    z-index: 10002;
    transform: scale(0);
    transition: all 0.2s linear;
    li {
        padding: rem(14) rem(20);
        color: #ffffff;
        text-align: center;
        font-size: 14px;
        span {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 5px;
            vertical-align: middle;
        }
        &:nth-child(1) span {
            background: url('../../assets/image/list1.png') center no-repeat;
            background-size: cover;
        }
        &:nth-child(2) span {
            background: url('../../assets/image/list2.png') center no-repeat;
            background-size: cover;
        }
        &:nth-child(3) span {
            background: url('../../assets/image/list3.png') center no-repeat;
            background-size: cover;
        }
    }
    div {
        position: absolute;
        top: -16px;
        right: 7px;
        width: 0;
        height: 0;
        border-bottom: 16px solid rgba(0,0,0,0.8);
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }
}
.is-show {
    top: 50px;
    right: 8px;
    transform: scale(1);
}
</style>