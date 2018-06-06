<template>
    <li class="wx-additem" 
        @click="chooseBack(item.detail_address,item.lat,item.lng)"
        @click.stop="chooseCark(item.id)">
        <h2 class="ellipsis">{{item.detail_address}}</h2>
        <p class="ellipsis">{{item.house_number}}</p>
        <div class="wx-additem__detial">
            <span>{{item.name}}</span>
            <span>{{item.sex_name}}</span>
            <span>{{item.phone_number}}</span>
        </div>
        <span class="wx-additem__edit i-icon-writer" @click.stop="addEdit(item.id)"></span>
    </li>
</template>

<script>
    export default {
        props : {
            homeBack : {
                type : Boolean,
                default :false
            },
            item : {
                type : Object
            }
        },
        methods : {
            chooseBack(address,lat,lng) {
                this.$emit("homeBack",address,lat,lng);
            },
            chooseCark(id) {
                this.$emit("carkBack",id);
            },
            addEdit(editId) {
                this.$emit('goEdit',editId)
            },
        }
    }
</script>

<style lang="scss" scoped>
@include b(additem) {
    position: relative;
    border: 1px solid #e8e8e8;
    padding: rem(20);
    margin-bottom: rem(20);
    h2 {
        font-size: rem(32);
        margin-bottom: rem(20);
    }
    > p {
        font-size: rem(28);
        margin-bottom: rem(10); 
    }
    @include e(detial) {
        font-size: rem(26);
        color: #717171;
    }
    @include e(edit) {
        position: absolute;
        right: rem(40);
        bottom: rem(20);
        width: rem(40);
        height: rem(37);
    }
}
</style>