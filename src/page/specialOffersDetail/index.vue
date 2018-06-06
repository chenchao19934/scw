<template>
  <div class="wx-perferentialInfoDetail">

    <!-- 导航 -->
    <TheHeader fixed
               type="backCircle"></TheHeader>

    <!-- Banner -->
    <Banner class="banner-image">
      <img :src="activityInfo.imgPath"
           alt=""
           slot="bannerImg">
    </Banner>

    <InfoBrief :activityInfo="activityInfo"></InfoBrief>

    <ActivityDetail :activityInfo="activityInfo"></ActivityDetail>

    <!-- 领取卡券 -->
    <div class="bg-white wx-getCoupon"
         v-if="couponslist.length !== 0">
      <h3 class="wx-getCoupon__title color-theme m-title">最新活动</h3>
      <ul class="wx-couponList">
        <li class="wx-couponItem coupon-noused"
            v-for="(item, index) in couponslist"
            :key="index"
            @click='onGetCoupon(item)'>
          <h3 class="wx-couponItem__shopnameWrap">
            <!-- <span class="wx-couponItem__imgWrap">
              <img src=""
                   alt="">
            </span> -->
            <span class="wx-couponItem__shopname">{{ item.shopName }}</span>
          </h3>
          <div class="wx-couponItem__couponContent">
            {{ item.title }}
          </div>
          <div class="wx-couponItem__useCondition">
            使用时间 {{ item.expenseStartTime | dateStringFilterDot }} - {{ item.expenseEndTime | dateStringFilterDot }}
          </div>
          <div class="wx-couponItem__valueWrap">
            <!-- <span class="wx-couponItem__value">{{ item.discount }}</span> -->
            <span class="wx-couponItem__type">{{ couponTypeParse(item) }}</span>
          </div>
        </li>
        <!-- <li class="coupon"
            v-for="(coupon, index) in couponslist"
            :key="index"
            @click="Toast('暂未开放')">
          <div class="coupon-left">
            <h3 class="coupon-title">{{ activityInfo.shopName }}</h3>
            <div class="coupon-con">{{ coupon.title }}</div>
            <div class="coupon-date">
              <span class="label">有效时间</span>
              <span class="date">{{ coupon.expenseStartTime | dateStringFilterDot }} - {{ coupon.expenseEndTime | dateStringFilterDot }}</span>
            </div>
          </div>
          <div class="coupon-right">
            点击领取
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner/index';
import InfoBrief from './InfoBrief';
import ActivityDetail from './ActivityDetail';
import * as service from '@/api/service';
import {
  TheHeader,
} from '@/components/index.js';

