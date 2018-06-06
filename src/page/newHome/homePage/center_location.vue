<template>
    <div class="wx-store"> 
        <div class="wx-store-nowStore">
            <span>当前发货</span><em>{{nowLocation}}</em>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            nowLocation: {
                type : String,
                default : '宝安中心店'
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(store) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: rem(72);
    padding: rem(10) 0;
    @include e(nowStore) {
        position: relative;
        padding: 0 3%;
        border-radius: rem(16);
        border: 1px solid #abd13e;
    }
}
.wx-store-nowStore span {
    color: #abd13e;
    font-size: rem(38);
}
</style>