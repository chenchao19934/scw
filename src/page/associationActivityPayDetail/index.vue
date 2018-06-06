<template>
  <div class="pay-details">

    <TheHeader title="社群活动支付" isUnderline></TheHeader>

    <ActivityDetail :productData="productData"
                    :standard="standard"></ActivityDetail>

    <div class="wx-payWay"
         v-if="productData.allIntegral">
      <div class="wx-payWay__row wx-payWay__title">
        <div class="wx-payWay__leftTitle">选择支付方式</div>
        <div class="wx-payWay__rightContent color-theme">我的可用积分：{{ productData.allIntegral }}</div>
      </div>

      <ThePayCheckList :productData="productData"
                       :amount="$route.params.buyNum | parseInt"
                       v-model="payWayIndex"></ThePayCheckList>
    </div>

    <IButton size="large"
             type="red"
             style="border-radius: 0; position: fixed; bottom: 0;"
             @click="onPay()">立即支付</IButton>
  </div>
</template>

<script>
import { TheHeader, ThePayCheckList } from '@/components/index';
import ActivityDetail from './ActivityDetail';
import * as service from '@/api/service';
import wx from 'weixin-js-sdk';
import _ from 'lodash';

export default {
  name: 'associationActivityPayDetail',

  components: {
    TheHeader,
    ThePayCheckList,
    ActivityDetail,
  },

  data() {
    return {
      productData: {
        info: {
          address: '',
          lessonArr: [],
        },
      },
      standard: {},
      payWayIndex: -1,
      uid: 0,
      paryOrderID: '',
      reurl: '',
    };
  },

  mounted() {
    // 判断是否支付成功
    this.$nextTick(() => {
      this.reurl = window.location.href;
      this.getData();
    });
  },

  methods: {
    // 获取支付显示信息
    async getData() {
      const data = await service.lessonDetail({
        id: this.$route.params.id,
      });
      this.uid = data.uid;
      this.productData = data.result;
      const { lessonArr } = data.result.info;

      for (let i = 0; i < lessonArr.length; i += 1) {
        if (this.$route.params.standardID === lessonArr[i].id) {
          this.standard = lessonArr[i];
        }
      }
    },

    // 点击进行支付
    onPay: _.debounce(
      async function onPay() {
        let tips = '';
        if (this.payWayIndex === -1) {
          this.$Toast('请选择支付方式');
        } else {
          if (this.payWayIndex === 0) {
            // 积分支付
            tips =
              `是否确定扣除 ${this.productData.info.integral * this.$route.params.buyNum} 积分，兑换${this.productData.info.title}活动？`;
          } else if (this.payWayIndex === 1) {
            // 组合支付
            tips =
              `是否确定扣除 ${this.productData.info.mixMoney * this.$route.params.buyNum} 元和 ${this.productData.info.mixIntegral * this.$route.params.buyNum} 积分，兑换${this.productData.info.title}活动？`;
          } else {
            // 微信支付
            tips =
              `是否确定扣除 ${this.productData.info.money * this.$route.params.buyNum} 元，兑换${this.productData.info.title}活动？`;
          }

          this.$MessageBox.confirm(tips, '温馨提示').then(async () => {
            if (this.payWayIndex === 0) {
              // 积分支付
              this.integralPay();
            } else {
              this.mixPay();
            }
          });
        }
      },
      200,
      {
        leading: false,
        trailing: true,
      },
    ),

    // 积分支付
    async integralPay() {
      // 扣减积分
      const data = await service.exchangeWxCardLesson({
        buyNum: this.$route.params.buyNum,
        id: this.standard.id,
      });

      if (data.errCode === 0) {
        this.$MessageBox.alert('您的优惠券已经放入您的卡包').then(() => {
          // 进入卡券领取页面
          this.$router.push({ name: 'coupons' });
        });
      } else {
        this.$MessageBox('提 示', data.errMsg);
      }
    },

    // 混合支付
    async mixPay() {
      if (this.payWayIndex === 1 && window.parseInt(this.productData.allIntegral) < this.productData.info.mixIntegral * this.$route.params.buyNum) {
        this.$Toast('积分不足');
        return;
      }

      // 判断运行环境
      const istest = process.env.IS_TEST;
      const bid = process.env.BID;
      const externalBid = process.env.EXTERNAL_BID;
      const attach = {
        bid: istest === 'yes' ? externalBid : bid,
        id: this.standard.id,
        payType: this.payWayIndex === 1 ? 2 : 1, // 1: 微信支付， 2：混合支付
        userId: this.uid,
        buyNum: this.$route.params.buyNum,
      };

      const baseURL = process.env.BASE_URL;
      const href = window.location.href.slice(0, window.location.href.indexOf('/#/'));
      const data = await service.mixPay({
        openid: istest === 'yes' ? 'oKPuYjvxCaklKurNUF6zcLfe_EY4' : this.productData.openid,
        body: '活动',
        total_fee: this.payWayIndex === 1 ? this.productData.info.mixMoney : this.productData.info.money, // 微信支付价格
        notify_url: `${baseURL}/Webapi/ShopTeach/weixinpayreturn`, // 支付成功后通知的后台接口
        attach: JSON.stringify(attach),
        reurl: `${href}/mall_temp/#/coupons?bid=${window.$bid}`,
      });

      if (data.ErrCode !== 0) {
        this.$Toast(data.errMsg);
      }

      window.location.href = data.data.url;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(payWay) {
  border-top: rem(20) solid #f0eff4;
  line-height: rem(84);
  font-size: rem(26);
  background-color: #fff;

  @include e(row) {
    padding: 0 rem(26);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  @include e(leftTitle) {
    font-weight: bold;
  }
}
</style>
