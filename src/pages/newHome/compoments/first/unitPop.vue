<template>
    <mt-popup v-model="popupVisible" position="bottom">
        <div class="more-unit" v-if="popupVisible">
            <dl>
                <dt>
                    <img :src="moreUnit.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'">
                </dt>
                <dd>
                    <h3>{{moreUnit.name}}</h3>
                    <p>规格：{{moreUnit.goods_unit}}</p>
                    <p class="red">{{moreUnit.price}}</p>
                </dd>
            </dl>
            <div class="unit-choose">
                <p>规格：</p>
                <div class="clearfix">
                    <span v-for="(x,index) in data" :key="index">{{x.goods_unit}}</span>
                </div>
            </div>
            <div class="closePop" @click="close">X</div>
            <Cark :goodItemList="moreUnit"></Cark>
        </div>
    </mt-popup>
</template>

<script>
    import Cark from '@/pages/compon/cark';
    export default {
        props : ['moreUnit','data','popupVisible'],
        components : {
            Cark
        },
        methods : {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-popup-bottom {
    width: 100%;
}
.more-unit {
    position: relative;
    width: 100%;
    height: rem(640);
    padding: rem(75) rem(60);
    background-color: #fff;
    div.closePop {
        position: absolute;
        top: rem(30);
        right: rem(30);
        width: rem(60);
        height: rem(60);
        text-align: center;
        line-height: rem(60);
        border: 1px solid #717171;
        border-radius: 50%;
        color: #717171;
        font-size: rem(36);
    }
    dl {
        height: rem(220);
        margin-bottom: rem(5);
    }
    dt,dd {
        display: inline-block;
        height: rem(220);
        overflow: hidden;
    }
    dt {
        width: rem(220);
        border: 1px solid #ccc;
        img {
            display: block;
            width: 100%;
        }
    }
    dd {
        width: rem(340);
        margin-left: rem(40);
        padding-top: rem(40);
        h3 {
            font-size: rem(32);
            font-weight: bold;
            margin-bottom: rem(20);
        }
        p {
            font-size: rem(28);
            margin-bottom: rem(20);
        }
        p.red {
            color: #e54545;
        }
    }
}
.unit-choose {
    height: rem(230);
    margin-top: rem(20);
    overflow-x: hidden;
    overflow-y: scroll;
    p {
        font-size: rem(32);
        font-weight: bold;
        padding: rem(10) 0;
    }
    > div span {
        float: left;
        background: rgb(201, 242, 204);
        border: 1px solid #7ecc83;
        padding: rem(0) rem(30);
        margin-right: rem(16);
        margin-bottom: rem(16);
        line-height: rem(48);
        font-size: rem(32);
    }
}
</style>