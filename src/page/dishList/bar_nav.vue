<template>
    <div class="wrapper">
        <ul class="content" ref="content">
            <li v-for="(x,index) in barItem" 
                @click.prevent.stop="scrollToLocatin(index,x.id,x.pid)"
                :class="{'is-active' : barIndex == index}"
                :key="x.id">{{x.name}}</li>
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
                type : Number
            }
        },
        data() {
            return {
                scroll : null
            }
        },
        created() {
            this.$on('swiperLeft',(e,id,pid) => {
                this.scrollToLocatin(e,id,pid);
            })
            this.$nextTick(()=> {
                let wrapper = document.querySelector('.wrapper');
                this.scroll = new BScroll(wrapper, {
                    scrollX : true,
                    click : true,
                })
            })
        },
        activated() {
            setTimeout(()=> {
                this.scrollTo(this.barItem, this.barIndex);
            },300)
        },
        methods : {
            scrollToLocatin(index,id,pid) {
                window.scrollTo(0,0);
                this.scrollTo(this.barItem, index);
                if (id == 'all') {
                    this.$emit('getSeconData',pid,index,'all');
                }else {
                    this.$emit('getSeconData',id,index);
                }
            },
            scrollTo(data,nowIndex) {
                let nowTextLength = 0
                data.forEach((element,index) => {
                    if(index <= nowIndex) {
                        nowTextLength += element.name.length;
                    }
                })
                if ((nowTextLength * 14 + nowIndex * 38) > window.innerWidth/2) {
                    let nowPos = nowTextLength * 14 + nowIndex * 38;
                    this.scroll.scrollTo(window.innerWidth/2-nowPos,0,500)
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
    height: 50px;
    padding: 5px;
    padding-right: 0;
    background-color: #fafafa;
    color: #bfbfbf;
    z-index: 7;
    overflow: hidden;
    .content {
        display: inline-block;
        padding-top: 5px;
        white-space: nowrap;
    }
    li {
        display: inline-block;
        border: 1px solid #a8a8a8;
        border-radius: 15px;
        background-color: #fff;
        padding: 5px 10px;
        margin: 0 8px 8px;
        font-size: 14px;
    }
    li.is-active {
        color: #abd13e;
        border-color: #abd13e;
    }
}
</style>