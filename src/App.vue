<template>
	<div id="app">
		<keep-alive>
			<router-view v-transition style="min-height:100vh" v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-transition style="min-height:100vh" v-if="!$route.meta.keepAlive"></router-view>
		<div class="shareMask" 
				@click.stop.prevent="closeMask"
				v-if="isShowMask"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import {initCark,addressName} from './api/newService';
export default {
	name: "app",
	beforeCreate () {
		if (this.$device === 'wechat') {
			this.wxLocation((res)=> {
				if (res !== 'cancel') {
					console.log(res);
					localStorage.setItem("lat",res.latitude);
                    localStorage.setItem("lon",res.longitude);
					let data = addressName({
						lat : res.latitude,
						lng : res.longitude
					}).then(data => {
						this.$store.state.addressName = data;
					})
				}else {
					
				}
			});
		}
	},
	created() {
		this.initCark();
	},
	computed: {
		...mapState([
			'isShowMask'
		])
	},
	methods: {
		initCark() {
			if (localStorage.userId) {
				let count = 0;
				initCark({user_id : localStorage.userId}).then(res=> {
					if (res !== "") {
						res.forEach(element => {
							count += element.number;
						});
					}
					this.$store.state.shopCarkLenth = count;
				});
				this.$store.dispatch('getBindPhone',localStorage.userId)
			}else {
				if (localStorage.ShoppingCart) {
					let arr = JSON.parse(localStorage.ShoppingCart),
						count = 0;
					if (arr.length !== 0) {
						arr.forEach(element => {
							count += element.number;
						});
					}
					this.$store.state.shopCarkLenth = count;
				}
			}
		},
		closeMask() {
			this.$store.state.isShowMask = false;
		}
	},
};
</script>

<style lang="scss">
#app {
	-webkit-overflow-scrolling: touch;
	-webkit-tap-highlight-color: transparent;
	user-select: none;
	text-size-adjust: none;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
}

.btn-gray {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	font-size: 0.42667rem;
	color: #fff;
	line-height: 1.06667rem;
	text-align: center;
}

.icon {
	/* 通过设置 font-size 来改变图标大小 */
	width: 1em;
	height: 1em;
	/* 图标和文字相邻时，垂直对齐 */
	vertical-align: -0.15em;
	/* 通过设置 color 来改变 SVG 的颜色/fill */
	fill: currentColor;
	/* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
					normalize.css 中也包含这行 */
  	overflow: hidden;
}

// 图片懒加载，需要 1.给需要懒加载的图片加.page-lazyload-image类；2.在img标签中用v-lazy代替src
.page-lazyload-image[lazy="loading"] {
	width: 100%;
	height: 100%;
	margin: auto;
	background: url("./assets/image/lazy.gif");
	background-size: rem(32) rem(32);
	background-position: center center;
	background-repeat: no-repeat;
	background-color: #fff;
}

/* 无限加载 */
.page-infinite-loading {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	height: rem(100);
	margin: rem(10) 0;
	text-align: center;
	font-size: rem(30);
	.loading-tips {
		display: block;
		width: 100%;
	}
}

// 默认字体大小
#app {
	font-size: rem(24);
	background-color: #fff;
}
// songcaiwa
.i-icon-writer {
	background: url("./assets/image/icon-writer.png") center no-repeat;
	background-size: cover;
}
/* 覆盖mint-ui */
.mint-indicator {
	position: relative;
	z-index: 9999;
}
.add-cark-icon {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	width: rem(56);
	height: rem(56);
	padding: rem(4);
	background: url("./assets/image/tab/menu_add.png")center
		center no-repeat;
	background-size: 100% 100%;
}
.move_dot {
	position: fixed;
	bottom: 30px;
	left: 30px;
	z-index: 99;
	.svg {
		display: block;
		width: rem(50);
		height: rem(50);
		padding: rem(4);
		background-color: #abd13e;
		border-radius: rem(30);
	}
}

.mint-header {
	box-shadow: 0 1px 1px;
	background-color: #fff;
	color: #abd13e;
}
.mint-header.is-fixed {
    z-index: 10000
}
.mint-header-title {
  	font-size: 16px;
}
.mintui {
  	font-size: 24px !important;
}
.mint-swipe-indicator.is-active {
	opacity : 0.8;
	background-color : #000;
}
.mint-radiolist .mint-cell {
    display: inline-block;
    width: 50%;
    background-size: 100% 0px;
    border-top: 1px solid #d9d9d9;
}
.mint-radiolist .mint-cell .mint-cell-wrapper {
	background-image: none;
	border: none;
}
.mint-radiolist-label {
  	text-align: center;
}
.mint-tab-item-label {
  	font-size: 14px;
}
.more-unit {
    position: relative;
    width: 100%;
    height: rem(640);
    padding: rem(75) rem(60);
    background-color: #fff;
    div.closePop {
        position: absolute;
        top: rem(30);
        right: rem(30);
        width: rem(60);
        height: rem(60);
        text-align: center;
        line-height: rem(60);
        border: 1px solid #717171;
        border-radius: 50%;
        color: #717171;
        font-size: rem(36);
    }
    dl {
        height: rem(220);
        margin-bottom: rem(5);
    }
    dt,dd {
        display: inline-block;
        height: rem(220);
        overflow: hidden;
    }
    dt {
        width: rem(220);
        border: 1px solid #ccc;
        img {
            display: block;
            width: 100%;
        }
    }
    dd {
        width: rem(340);
        margin-left: rem(40);
        padding-top: rem(40);
        h3 {
            font-size: rem(32);
            font-weight: bold;
            margin-bottom: rem(20);
        }
        p {
            font-size: rem(28);
            margin-bottom: rem(20);
        }
        p.red {
            color: #e54545;
        }
    }
}
.mint-popup-bottom {
    width: 100%;
}
.unit-choose {
    height: rem(230);
    margin-top: rem(20);
    overflow-x: hidden;
    overflow-y: scroll;
    p {
        font-size: rem(32);
        font-weight: bold;
        padding: rem(10) 0;
    }
    > div span {
        float: left;
        border: 1px solid #7ecc83;
        padding: rem(0) rem(30);
        margin-right: rem(16);
        margin-bottom: rem(16);
        line-height: rem(48);
        font-size: rem(32);
    }
    > div span.is-choose {
        background: rgb(201, 242, 204);
    }
}
.wx-styleBox {
	.mint-radiolist .mint-cell {
		width : 100%;
		border: 0;
	}
	.mint-radiolist-label {
		text-align: left;
	}
}
.shareMask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
	background: #000 url("./assets/image/share_to_wx.png")center no-repeat;
	background-size: cover;
	background-position-y: 20px;
	opacity: 0.6;
}
</style>
