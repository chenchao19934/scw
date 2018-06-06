<template>
  <div class="wx-couponDetails" v-if="couponsContent">
    <h3 class="wx-couponDetails__title">卡券详情</h3>
    <div class="wx-couponDetails__content">
      <p v-html="couponsContent"></p>
      <!-- <p class="coupon-details-row">1.凭此券可以在GAGA鲜语店铺消费后使用。</p>
        <p class="coupon-details-row">2.本券仅限于万科城市广场GAGA鲜语店内使用</p>
        <p class="coupon-details-row">3.本券需要下载才能使用。</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    couponsContent: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@include b(couponDetails) {
  margin: rem(50) rem(50) 0;
  padding: rem(10) 0 0;
  border-top: 1px dashed #b2b2b2;

  @include e(title) {
    line-height: rem(50);
    font-size: rem(32);
    font-weight: bold;
    color: #000;
    padding-bottom: rem(10);
  }

  @include e(content) {
    font-size: rem(28);
    color: #999999;
    .coupon-detail-row {
      line-height: rem(34);
    }

    img {
      width: 100%;
    }
  }
}
</style>


