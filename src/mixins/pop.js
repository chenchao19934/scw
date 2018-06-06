import Cark from '@/pages/compon/cark';
export default {
    components : {
        Cark
    },
    data() {
        return {
            popupVisible : false,   // 弹窗开关
            data : null,    // 总数据
            moreUnit : null,    // 多规格列表数组
            indexUnit : 0   // 选中的规格索引
        }
    },
    methods: {
        showPop(data) {
            this.popupVisible = !this.popupVisible;
            data.forEach(element => {
                element.oss = 0;
                element.is_multi_type = 0;
            });
            this.data = data;
            this.moreUnit = data[0];
            this.indexUnit = 0;
        },
        changeIndex(index) {
            this.indexUnit = index;
            this.moreUnit = this.data[index];
        },
        closePop() {
            this.popupVisible = false;
        }
    },
}