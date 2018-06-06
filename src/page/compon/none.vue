<template>
    <div class="none-data">
		<div class="no-bac">
            <div></div>
        </div>
		<p>{{title}}</p>
  	</div>
</template>

<script>
    export default {
        props : {
            title : {
                type :String
            }
        }
    }
</script>

<style lang="scss" scoped>
.none-data {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .no-bac {
        width: 100%;
        flex: 0 0 1;
        > div {
            width: rem(160);
            height: rem(220);
            margin: 0 auto;
            background: url("../../assets/image/icon_big_scw.png") center no-repeat;
            background-size: 100%;
        }
    }
    p {
        flex: 0 0 1;
        text-align: center;
        color: #717171;
        font-size: rem(28)
    }
}
</style>