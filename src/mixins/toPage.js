import {mapMutations } from 'vuex';
// 记录滚动位置
export default {
    methods : {
        ...mapMutations([
            'setPageYOffset'
        ]),
        toPage(id) {
            this.setPageYOffset(document.documentElement.scrollTop);
            this.$router.push({name : 'dishDetail', params:{pid:id}});
        }
    }
}