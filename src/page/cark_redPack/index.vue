<template>
    <div style="padding-top:68px;background: #f0f0f0">
        <TopNav titles="选择优惠券"></TopNav>
        <div class="wx-coupn">仅绿色优惠券可以多张使用</div>
        <div class="wx-content">
            <div class="wx-content__unableUser" @click="unUserCoupon">不使用优惠券</div>
            <CouItem v-for="x in listTwo" 
                        :obj="x"
                        :key="x.id"
                        @getCoupn="select"></CouItem>
            <CouItem v-for="x in listOne" 
                        :obj="x"
                        :key="x.id"
                        @getCoupn="select"></CouItem>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/top_nav';
    import CouItem from './coupon_item';

    import { carkCopunList } from "@/api/newService";
    export default {
        components : {
            TopNav,
            CouItem
        },
        data() {
            return {
                coupId : '',        //  优惠券id
                money : '',         //  商品总价
                catelist : '',      //  所有分类商品价钱
                listOne : [],       //  多张优惠券使用列表
                listTwo : [],       //  单张优惠券使用
                moreStr : [],       //  多张优惠券选中
                addrId : ''
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.fromPath = from.name;
            });
        },
        created() {
            this.coupId = this.$route.params.coupId;
            this.money = this.$route.params.newprice;
            this.catelist = this.$route.params.dPrice;

            this.addrId = this.$route.query.addrId || 0;
            this.moreStr = [];
            this.initPage();
        },
        methods: {
            async initPage() {
                this.$indicator.open('加载中...');
                let coupList = await carkCopunList({
                    money : this.money,
                    catelist : this.catelist,
                    user_id : localStorage.userId
                })
                this.$indicator.close();
                coupList.forEach(element => {
                    if (element.coupon_type === 30) {
                        element.isChoose = false;
                        this.listOne.push(element);
                    }else if (element.coupon_type < 30) {
                        element.isChoose = false;
                        this.listTwo.push(element);
                    }
                });
                // 未使用优惠券 coupId:none 
                if (this.coupId !== 'none') {
                    if(this.coupId.split(',').length === 1){
                        this.listTwo.forEach((element,index) => {
                            if(element.id === this.coupId){
                                element.isChoose = true;
                            }
                        });
                        this.listOne.forEach((element,index) => {
                            if(element.id === this.coupId){
                                element.isChoose = true;
                                this.moreStr.push(this.coupId);
                            }
                        });
                    }else {
                        this.moreStr = this.coupId.split(',');
                        for (let i = 0; i < this.moreStr.length; i++) {
                            for (let j = 0; j < this.listOne.length; j++) {
                                if (this.listOne[j].id === this.moreStr[i]) {
                                    if(this.listOne[j].lnvalidtwo === false) {
                                        this.listOne[j].isChoose = true;       
                                    }
                                }
                            }
                        }
                        this.moreStr = [];
                        this.listOne.forEach(element => {
                            if (element.lnvalidtwo === false && element.isChoose === true) {
                                this.moreStr.push(element.id);
                            }
                        });
                    }
                }
            },
            select(type,id,isChoose,isFull) {
                // 单张优惠券使用type != 30  
                // isfull是否满足优惠券使用条件 
                // 单张优惠券使用和多选优惠券使用只有使用其中一种
                if (!isFull) {
                    if (type !== 30) {
                        // 多选优惠券取消选中状态
                        if (this.listOne.length !== 0) {
                            for (let i = 0; i < this.listOne.length; i++) {
                                this.listOne[i].isChoose = false;
                            }
                        }
                        this.moreStr = [];
                        let index = this.listTwo.findIndex(ele => {
                            return ele.id === id;
                        })
                        if(!isChoose) {
                            for (let i = 0; i < this.listTwo.length; i++) {
                                this.listTwo[i].isChoose = false;
                            }
                            this.listTwo[index].isChoose = !this.listTwo[index].isChoose;
                            this.backRouter(this.listTwo[index].id);

                        }else {
                            this.listTwo[index].isChoose = !this.listTwo[index].isChoose;
                        }
                    }else {
                        // 取消单张优惠券选中状态
                        if (this.listTwo.length !== 0) {
                            for (let i = 0; i < this.listTwo.length; i++) {
                                this.listTwo[i].isChoose = false;
                            }
                        }
                        let index = this.listOne.findIndex(ele => {
                            return ele.id === id;
                        })
                        if(!isChoose) {
                            this.listOne[index].isChoose = !this.listOne[index].isChoose;
                            this.moreStr.push(id);
                            console.log(this.moreStr);
                            this.$messagebox.confirm('',{
                                title : '提示',
                                message : '优惠券使用！',
                                showCancelButton : true,
                                confirmButtonText : '确认使用',
                                cancelButtonText : '再选一张'
                            }).then(action => {
                                this.backRouter(this.moreStr.join(','));

                            }).catch(()=> { })
                        }else {
                            this.listOne[index].isChoose = !this.listOne[index].isChoose;
                            let secondInde = this.moreStr.findIndex(e => {
                                return e === id;
                            })
                            this.moreStr.splice(secondInde,1);
                        }
                    }
                }
            },
            backRouter(coupId) {
                if (this.fromPath === 'cark') {
                    this.$router.push({name : 'cark',query: {coupId : coupId}});
                }else {
                    this.$router.push({name : this.fromPath, query: {coupId : coupId, addrId : this.addrId}});
                }
            },
            unUserCoupon() {
                if (this.listTwo.length !== 0) {
                    for (let i = 0; i < this.listTwo.length; i++) {
                        this.listTwo[i].isChoose = false;
                    }
                }
                if (this.listOne.length !== 0) {
                    for (let i = 0; i < this.listTwo.length; i++) {
                        this.listOne[i].isChoose = false;
                    }
                }
                this.moreStr = [];
                if (this.fromPath === 'cark') {
                    this.$router.push({name : this.fromPath});
                }else {
                    this.$router.push({name : this.fromPath, query: {coupId : 'none', addrId : this.addrId}});
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(coupn) {
    position: fixed;
    top:40px;
    left:0;
    width : 100%;
    text-align:center;
    line-height: 28px;
    background: #abd13e;
    color: #fff;
    font-size: 14px;
}
@include b(content) {
    padding : rem(30);
    @include e(unableUser) {
        background: #fff;
        text-align:center;
        line-height: rem(100);
        font-size : rem(32);
    }
}
</style>