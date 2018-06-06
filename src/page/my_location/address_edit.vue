<template>
    <div class="wx-location">
        <TopNav :titles="title" add="保存" @add="newAdd"></TopNav>
        <mt-field label="联系人" placeholder="请输您的姓名" v-model="detial.name"></mt-field>
        <mt-radio v-model="detial.sex" :options="option"></mt-radio>
        <mt-cell title="选择小区" 
                    @click.native="$router.push({name : 'Map',params : { from : 'add'}})"
                    is-link><span>{{address.detail_address}}</span></mt-cell>
        <mt-field label="楼栋门牌号" placeholder="请输入门牌号等详细信息" v-model="detial.house_number"></mt-field>
        <mt-field label="手机号" type="number" placeholder="请输您的手机号" v-model="detial.phone_number"></mt-field>
        <div class="wx-location__btn">
            <mt-button type="danger" size="large" @click.native="deleteAddress">删除</mt-button>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/top_nav';
    import {addressDetial, setAddress, deleteAddress} from '@/api/newService';
    import { mapGetters,mapMutations } from 'vuex';
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                title : '修改地址',
                editAddressId : null,
                option : [
                    {
                        label: '男',
                        value: '1',
                    },
                    {
                        label: '女',
                        value: '0',
                    }
                ],
                detial : {
                    sex : '1',
                    name : '',
                    house_number : '',
                    phone_number : ''
                },
            }
        },
        activated() {
            this.editAddressId = this.$route.params.editId;
        },
        computed : {
            ...mapGetters([
                'address'
            ])
        },
        watch : {
            editAddressId(n) {
                this.getAddress(this.$route.params.editId);
            }
        },
        methods: {
            ...mapMutations([
                'setLocation'
            ]),
            async getAddress(id) {
                let data = await addressDetial({id : id});
                let locationObj = {
                    detail_address : data[0].detail_address,
                    location : `${data[0].lng},${data[0].lat}`
                }
                this.setLocation(locationObj);
                this.detial.name = data[0].name;
                this.detial.house_number = data[0].house_number;
                this.detial.phone_number = data[0].phone_number;
            },
            setAddress() {
                for (const key in this.detial) {
                    if (this.detial[key] === '') {
                        this.$toast('请填写完整信息')
                        return;
                    }
                }
                if (!/^1[34578]\d{9}$/.test(this.detial.phone_number)) {
                    this.$toast('请填写正确的手机号码！')
                    return;
                }
                setAddress({
                    adr_id : this.editAddressId,
                    detail_address : this.address.detail_address,
                    house_number : this.detial.house_number,
                    phone_number: this.detial.phone_number,
                    location : this.address.location,
                    name : this.detial.name,
                    sex : this.detial.sex,
                    user_id : localStorage.userId
                }).then((res) => {
                    if (res.message === 1) {
                        this.$back(this.$router);
                    }else {
                        this.$toast(res.message);
                    }
                })
            },
            newAdd() {
                this.setAddress();
            },
            deleteAddress() {
                this.$messagebox.confirm("确定删除该地址！").then(action => {
                    deleteAddress({
                        adr_id : this.editAddressId
                    }).then(res=> {
                        if (res.message === 1) {
                            this.$back(this.$router);
                        }else {
                            this.$toast(res.message);
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(location) {
    padding-top: 55px;
    @include e(btn) {
        width: 80%;
        margin: rem(100) auto 0;
    }
}
</style>