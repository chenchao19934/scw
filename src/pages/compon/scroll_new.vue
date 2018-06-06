<template>
    <div class="wx-news">
        <div class="wx-news__imgWrap">
            <img src="https://scw.new.songcaiwa.cn/public/static/home/images/voice_2.png" alt="">
        </div>
        <!-- 显示区 -->
        <div class="wx-news__wrap">
            <!-- 滚动区 -->
            <ul ref="scroll" :style="trans">
                <li class="ellipsis" v-for="(x,index) in newArr" :key="index">{{x.ext_value}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            newArr : {
                type : Array
            }
        },
        data() {
            return {
                step : 4,   // 滚动步数
                time : null,
                transY : -4,
                trans : ""
            }
        },
        // computed:{
        //     scrollH() {
        //         return {'height' : this.arr.length*40 + 'px'}
        //     }
        // },
        created() {
            this.$nextTick(()=> {
                this.scroll();
            })
        },
        methods : {
            scroll() {
                this.time = setInterval(()=> {
                    this.transY += this.step;
                    if (this.transY % 40 === 0) {
                        clearInterval(this.time);
                        setTimeout(() => {
                            this.scroll();
                        },2000)
                    }
                    if (this.transY > (this.newArr.length-1)*40) {
                        this.transY = -4;
                    }
                    this.trans = `transform:translateY(-${this.transY}px)`
                },50)
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(news) {
    height: 40px;
    line-height: 40px;
    margin: rem(20) 0;
    padding: 0 rem(10);
    @include e(imgWrap) {
        display: inline-block;
        width: 25%;
        position: relative;
        height: 100%;
        overflow: hidden;
        >img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
        }
    }
    @include e(wrap) {
        width: 73%;
        display: inline-block;
        height: 100%;
        overflow: hidden;
        ul {
            min-height: 100%;
            li {
                height: 40px;
                font-size: 14px;
            }
        }
    }
}
</style>