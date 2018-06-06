<template>
    <div class="wx-orders">
        <div class="wx-orders__all" @click="$router.push({name : 'Order', params : {type : '0'}})">
            <span>我的订单</span>
            <em class="right">查看全部订单 ></em>
        </div>
        <div class="wx-orders__list">
            <li v-for="item in order" :key="item.id" @click="go(item.id)">
                <div class="listImgWrap">
                    <img :src="item.ext_value">
                    <span v-if="item.number">{{item.number}}</span>
                </div>
                <p>{{item.descd}}</p>
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            order : {
                type : Array
            }
        },
        computed : {
            filterOrder() {
                return this.order.filter((item) => {
                    return item !== 79;
                })
            }
        },
        methods: {
            go(id) {
                this.$emit('toPage',id);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(orders) {
    padding: 0 rem(24);
    font-size: rem(28);
    border-bottom: 1px solid #fafafa;
    min-height: rem(229);
    @include e(all) {
        line-height: rem(80);
    }
    @include e(list) {
        display: flex;
        overflow: hidden;
        li {
            flex: 0 0 25%;
            height: rem(147);
            padding: rem(20);
            .listImgWrap {
                position: relative;
                width: rem(80);
                height: rem(60);
                margin: 0 auto;
                >img {
                    display: block;
                    width: 100%;
                }
                >span {
                    position: absolute;
                    right: -3px;
                    top: -3px;
                    width: rem(38);
                    height: rem(38);
                    padding: rem(2);
                    line-height: rem(38);
                    font-size: rem(20);
                    border-radius: 50%;
                    background-color: #ff8e00;
                    color: #fff;
                    text-align: center
                }
            }
            p {
                text-align: center;
                line-height: rem(47);
            }
        }
    }
}
</style>