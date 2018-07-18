<template>
    <div class="wx-cark">
        <TopNav :title="titles">
            <span slot="right" @click="isRemove">{{editTxt}}</span>
        </TopNav>

        <mt-cell is-link 
                 v-for="x in exchangeList" 
                 :key="x.id"
                 v-if="goodsList.length !== 0 || giftList.length !== 0"
                 @click.native="$router.push({name : 'CarkChange', params : {money : totalMoney}})">
            <span>{{x.title}}</span>
            <img slot="icon" src="../../../assets/image/icon/my-change.png" width="24" height="24">
        </mt-cell>

        <div class="wx-cark__wrap">
            <CellSwiper v-for="(x,index) in goodsList" 
                            :cancelId="x.goods_id"
                            @delete="edit"
                            :key="index">
                <CellItem :goods="x"
                            @addCark="add"
                            @reduceCark="reduce"
                            @select="selectOne"></CellItem>
            </CellSwiper>
            <GifyItem
                v-for="x in giftList" 
                :key="x.gift_id"
                :goods="x"></GifyItem>
        </div>
        <div v-if="hongbao !== '0个红包可用' && goodsList.length > 0 && $store.state.isLogin">
            <mt-cell  title="商品总价">
                <span>其中￥{{notcoupon | toFixed}}不可使用红包</span>
            </mt-cell>

            <mt-cell  is-link
                      title="红包"
                      @click.native="$router.push({name : 'carkCouponList', params : {coupId : coupId, newprice : totalMoney, dPrice : category}})">
                <span style="color: #fff; padding: 6px; background: #ff0000; border-radius: 5px;">{{hongbao}}</span>
                <img slot="icon" src="../../../assets/image/icon/my-cark.png" width="28" height="28" style="margin-right:5px">
            </mt-cell>
        </div>

        <div style="padding-top: 45%;" v-if="goodsList.length === 0 && giftList.length === 0">
            <NoneData title="购物车还没有食材哦~"></NoneData>
        </div>
        <PriceBar :total="totalMoney-deleteNumber"
                  :allCheck="isAllCheck"
                  v-if="goodsList.length !== 0 || giftList.length !== 0"
                  :removeAll="showEdit"
                  @changeChoose="selectAll"
                  @isCollection="collection"
                  @isDelete="deleteAllGoods"
                  @isConfirm="checkShopCark"></PriceBar>
        <fixedBar></fixedBar>
    </div>
</template>

