<template>
    <div class="wx-loginForm">
        <label class="wx-loginForm__labels ellipsis">
            <slot name="img"></slot>
            <input :type="type" :placeholder="placeholder" v-model="currentValue" :maxlength="length">
            <slot name="code"></slot>
        </label>
    </div>
</template>

<script>
    export default {
        props : {
            name : {
                type : String
            },
            placeholder : {
                type : String
            },
            length : {
                type : Number
            },
            type : {
                type : String,
                default : 'text'
            },
            value : {
                type: String,
                default: function () {  
                    return ''  
                }  
            }
        },
        computed: {
            currentValue : {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val); 
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(loginForm) {
    position: relative;
    margin-bottom: rem(15);
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    opacity: 1;
    @include e(labels) {
        display: flex;
        align-items: center;
        background-color: transparent;
        padding: 6px 0 5px 16px;
        span {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            img {
                display: block;
                width: 100%;
            }
        }
        em {
            position: absolute;
            right: rem(10);
            top: rem(20);
            width: rem(170);
            height: rem(52);
            line-height: rem(52);
            text-align: center;
            color: #abd13e;
            background: transparent;
            font-size: rem(24);
            z-index: 10;
        }
        input {
            border: none;
            flex: none;
            padding-left: 10px;
            height: 34px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 16px;
            background-color: transparent;
        }
    }
}
</style>