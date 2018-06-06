<template>
    <div v-if="shop.oss != 1" class="wx-addcark" @click.stop="addToCark($event)"></div>
    <div v-else class="wx-buy" @click.stop="addDish">补货中</div>
</template>

<script>
    export default {
        props : ['shop'],
        data() {
            return {
                showMoveDot : [], // 控制下落小圆点显示隐藏
            }
        },
        methods : {
            addToCark(event) {
                // let elLeft = event.target.getBoundingClientRect().left,
                //     elBottom = event.target.getBoundingClientRect().bottom;
                let elLeft = event.clientX,
                    elBottom = event.clientY;
                this.showMoveDot.push(true);
                if (this.shop.is_multi_type == 1) {
                    this.$emit('showMoveUnit',this.shop);
                }else {
                    if (!this.shop.goods_id) {
                        this.shop.goods_id = this.shop.id;
                    }
                    let obj = {
                        "goods_id" : this.shop.id,
                        "goods_name" : this.shop.name,
                        "price" : this.shop.price,
                        "newprice" : this.shop.newprice,
                        "goods_unit" : this.shop.goods_unit,
                        "img" :this.shop.img,
                        "tag" : this.shop.tag,
                        "number" : 1,
                        "check" : true,
                        "description" : this.shop.description,
                        "is_multi_type" : this.shop.is_multi_type,// 多规格
                        "oss" : this.shop.oss,
                        "limit" : this.shop.limit,
                    }
                    this.$emit('showMoveDot',this.showMoveDot,elLeft,elBottom,this.shop);
                }
            },
            addDish() {
                this.$toast({message:'加急补货中。。',position:'center',duiration:'1500'})
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(addcark) {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: rem(60);
    height: rem(60);
    padding: rem(4);
    background: url("../../../assets/image/tab/menu_add.png") center center no-repeat;
    background-size: 100% 100%;
}
@include b(buy) {
    position: absolute;
    right: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    padding: 2px 5px;
    background: #a1a1a1;
    color: #fff;
    font-size: rem(26);
}
</style>