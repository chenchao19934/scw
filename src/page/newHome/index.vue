<template>
    <div class="wx-home">
        <mt-tabbar v-model="chooseBar" :fixed="true">
            <mt-tab-item v-for="(x,index) in tabs"
                            @click.native="page(index)" 
                            :class="{ iactive : x.id==chooseBar }"
                            :key="index">
                <img slot="icon" :src="x.id==chooseBar ? x.tab_img_active : x.tab_img"> 
                <div class="bradge" v-if="x.id === '2' && shopCarkLenth !== 0">{{shopCarkLenth}}</div>
                <div class="bradge" v-if="x.id === '3' && giftCount !== 0">{{giftCount}}</div>
                {{x.name}}   
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data() {
            return {
                chooseBar : '0',
                tabs :[{
                    id:'0',
                    name : '首页',
                    tab_img : 'static/main_home_normal.png',
                    tab_img_active : 'static/main_home_press.png',
                },{
                    id:'1',
                    name : '分类',
                    tab_img : 'static/main_type_normal.png',
                    tab_img_active : 'static/main_type_press.png',
                },{
                    id:'2',
                    name : '购物车',
                    tab_img : 'static/main_card_normal.png',
                    tab_img_active : 'static/main_card_press.png',
                },{
                    id:'3',
                    name : '我的',
                    tab_img : 'static/main_me_normal.png',
                    tab_img_active : 'static/main_me_press.png',
                }]
            }
        },
        computed : {
            ...mapState([
                'shopCarkLenth',
                'giftCount'
            ])
        },
        activated() {
            const paths = window.location.hash;
            console.log(paths);
            if(paths.indexOf('home') >= 0) {
                this.chooseBar = '0';
            }else if(paths.indexOf('list') >= 0) {
                this.chooseBar = '1';
            }else if(paths.indexOf('my') >= 0) {
                this.chooseBar = '3';
            }
        },
        created() {
            const paths = window.location.hash;
            if(paths.indexOf('home') >= 0) {
                this.chooseBar = '0';
            }else if(paths.indexOf('list') >= 0) {
                this.chooseBar = '1';
            }else if(paths.indexOf('cark') >= 0) {
                this.chooseBar = '2';
            }else if(paths.indexOf('my') >= 0) {
                this.chooseBar = '3';
            }
        },
        methods : {
            page(num) {
                this.chooseBar = num;
                switch(num) {
                    case 0 : 
                        this.$router.push({name : 'home'});
                        break;
                    case 1 : 
                        this.$router.push({name : 'list'});
                        break;
                    case 2 : 
                        this.$router.push({name : 'cark'})
                        break;
                    case 3 : 
                        this.$router.push({name : 'my'});
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(home) {
    background-color: #fff;
}
.mint-tabbar {
    // position: relative;
    background: #fff;
    border-top: 1px solid #abd13e;
    .iactive {
        color: #abd13e;
    }
}
.mint-tab-item {
    position: relative;
    .bradge {
        position: absolute;
        top: rem(15);
        right: rem(50);
        padding: 1px 6px;
        height: auto;
        font-size: 12px;
        line-height: 16px;
        border-radius: 9px;
        background-color: #ff8e00;
        color: #fff;
    }
}
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: #fff;
    color: #abd13e;
}
</style>