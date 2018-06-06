<template>
    <div class="wx-fruitCon" v-if="fruilts.length !== 0">
        <imgScroll :bannerList="fruilts[0].lists"></imgScroll>
        <iCon :txt="fruilts[1].name">
            <iConItemMore @getPop="showPop" 
                            v-for="x in fruilts[1].lists" 
                            :key="x.id" 
                            :porkItemList="x"></iConItemMore>
        </iCon>
        <iCon :txt="fruilts[2].name">
            <iConLeft v-for="(x,index) in fruilts[2].lists" 
                        :key="x.id"
                        :goodItemList="x"
                        @getPop="showPop"
                        v-if="index === 0"></iConLeft>
            <iConItemMore @getPop="showPop" 
                            v-for="(x,index) in fruilts[2].lists" 
                            :key="x.id" 
                            :porkItemList="x"
                            v-if="index !== 0"></iConItemMore>
        </iCon>


        <iCon :imgSrc="fruilts[4].lists[0].value">
            <iConLeft v-for="(x,index) in fruilts[3].lists" 
                        :key="x.id"
                        :goodItemList="x"
                        @getPop="showPop"></iConLeft>
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
    import iCon from '../first/dangeCon';
    import iConItemMore from '../first/moreUnitItem';

    import iConLeft from '../type_left_item';
    import iConRigth from '../type_right_item';

    import imgScroll from '../top_imgScroll';

    import Pop from '@/mixins/pop'
    export default {
        props :{
            fruilts : Array
        },
        components : {
            iCon,
            iConItemMore,
            imgScroll,
            iConLeft,
            iConRigth
        },
        mixins : [Pop],
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>