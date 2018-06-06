<template>
    <mt-cell :title="title" is-link>
        <img style="margin-right:10px" slot="icon" :src="icon" width="24" height="24">
    </mt-cell>
</template>

<script>
    export default {
        props : {
            title : {
                type : String
            },
            icon : {
                type : String
            }
        }
    }
</script>

<style scoped>

</style>