<template>
    <div style="padding-top:42px">
        <TopNav titles="积分商城" add="积分规则" @add="showRule"></TopNav>
        <div class="wx-wrap">
            <img src="../../assets/image/integral/inte_head.png" alt="">
        </div>
        <div class="wx-count">
            <h2 @click="$router.push({name : 'IntegralList'})">{{count}}<span>></span></h2>
            <p>当前积分</p>
            <iCon title="兑换商品">
                <iConItem v-for="x in goodsList" 
                            :key="x.id" 
                            :obj="x"
                            @exchange="change"></iConItem>
            </iCon>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import iCon from '../newHome/compoments/first/dangeCon';
    import iConItem from './goodItem';
    import {integral ,intChange} from '@/api/newService';
    export default {
        components : {
            TopNav,
            iCon,
            iConItem
        },
        data() {
            return {
                count : 0,
                goodsList: []
            }
        },
        created() {
            this.initPage();
        },
        methods: {
            async initPage() {
                let data = await integral({user_id : localStorage.userId});
                this.goodsList = data.list;
                this.count = data.user_numerical;
            },
            async change(id) {
                await intChange({
                    rid : id,
                    user_id : localStorage.userId
                }).then(res=> {
                    if (res.code === 44) {
                        this.$toast(res.message);
                    } else {
                        this.$toast("兑换成功，商品已加入礼盒，请前往礼盒领取！");
                    }
                })
            },
            showRule() {
                this.$router.push({name : 'InteRule'})
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(wrap) {
    width : 100%;
    height: rem(280);
    overflow : hidden;
    img {
        display : block;
        width : 100%;
    }
}
@include b(count) {
    text-align:center;
    h2 {
        line-height : rem(96);
        color : #f08919;
        margin-top : rem(40);
        font-size : rem(76);
        font-weight : bold;
        span {
            vertical-align: text-bottom;
            font-size : rem(48);
            color : #c1c1c1;
        }
    }
    p {
        line-height : rem(56);
        color: #c1c1c1;
        font-size : rem(32);
    }
}
</style>