<template>
    <div style="padding-bottom:55px">
        <mt-loadmore :top-method="loadTop" topPullText="下拉刷新" ref="loadmore">
            <MyTop :itemObj="additionList"
                    :userInfo="uInfo" 
                    @isSign="sign"
                    @toPage="goPage"></MyTop>
            <OrderList :order="orderList"
                        @toPage="goPage"></OrderList>
            <div class="menuWrap">
                <MenuListItem v-for="item in menuList" 
                                :key="item.id" 
                                :title="item.descd" 
                                :icon="item.ext_value"
                                @click.native="goPage(item.id)"></MenuListItem>
            </div>
        </mt-loadmore>
        <fixedBar></fixedBar>
    </div>
</template>

<script>
    import MyTop from './my_top'; 
    import fixedBar from '../index';
    import OrderList from './order_list';
    import MenuListItem from './menu_list_item';

    import { addition,myMenuList,orderList,sign } from '@/api/newService'
    export default {
        components : {
            MyTop,
            fixedBar,
            OrderList,
            MenuListItem
        },
        data() {
            return {
                orderList : [],
                menuList : [],
                additionList : [],
                uInfo : {
                    logo : 'static/login_default_img.png',
                    userName : '登录/注册'
                }
            }
        },
        activated() {
            this.restPage();
            if (this.$store.state.isLogin) {
                this.uInfo.logo = localStorage.logo;
                this.uInfo.userName = localStorage.userName;
            }else {
                this.uInfo = {
                    logo : 'static/login_default_img.png',
                    userName : '登录/注册'
                }
            }
        },
        beforeRouteLeave(to, from, next) {  
            if (to.name === "Order") {
                to.meta.keepAlive = true;  
            }
            next();  
        },
        methods : {
            async restPage() {
                let data = await addition({user_id : localStorage.userId});
                this.additionList = data.date;
                this.orderList = await orderList({user_id : localStorage.userId});
                this.menuList = await myMenuList({user_id : localStorage.userId});
                
                // 设置礼品盒商品数量
                this.$store.state.giftCount = this.additionList[3].value;
            },
            loadTop() {
                this.restPage();
                setTimeout(() => {
                    this.$refs.loadmore.onTopLoaded();
                },2000);
            },
            sign() {
                if (this.$store.state.isLogin) {
                    sign({user_id : localStorage.userId}).then(res=> {
                        if (res.code == 200) {
                            this.$toast(res.message);
                            addition({user_id : localStorage.userId}).then(res=> {
                                this.additionList = res.date;
                            });
                        }else {
                            this.$toast(res.message);
                        }
                    })
                } else {
                    this.$toast("登录后才能参与签到！");
                    setTimeout(() => {
                        this.$router.push({name : 'Login'})
                    }, 2000);
                }
            },
            goPage(id) {
                console.log(id);
                switch (id*1) {
                    case 0 :
                        this.$router.push({name : 'Balanced'})
                        break;
                    case 1 :
                        this.$router.push({name : 'Integral'})
                        break;
                    case 2 :
                        this.$router.push({name : 'Coupon'})
                        break;
                    case 3 :
                        this.$router.push({name : 'Gift'})
                        break;
                    case 80 :
                        this.$router.push({name : 'Order', params : {type : '1'}})
                        break;
                    case 81 :
                        this.$router.push({name : 'Order', params : {type : '2'}})
                        break;
                    case 82 :
                        this.$router.push({name : 'Order', params : {type : '3'}})
                        break;
                    case 83 :
                        this.$router.push({name : 'Order', params : {type : '4'}})
                        break;
                    case 85 : 
                        window.location.href = 'https://scw.new.songcaiwa.cn/public/index.php/home/index/internal#/tab/home'
                        break;
                    case 86 : 
                        this.$router.push({name : 'collection'})
                        break;
                    case 87 : 
                        this.$router.push({name : 'evals'})
                        break;
                    case 88 :
                        this.$router.push({name : 'location'})
                        break;
                    case 103 :
                        this.$router.push({name : 'Invited'})
                        break;
                    case 111 : 
                        this.$router.push({name : 'Suggestion'})
                        break;
                    case 190 :
                        this.$router.push({name : 'BalancedPay'})
                        break;
                    default : 
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.menuWrap {
    min-height: rem(480);
}
</style>