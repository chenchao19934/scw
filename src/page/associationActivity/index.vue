<template>
  <div class="member-activity">
    <!-- 头部 -->
    <TheHeader fixed
               type="backPlain"></TheHeader>

    <!-- 搜索框 -->
    <TheSearch v-model="searchText"
               @search="onSearch(searchText)"></TheSearch>

    <div ref="list"
         :style="{height: listHeight + 'px', overflow: 'scroll'}">
      <ul class="list activity-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <ActivityItem v-for="(activity, index) in activityList"
                      v-if="activityList.length !== 0"
                      :key="index"
                      :activity="activity"
                      @click.native="$router.push({name: 'associationActivityDetail', params: {id: activity.id}})">
          <BottomContent :activity="activity"></BottomContent>
        </ActivityItem>
        <NoDataItem v-if="noData"></NoDataItem>
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
import loadMore from '@/mixins/loadMore.js';
import _ from 'lodash';
import { TheSearch, TheHeader } from '@/components/index';
import * as service from '@/api/service';
import ActivityItem from './ActivityItem';
import BottomContent from './BottomContent';
import NoDataItem from './NoDataItem';

export default {
  name: 'associationActivity',

  components: {
    ActivityItem,
    BottomContent,
    TheSearch,
    TheHeader,
    NoDataItem,
  },

  mixins: [
    loadMore,
  ],

  data() {
    return {
      activityList: [],
      searchText: '',
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.listHeight =
        document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;
    });
  },

  methods: {
    async loadMore(searchText) {
      if (this.allLoaded) {
        return;
      }

      this.loading = true;

      const res = await service.lessonList({
        search_text: searchText,
        curPos: this.count,
      });

      if (res.errCode === 0 && res.result.list) {
        this.activityList.push(...res.result.list);

        if (this.count === res.result.pages || !res.result.list) {
          this.infiniteScrollTips = '数据加载完毕';
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.allLoaded = true;
        }
      } else if (this.activityList.length === 0) {
        this.noData = true;
        this.infiniteScrollTips = '数据加载完毕';
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.allLoaded = true;
      }
    },

    onSearch: _.debounce(async function onSearch(searchText) {
      // 无限加载
      this.infiniteScrollTips = '加载中...';
      this.allLoaded = false;
      this.loading = false;
      this.count = 1;
      this.activityList = [];
      this.loadMore(searchText);
    }, 500, {
      leading: true,
      trailing: false,
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>

