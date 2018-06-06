<template>
    <div class="wx-couobj clearfix" @click="select(obj.coupon_type,obj.id,obj.isChoose,obj.lnvalidtwo)">
        <em v-if="obj.isChoose"></em>
        <div class="wx-couobj__img" :class="{'dt-red':obj.coupon_type === 20,'dt-yellow':obj.coupon_type === 10,'dt-green':obj.coupon_type === 30,'coupon-user':obj.lnvalidtwo}">
            <p><span>￥</span>{{obj.cut_money}}</p>
            <span class="ellipsis">满{{obj.full_money}}使用</span>
        </div>
        <div class="wx-couobj__txt">
            <h3>{{obj.name}}</h3>
            <p>{{obj.description}}</p>
            <p>有效期至：{{obj.create_time}}</p>
        </div>
        <span 
            v-if="obj.lnvalid && obj.group_id == null"
            :class="{'lost-lnvalid':obj.lnvalid && obj.group_id == null}"></span>
        <span v-else classs="lost-lnvalids"></span>
    </div>
</template>

<script>
    export default {
        props : {
            obj : {
                type : Object
            }
        },
        methods: {
            select(type,id,choose,isFull) {
                this.$emit('getCoupn',type,id,choose,isFull);
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(couobj) {
    position: relative;
    box-shadow: 0 0 1px #717171;
    border-radius: 5px;
    background: #fff;
    padding: rem(20);
    margin-top : rem(20);
    @include e(img) {
        float : left;
        width : rem(150);
        height :rem(150);
        margin-right: rem(20);
        color : #fff;
        text-align : center;
        font-weight: bold;
        p {
            line-height : rem(96);
            font-size : rem(32);
            span {
                font-size : rem(28);
            }
        }
        >span {
            display : block;
            font-size : rem(24);
        }
    }
    @include e(txt) {
        float : left;
        height :rem(150);
        h3 {
            font-size: rem(40);
        }
        p:nth-child(2) {
            color: #a7a0a0;
            font-size: rem(20);
            margin-bottom : rem(30);
        }
        p:nth-child(3) {
            color: #444;
            font-size: rem(24);
        }
    }
    > em {
        position: absolute;
        right: 0;
        top: 0;
        width: rem(62);
        height: rem(56);
        background: url('../../assets/image/icon/coupou_check.png')center no-repeat;
        background-size : 100%;
    }
    >span {
        position: absolute;
        width:rem(100);
        height:rem(100);
        top : rem(10);
        right : rem(10);
        border-radius : 50%;
    }
    >span.lost-lnvalid {
        background : url('../../assets/image/me_coupou_shixiao.png') no-repeat;
        background-size : 100% 100%;
    }
    >span.lost-lnvalids {
        background : url('../../assets/image/me_coupou_user.png') no-repeat;
        background-size : 100% 100%;
    }
}
.dt-red {
	background: #F26464;
}
.dt-green {
	background: #abd13e;
}
.dt-yellow {
	background: #59bdcc;
}
.coupon-user {
	background: #978D8D;
}
</style>