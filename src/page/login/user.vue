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
input::-webkit-input-placeholder{
    color:#fff;
}
@include b(loginForm) {
    position: relative;
    margin: rem(60) rem(60) 0;
    border-radius: 8px;
    overflow: hidden;
    background: #000;
    opacity: 0.7;
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
            right: 10px;
            top: 9px;
            width: 95px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            color: #fff;
            background: transparent;
            border: 1px solid #fff;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10;
        }
        input {
            border: none;
            flex: none;
            color: #fff;
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