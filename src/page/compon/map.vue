<template>
    <div class="wx-map">
        <div class="wx-map__back" @click="back"></div>
        <iframe id="getAddress" @load="loadiframe" src="https://m.amap.com/picker/?keywords=写字楼,小区,学校&zoom=15&radius=1000&total=20&key=b53add4d7e5ea02254180c5b0ffd4bc4" frameborder="0" style="width: 100%;height: 100vh;"></iframe>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                title : '选择位置',
                time : 1,
                from : ''
            }
        },
        activated() {
            this.time = 1;
            this.from = this.$route.params.from
        },
        methods: {
            ...mapMutations([
                'setLocation'
            ]),
            loadiframe() {
                let iframe = document.getElementById('getAddress').contentWindow;
                iframe.postMessage('hello', 'https://m.amap.com/picker/');
                window.addEventListener("message", e => {
                    if (this.time === 1) {
                        let lat = e.data.location.split(",")[1],
                            lng = e.data.location.split(",")[0];
                        switch (this.from) {
                            case 'home' : 
                                localStorage.setItem("lat",lat);
                                localStorage.setItem("lon",lng);
                                localStorage.locationName = e.data.name;
                                this.$store.state.addressName = e.data.name;
                                this.$router.push({name : this.from})
                                break;
                            default :
                                let locationObj = {
                                    detail_address : e.data.name,
                                    location : `${lng},${lat}`
                                }
                                this.setLocation(locationObj);
                                this.$back(this.$router);
                        }
                        this.time ++;
                    }
                },false);
            },
            back() {
                this.$messagebox.confirm('还未选择地点，是否退出？').then(action => {
                    this.$back(this.$router);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@include b(map) {
    position: relative;
    @include e(back) {
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 48px;
        background-color:transparent;
    }
}
</style>