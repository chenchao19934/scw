<template>
    <div>
        <mt-cell :title="titles" v-if="couponType">
            <img slot="icon" src="../../assets/image/icon/coupons_use.png" width="20" height="20" style="margin-right:5px">
        </mt-cell>
        <mt-cell :title="titles" v-else>
            <img slot="icon" src="../../assets/image/icon/coupons_unuse.png" width="20" height="20" style="margin-right:5px">
        </mt-cell>
        <div class="wx-orderItem">
            <ul class="wx-orderItem__imgWrap">
                <li v-for="x in orderArr">
                    <img v-lazy="x.img + '?x-oss-process=image/resize,w_150'" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        props: {
            orderArr: {
                type: Array
            },
            titles: {
                type: String,
                default: "可用优惠券商品"
            },
            //  优惠券可用类型
            couponType : {
                type: Boolean,
                default : true
            },
        },
        created() {
            this.$nextTick(()=> {
                let wrapper = document.querySelector('.wx-orderItem');
                this.scroll = new BScroll(wrapper, {
                    scrollX : true,
                    click : true,
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
@include b(orderItem) {
    width: 100%;
    margin-top: rem(10);
    padding-bottom : rem(10);
    background-color : #fff;
    overflow:hidden;
    @include e(imgWrap) {
        display: inline-block;
        height : rem(142);
        padding : 0 rem(20);
        white-space: nowrap;
        li {
            display: inline-block;
            width :rem(142);
            img {
                display :block;
                width :100%;
            }
        }
    }
}
</style>