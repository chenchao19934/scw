<template>
    <div class="wx-com">
        <div v-if="a == '1'" class="wx-com__header">评论（{{commentLength}}）</div>
        <div v-if="a == '0'" class="wx-com__intro">
            <div :class="{ 'is-com' :comType==3}" @click="changeType(3)">全部({{this.comAll}})</div>
            <div :class="{ 'is-com' :comType==1}" @click="changeType(1)">强烈推荐({{this.comReco}})</div>
            <div :class="{ 'is-com' :comType==2}" @click="changeType(2)">有待改进({{this.comImprove}})</div>
            <section @click="changeContent">
                <span :class="{'is-con':contents}"></span>
                <em>只看有内容的评论</em>
            </section>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props : {
            //  评论总数
            commentLength : {
                type : Number,
                default : 0
            }, 
            comAll : {
                type : Number,
                default : 0
            }, 
            //  推荐
            comReco : {
                type : Number,
                default : 0
            },
            //  改进
            comImprove :{
                type : Number,
                default : 0
            },
            a : String
        },
        data() {
            return {
                comType : 3,    // 推荐选中
                contents : false,   //  查看内容评论
            }
        },
        methods : {
            changeType(index) {
                if (index === this.comType) {
                    return;
                }else {
                    this.comType = index;
                    this.$emit('barChange',this.comType,this.contents);
                }
            },
            changeContent() {
                this.contents = !this.contents;
                this.$emit('contentChange',this.comType,this.contents);
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(com) {
    background-color: #fff;
    @include e(header) {
        height: rem(48);
        line-height: rem(48);
        font-size: rem(24);
        padding-left: rem(40);
    }
    @include e(intro) {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: rem(30) rem(20) rem(70);
        > div {
            flex:  0 0 29.333;
            text-align: center;
            padding: rem(10) rem(16);
            font-size: rem(28);
            border: 1px solid #717171;
            border-radius: rem(10);
        }
        div.is-com {
            background: #abd13e;
            color: #fff;
            border-color: #abd13e;
        }
        >section {
            position: absolute;
            width: rem(270);
            height: rem(48);
            line-height: rem(48);
            font-size: rem(24);
            left: rem(20);
            bottom: 0;
            span {
                display: inline-block;
                width: 14px;
                height: 14px;
                border: 1px solid #abd13e;
                border-radius: 50%;
                vertical-align: sub;
            }
            span.is-con {
                background-color: #abd13e
            }
        }
    }
}
</style>