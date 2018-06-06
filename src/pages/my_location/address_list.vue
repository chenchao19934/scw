<template>
    <div class="wx-location">
        <TopNav :titles="title" add="新增" @add="newAdd"></TopNav>
        <ul class="additemWrap">
            <LocationItem v-for="x in addressList" 
                            :key="x.id"
                            :item="x"
                            @goEdit="goPage"></LocationItem>
        </ul>
        <div style="margin-top:45%" v-if="addressList.length===0">
            <NoneData title="您还没有添加地址喔~"></NoneData>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/pages/compon/top_nav';
    import LocationItem from '@/pages/compon/location_item';
    import {addressList} from '@/api/newService';
    import NoneData from '../compon/none';
    export default {
        components : {
            TopNav,
            LocationItem,
            NoneData
        },
        data() {
            return {
                title : '我的收货地址',
                addressList : []
            }
        },
        created() {
            this.address();
        },
        methods: {
            async address() {
                await addressList({user_id : localStorage.userId}).then(res => {
                    if (res.message !== "没有数据") {
                        this.addressList = res;
                    }
                })
            },
            goPage(id) {
                this.$router.push({name : 'locationEdit', params : {editId : id}})
            },
            newAdd() {
                this.$router.push({name : 'locationAdd'})
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(location) {
    padding-top: 55px;
}
</style>