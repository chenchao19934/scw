<template>
  <div class="wx-myCoupon">
    <TheHeader type="backPlain"
               fixed></TheHeader>

    <div class="wx-tabHeader">
      <div class="wx-tabHeader__content">
        <span class="wx-tabHeader__item"
              :class="{'is-checked' : typeSel === 1}"
              @click="showUnused()">未使用</span>
        <span class="wx-tabHeader__item"
              :class="{'is-checked': typeSel === 2}"
              @click="showUsed()">已使用</span>
        <span class="wx-tabHeader__item"
              :class="{'is-checked': typeSel === 3}"
              @click="showOutdate()">已过期</span>
      </div>
    </div>

    <div class="wx-listWrap"
         ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <EmptyList v-if="noData"></EmptyList>
      <ul class="wx-couponList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <Coupon v-for="(couponInfo, index) in couponList"
                :key="index"
                :couponType="typeSel"
                :couponInfo="couponInfo"></Coupon>
      </ul>
      <!-- 下拉到底的提示 -->
      <p class="page-infinite-loading"
         v-show="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span class="loading-tips">{{infiniteScrollTips}}</span>
      </p>
    </div>

  </div>
</template>

<script>
import { TheHeader } from '@/components/index.js';
import * as service from '@/api/service';
import loadMore from '@/mixins/loadMore.js';
import Coupon from './Coupon';
import EmptyList from './EmptyList';

export default {
  name: 'coupons',

  components: {
    TheHeader,
    Coupon,
    EmptyList,
  },

  mixins: [
    loadMore,
  ],

  data() {
    return {
      flag: '',
      couponList: [],
      typeSel: 1,
    };
  },

  created() {
    this.$nextTick(() => {
      this.listHeight = document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;
    });
  },

  methods: {
    async loadMore() {
      if (this.allLoaded) {
        return;
      }

      this.loading = true;
      const data = await service.myCoupons({
        type: this.type,
        flag: this.flag,
        curPos: this.count,
      });

      if (data.errCode !== 0) {
        this.$Toast(data.data.data);
      }

      // 暂无数据
      if (data.result.pages === 0 || (!data.result.list && this.couponList.length === 0)) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.infiniteScrollTips = '数据加载完毕';
        this.allLoaded = true;
        this.noData = true;
        return;
      }

      // 加载完毕
      if (!data.result.list) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.infiniteScrollTips = '数据加载完毕';
        this.allLoaded = true;
        this.noData = false;
        return;
      }

      // 页数大于1
      if (this.count >= 1) {
        this.noData = false;
        this.couponList.push(...data.result.list);
        this.count++;
        this.loading = false;
      }
    },

    // 已使用
    showUsed() {
      if (this.typeSel === 2 || this.loading === true) {
        return;
      }


      this.type = 2;
      this.typeSel = 2;
      this.flag = 1;
      this.couponList = [];

      this.noData = false;
      this.allLoaded = false;
      this.loading = false;
      this.count = 1;
      this.infiniteScrollTips = '加载中...';

      this.loadMore();
    },

    // 未使用
    showUnused() {
      if (this.typeSel === 1 || this.loading === true) {
        return;
      }


      this.type = 1;
      this.typeSel = 1;
      this.flag = '';
      this.couponList = [];

      this.noData = false;
      this.allLoaded = false;
      this.loading = false;
      this.count = 1;
      this.infiniteScrollTips = '加载中...';

      this.loadMore();
    },

    // 已过期
    showOutdate() {
      if (this.typeSel === 3 || this.loading === true) {
        return;
      }


      this.type = 2;
      this.typeSel = 3;
      this.flag = 2;
      this.couponList = [];

      this.noData = false;
      this.allLoaded = false;
      this.loading = false;
      this.count = 1;
      this.infiniteScrollTips = '加载中...';

      this.loadMore();
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(myCoupon) {
  background-color: #f8f8f8;
}

@include b(tabHeader) {
  background-color: #fff;
  @include e(content) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: rem(90);
    font-size: rem(28);
    font-weight: bold;
    background: #f0f2f5;
    margin: 0 rem(50);
  }

  @include e(item) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    height: 100%;
    text-align: center;
    color: #d9d9d9;
    background: #fff;

    @include when(checked) {
      position: relative;
      color: #d6024c;
      &:after {
        position: absolute;
        top: auto;
        left: 0;
        bottom: 0;
        right: 0;
        content: "";
        margin: auto;
        width: rem(76);
        border-bottom: rem(6) solid #d6024c;
      }
    }
  }
}

@include b(listWrap) {
  // margin-top: rem(20);
  padding: rem(20) rem(20) 0;
}

@include b(couponList) {
  padding-bottom: rem(20);
  font-size: rem(24);
}

.no-data-nousedcoupon {
  // background-image: url('./image/nousedcoupon.png');
  background-size: rem(180) rem(180);
  background-position: center rem(60);
  background-repeat: no-repeat;
  padding-top: rem(294);
  font-size: rem(30);
  color: #999999;
  text-align: center;
}
</style>


