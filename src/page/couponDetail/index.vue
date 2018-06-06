  <template>
  <div class="coupon-detail">

    <!-- 导航 -->
    <TheHeader fixed
               type="backCircleGray"></TheHeader>
               
    <div class="cardCode">
      <div class="cardCodeImg">
        <qriously class="qrcodebox"
                  :value="qrcode"
                  :size="140" />
      </div>
      <div class="cardCodeTxt">
        使用时请出示该二维码
      </div>
    </div>

    <div class="coupon-info">
      <h3 class="coupon-info-title">{{ couponInfo.title }}</h3>
      <div class="coupon-info-row">
        <span class="coupon-info-label">发行数量：</span>
        <span class="coupon-info-content">
          <em class="decorate">{{ couponInfo.sendCount === '0' ? '不限' : couponInfo.sendCount }}</em>{{ couponInfo.sendCount === '0' || !couponInfo.sendCount ? '' : '张' }}</span>
      </div>
      <!-- <div class="coupon-info-row">
        <span class="coupon-info-label">兑换数量：</span>
        <span class="coupon-info-content">
          <em class="decorate">2</em>张</span>
      </div> -->
      <div class="coupon-info-row">
        <span class="coupon-info-label">卡券状态：</span>
        <span class="coupon-info-content">
          <em class="decorate">{{ statusTypeText(couponInfo) }}</em>
        </span>
      </div>
      <div class="coupon-info-row">
        <span class="coupon-info-label">领取时间：</span>
        <span class="coupon-info-content">{{ couponInfo.sendTime | capitalizeDate }}</span>
      </div>
      <div class="coupon-info-row">
        <span class="coupon-info-label">有效时间：</span>
        <span class="coupon-info-content">{{ couponInfo.expenseStartTime | capitalizeDate}}-{{ couponInfo.expenseEndTime | capitalizeDate }}</span>
      </div>
    </div>

    <CouponDetail :couponsContent="couponInfo.couponsContent"></CouponDetail>
  </div>
</template>

<script>
import HeadMall from '@/components/HeadMall/index.vue';
import NavMall from '@/components/NavMall/index.vue';
import NavTitle from '@/components/NavTitle/index.vue';
import CouponDetail from './CouponDetail.vue';
import * as service from '@/api/service';

export default {
  name: 'couponDetail',

  components: {
    HeadMall,
    NavMall,
    NavTitle,
    CouponDetail,
  },

  data() {
    return {
      couponInfo: {},
      id: this.$route.params.id,
      cid: this.$route.params.cid,
      sid: '',
      index: 1,
      cardList: [],
      type: 1,
      shopName: '',
      title: '',
      expenseStartTime: '',
      expenseEndTime: '',
      endTime: '',
      cvalue: '',
      codePath: '',
      qrcode: '',
    };
  },

  created() {
    this.$nextTick(async () => {
      await this.getList();
      // const isTest = process.env.IS_TEST;
      // const host = isTest === 'yes' ? 'http://testadmin.w-lans.com' : 'http://wox.w-lans.com';
      const host = 'http://testadmin.w-lans.com';
      this.qrcode = `${host}/Verification/index?bid=${window.$bid}&id=${this.$route.params.id}&sid=${this.sid}`;
    });
  },

  methods: {
    async getList() {
      const data = await service.couponsDetail({
        id: this.id,
      });

      this.couponInfo = data.result.info;
      this.sid = data.result.info.sid;
      this.title = data.result.info.title;
      this.shopName = data.result.info.shopName;
      this.expenseStartTime = data.result.info.expenseStartTime;
      this.expenseEndTime = data.result.info.expenseEndTime;
      this.endTime = data.result.info.endTime;
      this.cvalue = data.result.info.cvalue;
    },

    effective(val) {
      this.index = val;
      this.type = 1;
      this.getList();
    },

    invalid(val) {
      this.index = val;
      this.type = 2;
      this.getList();
    },

    statusTypeText(couponInfo) {
      const { statusType } = couponInfo;

      let statusTypeText = '';
      // if (statusType === 1) {
      //   return '生成';
      // } else if (statusType === 2) {
      //   return '领取';
      // } else if (statusType === 3) {
      //   return '已使用';
      // } else if (statusType === 4) {
      //   return '已作废';
      // }
      // return '';

      switch (statusType) {
        case '1':
          statusTypeText = '生成';
          break;

        case '2':
          statusTypeText = '未使用';
          break;

        case '3':
          statusTypeText = '已使用';
          break;

        case '4':
          statusTypeText = '已作废';
          break;

        default: break;
      }

      return statusTypeText;
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-detail {
  background-color: #fff;
}

.cardInfo {
  margin: rem(0) rem(60) rem(10);
}

.cardCode {
  font-size: 16px;
  padding-top: rem(150);
  .cardCodeImg {
    text-align: center;
  }

  .cardCodeTxt {
    color: #bbb;
    text-align: center;
    font-size: 14px;
    margin-top: rem(40);
  }
}

.coupon-info {
  margin: rem(50) rem(50) 0;
  padding: rem(36) 0 0;
  border-top: 1px dashed #b2b2b2;
  &-title {
    line-height: rem(44);
    font-size: rem(32);
    font-weight: bold;
    color: #000;
  }
  &-row {
    line-height: rem(44);
    .coupon-info-label {
      font-size: rem(28);
      font-weight: bold;
      color: #333333;
    }
    .coupon-info-content {
      font-size: rem(28);
      .decorate {
        font-size: rem(32);
        font-weight: bold;
        color: #ff5152;
      }
    }
  }
}
</style>

