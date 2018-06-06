<template>
    <div class="collection">
        <TopNav titles="我的收藏"></TopNav>
        <div style="padding-top:40px">
            <CellSwiper @delete="isDelete" 
                            v-for="x in list" 
                            :key="x.goods_id"
                            title="取消收藏"
                            :cancelId="x.goods_id">
                <CellItem :item="x"></CellItem>  
            </CellSwiper>
        </div>
        <div v-if="list.length === 0" style="padding-top:45%">
            <NoneData title="您还没有收藏商品~"></NoneData>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import NoneData from '../compon/none';
    import CellSwiper from '../compon/cell_swiper';
    import CellItem from './coll_item';
    import {collectionList ,cancelCollection} from '@/api/newService';
    
    export default {
        components :{
            TopNav,
            NoneData,
            CellSwiper,
            CellItem
        },
        data() {
            return {
                list : []
            }
        },
        created() {
            this.getCollList();
        },
        methods : {
            getCollList() {
                collectionList({user_id : localStorage.userId}).then(res =>{
                    this.list = res;
                })
            },
            isDelete(id) {
                cancelCollection({eid : id,user_id : localStorage.userId}).then(res=> {
                    if (res === 1) {
                        this.$toast('取消收藏成功！');
                        let index = this.list.findIndex(ele => {
                            return ele.goods_id === id;
                        })
                        this.list.splice(index,1);
                    }
                })
            }
        }
    }
</script>

<style scoped>
.collection .mint-header.is-fixed{
    z-index: 10;
}
</style>