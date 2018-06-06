export default {
    data() {
        return {
            popupVisible : false,
            data : null,
            moreUnit : null,
        }
    },
    methods : {
        showPop(data) {
            this.popupVisible = !this.popupVisible;
            data.forEach(element => {
                element.oss = 0;
                element.is_multi_type = 0;
            });
            this.data = data;
            this.moreUnit = data[0];
        },
        closePop() {
            this.popupVisible = false;
        }
    }
}