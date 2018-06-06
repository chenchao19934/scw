<template>
    <div class="wx-goodsCon">
        <iCon title="今日热卖">
            <iConItem @getPop="showPop" v-for="x in goodsList" :key="x.id" :goodItemList="x"></iConItem>
        </iCon>

        <iCon imgSrc="https://scwnew.oss-cn-shenzhen.aliyuncs.com/20171207153451%E7%8C%AA%E8%82%89750x240.png">
            <iConItemMore @getPop="showPop" v-for="x in goodsPork" :key="x.id" :porkItemList="x"></iConItemMore>
        </iCon>

        <iCon imgSrc="https://scwnew.oss-cn-shenzhen.aliyuncs.com/20170505111040shuiguozhuanchang.png">
            <iConItemMore @getPop="showPop" v-for="x in goodsFruit" :key="x.id" :porkItemList="x"></iConItemMore>
        </iCon>

        <iCon title="猜你喜欢">
            <iConItemDouble @getPop="showPop" v-for="x in goodsLike" :key="x.id" :goodsLikeItem="x"></iConItemDouble>
        </iCon>

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
    import iCon from './dangeCon';
    import iConItem from './dangeItem';
    import iConItemMore from './moreUnitItem';
    import iConItemDouble from './doubleItem';

    
    import Pop from '@/mixins/pop'
    export default {
        components : {
            iCon,
            iConItem,
            iConItemMore,
            iConItemDouble
        },
        props : {
            goodsList : {
                type : Array
            },
            goodsPork : {
                type : Array
            },
            goodsFruit : {
                type : Array
            },
            goodsLike : {
                type : Array
            }
        },
        mixins : [Pop],
        // data() {
        //     return {
        //         popupVisible : false,   // 弹窗开关
        //         data : null,    // 总数据
        //         moreUnit : null,    // 多规格列表数组
        //         indexUnit : 0   // 选中的规格索引
        //     }
        // },
        // methods : {
        //     showPop(data) {
        //         this.popupVisible = !this.popupVisible;
        //         data.forEach(element => {
        //             element.oss = 0;
        //             element.is_multi_type = 0;
        //         });
        //         this.data = data;
        //         this.moreUnit = data[0];
        //         this.indexUnit = 0;
        //     },
        //     changeIndex(index) {
        //         this.indexUnit = index;
        //         this.moreUnit = this.data[index];
        //     },
        //     closePop() {
        //         this.popupVisible = false;
        //     }
        // }
    }
</script>

<style lang="scss">
@include b(goodsCon) {
    background-color: #fff;
}
</style>