<script>
    import {mapMutations,mapGetters,mapState } from 'vuex';
    import fixedBar from '../index';
    import TopNav from './cark_top';
    import PriceBar from './cark_price';
    import NoneData from '@/page/compon/none';

    import CellSwiper from '../../compon/cell_swiper';
    import CellItem from './cark_item';
    import GifyItem from './gift_item';
    import {shopCark,selectAll,selectOne,addGoodsCount,addMoreUnitGoods,reduceGoods,removeGoods,collection,changeGoods,confirmOrder} from '@/api/newService';
    
    import { getStyle } from '../../../utils/mUtils';

    export default {
        components : {
            fixedBar,
            TopNav,
            NoneData,
            PriceBar,
            CellSwiper,
            CellItem,
            GifyItem
        },
        data() {
            return {
                number : 10,            //  购物车商品总数
                goodsList : [],         //  商品列表
                giftList : [],          //  礼品列表
                isAllCheck : true,      //  是否全部选中
                showEdit : true,        //  显示全部删除或收藏
                editTxt : '编辑',   
                isCheck : false,        //  标记够有选中一个商品
                exchangeList : [],      //  换购商品列表
                notcoupon : 0.00,       //  红包不可用金额
                hongbao : '',
                category : '',           //  商品分类价格列表
                coupId : 'none',         //  是否带有红包
                deleteNumber : 0,        //  红包折扣金额
                selectGoodsNumber : 0,   //  选中商品数量
                isFlag : false,          //  是否存在过期食材
            }
        },
        created() {
            this.coupId = this.$route.query.coupId || 'none';
            this.initCark();
            this.exchange();
        },
        computed : {
            titles() {
                return `购物车(${this.shopCarkLenth})`
            },
            totalMoney() {
                let count = 0,
                    checkCount = 0;
                this.goodsList.forEach(element => {
                    if (element.check === true) {
                        count += element.number * element.price;
                        checkCount++;
                    }
                    if (checkCount === this.goodsList.length) {
                        this.isAllCheck = true;
                    }else {
                        this.isAllCheck = false;
                    }
                })
                return count.toFixed(2)*1;
            },
            ...mapState([
                'shopCarkLenth'
            ])
        },
        methods: {
            /**
             * [初始化购物车]
             */
            async initCark() {
                let count = 0;
                if (this.$store.state.isLogin) {
                    this.$indicator.open('加载中...');
                    let data = await shopCark({
                        coupon_id : this.coupId,
                        user_id : localStorage.userId
                    })
                    this.goodsList = data.list;
                    this.giftList = data.gift;
                    this.isAllCheck = data.all;
                    this.notcoupon = data.notcoupon;
                    if (data.hongbao.indexOf('还差') >= 0 || data.hongbao.indexOf('红包可用') >= 0) {
                        this.hongbao = data.hongbao;
                    }else {
                        this.hongbao = '- ' + (Number(data.hongbao)).toFixed(2);
                        this.deleteNumber =   Number(data.hongbao);
                    }

                    this.category = JSON.stringify(data.category);
                    this.$indicator.close();
                }else {
                    this.getLocalGoods();
                }
                this.goodsList.forEach(element => {
                    count += element.number;
                })
                this.$store.state.shopCarkLenth = count;
            },
            /**
             * [获取本地购物车]
             */
            getLocalGoods() {
                if (localStorage.ShoppingCart) {
                    this.goodsList = JSON.parse(localStorage.ShoppingCart);
                }
            },
            /**
             * [重新保存]
             * @param  {object} obj [购物车商品]
             */
            saveLocal(obj) {
                let count = 0;
                localStorage.ShoppingCart = JSON.stringify(obj);
                obj.forEach(element => {
                    count += element.number;
                })
                this.$store.state.shopCarkLenth = count;
            },
            /**
             * [数组索引]
             * @param  {number} id [索引id]
             * @return {number} [在数组中的位置]
             */
            findId(id) {
                let index = this.goodsList.findIndex(v=> {
                    return v.goods_id === id
                })
                return index;
            },
            /**
             * [增加商品数量]
             * @param  {string} goods_id [商品ID]
             * @param  {number} multitype_id [是否多规格]
             */
            async add(goods_id,multitype_id) {
                if (this.$store.state.isLogin) {
                    if (multitype_id === 0) {
                        await addGoodsCount({
                            goods_id :goods_id,
                            user_id : localStorage.userId
                        }).then(res=> {
                            this.initCark();
                        })
                    } else {
                        await addMoreUnitGoods({
                            goods_id : goods_id,
                            multitype_id : multitype_id,
                            user_id : localStorage.userId
                        }).then(res=> {
                            this.initCark();
                        })
                    }
                }else {
                    let index = this.findId(goods_id);
                    if (index != -1) {
                        this.goodsList[index].number ++;
                        this.saveLocal(this.goodsList);
                    }
                }
            },
            /**
             * [减少商品数量]
             * @param  {number} goods_id [商品ID]
             * @param  {number} multitype_id [是否多规格]
             */
            async reduce(goods_id,multitype_id) {
                if (this.$store.state.isLogin) {
                    await reduceGoods({
                        goods_id:goods_id,
                        user_id : localStorage.userId
                    }).then(res=> {
                       this.initCark();
                    })
                }else {
                    let index = this.findId(goods_id);
                    if (index != -1) {
                        if (this.goodsList[index].number === 1) {
                            this.$messagebox.confirm('确定要移除该商品吗？').then(action => {
                                this.goodsList.splice(index,1);
                                this.saveLocal(this.goodsList);
                            }).catch(()=> {})
                        } else {
                            this.goodsList[index].number--;
                            this.saveLocal(this.goodsList);
                        }
                    }
                }
            },
            /**
             * [选中部分或全部商品]
             * @param {boolean} boolean [商品选中状态]
             */
            async selectAll(boolean) {
                if (this.$store.state.isLogin) {
                    await selectAll({
                        check : !boolean,
                        user_id : localStorage.userId
                    }).then(res=> {
                       this.initCark();
                    })
                }else {
                    this.goodsList.forEach(element => {
                        element.check = !boolean;
                    });
                    this.saveLocal(this.goodsList);
                }
            },
            /**
             * [选择单一商品]
             * @param  {boolean} boolean [商品选中状态]
             * @param  {number} goods_id [商品ID]
             * @param  {number} multitype_id [是否多规格 0不是多规格]
             */
            async selectOne(boolean,goods_id,multitype_id) {
                if (this.$store.state.isLogin) {
                    await selectOne({
                        goods_id : goods_id,
                        check : !boolean,
                        multitype_id : multitype_id,
                        user_id : localStorage.userId
                    }).then(res=> {
                       this.initCark();
                    })
                }else {
                    let index = this.findId(goods_id);
                    if (index != -1) {
                        this.goodsList[index].check = !this.goodsList[index].check;
                        this.saveLocal(this.goodsList);
                    }
                }
            },
            // 滑动删除
            edit(goods_id,multitype_id=0) {
                let list = [],
                    obj = {
                        'id' : goods_id,
                        'multitype_id' : multitype_id
                    };
                list.push(obj);
                this.$messagebox.confirm("确定要移除该商品？").then(async action => {
                    if (this.$store.state.isLogin) {
                        await removeGoods({
                            list : list,
                            user_id : localStorage.userId
                        }).then(res=> {
                            this.initCark();
                        })
                    } else {
                        let index = this.findId(goods_id);
                        if (index != -1) {
                            this.goodsList.splice(index,1);
                            this.saveLocal(this.goodsList);
                        }
                    }
                }).catch(()=> {})
            },
            // 编辑按钮
            isRemove () {
                this.showEdit = !this.showEdit;
                this.editTxt = this.showEdit ? '编辑' : '完成';
            },
            // 删除选中商品
            deleteAllGoods() {
                let list = [],
                    listIndex = [],
                    obj;
                this.isCheck = false;
                this.goodsList.forEach((element,index) => {
                    if (element.check === true) {
                        obj = {
                            'id' : element.goods_id,
                            'multitype_id' : element.multitype_id,
                        }
                        list.push(obj);
                        listIndex.push(index);
                        this.isCheck = true;
                    }
                });
                if (this.isCheck) {
                    this.$messagebox.confirm('是否删除选中商品？').then(async action => {
                        if (this.$store.state.isLogin) {
                            await removeGoods({
                                list : list,
                                user_id : localStorage.userId
                            }).then(res=> {
                                this.initCark();
                            })
                        } else {
                            for (let index = listIndex.length-1; index >= 0; index--) {
                                this.goodsList.splice(listIndex[index],1);
                            }
                            this.saveLocal(this.goodsList);
                        }
                    }).catch(() => {})
                } else {
                    this.$toast('您还没有选中心爱的商品~');
                }
            },
            // 收藏选中商品
            async collection() {
                let eid = [];
                this.isCheck = false;
                this.goodsList.forEach(element => {
                    if (element.check === true) {
                        eid.push(element.goods_id);
                        this.isCheck = true;
                    }
                });
                if (this.isCheck) {
                    if (this.$store.state.isLogin) {
                        await collection({
                            eid : eid,
                            user_id : localStorage.userId
                        }).then(res=>{
                            this.$toast('收藏成功，请到收藏列表中查看~');
                        })
                    } else {
                        this.$router.push({name : 'Login'})
                    }
                } else {
                    this.$toast('您还没有选中心爱的商品~');
                }
            },
            // 换购商品
            async exchange() {
                if (this.$store.state.isLogin) {
                    this.exchangeList = await changeGoods({});
                }else {
                    this.exchangeList = [];
                }
            },
            // 验证购物车
            checkShopCark() {
                if (this.$store.state.isBindPhone) {
                    this.goodsList.forEach(element => {
                        if (element.check === false) this.selectGoodsNumber ++;
                        if (element.delete_flag === true) this.isFlag = true;
                    });
                    console.log(this.selectGoodsNumber);
                    if (this.selectGoodsNumber === this.goodsList.length) {
                        if (this.selectGoodsNumber === 0) {
                            this.$toast('礼品满额随单赠送,不可单独下单！');
                        }else {
                            this.$toast('请勾选您心仪的商品再提交订单！');
                        }
                        this.selectGoodsNumber = 0;
                    }else if (this.isFlag) {
                        this.$messagebox.confirm('存在过期食材，将帮您自动清除！').then(action => {
                            this.confirmOrder();
                        }).catch(()=> {
                            this.isFlag = false;
                        })
                    }else {
                        this.confirmOrder();
                    }
                }else {
                    // 未绑定手机号
                    console.warn("未绑定手机号");
                }
            },
            // 提交订单
            async confirmOrder() {
                if (this.$store.state.isLogin) {
                    await confirmOrder({
                        user_id : localStorage.userId,
                        data : this.goodsList
                    }).then(res => {
                        if (res === 1) {
                            this.$router.push({name : 'carkOrder',query : {'coupId' : this.coupId, addrId : 0}})
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(cark) {
    padding-top : 44px;
    padding-bottom : 106px;
}
</style>