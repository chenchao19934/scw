<template>
  <div class="wx-myIntegration">
    <TheHeader title="我的积分"></TheHeader>

    <!-- 会员信息 -->
    <MemberInfo :memberCenterData="memberCenterData"></MemberInfo>

    <!-- 兑换记录-->
    <Records>
      <i-navbar class="page-part" v-model="selected">
        <i-tab-item id="1"
                    @click.native="resetData('1')">收入</i-tab-item>
        <i-tab-item id="2"
                    @click.native="resetData('2')">支出</i-tab-item>
      </i-navbar>

      <TabHeader></TabHeader>
      <!-- <TotalNum :exchangeNum="grandTotalNum | parseInt"></TotalNum> -->

      <div ref="list" :style="{overflow: 'scroll', height: (listHeight - 30) + 'px'}">
        <ul class="record-list"
            v-infinite-scroll="exchangeLoadMore"
            infinite-scroll-disabled="exchangeLoading"
            infinite-scroll-distance="50">
          <RecordsItem v-for="(record, index) in exchangeRecords"
                       :key="index"
                       :record="record"></RecordsItem>
        </ul>

        <!-- 下拉到底的提示 -->
        <p v-show="exchangeLoading"
           class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          <span class="loading-tips">{{ exchangeInfiniteScrollTips }}</span>
        </p>
      </div>

      <TotalNum :exchangeNum="exchangeNum | parseInt"></TotalNum>
    </Records>
  </div>
</template>

<script>
import {
  ICell,
  ITabContainer,
  ITabContainerItem,
  INavbar,
  ITabItem,
  TheHeader,
} from '@/components/index.js';
import MemberInfo from './MemberInfo';
import Records from './Records';
import TabHeader from './TabHeader';
import RecordsItem from './RecordsItem';
import TotalNum from './TotalNum';
import * as service from '@/api/service';
import memberCenterMixin from '@/mixins/memberCenter';

export default {
  name: 'memberMyIntegration',

  components: {
    ICell,
    ITabContainer,
    ITabContainerItem,
    INavbar,
    ITabItem,
    TheHeader,
    MemberInfo,
    Records,
    TabHeader,
    RecordsItem,
    TotalNum,
  },

  data() {
    return {
      listHeight: 0,
      exchangeAllLoaded: false,
      exchangeLoading: false,
      exchangeCount: 1,
      exchangeInfiniteScrollTips: '加载中...',
      exchangeNum: 0,

      selected: '1',
      grandTotalRecords: [], // 累计记录
      exchangeRecords: [], // 兑换记录
    };
  },

  mixins: [
    memberCenterMixin,
  ],

  created() {
    this.getMemberCenterData();
    this.$nextTick(() => {
      this.listHeight = document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;
      console.log('listHeight', this.listHeight);
    });
  },

  methods: {
    resetData(selected) {
      console.log('selected', selected);
      this.selected = selected;
      this.exchangeAllLoaded = false;
      this.exchangeLoading = false;
      this.exchangeCount = 1;
      this.exchangeInfiniteScrollTips = '加载中...';
      this.exchangeNum = 0;
      this.exchangeRecords = []; // 兑换记录
      console.log('exchangeRecords', this.exchangeRecords);
      this.exchangeLoadMore();
    },

    async exchangeLoadMore() {
      if (this.exchangeAllLoaded) {
        return;
      }

      this.exchangeLoading = true;

      const type = this.selected === '1' ? '1' : '2';

      const data = await service.memberIntegral({
        type,
        curPos: this.exchangeCount,
      });

      if (data.errCode === 0) {
        this.exchangeNum = data.result.allCount;
        // 数据加载完成
        if (
          data.result.pages === 0 || this.exchangeCount === data.result.pages || !data.result.list
        ) {
          if (data.result.pages === 0) {
            this.noData = true;
          }

          if (data.result.list) {
            if (this.selected === '1') {
              this.exchangeRecords.push(...data.result.list);
            } else {
              this.exchangeRecords.push(...data.result.list);
            }
          }
          this.exchangeInfiniteScrollTips = '数据加载完毕';
          setTimeout(() => {
            this.exchangeLoading = false;
            this.exchangeAllLoaded = true;
          }, 1000);
          return;
        }

        // 页数大于1
        if (this.exchangeCount >= 1) {
          if (this.selected === '1') {
            this.exchangeRecords.push(...data.result.list);
          } else {
            this.exchangeRecords.push(...data.result.list);
          }
          this.exchangeCount += 1;
          this.exchangeLoading = false;
        }
      } else {
        this.$Toast(data.data.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(myIntegration) {
  height: 100vh;
}
</style>
