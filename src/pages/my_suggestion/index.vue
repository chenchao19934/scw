<template>
    <div style="padding-top:44px">
        <TopNav titles="投诉建议"></TopNav>
        <div class="wx-form">
            <ul class="wx-form__type">
                <li v-for="(item,index) in type" 
                        :key="index"
                        :class="{'active-choose' : message.index === item}"
                        @click="chooseType(item)">{{item}}</li>
            </ul>
            <div class="sug-type">
                <span style="width:105px">类型：</span>
                <em v-for="(x,index) in suggType" 
                    :class="{'active-choose' : message.suggIndex===x}" 
                    @click="changeTypeInde(x)">{{x}}</em>
            </div>
            <mt-field label="标题：" 
                        placeholder="请输入标题" 
                        v-model="message.title"></mt-field>
            <mt-field placeholder="请输入投诉与建议描述" 
                    type="textarea" 
                    rows="6" 
                    v-model="message.content"></mt-field>
            
            <div class="wx-form__photo">
                <li v-for="x in message.imgData">
                    <!-- <img :src="x + '?x-oss-process=image/resize,w_240'" alt=""> -->
                    <img :src="x" alt="">
                </li>
                <li @click="takePhotos"></li>
            </div>
            
            <mt-button type="primary" size="large" @click.native="confirm">确认提交</mt-button>
        </div>
    </div>
</template>

<script>
    import TopNav from '../compon/top_nav';
    import {suggestion} from '@/api/newService'

    export default {
        components : {
            TopNav
        },
        data() {
            return {
                type :['产品','配送','服务'],
                suggType : ["建议","投诉"],
                message :{
                    title : '',
                    content : '',
                    index : '产品',
                    suggIndex : "建议",
                    imgData : [],
                    user_id : localStorage.userId
                }
            }
        },
        methods: {
            chooseType(x) {
                this.message.index = x;
            },
            changeTypeInde(index) {
                this.message.suggIndex = index;
            },
            async confirm() {
                let data = await suggestion({data : this.message});
                if (data.code == 44) {
                    this.$toast(data.message);
                }else {
                    this.$back(this.$router);
                }
            },
            takePhotos() {
                if (this.$device === 'wechat') {
                    this.takePhoto(res=> {
                        for(let i = 0; i<res.length ; i++) {
                            this.message.imgData.push(res[i]);
                        }
                        console.log(this.message.imgData);
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(form) {
    padding: 0 rem(20);
    @include e(type) {
        display : flex;
        justify-content: space-between;
        padding: rem(40) 10%;
        li {
            flex : 0 0 24%;
            line-height: 30px;
            text-align: center;
            color: #717171;
            border: 1px solid #717171;
            border-radius: 4px;
            font-size : 14px;
        }
        li.active-choose {
            color: #fff;
            background-color: #a4c842;
            border: 1px solid #a4c842;
        }
    }
    @include e(photo) {
        display: flex;
        flex-wrap: wrap;
        margin : rem(20) 0 rem(40);
        li {
            flex-basis : rem(170);
            height : rem(170);
            margin : 0 rem(2) rem(10);
            background-color: red;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
            }
            &:last-child{
                background: url('../../assets/image/img_add.png') center no-repeat;
                background-size: contain;
            }
        }
    }
    .mint-button--primary {
        background-color: #a4c842;
    }
}
.sug-type {
    padding: rem(20) 10px;
    font-size: 16px;
}
.sug-type span, .sug-type em {
    display: inline-block;
}
.sug-type em {
    position: relative;
    padding-left: 30px;
    margin-right: 20px;
}
.sug-type em::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border:1px solid #717171;
    transform: translateY(-50%);
}
.sug-type em.active-choose::before {
    border : none;
    background: url("../../assets/image/sug.png") center no-repeat;
    background-size: 100%;
}
</style>