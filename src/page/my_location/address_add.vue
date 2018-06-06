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
            <mt-button type="primary" size="large" @click.native="newAdd">保存</mt-button>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/top_nav';
    import {addAddress} from '@/api/newService';
    import { mapGetters,mapMutations } from 'vuex';
    export default {
        components : {
            TopNav
        },
        data() {
            return {
                title : '修改地址',
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
        computed : {
            ...mapGetters([
                'address'
            ])
        },
        methods: {
            addAddress() {
                for (const key in this.detial) {
                    if (this.detial[key] === '') {
                        this.$toast('请填写完整信息')
                        return;
                    }
                }
                if (this.address.location == "") {
                    this.$toast('请选择您的小区！')
                    return;
                }
                if (!/^1[34578]\d{9}$/.test(this.detial.phone_number)) {
                    this.$toast('请填写正确的手机号码！')
                    return;
                }
                addAddress({
                    detail_address : this.address.detail_address,
                    house_number : this.detial.house_number,
                    location : this.address.location,
                    name : this.detial.name,
                    phone_number: this.detial.phone_number,
                    sex : this.detial.sex,
                    user_id : localStorage.userId
                }).then((res) => {
                    if (res.message === 1) {
                        this.resetDate();
                        this.$back(this.$router);
                    }else {
                        this.$toast(res.message);
                    }
                })
            },
            // 保存信息后重置表单。
            ...mapMutations([
                'setLocation'
            ]),
            resetDate() {
                this.setLocation({
                    detail_address : '' || '请选择小区或大厦等',
			        location : ''
                })
                this.detial  = {
                    sex : '1',
                    name : '',
                    house_number : '',
                    phone_number : ''
                }
            },
            newAdd() {
                this.addAddress();
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
        .mint-button--primary {
            background-color: #33cd5f
        }
    }
}
</style>