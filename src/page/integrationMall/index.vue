<template>
  <div class="wx-integrationMall">
    <TheHeader fixed
               type="backPlain"></TheHeader>

    <TheSearch v-model="searchText"
               @search="onSearchGoods(searchText)"></TheSearch>

    <IntegrationSection>
      <IntegrationSectionItem section="1-1001"
                              :checked="sectionIndex === 1"
                              @click.native="onSelectSection(1)"></IntegrationSectionItem>
      <IntegrationSectionItem section="1000-5000"
                              :checked="sectionIndex === 2"
                              @click.native="onSelectSection(2)"></IntegrationSectionItem>
      <IntegrationSectionItem section="5000以上"
                              :checked="sectionIndex === 3"
                              @click.native="onSelectSection(3)"></IntegrationSectionItem>
    </IntegrationSection>

    <div ref="list"
         :style="{height: listHeight + 'px', overflow: 'scroll', padding: '15px 0'}">
      <div class="no-data"
           v-if="noData">暂无数据~</div>
      <GoodList>
        <GoodListItem v-for="(good, index) in goodsList"
                      :key="index"
                      :good="good"></GoodListItem>
      </GoodList>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { HeadMall, TheHeader, TheSearch } from '@/components/index';
import IntegrationSection from './IntegrationSection';
import IntegrationSectionItem from './IntegrationSectionItem';
import GoodList from './GoodList';
import GoodListItem from './GoodListItem';
import * as service from '@/api/service';
import loadMore from '@/mixins/loadMore.js';

export default {
  name: 'integrationMall',

  components: {
    HeadMall,
    TheHeader,
    TheSearch,
    IntegrationSection,
    IntegrationSectionItem,
    GoodList,
    GoodListItem,
  },

  mixins: [
    loadMore,
  ],

  data() {
    return {
      sectionIndex: 1,
      searchText: '',
      goodsList: [],
      myIntegral: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$Indicator.open('努力加载中...');
      this.listHeight = document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;
      this.getIntegrationMallDate();
    });
  },

  methods: {
    onSearchGoods: _.debounce(async function onSearchGoods() {
      this.resetData();
      this.sectionIndex = '';
      this.getIntegrationMallDate();
    }, 500, {
      leading: true,
      trailing: false,
    }),

    onSelectSection(sectionIndex) {
      this.resetData();
      this.sectionIndex = sectionIndex;
      this.getIntegrationMallDate();
    },

    resetData() {
      this.noData = false;
      this.goodsList = [];
      this.myIntegral = 0;
    },

    async getIntegrationMallDate() {
      const data = await service.integralMall({
        rangeId: this.sectionIndex,
        search_text: this.searchText,
      });
      this.$Indicator.close();

      // 没有数据
      if (!data.result.list || (data.result.list && data.result.list.length === 0)) {
        this.noData = true;
        return;
      }

      // 添加图片前缀
      for (let i = 0; i < data.result.list.length; i++) {
        data.result.list[i].goodPic = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.list[i].goodPic}`;
      }

      this.goodsList = data.result.list;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(integrationMall) {
  overflow: hidden;
}
</style>