export default {
  components: {
    Banner,
    TheHeader,
    InfoBrief,
    ActivityDetail,
  },
  data() {
    return {
      imgPath: '',
      adTitle: '',
      sTime: '',
      eTime: '',
      overTime: false,

      adDatailShow: true,
      actDatailShow: false,
      adDetails: '',
      noDatailShow: false,
      couponsShow: true,

      activityInfo: {},
      couponslist: [],
    };
  },

  mounted() {
    this.activityDetailsList();
  },
  methods: {
    actState(stime, etime) {
      const currentTime = new Date().getTime();
      const startTime = stime * 1000;
      const endTime = etime * 1000;
      if (currentTime < startTime) {
        return '活动未开始';
      } else if (currentTime >= startTime && currentTime < endTime) {
        return '活动进行中';
      } else if (currentTime > endTime) {
        return '活动已结束';
      }

      return '';
    },
    async activityDetailsList() {
      const data = await service.activityDetails({
        id: this.$route.params.id,
      });

      if (data.errCode === -1) {
        this.$MessageBox('非常抱歉', data.errMsg);
      } else if (data.errCode === 0) {
        data.result.info.imgPath =
          `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.info.imgPath}`;
        this.imgPath = data.result.info.imgPath;
        this.adTitle = data.result.info.title;

        this.activityInfo = data.result.info;

        if (data.result.info.nContent === '') {
          this.actDatailShow = true;
        } else {
          this.actDatailShow = false;
          this.adDetails = data.result.info.nContent;
        }

        this.sTime = data.result.info.stime;
        this.eTime = data.result.info.etime;
        if (this.eTime < new Date().getTime() / 1000) {
          this.overTime = true;
        }
        if (data.result.couponslist.length > 0) {
          this.couponslist = data.result.couponslist;
        } else {
          this.adDatailShow = false;
          this.noDatailShow = true;
          this.couponsShow = false;
        }
      }
    },
    async onGetCoupon(coupon) {
      const data = await service.getCoupons({
        id: coupon.id,
      });

      if (data.errCode === 0) {
        await this.$MessageBox.alert('卡券领取成功！', '温馨提示');

        this.$router.push({ name: 'coupons' });
      } else if (data.errCode === -1) {
        this.$Toast(data.errMsg);
        // this.$router.push({ name: 'memberCenter' });
      }
    },

    couponTypeParse(coupon) {
      let couponTypeStr = '';
      switch (coupon.cardType) {
        case '1':
          couponTypeStr = '普通卡券';
          break;
        case '2':
          couponTypeStr = '普通卡券';
          break;
        case '3':
          couponTypeStr = '礼品券';
          break;
        case '4':
          couponTypeStr = '游戏券';
          break;
        case '5':
          couponTypeStr = '活动券';
          break;
        case '6':
          couponTypeStr = '评价卡券';
          break;
        case '7':
          couponTypeStr = '优惠券';
          break;
        case '8':
          couponTypeStr = '现金券';
          break;
        case '9':
          couponTypeStr = '实体卡券';
          break;
        case '10':
          couponTypeStr = '课程卡券';
          break;
        case '11':
          couponTypeStr = '折扣券';
          break;
        case '12':
          couponTypeStr = '满减券';
          break;
        case '13':
          if (coupon.businessType === '1') {
            couponTypeStr = '门票券';
          } else if (coupon.businessType === '2') {
            couponTypeStr = '车位预约券';
          } else {
            couponTypeStr = '停车券';
          }
          break;
        case '14':
          couponTypeStr = '积分券';
          break;
        default:
          break;
      }

      console.log('couponType');
      if (!couponTypeStr) {
        console.log('coupon', coupon);
      }

      return couponTypeStr;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(perferentialInfoDetail) {
  // overflow: hidden;
  // height: 100vh;
}

@include b(getCoupon) {
  padding: 0 rem(20) rem(50);
  border-top: rem(18) solid #f0f2f5;

  @include e(title) {
    display: flex;
    align-items: center;
    height: rem(80);
    font-weight: bold;
    font-size: rem(32);
    color: #333333;
  }
}

@include b(couponList) {
  .coupon-noused {
    background: url("./image/coupon_bg-red.png") center center no-repeat;
    background-size: cover;

    .coupon-value-wrap {
      color: #fff;
    }
  }
}

@include b(couponItem) {
  position: relative;
  padding: 0 rem(50);
  height: rem(178);
  border-radius: rem(10);
  background-size: cover;
  box-shadow: 0 0 rem(20) rem(-8) #000;
  &:nth-child(n + 2) {
    margin-top: rem(26);
  }

  @include e(shopnameWrap) {
    display: flex;
    align-items: center;
    height: rem(54);
    font-size: rem(28);
    color: #707070;
    font-weight: bold;
  }

  @include e(shopname) {
    width: rem(450);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @include e(imgWrap) {
    width: rem(36);
    height: rem(36);
    border-radius: 50%;
    background-color: gray;
    margin-right: rem(14);
  }

  @include e(couponContent) {
    width: rem(450);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(40);
    line-height: rem(66);
    font-weight: bold;
    color: #000;
  }

  @include e(useCondition) {
    line-height: rem(58);
    color: #000;
    font-size: rem(24);
    // background: url("./image/dashed_line.png") 0 0 repeat-x;
    background-size: rem(10) rem(2);
  }

  @include e(valueWrap) {
    position: absolute;
    right: 0;
    top: 0;
    width: rem(196);
    height: 100%;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
  }

  @include e(value) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(72);
    width: 100%;
    color: #fff;
  }

  @include e(type) {
    display: flex;
    align-items: center;
    font-size: rem(36);
    color: #fff;
  }
}

// .m-title {

// }
.m-content {
  padding-top: rem(24);
  p {
    line-height: rem(36);
  }
}
</style>




