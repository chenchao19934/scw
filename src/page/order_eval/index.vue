<template>
    <div style="padding:45px 0;background-color:#f0f0f0">
        <TopNav titles="评价"></TopNav>
        <div class="wx-eval" 
                v-for="(x,index) in list"
                :key="index">
            <div class="wx-eval__head">
                <h2 class="ellipsis">{{x.name}}</h2>
                <Start :count.sync="x.score"
                       :isClick="true"></Start>
            </div>
            <div class="wx-eval__tag" v-if="x.score > 3">
                <li v-for="(y,tagIndex) in x.ocgq" 
                    :key="y.id"
                    :class="{'choose-tag': y.check}"
                    @click="chooseTag(x.score,index,tagIndex)">{{y.content}}</li>
            </div>
            <div class="wx-eval__tag" v-else>
                <li v-for="(y,tagIndex) in x.ocbg"
                    :key="y.id"
                    :class="{'choose-tag': y.check}"
                    @click="chooseTag(x.score,index,tagIndex)">{{y.content}}</li>
            </div>
            <div class="wx-eval__txt">
                <mt-field placeholder="评价内容10字以上多送5积分！"
                          type="textarea" 
                          rows="4"
                          v-model="x.content"></mt-field>
            </div>
            <div class="wx-eval__photo">
                <li v-for="z in x.imgArr">
                    <img :src="z + '?x-oss-process=image/resize,w_240'" alt="">
                </li>
                <li @click="takePhotos(index)"></li>
            </div>
        </div>
        <div class="wx-commit">
            <mt-button size="large" 
                        type="primary"
                        @click.native="commitEval">提交</mt-button>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/page/compon/top_nav';
    import Start from '@/page/compon/rate_start';
    import { evalOrder,evalCommit } from "@/api/newService";
    export default {
        components: {
            TopNav,
            Start
        },
        data() {
            return {
                list: [],
                closeEval : []
            }
        },
        watch: {
            counts(n) {
                console.log(n);
            }
        },
        created() {
            this.initPage();
        },
        methods: {
            async initPage() {
                await evalOrder({group_id : this.$route.params.groupId}).then(res => {
                    let data = res.date;
                    data.forEach(element => {
                        element.imgArr = new Array();
                        element.score = 5;
                    });
                    this.list = data;
                })
            },
            chooseTag(score,index,tagIndex) {
                if(score > 3) {
                    this.list[index].ocgq[tagIndex].check = !this.list[index].ocgq[tagIndex].check
                }else {
                    this.list[index].ocbg[tagIndex].check = !this.list[index].ocbg[tagIndex].check
                }
            },
            // 拍照
            takePhotos(index) {
                if (this.$device === 'wechat') {
                    this.takePhoto(res=> {
                        this.list[index].imgArr.push(res);
                    })
                }
            },
            async commitEval() {
                console.log(this.list);
                const data = await evalCommit({
                    data : this.list
                })
                if (data.code === 200) {
                    this.$toast("提交成功！");
                    setTimeout(()=> {
                        this.$back(this.$router);
                    },2000)
                }else {
                    this.$toast(data.message);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(eval) {
    background: #fff;
    padding: rem(20);
    height: auto;
    overflow: hidden;
    transition: all linear .5s;
    @include e(head) {
        display: flex;
        justify-content:space-between;
        height: rem(80);
        line-height: rem(80);
        margin-bottom: rem(20);
        h2 {
            flex: 0 0 50%;
            overflow: hidden;
            font-size: rem(32);
        }
        > span {
            flex: 0 0 5%;
            transform: rotate(180deg);
        }
    }
    @include e(tag) {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: rem(20);
        li {
            flex: 0 0 21%;
            height: rem(48);
            line-height: rem(48);
            margin-bottom: rem(20);
            box-shadow: 0 0 rem(2) #717171;
            text-align: center;
            border-radius: rem(20);
        }
        li.choose-tag {
            color: #fff;
            background-color: #abd13e;
        }
    }
    @include e(txt) {
        margin-bottom: rem(20);
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
    }
    @include e(photo) {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: rem(20);
        li {
            flex-basis : rem(170);
            height : rem(170);
            margin : 0 rem(2) rem(10);
            background-color: #fff;
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
}
@include b(commit) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .mint-button--primary {
        background-color: #abd13e;
    }
}
</style>