<template>
    <div class="wx-location">
        <TopNav :titles="title" add="新增" @add="newAdd"></TopNav>
        <div class="wx-location__choose" @click="$router.push({name : 'Map',params : {from : 'home'}})"><p>定位到当前位置</p></div>
        <ul class="additemWrap">
            <LocationItem v-for="x in addressList" 
                            :key="x.id"
                            :item="x"
                            @goEdit="goPage"
                            @homeBack="changeLocation"></LocationItem>
        </ul>
        <div style="margin-top:45%" v-if="addressList.length===0">
            <NoneData title="您还没有添加地址喔~"></NoneData>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/top_nav';
    import LocationItem from '@/page/compon/location_item';
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
                title : '选择地址',
                addressList : []
            }
        },
        created() {
            this.address();
        },
        methods: {
            async address() {
                await addressList({user_id : localStorage.userId}).then(res=> {
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
            },
            changeLocation(address,lat,lng) {
                localStorage.locationName = address;
                this.$store.state.addressName = address;
                localStorage.setItem("lat",lat);
                localStorage.setItem("lon",lng);
                this.$back(this.$router);
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(location) {
    padding-top: 55px;
    @include e(choose) {
        text-align: center;
        padding: rem(15) 0;
        margin-bottom: rem(15);
        border: 1px solid #e8e8e8;
        p {
            display: inline;
            position: relative;
            font-size: rem(28);
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: -15px;
                width: rem(22);
                height: rem(28);
                vertical-align: sub;
                background-image: url("../../assets/image/icon-park-address.png");
                background-size: cover;
                transform: translateY(-50%);
            }
        }
    }
}
</style>