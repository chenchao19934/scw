<template>
    <div class="wx-exchange">
        <label>
            <input type="text" 
                    v-model="inputValue"
                    @keyup.enter="toExchange"
                    placeholder="请输入优惠券兑换码">
        </label>
        <mt-button type="danger" @click.native="toExchange">兑换</mt-button>
    </div>
</template>

<script>
    import { exchange } from '@/api/newService';
    export default {
        data() {
            return {
                inputValue: ''
            }
        },
        methods: {
            // 确认兑换
            async toExchange() {
                await exchange({
                    activity : this.inputValue
                }).then(res=> {
                    console.log(res);
                    if (res.message === 0) {
                        this.$toast('兑换失败，请输入有效的兑换码！');
                    } else {
                        this.$toast('兑换成功！');
                        this.$emit('successChage');
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(exchange) {
    position: fixed;
    left: 0;
    top: 41px;
    height : 44px;
    padding : 5px rem(32);
    background-color : #fff;
    z-index: 1;
    label {
        float: left;
        width : rem(560);
        height : 34px;
        overflow: inherit;
        input {
            display : block;
            width : 95%;
            border:0;
            padding: 0 rem(20);
            height : 34px;
            vertical-align: middle;
            font-size: 14px;
            background-color : #f0f0f0;
        }
    }
    .mint-button--danger {
        padding: 0;
        width : rem(126);
        height: 34px;
        font-size : 14px;
    }
}
</style>