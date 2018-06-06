<template>
    <div class="wx-goods" @click="$router.push({name : 'dishDetail', params :{pid : goods.goods_id}})">
        <div class="wx-goods__choose">
            <input class="check-box" 
                    type="checkbox"
                    :class="{'is-check' : goods.check}" 
                    @click.stop="choose(goods.check,goods.goods_id,goods.multitype_id)">
        </div>
        <div class="wx-goods__img">
            <span v-if="goods.delete_flag"></span>
			<span class="invalid" v-if="goods.oss == 1"></span>
            <img v-lazy="goods.img + '?x-oss-process=image/resize,w_240/format,jpg/quality,Q_80'" alt="">
        </div>
        <div class="wx-goods__tet">
            <h2 class="ellipsis">{{goods.goods_name}}</h2>
            <div class="btn">
                <span v-if="goods.is_coupon == 1">红包不可用</span>
                <span v-if="goods.tag_name">{{goods.tag_name}}</span>
            </div>
            <p>{{goods.goods_unit}}</p>
            <div class="price">
                <span>￥</span><em>{{goods.price}}</em>
            </div>
            <div class="addCount">
                <span class="reduce" @click.stop="reduce(goods.goods_id,goods.markup_id)"></span>
                <input type="number" readonly="readonly" v-model="goods.number">
                <span class="add" @click.stop="add(goods.goods_id,goods.markup_id)"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            goods : {
                type : Object
            }
        },
        data() {
            return {
                isCheck: true
            }
        },
        methods: {
            add(goods_id,markup_id) {
                this.$emit('addCark',goods_id,markup_id);
            },
            reduce(goods_id,markup_id) {
                this.$emit('reduceCark',goods_id,markup_id);
            },
            choose(boolean,goods_id,markup_id) {
                this.$emit('select',boolean,goods_id,markup_id)
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(goods) {
    display : flex;
    height : rem(200);
    background-color : #fff;
    border-color: #E8E8E8;
    border-width: rem(1);
    border-style: solid;
    @include e(choose) {
        width : rem(90);
        line-height: rem(200);
        padding : rem(72) rem(17);
    }
    @include e(img) {
        position: relative;
        width : rem(200);
        background-color : #fff;
        overflow : hidden;
        img {
            display :block;
            width : 100%;
            border : 0;
        }
        span {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: url('../../../assets/image/expiry_goods_img.png');
            background-size: 100% 100%;
        }
        span.invalid {
            background: url('../../../assets/image/expiry_stock.png');
            background-size: 100% 100%;
        }
    }
    @include e(tet) {
        position :relative;
        width : rem(460);
        padding : rem(10) rem(30);
        background-color : #fff;
        overflow : hidden;
        h2 {
            font-size : rem(32);
        }
        p {
            color: #717171;
            font-size : rem(24);
        }
        >div {
            color: #ff8e00;
        }
        >div.btn{
            min-height : rem(50);
            // padding : rem(10) 0;
            display: flex;
            align-items: center;
            span {
                box-shadow: 0 0 1px #ff8e00;
                padding: 0 rem(8);
                margin-right : rem(10);
                font-size : rem(24);
                border-radius: rem(6);
            }
        }
        >div.price {
            padding : rem(5) 0;
            span {
                font-size : rem(24);
            }
            em {
                font-size : rem(32);
            }
        }
        >div.addCount {
            position :absolute;
            display : flex;
            right : rem(10);
            bottom : rem(10);
            width : rem(228);
            height :rem(60);
            z-index : 3;
            span {
                width : rem(60);
                height :rem(60);
            }
            span.add {
                background : url('../../../assets/image/add.png');
                background-size : 100% 100%;
            }
            span.reduce {
                background : url('../../../assets/image/reduce.png');
                background-size : 100% 100%;
            }
            input {
                width : rem(88);
                height :rem(60);
                font-size : rem(24);
                background-color: #f8f8f8;
                cursor: not-allowed;
                text-align: center;
                border-radius: rem(10);
                border: rem(2) solid #ccc;
                margin : 0 rem(10)
            }
        }
    }
}
.check-box {
    position: absolute;
    width: rem(56);
    height: rem(56);
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    &::before {
        display: block;
        width: rem(52);
        height: rem(52);
        border : rem(2) solid #ff8e00;
        border-radius: rem(52);
        background: #fff;
        content: '';
        transition: background-color 0.5s ease-in-out;
    }
    &::after {
        position: absolute;
        top: 33%;
        left: 25%;
        display: table;
        width: rem(28);
        height: rem(12);
        border: 1px solid #fff;
        border-top: 0;
        border-right: 0;
        content: ' ';
        opacity: 0;
        transition: opacity 0.5s  ease-in-out;
        transform: rotate(-45deg);
    }
}
.is-check::before {
    background: #ff8e00;
    border-color: #ff8e00;
}
.is-check::after {
    opacity: 1;
}
</style>