<template>
    <div class="wx-pack">
        <div class="wx-pack__top">
            <div class="wrap">
                <img src="../assets/image/services/red_pack.png" alt="">
            </div>
            <h1>送您一个拼手气红包</h1>
            <p>(赶紧分享给你的小伙伴)</p>
        </div>
        <div class="wx-pack__btn">
            <span @click="cancel">取消</span>
            <span @click="sure">确定</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            cancel() {
                this.$emit('cancelMask')
            },
            sure() {
                this.$emit('sureShare')
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(pack) {
    background-color: #fff;
    img {
        display: block;
        width: 100%;
    }
    @include e(top) {
        padding: rem(15) rem(47);
        height: rem(520);
        .wrap {
            height: rem(390);
        }
        h1 {
            font-size: rem(40);
            color: #abd13e;
        }
        p {
            font-size: rem(24);
            line-height: rem(48);
        }
    }
    @include e(btn) {
        display: flex;
        height: 50px;
        box-shadow: 0 -1px 1px #ccc;
        span {
            flex: 0 0 50%;
            line-height: 50px;
            font-size: 16px;
            &:first-child {
                box-shadow: 1px 0 1px #ccc;
            }
            &:last-child {
                color: #E8243D
            }
        }
    }
}
</style>