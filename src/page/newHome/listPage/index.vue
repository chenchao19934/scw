<template>
    <div class="wx-list">
        <TopBar ref="bar"></TopBar>
        <div class="wx-list__time" ref="time">{{time}}</div>
        <LeftNav :style="setH">
            <LeftNavItem v-for="(x,index) in leftArr" 
                            :items="x"
                            :class="{'selectNav' : selectNav==index}" 
                            @click.native="changeNav(index,x.id,x.name)"
                            :key="index"></LeftNavItem>
        </LeftNav>
        <div :style="setH" class="left" style="overflow-y: scroll;overflow-x: hidden;">
            <RightCon :title="leftConTit">
                <RightConItem v-for="(x, index) in leftCon" 
                                :item="x"
                                @click.native="toDishPage(x.id,index+1,x.pid)"
                                :key="x.id"></RightConItem>
            </RightCon>
        </div>
        <fixedBar></fixedBar>
    </div>
</template>

<script>
    import {mapMutations,mapGetters } from 'vuex';
    import { listNav , listCon } from '@/api/newService.js';
    import TopBar from './list_top';
    import LeftNav from './left_nav';
    import LeftNavItem from './left_nav_item';
    import RightCon from './right_con';
    import RightConItem from './right_con_item';
    import fixedBar from '../index';
    

    import { getStyle } from '../../../utils/mUtils';

    export default {
        components : {
            TopBar,
            LeftNav,
            LeftNavItem,
            RightCon,
            RightConItem,
            fixedBar
        },
        data() {
            return {
                time : '21:30前下单，次晨送达',
                selectNav : '0', //  左导航索引
                leftArr : [],   //  左导航内容
                leftCon : [],   //  导航数据
                ListH : '', // 获取可见区域高度
                leftConTit :'', //  当前数据标题
            }
        },
        computed : {
            setH () {
                return `height:${this.ListH}`;
            },
            ...mapGetters([
                'leftId'
            ])
        },
        async created() {
            this.leftArr = await listNav({
                lat : localStorage.lat,
                lng : localStorage.lon,
            });
            this.leftCon = await listCon({id:this.leftId});
            this.leftArr.forEach((element,index) => {
                if (element.id == this.leftId) {
                    this.selectNav = index;
                }
            });
            this.leftConTit = this.leftCon.name;
            this.leftCon = this.leftCon.data;
            this.$nextTick(()=> {
                const bar = this.$refs.bar,
                      time = this.$refs.time,
                      barH = getStyle(bar.$el,'height'),
                      timeH = getStyle(time,'height'),
                      screenH = window.screen.height;
                this.ListH = screenH - barH - timeH - 55 +'px';     
            })
        },
        methods : {
            ...mapMutations([
                'setLevelOne',
                'setLevelTwo',
                'setLevelIndex',
                'setLevelTitle',
                'setleftId'
            ]),
            // 左导航列表
            changeNav(index,id,name) {
                this.selectNav = index;
                this.getRightCon(id);
                this.leftConTit = name;

                this.setleftId(id);
                this.setLevelTitle(name);
            },
            // 左导航切换，右边内容切换
            async getRightCon(id) {
                const leftData = await listCon({id:id});
                this.leftCon = leftData.data;
            },
            // 分类详情
            toDishPage(id,index,pid) {
                this.setLevelOne(id);
                this.setLevelTwo(pid);
                this.setLevelIndex(index);
                this.$router.push({name : 'dishList', params : { id: id , number: index , childId : pid}})
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(list) {
    padding-top: 72px;
    height: 100vh;
    @include e(time) {
        position: fixed;
        left: 0;
        top: 44px;
        width: 100%;
        line-height:28px;
        text-align: center;
        background-color: #e8e8e8;
        font-size: 14px;
        z-index: 1;
    }
}
.selectNav {
    background-color: #fff;
    color: #abd13e;
    border-left: rem(8) solid #abd13e;
}
</style>