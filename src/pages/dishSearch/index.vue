<template>
    <div style="padding-top:40px;background-color:#fafafa">
        <TopHead add="搜索" @add="setHistory"></TopHead>
        <div class="wx-search">
            <!-- <mt-field label="" placeholder="请输入您要搜索的商品" v-model="username"></mt-field> -->
            <input type="text" placeholder="请输入您要搜索的商品" 
                                @keyup.enter="setHistory"
                                v-model="searchValue">
        </div>
        <HotSearch :hotList="goodsList" 
                    @search="searchHot"></HotSearch>
        <DeleteSearch :deleteArr="deleteGoods" 
                        @clearHistory="clear"
                        @search="searchHot"></DeleteSearch>
    </div>
</template>

<script>
    import TopHead from '../compon/top_nav';
    import HotSearch from './hot_search';
    import DeleteSearch from './delete_search';
    import {hotGoods} from '@/api/newService'
    export default {
        components : {
            TopHead,
            HotSearch,
            DeleteSearch
        },
        data() {
            return {
                searchValue: "",
                goodsList : [],
                deleteGoods : []
            }
        },
        created() {
            this.getHot();
            this.getHistory();
        },
        methods :{
            async getHot() {
                this.goodsList = await hotGoods({})
            },
            setHistory() {
                let arr;
                if(this.searchValue !== "") {
                    if (localStorage.userHistorySearch) {
                        arr = JSON.parse(localStorage.userHistorySearch);
                    }else {
                        arr = new Array;
                    }
                    arr.push(this.searchValue);
                    this.deleteGoods = Array.from(new Set(arr));
                    if (this.deleteGoods.length > 5) {
                        this.deleteGoods.splice(0,1);
                    }
                    localStorage.userHistorySearch = JSON.stringify(this.deleteGoods);
                    this.searchHot(this.searchValue);
                }
            },
            getHistory() {
                if (localStorage.userHistorySearch) {
                    this.deleteGoods = JSON.parse(localStorage.userHistorySearch)
                }
            },
            clear() {
                localStorage.userHistorySearch = "";
                this.deleteGoods = [];
            },
            searchHot(name) {
                this.$router.push({name : 'searchDish', params : {'searchName' : name}})
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(search) {
    position: fixed;
    top: 0;
    left: rem(150);
    width: rem(500);
    height: 40px;
    padding: 0 rem(20);
    z-index: 10002;
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 5px;
        width: rem(32);
        height: rem(32);
        vertical-align: sub;
        background-image: url("../../assets/image/list1.png");
        background-size: cover;
        transform: translateY(-50%);
    }
    input {
        min-height: 40px;
        border: none;
        outline: none;
        width: 100%;
        font-size: 16px;
        padding-left: 15px;
        line-height: 40px;
    }
}
</style>