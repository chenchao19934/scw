<template>
    <div style="padding-top:42px;padding-bottom:50px;">
        <TopNav titles="确认订单" 
                :isConfirm="true" 
                @backs="isBack"></TopNav>

        <Address :user="address.name" 
                 :phone="address.phone_number" 
                 :address="address.detail_address"
                 @selectAddress="addressSelect"></Address>

        <div style="position:relative">
            <mt-cell title="送达时间：" :value="orderTime" is-link>
                <img slot="icon" src="../../assets/image/icon/time.png" width="20" height="20" style="margin-right:5px">
            </mt-cell>
            <div id="multiPickerInput" style="position:absolute;left:0;right:0;bottom:0;top:0"></div>
        </div>
        <mt-cell title="留言：" 
                value="请输入您的留言" 
                is-link
                @click.native="showMessage">
            <img slot="icon" src="../../assets/image/icon/message.png" width="20" height="20" style="margin-right:5px">
        </mt-cell>
        <div class="wx-msgBox" v-show="msgShow">
            <textarea  rows="4" placeholder="请输入留言" v-model="orderMsg"></textarea>
            <span class="wx-msgBox__cancel" @click="cleanMsg">清空</span>
            <span class="wx-msgBox__confirm" @click="confirmMsg">确定</span>
        </div>


        <mt-cell title="送达方式：" 
                 :value="dl_type_message" 
                 @click.native="showStyle"
                 is-link>
            <img slot="icon" src="../../assets/image/icon/heart.png" width="20" height="20" style="margin-right:5px">
        </mt-cell>
        <div class="wx-styleBox" v-show="styleShow">
            <mt-radio
                align="right"
                class="styleRadio"
                v-model="dl_type"
                :options="options">
            </mt-radio>
        </div>
        <mt-cell  is-link
                  title="红包"
                  v-if="hongbao !== '0张可用'"
                  @click.native="$router.push({name : 'carkCouponList', params : {coupId : content.coup_id, newprice : totalMoney, dPrice : category},query : {addrId : content.addr_id} })">
            <span style="color: #fff; padding: 6px; background: #ff0000; border-radius: 5px;">{{hongbao}}</span>
            <img slot="icon" src="../../assets/image/icon/my-cark.png" width="28" height="28" style="margin-right:5px">
        </mt-cell>

        <ScrollItem :orderArr="couponList"
                    titles="可用优惠券商品"
                    :couponType="true"></ScrollItem>
        <ScrollItem :orderArr="uncouponList"
                    titles="不可用优惠券商品"
                    :couponType="false"></ScrollItem>

        <PayList :total="order.total_price"
                 :actual="order.price"
                 :list="order.coupon"></PayList>
        
        <div style="background-color:#fff;margin-top:10px">
            <p class="listTit">可用优惠券共{{couponList.length}}种商品</p>
            <GoodItem v-for="(x,index) in couponList" 
                        :goodItemList="x"
                        :key="index"></GoodItem>
        </div>

        <div style="background-color:#fff;margin-top:10px">
            <p class="listTit">不可用优惠券共{{uncouponList.length}}种商品</p>
            <GoodItem v-for="(x,index) in uncouponList" 
                        :goodItemList="x"
                        :key="index"></GoodItem>
        </div>

        <div class="wx-priceBar">
            <p>实付款：{{order.price}}</p>
            <span @click="upOrder">确认订单</span>
        </div>
        <div id="targetContainer"></div>
    </div>
</template>

