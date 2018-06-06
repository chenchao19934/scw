<template>
    <div class="wx-masks" :class="{'ani-open': isShow, 'ani-close' : !isShow}">
        <div class="wx-masks__box" @click="clo"></div>
        <div class="wx-masks__main">
            <slot name="user"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            isShow : {
                type : Boolean,
                default : true
            }
        },
        methods: {
            clo() {
                this.$emit('close');
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(masks) {
    position: fixed;
    top : 0;
    left : 0;
    bottom : 0;
    right : 0;
    z-index : 10;
    display: flex;
    align-items: center;
    justify-content: center;
	pointer-events: none;
    @include e(box) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.5s;
        backface-visibility:hidden;
    }
    @include e(main) {
        position: relative;
        width: 80%;
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        z-index: 5;
        opacity: 0;
        transition: opacity 0.5s;
    }
}
// .ani-open .wx-masks__main {
//     animation-name: anim-open;
// }
// .ani-close .wx-masks__main {
// 	animation-name: anim-close;
// }
.ani-open .wx-masks__box {
    opacity: 1;
    pointer-events: auto;
}
.ani-open .wx-masks__main {
    opacity: 1;
    pointer-events: auto;
}
// @keyframes anim-open {
// 	0% { opacity: 0; -webkit-transform: scale3d(1.1, 1.1, 1); transform: scale3d(1.1, 1.1, 1); }
// 	100% { opacity: 1; -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); }
// }
// @keyframes anim-close {
// 	0% { opacity: 1; }
// 	100% { opacity: 0; -webkit-transform: scale3d(0.9, 0.9, 1); transform: scale3d(0.9, 0.9, 1); }
// }
</style>