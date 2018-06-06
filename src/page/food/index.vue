<template>
  <div class="shop-list adjust-nav">

    <TheHeader fixed
               type="backPlain"
               style="position: absolute; z-index: 99999;"></TheHeader>

    <TheSearch v-model="searchText"
               style="z-index: 9999;"
               @search="onSearch(searchText)"></TheSearch>

    <MultiTabs v-model="activeName"
               style="position: relative; z-index: 9999;"
               @tabClick="handleClick">
      <MultiTabsItem label="位置"
                     name="position"></MultiTabsItem>
      <MultiTabsItem label="业态"
                     name="typeOfBussiness"></MultiTabsItem>
      <MultiTabsItem label="排序"
                     name="sort"></MultiTabsItem>
    </MultiTabs>

    <mt-popup v-model="selPopShow"
              popup-transition="popup-fade">
      <SelectList v-if="activeName === 'position'">
        <FloorItem :floorInfo="{ floorName: '全部楼层',  id: ''}"
                   :checked="checkedIndex === ''"
                   @click.native="onFloorSwitch({ floorName: '全部楼层',  id: ''}), checkedIndex=''"></FloorItem>
        <FloorItem v-for="(floor, index) in floorList"
                   :key="index"
                   :floorInfo="floor"
                   :checked="checkedIndex === floor.id"
                   @click.native="onFloorSwitch(floor), checkedIndex=floor.id"></FloorItem>
      </SelectList>

      <!-- 业态列表 -->
      <SelectList v-if="activeName === 'typeOfBussiness'">
        <TypeOfBussinessItem v-for="(yetai, index) in yetaiList"
                             :key="index"
                             :yetaiInfo="yetai"
                             :checked="checkedIndex === yetai.id"
                             @click.native="onYetaiSwitch(yetai); checkedIndex=yetai.id"></TypeOfBussinessItem>

      </SelectList>

      <SelectList v-if="activeName === 'sort'">
        <SortItem v-for="sortInfo in sortList"
                  :key="sortInfo.id"
                  :title="sortInfo.title"
                  :checked="checkedIndex === sortInfo.id"
                  @click.native="onSortSwitch(sortInfo.sortWay); checkedIndex=sortInfo.id"></SortItem>
      </SelectList>
    </mt-popup>

    <div class="tab-con"
         ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <ul class="column-tab-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <ListItem v-for="(shop, index) in shopList"
                  :key="index"
                  :shopInfo="shop"></ListItem>
      </ul>
      <div class="no-data"
           v-if="noData">暂无数据~</div>
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
import HeadMall from '@/components/HeadMall/index';
import * as service from '@/api/service';
import _ from 'lodash';
import {
  TheSearch,
  TheHeader,
  MultiTabs,
  MultiTabsItem,
} from '@/components/index';
import loadMore from '@/mixins/loadMore.js';
import SelectList from './SelectList';
import FloorItem from './FloorItem';
import TypeOfBussinessItem from './TypeOfBussinessItem';
import SortItem from './SortItem';
import ListItem from './ListItem';

export default {
  name: 'food',

  components: {
    HeadMall,
    TheSearch,
    TheHeader,
    MultiTabs,
    MultiTabsItem,
    SelectList,
    FloorItem,
    TypeOfBussinessItem,
    SortItem,
    ListItem,
  },

  mixins: [loadMore],

  data() {
    return {
      activeName: 'position',
      floorid: '',
      yetaiId: '',
      searchText: '',
      param1: '',
      param2: '',
      shopList: [],
      floorList: [],
      yetaiList: [],
      sortList: [{
        id: 's0',
        title: '默认排序',
        sortWay: ['', ''],
      }, {
        id: 's1',
        title: '时间排序（升序）',
        sortWay: ['intime', 'asc'],
      }, {
        id: 's2',
        title: '时间排序（降序）',
        sortWay: ['intime', 'desc'],
      }, {
        id: 's3',
        title: '字母排序',
        sortWay: ['pinyin', 'asc'],
      }],
      selPopShow: false,
      checkedIndex: '',
      vuegConfig:{
        forwardAnim:'bounceInUp', //options所有配置可以写在这个对象里，会覆盖全局的配置
        disable:false //对于嵌套路由，默认为关闭动画，需要在组件的data.vuegConfig中配置disable为false启用
      }
    };
  },

  created() {
    this.$nextTick(() => {
      console.log(this.$refs.list);
      this.listHeight =
        document.documentElement.clientHeight -
        this.$refs.list.getBoundingClientRect().top;
    });
  },

  methods: {
    handleClick() {
      this.selPopShow = true;
    },
    async loadMore() {
      if (this.allLoaded) {
        return;
      }

      this.loading = true;
      const data = await service.foods({
        curPos: this.count,
        floorid: this.floorid,
        yetaiid: this.yetaiId,
        search_text: this.searchText,
        param1: this.param1,
        param2: this.param2,
      });

      if (data.errCode === 0) {
        this.floorList = data.result.floors_list;
        this.yetaiList = data.result.yetai_list;

        // 添加域名前缀
        if (data.result.shop) {
          // this.nodata = false;
          for (let i = 0; i < data.result.shop.length; i++) {
            data.result.shop[i].logoPath = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.shop[i].logoPath}`;
            // this.shop_list.push(data.result.shop[i]);
          }
        }

        this.shopList.push(...data.result.shop);

        this.count++;
        this.loading = false;

        console.log('length:', this.shopList.length);
      } else if (data.errCode === -1) {
        if (this.shopList.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }

        this.infiniteScrollTips = '数据加载完毕';
        setTimeout(() => {
          this.loading = false;
          this.allLoaded = true;
        }, 1000);
      }
    },

    onFloorSwitch(floor) {
      this.reset();
      this.floorid = floor.id;
      this.selPopShow = false;
      this.loadMore();
    },

    onYetaiSwitch(yetai) {
      this.reset();
      this.yetaiId = yetai.id;
      this.selPopShow = false;
      this.loadMore();
    },

    onSortSwitch(sortWay) {
      this.sortReset();
      [this.param1, this.param2] = sortWay;
      this.selPopShow = false;
      this.loadMore();
    },

    onSearch: _.debounce(async function onSearch(searchText) {
      this.searchReset();
      this.searchText = searchText;
      this.selPopShow = false;
      this.loadMore();
    }, 500, {
      leading: true,
      trailing: false,
    }),

    loadMoreReset() {
      // 无限加载
      this.infiniteScrollTips = '加载中...';
      this.allLoaded = false;
      this.loading = false;
      this.count = 1;
    },

    reset() {
      this.loadMoreReset();
      this.floorid = '';
      this.yetaiId = '';
      this.searchText = '';
      this.param1 = '';
      this.param2 = '';
      this.shopList = [];
    },

    sortReset() {
      this.loadMoreReset();
      this.param1 = '';
      this.param2 = '';
      this.shopList = [];
    },

    searchReset() {
      this.loadMoreReset();
      this.shopList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.shop-list {
  background-color: #ededed;
}

.tab-con {
  min-height: 100vh;
  padding: rem(30) rem(20);
}

.column-tab-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

// 覆盖mint-popup
.mint-popup {
  width: rem(750);
  transform: none;
  top: auto;
  left: auto;
}
</style>


