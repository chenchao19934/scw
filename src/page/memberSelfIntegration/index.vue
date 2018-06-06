<template>
  <div class="self-integration">
    <TheHeader title="自助积分"></TheHeader>

    <!-- 会员信息 -->
    <MemberInfo :memberCenterData="memberCenterData"></MemberInfo>

    <SelfFuncs>
      <i-cell title="查询进度"
              icon="magnifying-glass"
              is-link
              @click.native="$router.push({ name: 'memberProgressQuery' })"></i-cell>
      <i-cell title="自助积分指南"
              icon="book"
              is-link
              @click.native="guideShow = true"></i-cell>
    </SelfFuncs>

    <FuncsPannel>
      <i-button type="red"
                @click="scanQRCode()">
        <span class="i-icon i-icon-scan"
              style="margin-right: 10px"></span>
        扫码积分
      </i-button>
      <i-button type="red"
                @click="gotoPhotoPoint()">
        <span class="i-icon i-icon-photo"
              style="margin-right: 10px"></span>
        拍照积分
      </i-button>
    </FuncsPannel>

    <mt-popup v-model="guideShow">
      <GuidePopContent :regulation="regulation"></GuidePopContent>
    </mt-popup>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import {
  ICell,
  IButton,
  TheHeader,
} from '@/components/index.js';
import memberCenterMixin from '@/mixins/memberCenter';
import * as service from '@/api/service';
import GuidePopContent from './GuidePopContent';
import MemberInfo from './MemberInfo';
import SelfFuncs from './SelfFuncs';
import FuncsPannel from './FuncsPannel';

export default {
  name: 'memberSelfIntegration',

  components: {
    ICell,
    IButton,
    TheHeader,
    MemberInfo,
    SelfFuncs,
    FuncsPannel,
    GuidePopContent,
  },

  mixins: [memberCenterMixin],

  data() {
    return {
      guideShow: false,
      regulation: '',
    };
  },

  created() {
    this.authorization();
    this.getMemberCenterData();
    this.getSelfIntegrationGuide();
  },

  methods: {
    async authorization() {
      const url = encodeURIComponent(window.location.href.split('#')[0]);
      const {
        appId,
        timestamp,
        signature,
        nonceStr,
      } = await service.getPublicJSSDK({
        url,
      });

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList: ['scanQRCode'],
      });

      return Promise.resolve({
        appId,
        timestamp,
        signature,
        nonceStr,
      });
    },

    async scanQRCode() {
      if (window.$bid === '51') {
        this.$Toast('暂未开放');
        return;
      }

      wx.ready(async () => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: async (res) => {
            const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

            const data = await service.scanIetegral({
              data: result,
            });

            this.$MessageBox.alert(data.errMsg);
          },
          fail(error) {
            alert(error);
          },
        });
      });
    },

    async getSelfIntegrationGuide() {
      const data = await service.integralShow({});
      this.regulation = data.result.regulation;
    },

    gotoPhotoPoint() {
      console.log('window.$bid', window.$bid);
      if (window.parseInt(window.$bid) === 51) {
        window.location.href = this.memberCenterResult.ylUrlPhotoPoint;
        return;
      }

      this.$router.push({ name: 'memberPhotoIntegration' });
    },
  },
};
</script>

<style lang="scss" scoped>
.mint-popup {
  background-color: transparent;
}

@include b(selfIntegration) {
  min-height: 100vh;
  background-color: #ededed;
}
</style>

