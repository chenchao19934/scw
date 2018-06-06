<template>
    <div style="padding-top:40px;background-color:#fafafa">
        <TopHead></TopHead>
        <div class="wx-search">
            <input type="text" disabled v-model="dishName">
        </div>
        <iCon v-if="dishList.length">
            <iConItem v-for="x in dishList" 
                        :key="x.id" 
                        :endX="ballEnd" 
                        @getPop="showPop"
                        :goodItemList="x"></iConItem>
            <h2 style="width:100%;text-align:center;line-height:40px;font-size:14px">没有更多了~</h2>
        </iCon>
        <div v-else style="margin-top: 45%">
            <NoneData title="小店还未上架该商品~"></NoneData>
        </div>
        <!-- 左下角购物车 -->
        <CarkNumber></CarkNumber>

        <mt-popup v-model="popupVisible" position="bottom">
            <div class="more-unit" v-if="popupVisible">
                <dl>
                    <dt>
                        <img :src="moreUnit.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
                    </dt>
                    <dd>
                        <h3>{{moreUnit.goods_name}}</h3>
                        <p>规格：{{moreUnit.goods_unit}}</p>
                        <p class="red">{{moreUnit.price}}</p>
                    </dd>
                </dl>
                <div class="unit-choose">
                    <p>规格：</p>
                    <div class="clearfix">
                        <span v-for="(x,index) in data" 
                                @click="changeIndex(index)"
                                :class="{'is-choose' : indexUnit === index}"
                                :key="index">{{x.goods_unit}}</span>
                    </div>
                </div>
                <div class="closePop" @click="closePop">X</div>
                <Cark :goodItemList="moreUnit"></Cark>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import TopHead from '../compon/top_nav';
    import CarkNumber from '../dishList/cark_number';
    import {dishSearch} from '@/api/newService';
    import iCon from '@/pages/newHome/compoments/first/dangeCon';
    import iConItem from '@/pages/newHome/compoments/first/dangeItem';
    import NoneData from '../compon/none';

    import Pop from '@/mixins/pop';
    
    export default {
        components : {
            TopHead,
            iCon,
            iConItem,
            NoneData,
            CarkNumber
        },
        mixins : [Pop],
        data() {
            return {
                dishName : '',
                dishList : [],
                ballEnd : window.innerWidth / 20 + 'px',  //小球下落位置
            }
        },
        created() {
            this.dishName = this.$route.params.searchName;
            this.search();
        },
        methods:{
            async search() {
                this.dishList = await dishSearch({
                    wd : this.dishName,
                    lat : localStorage.lat,
                    lng : localStorage.lon,
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(search) {
    position: fixed;
    top: 0;
    left: rem(150);
    width: rem(500);
    height: 40px;
    padding: 0 rem(20);
    z-index: 10002;
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 5px;
        width: rem(32);
        height: rem(32);
        vertical-align: sub;
        background-image: url("../../assets/image/list1.png");
        background-size: cover;
        transform: translateY(-50%);
    }
    input {
        min-height: 40px;
        border: none;
        outline: none;
        width: 100%;
        font-size: 16px;
        padding-left: 15px;
        line-height: 40px;
    }
}
@include b(shop) {
    position: fixed;
    bottom: rem(30);
    left: rem(30);
    width: rem(112);
    height: rem(112);
    background: url('../../assets/image/tab/shop_cark_2.png');
    background-size: cover;
    z-index: 10;
    span {
        position: absolute;
        right: rem(-10);
        top: rem(10);
        width: rem(46);
        height: rem(46);
        border-radius: 50%;
        text-align: center;
        line-height: rem(46);
        background: #ff8e00;
        color: #fff;
    }

}
</style>