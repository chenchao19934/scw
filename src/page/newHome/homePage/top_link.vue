<template>
    <div class="wrapper">
        <ul class="content" ref="content">
            <li v-for="(x,index) in barItem" 
                @click="scrollToLocatin(index)"
                :class="{'is-active' : barIndex == index}"
                :key="index">{{x}}</li>
            <div class="content-scroll" ref="scrolls">
                <span></span>
            </div>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        props : {
            barItem : {
                type : Array
            },
            barIndex : {
                type : String
            }
        },
        data() {
            return {
                scroll : null,
            }
        },
        watch : {
            barIndex(n) {
                this.scrollToLocatinSwiper(n);
            }
        },
        activated() {
            this.$nextTick(()=> {
                let wrapper = document.querySelector('.wrapper');
                this.scroll = new BScroll(wrapper, {
                    scrollX : true,
                    click : true,
                })
                setTimeout(()=> {
                    this.scrollTo(this.barItem, this.barIndex);
                },300)
            })
        },
        methods : {
            // 点击切换索引
            scrollToLocatin(index) {
                this.$emit('update:barIndex', index+'')
            },
            // 父组件滑动切换
            scrollToLocatinSwiper(index) {
                this.scrollTo(this.barItem,index);
            },
            scrollTo(data,nowIndex) {
                this.$refs.scrolls.style.left = 12.5*nowIndex+ '%';
                let nowTextLength = 0;
                data.forEach((element,index) => {
                    if(index <= nowIndex) {
                        nowTextLength += element.length;
                    }
                })
                if ((nowTextLength * 14 + nowIndex * 38) > window.innerWidth/2) {
                    let nowPos = nowTextLength * 14 + nowIndex * 38;
                    console.log(nowPos);
                    if (nowIndex >=6) {
                        this.scroll.scrollTo(365*-1,0,500);
                    }else {
                        this.scroll.scrollTo(window.innerWidth/2-nowPos,0,500);
                    }
                }else {
                    this.scroll.scrollTo(0,0,500)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrapper {
    position: fixed;
    top: 40px;
    width: 100%;
    height: 42px;
    padding-top:10px;
    padding-right: 0;
    background-color: #fafafa;
    color: #bfbfbf;
    z-index: 7;
    overflow: hidden;
    .content {
        display: inline-block;
        white-space: nowrap;
    }
    li {
        display: inline-block;
        padding: 5px 15px;
        font-size: 14px;
        font-weight : bold;
    }
    .content-scroll {
        position: absolute;
        bottom: 0;
        width: 86px;
        height : 2px;
        left: 0;
        transition: all .6s;
        span {
            display : block;
            width: 62px;
            border-top: 3px solid #abd13e;
            border-radius: 10px 10px 0 0;
            margin : 0 auto;
        }
    }
}
</style>