<script>
    import TopNav from '@/pages/compon/top_nav';
    import Address from '@/pages/compon/address_item';
    import AtCell from '@/pages/compon/at_cell';
    import ScrollItem from './scroll_item';
    import PayList from '../order_details/pay_details';
    import GoodItem from '../order_details/goods_item';
    
    import { shopCarkOrder,getTime,upOrderMessage } from "@/api/newService";
    import { mapState } from 'vuex';

    import MultiPicker from 'mob-multi-picker';
    
    export default {
        components : {
            TopNav,
            Address,
            AtCell,
            ScrollItem,
            PayList,
            GoodItem
        },
        data() {
            return {
                msgShow : true,                        //  留言
                styleShow : false,                      //  配送方式
                dl_type_message : '不要吵，放门口就好',   //  配送方式名称
                dl_type : '',                           //  配送方式索引
                couponList : [],                        //  可用优惠券商品列表
                uncouponList : [],                      //  不可用优惠券商品列表
                address: {},
                order : {},
                time : '',                              //  服务器时间
                // dataJson : '',                          //  时间json
                isReduce : 'wx',
                options : [
                    {
                        label: '不要吵，放门口就好',
                        value: '1'
                    },
                    {
                        label: '到点两小时可敲门',
                        value: '2'
                    },
                    {
                        label: '放到送菜蛙专用箱',
                        value: '3'
                    },
                ],
                //  提交信息
                content : {
                    user_id : localStorage.userId,
                    coup_id : '',
                    addr_id : '',
                    words : '',
                    datetime : '',
                    dl_type: '',
                    prefix: 'W'
                },
                // 选择红包
                hongbao : '0张可用',
                totalMoney : '',
                category : '',
            }
        },
        watch : {
            dl_type(n,o) {
                if (n == 3) {
                    this.$toast("您所在的区域尚未开通专用箱！");
                    setTimeout(() => {
                        this.styleShow = false;
                        this.dl_type = '1';
                    }, 1000);
                }else {
                    this.options.forEach(element => {
                        if (element.value == n) {
                            this.dl_type_message = element.label;
                            setTimeout(() => {
                                this.styleShow = false;
                            }, 500);
                        }
                    });
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.name === 'cark') {
                this.$messagebox.confirm('订单提交中，确定要退出吗？').then(action => {
                    this.$store.state.orderTime = '请选择送达时间';
                    this.$store.state.orderMsg = '';
                    next(true);
                }).catch(()=>{
                    next(false);
                })
            }else {
                next();
            }
        },
        created() {
            this.content.coup_id = this.$route.query.coupId;
            this.content.addr_id = this.$route.query.addrId;
            if (this.$device === 'miniprogram') {
                this.content.prefix = 'M';
            }else if (this.$device === 'Android') {
                this.content.prefix = 'A';
                this.isReduce = 'app';
            }else if (this.$device === 'IOS') {
                this.content.prefix = 'I';
                this.isReduce = 'app';
            }
            console.log(this.content);
            this.initPage();
            this.$nextTick(()=> {
                this.getNowTime();
            })
        },
        computed : {
            ...mapState([
                'orderTime'
            ]),
            orderMsg : {
                get() {
                    return this.$store.state.orderMsg;
                },
                set(val) {
                    this.$store.commit('setMsg',val);
                }
            }
        },
        methods: {
            async initPage() {
                this.$indicator.open('加载中...');
                const data = await shopCarkOrder({
                    addr_id : this.content.addr_id,
                    coup_id : this.content.coup_id,
                    user_id : localStorage.userId
                })
                this.$indicator.close();
                this.address = {
                    name : data.addr.name,
                    phone_number : data.addr.phone_number,
                    detail_address : data.addr.detail_address,
                }
                this.order = {
                    total_price : data.total_money+"",
                    price :data.money+"",
                    coupon : [...data.totals_list,...data.totals.list]
                },
                this.dl_type = data.addr.dl_type === 0 ? '1' : data.addr.dl_type;
                this.hongbao = data.coup.money;
                this.category = JSON.stringify(data.category);
                this.totalMoney = data.total_money;
                this.couponList = data.goods_list;
                this.uncouponList = data.new_list;
            },
            async getNowTime() {
                this.time = await getTime({});
                let that = this,
                    data = '[';
                for(let i = 1;i < 8; i++){
                    data += ["{\"id\": \""+this.getNowDate(i,0)+"\",\"value\": \""+this.getNowDate(i,1)+"\",\"child\": [{\"id\": \"0\",\"value\": \"10:00\",\"child\": [{\"id\": \"0\",\"value\": \"推荐\"}]},{\"id\": \"0\",\"value\": \"8:00\"},{\"id\": \"0\",\"value\": \"8:30\"},{\"id\": \"0\",\"value\": \"9:00\"},{\"id\": \"0\",\"value\": \"9:30\"},{\"id\": \"0\",\"value\": \"10:00\"},{\"id\": \"0\",\"value\": \"10:30\"},{\"id\": \"0\",\"value\": \"11:00\"},{\"id\": \"0\",\"value\": \"11:30\"}]}"];
                    if( i < 7 ) data += ",";
                }
                data += ']';
                new MultiPicker({
                    input: 'multiPickerInput',//点击触发插件的input框的id
                    container: 'targetContainer',//插件插入的容器id
                    jsonData: JSON.parse(data),
                    success: function (arr) {
                        var dateValue = JSON.stringify(arr[0].id+" "+arr[1].value);
                        dateValue = JSON.parse(dateValue)+":00";
                        that.$store.state.orderTime = dateValue
                        if (that.time.hour >= 22 || (that.time.hour >= 21 && new Date(that.time.time).getMinutes() >= 30)) {
                            that.$toast('当天超过21:30后下单均为后天配送！');
                        }
                    }
                });  
            },
            getNowDate(n,show) {
                let d = new Date(this.time.time),
                    year = d.getFullYear(),
                    mon = d.getMonth() + 1,
                    day = d.getDate(),
                    minutes = d.getMinutes(),
                    dataHour = d.getHours(),
                    str;
                if (day <= n) {
                    if (mon > 1) 
                        mon = mon - 1;
                    else
                        year = year - 1;
                        mon = 12;
                }
                if (dataHour >= 22 || (dataHour >= 21 && minutes >= 30)) n++;
                d.setDate(d.getDate() + n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate();
                if (show == 1) {
                    if (n == 1) 
                        str = "明天";
                    else if (n == 2) 
                        str = "后天";
                    else 
                        str = (mon < 10 ? ('0' + mon) : mon) + "月" + (day < 10 ? ('0' + day) : day)+"日";
                }else {
                    str = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
                }
                return str;
            },
            // 提交订单
            async upOrder() {
                if (this.address.name === undefined || this.address.phone_number === undefined)
                    this.$toast('请添加您的收货地址！');
                else if(this.orderTime === '请选择送达时间') {
                    this.$toast('请选择配送时间！');
                    setTimeout(()=> {
                        document.querySelectorAll(".multi-picker-bg")[0].className += " multi-picker-bg-up";
                        document.querySelectorAll(".multi-picker-container")[0].className += " multi-picker-container-up";
                    },500)
                }else {
                    this.$indicator.open("加载中...");
                    this.content.datetime = this.orderTime;
                    this.content.dl_type = this.dl_type;
                    this.content.words = this.$store.state.orderMsg;
                    await upOrderMessage({
                        type : this.isReduce,
                        data : this.content
                    }).then(res=> {
                        if (res.code === 44) {
                            this.$toast(res.message);
                        }else {
                            // 成功生成订单，跳到支付页面
                            this.$store.state.orderTime = '请选择送达时间';
                            this.$store.state.orderMsg = '';
                            this.$router.push({name : 'my'});
                        }
                    })
                    this.$indicator.close();
                }

            },
            // 地址选择
            addressSelect() {
                this.$router.push({name : 'carkAddress',query: {coupId : this.content.coup_id}});
            },
            // 返回购物车
            isBack() {
                this.$router.push({name : 'cark',query: {coupId : this.content.coup_id}});
            },
            // 留言
            showMessage() {
                this.msgShow = !this.msgShow;
            },
            cleanMsg() {
                this.$store.commit('setMsg','');
            },
            confirmMsg() {
                this.msgShow = false;
            },
            // 送达方式
            showStyle() {
                this.styleShow = !this.styleShow;
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(msgBox) {
    position: relative;
    padding: 0 rem(20) rem(66);
    textarea {
        width: 100%;
        border: none;
        padding: 0 rem(30);
        font-size: rem(28);
    }
    span {
        position: absolute;
        right: 0;
        bottom: rem(8);
        padding: rem(4) rem(20);
        border-radius: rem(16);
        border-width: rem(2);
        border-style: solid;
        font-size: rem(32);
        z-index: 1;
    }
    @include e(cancel) {
        border-color: #717171;
        color: #717171;
        right: 30% !important;
    }
    @include e(confirm) {
        border-color: #abd13e;
        color: #abd13e;
        right: 10% !important;
    }
}
@include b(priceBar) {
    position: fixed;
    align-items: center;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    background: #fff;
    color: #ff8e00;
    border-top: rem(2) solid #ff8e00;
    z-index: 10;
    p {
        flex-basis: rem(510);
        text-align: right;
        padding-right: rem(20);
        font-size: 16px;
    }
    span {
        flex-basis: rem(240);
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background-color:#abd13e; 
        font-size: 16px;
    }
}
.listTit {
    padding : rem(6) rem(16);
    font-size: rem(32);
    border-bottom : 1px solid #ccc;
}
</style>