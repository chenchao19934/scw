<template>
    <div class="wx-title">
        <mt-header :title="titles" fixed>
            <mt-button icon="back" @click="back" slot="left">返回</mt-button>
            <mt-button v-if="search" 
                        icon="search" 
                        @click="$router.push({name : 'search'})"
                        slot="right"></mt-button>
            <mt-button v-if="more" @click="showNav" icon="more" slot="right">
                <slot></slot>
            </mt-button>
            <mt-button v-if="add" @click="toParent" slot="right">{{add}}</mt-button>
        </mt-header>
    </div>
</template>

<script>
    export default {
        props : {
            titles : {
                type : String
            },
            search : {
                type : String
            },
            more : {
                type : String
            },
            add : {
                type : String
            },
            showUnitTitle : {
                type : Boolean,
                default :false
            },
            isConfirm: {
                type : Boolean,
                default :false
            }
        },
        methods : {
            back() {
                if(this.isConfirm) {
                    this.$emit('backs');
                }else {
                    this.$router.go(-1);
                }
            },
            showNav() {
                this.$emit('navs');
            },
            toParent() {
                this.$emit('add');
            },
            showMask() {
                this.$emit('showMask');
            }
        }
    }
</script>

<style lang="scss" scope>
// @include b(title) {
//     position: fixed;
//     width : 40px;
//     height : 40px;
//     z-index:10001;
// }
</style>
