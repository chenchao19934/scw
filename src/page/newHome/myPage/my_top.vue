<template>
    <div class="wx-login">
        <div class="wx-login__head" @click="$router.push({name : 'LoginExit'})">
            <div>
                <img :src="userInfo.logo + '?x-oss-process=image/resize,w_150'" alt="">
            </div>
            <div>
                <p class="ellipsis">{{userInfo.userName}}</p>
                <span @click.stop="sign">签到送积分</span>
            </div>
        </div>
        <div class="wx-login__nav">
            <LoginNavItem v-for="x in itemObj" 
                            :item="x"
                            :key="x.id"
                            @click.native="provide(x.id)"></LoginNavItem>
        </div>
    </div>
</template>

<script>
    import LoginNavItem from './top_nav_item'
    export default {
        components : {
            LoginNavItem
        },
        props : {
            itemObj : {
                type : Array
            },
            userInfo: {
                type : Object
            }
        },
        methods : {
            sign() {
                this.$emit('isSign');
            },
            provide(id) {
                this.$emit('toPage',id);
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(login) {
    height: rem(390);
    padding: rem(60) rem(40) 0;
    background: #fafafa url("../../../assets/image/my-bg.png") center no-repeat;
    background-size: cover;
    @include e(head) {
        display: flex;
        height: rem(140);
        padding: 0 rem(30);
        > div:nth-child(1) {
            flex-basis: rem(140); 
            overflow: hidden;
            border-radius: rem(70);
            img {
                display: block;
                width: 100%;
            }
        }
        > div:nth-child(2) {
            width: rem(470);
            padding-left: rem(30);
            overflow: hidden;
            p {
                color: #717171;
                font-size: rem(28);
                line-height: rem(70);
            }
            span {
                display: inline-block;
                padding: rem(10) rem(30);
                font-size: rem(24);
                background-color: #abd13e;
                color: #fff;
                border-radius: rem(24);
            }
        }
    }
    @include e(nav) {
        display: flex;
        height: rem(180);
        padding-top: rem(70);
    }
}
</style>