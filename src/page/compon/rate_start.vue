<template>
    <div class="wx-statr">
        <span v-for="(x,index) in 5" 
                :class="{'open' : index < count}"
                @click.stop.prevent="changeStatr(index)"
                :key="index"></span>
    </div>
</template>

<script>
    export default {
        props : {
            count : {
                type : Number,
                default : 5
            },
            isClick : {
                type : Boolean,
                default : false
            }
        },
        methods: {
            changeStatr(index) {
                if (this.isClick) {
                    this.$emit('update:count', index+1);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@include b(statr) {
    display: flex;
    align-items: center;
    span {
        min-width : rem(50);
        height : rem(50);
        background : url('../../assets/image/off.png') center no-repeat;
        background-size : 80% 80%;
    }
    span.open {
        background : url('../../assets/image/on.png') center no-repeat;
        background-size : 80% 80%;
    }
}
</style>