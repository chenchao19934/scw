<template>
    <li class="wx-comItem clearfix" v-if="comment">
        <div class="wx-comItem__img left">
            <img v-lazy="comment.img +'?x-oss-process=image/resize,w_60/format,jpg/quality,Q_80'">
        </div>
        <div class="wx-comItem__name">
            <span>{{comment.nick_name}}</span>
            <em>{{comment.create_time}}</em>
        </div>
        <div class="wx-comItem__starsWrap">
            <!-- <vue-stars :value="comment.score"
                    :char="'★'"
                    readonly
                    :inactive-char="'★'"
                    active-color="#ff0000"
                    inactive-color="#999999"
                    shadow-color="#ff0000"
                    hover-color="#ff0000" /> -->
                    <Statr :count="comment.score"></Statr>
        </div>
        <div class="wx-comItem__content" v-if="comment.content">
            {{comment.content}}
        </div>
        <div class="wx-comItem__targs clearfix" v-if="comment.tags">
            <span v-for="(x,index) in comment.tags" :key="index"><i class="icon ion-ios-pricetag-outline"></i>{{x}}</span>
        </div>

        <div class="wx-comItem__imgList" v-if="comment.comm_img">
            <div v-for="(x,index) in comment.comm_img" :key="index" @click='openImgs(x.image)'>
                <img v-lazy="x.image +'?x-oss-process=image/resize,w_60/format,jpg/quality,Q_80'" alt="">
            </div>
        </div>

        <div class="wx-comItem__replay" v-if="comment.reply">
            <div></div>
            <p>小蛙回复：{{comment.reply.content}}</p>
        </div>
    </li>
</template>

<script>
// import vueStars from "vue-stars";

import Statr from '@/page/compon/rate_start';
export default {
    props: {
        comment: Object
    },
    components : {
        // vueStars,
        Statr
    },
    methods: {
        openImgs(val) {
            this.$emit('openImg',val);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(comItem) {
    padding: rem(20) rem(16);
    background-color: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    @include e(img) {
        width: rem(60);
        height: rem(60);
        border-radius: 50%;
        overflow: hidden;
        img {
            display: block;
            width: 100%;
        }
    }
    @include e(name) {
        padding-left: rem(80);
        span {
            color: #333;
            font-size: rem(28)
        }
        em {
            float: right;
            font-size: rem(28);
            color: #717171;
        }
    }
    @include e(starsWrap) {
        padding-left: rem(78);
        font-size: rem(32)
    }
    @include e(content) {
        padding-left: rem(80);
        font-size: rem(28);
        color: #717171;
    }
    @include e(replay) {
        position: relative;
        width: 100%;
        padding: rem(16);
        margin-top: rem(30);
        background-color: #f2f9f7;
        border-radius: rem(16);
        p {
            font-size: rem(28);
            margin-bottom: rem(20);
        }
        > div {
            position: absolute;
            left: 15%;
            top: rem(-22);
            width: 0;
            height: 0;
            border-left: rem(12) solid transparent;
            border-right: rem(12) solid transparent;
            border-bottom: rem(24) solid #f2f9f7;
        }
    }
    @include e(targs) {
        padding-left: rem(80);
        margin: rem(10) 0;
        span {
            float: left;
            padding-right: 8px;
            font-size: 12px;
            color: #9a9a9a;
        }
        i {
            padding-right: 5px;
        }
    }
    @include e(imgList) {
        padding-left: rem(80);
        height: rem(92);
        > div {
            float: left;
            width: rem(120);
            height: rem(92);
            margin-right: rem(10);
            overflow: hidden;
            background: #ccc;
            img {
                display: block;
                width: 100%;
            }
        }
    } 
}
</style>