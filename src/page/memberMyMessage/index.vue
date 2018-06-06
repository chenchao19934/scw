<template>
  <div class="wx-myMessage">
    <TheHeader title="我的消息"></TheHeader>

    <div class="list-wrap"
         ref="list"
         :style="{height: listHeight + 'px', overflow: 'scroll'}">
      <ul class="wx-messageList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <MessageItem v-for="(message, index) in messageList"
                     :key="index"
                     :message="message"></MessageItem>
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
import MessageItem from './MessageItem';
import * as service from '@/api/service';
import loadMore from '@/mixins/loadMore.js';

export default {
  name: 'messageIndex',

  components: {
    TheHeader,
    MessageItem,
  },

  mixins: [
    loadMore,
  ],

  data() {
    return {
      messageList: [],
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
      const data = await service.myMessage({
        curPos: this.count,
      });

      if (data.errCode === 0) {
        // 暂无数据
        if (data.result.pages === 0) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.allLoaded = true;
          this.noData = true;
          return;
        }

        // 数据加载完成
        if (!data.result.list) {
          this.infiniteScrollTips = '数据加载完毕';
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.allLoaded = true;
          return;
        }

        // 页数大于1
        if (this.count >= 1) {
          this.messageList.push(...data.result.list);
          this.count += 1;
          this.loading = false;
        }
      } else {
        this.$Toast(data.data.data);
      }
    },
    async getList() {
      const data = await service.myMessage({
        curPos: this.pn,
      });
      if (data.errCode === -1) {
        if (this.pn === 1) {
          this.nodata = true;
        } else {
          this.$refs.loadmore.bottomLoadingText = '持续更新中...';
        }
      } else if (data.result.list != null) {
        this.nodata = false;
        for (let i = 0; i < data.result.list.length; i += 1) {
          this.message_list.push(data.result.list[i]);
        }
        if (data.result.list.length >= 5) {
          this.pn += 1;
        } else {
          this.allLoaded = true;
        }
      } else if (this.pn === 1) {
        this.nodata = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(myMessage) {
  background-color: #ededed;
  min-height: 100vh;
}

@include b(messageList) {
  padding: rem(30) rem(20) 0;
}
</style>

