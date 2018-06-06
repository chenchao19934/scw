<template>
    <div class="wx-bar" ref="bar">
        <ul class="wx-bar__show" :style="getWidth">
            <li class="wx-bar__item" :class="{item_active : barSelect == index}" @click="changeBarSelect(index)" v-for="(x,index) in bar" :key="index" >{{x}}</li>
        </ul>
    </div>
</template>

<script>
    import imgScroll from '@/page/compon/top_imgScroll';
    import danGe from '../compoments/first/index';
    import { getStyle } from '@/utils/mUtils';
    export default {
        props : {
            bars : String   // 页面滑动切换索引
        },
        components : {
            imgScroll,
            danGe
        },
        watch : {
            bars(curVal,oldVal){
                this.changeBarSelect(curVal);
            },
        },
        data() {
            return {
                barSelect:'0',
                bar:["小蛙推荐","酒水茶饮","休闲零食","新鲜水果","水产海鲜","肉类禽蛋","速食冷藏","蔬菜瓜果"]
            }
        },
        computed : {
            getWidth() {
                return `width:${this.bar.length*188/75}rem`
            }
        },
        methods : {
            changeBarSelect(index) {
                this.$emit('changeBar',index);
                const bar = this.$refs.bar,
                      scrollWidth = 188/75 * getStyle(document.getElementsByTagName('html')[0],'fontSize') / 2;
                this.barSelect = index;
                if(index == 2) {
                    bar.scrollTo(scrollWidth,0);
                }else if(index == 3){
                    bar.scrollTo(scrollWidth * 2.5,0);
                }else if(index > 2){
                    bar.scrollTo(scrollWidth * (index+1),0);
                }else {
                    bar.scrollTo(0,0);
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
@include b(bar) {
    position: fixed;
    left: 0;
    top: 44px;
    width: 100%;
    line-height: 33px;
    background-color: #fff;
    overflow-x:scroll;
    overflow-y: hidden;
    z-index: 10;
    @include e(show) {
        .wx-bar__item {
            width: rem(188);
            display: inline-block;
            font-size: 14px;
            text-align: center;
            color: #808080;
            font-weight: bold;
        }
        .item_active {
            color: #abd13e;
            border-bottom: 3px solid #abd13e;
            box-shadow: 3px 3px 10px;
        }
    }
}
::-webkit-scrollbar {
   display: none;
}
</style>