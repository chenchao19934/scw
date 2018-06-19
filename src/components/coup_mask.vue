<template>
    <div class="wx-coupMain">
        <div class="wx-coupMain__tit">恭喜您获得优惠券</div>
        <ul class="wx-coupMain__scroll">
            <li v-for="x in obj.list">
                <div>
                    <p class="title ellipsis">{{x.childName}}</p>
                    <p class="reduce">￥{{x.cut_money}}</p>
                </div>
                <div>
                    <p class="time">{{x.create_time}}至{{x.expire}}</p>
                    <p class="time">满{{x.full_money}}元立减</p>
                </div>
            </li>
        </ul>
        <div class="wx-coupMain__btn">
            <mt-button size="normal" type="danger" @click.native="receive(obj.id)">确定领取</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['obj'],
        methods: {
            receive(id) {
                this.$emit('receiveCoupn',id);
            },
        },
    }
</script>

<style lang="scss" scoped>
@include b(coupMain) {
    position: relative;
    background: #fff url('../assets/image/coupn_head.png') top center no-repeat;
    background-size: 100%;
    padding: rem(60) rem(30) rem(30);
    text-align: center;
    @include e(tit) {
        font-size: rem(36);
        font-weight: bold;
        line-height: rem(80);
    }
    @include e(scroll) {
        max-height: rem(400);
        overflow-y: scroll;
        -webket-overflow-scroll : touch;
        li {
            height: rem(150);
            margin-bottom: rem(10);
            padding: rem(10) rem(25);
            background: #fff url('../assets/image/coupn_uesr.jpg') center no-repeat;
            background-size: 100%;
            overflow: hidden;
            >div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: rem(65);
                p.title {
                    width: 65%;
                    text-align: left;
                    color: #fff;
                    font-size: rem(36);
                }
                p.reduce {
                    color: #fff100;
                    font-size: rem(36);
                }
                p.time {
                    color: #fff;
                    font-size: rem(24);
                }
            }
        }
    }
    @include e(btn) {
        margin-top: rem(20);
        .mint-button {
            font-size: 16px;
            height: 34px;
            background-color: #ee3241;
        }
    }
}
</style>