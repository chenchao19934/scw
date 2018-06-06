<template>
    <div class="wx-itemInput">
        <mt-field :label="lab" :placeholder="place" v-model="username"></mt-field>
    </div>
</template>

<script>
    export default {
        props :{
            lab :{
                type : String
            },
            place : {
                type : String
            }
        }
    }
</script>

<style scoped>

</style>