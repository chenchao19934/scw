<template>
	<div id="app">
		<LoadingMap :LoadMap="isShowLoadMap"></LoadingMap>
		<keep-alive>
			<router-view v-transition style="min-height:100vh" v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-transition style="min-height:100vh" v-if="!$route.meta.keepAlive"></router-view>
		<div class="shareMask" 
				@click.stop.prevent="closeMask"
				v-if="isShowMask">
				<img src="./assets/image/share_to_wx.png" alt="">		
		</div>
		<MaskBox  :isShow="isShowBindPhone"
				  v-if="isShowBindPhone"
				  @close="closeMask">
			<BindPhone slot="user"></BindPhone>
		</MaskBox>

		<MaskBox :isShow="isCoupMask"
				v-if="isCoupMask">
			<CoupMask slot="user"
					  :obj="coupn"
					  @receiveCoupn="getCoupn"></CoupMask>
		</MaskBox>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import {initCark,addressName,getCoupn,receiveCoupn,threePartLogin} from './api/newService';

import MaskBox from './page/compon/mask';
import BindPhone from './components/bind_phone';
import CoupMask from './components/coup_mask';
import LoadingMap from './components/Loading'
export default {
	name: "app",
	components: {
		MaskBox,
		BindPhone,
		CoupMask,
		LoadingMap
	},
	data() {
		return {
			coupn: {},
			isShowLoadMap : true
		}
	},
	async created() {
		setTimeout(() => {
			this.isShowLoadMap = false;
		}, 5000);
		let url = this.$getQueryString('url') || '';
		let wechat_nickname = this.$getQueryString('wechat_nickname') || '';
		let wechat_headurl = this.$getQueryString('wechat_headurl') || '';
		let open_id = this.$getQueryString('open_id') || '';
		let union_id = this.$getQueryString('union_id') || '';
		// 邀请人ID
		let uId = this.$getQueryString('uId') || '';
		if (uId.length > 30 && uId !== '') {
			localStorage.uId = uId;
		}
		// 红包ID
		let packId = this.$getQueryString('packId') || '';
		if (packId !== '') {
			localStorage.packId = packId;
		}
		if (location.href.indexOf("dishDetail") < 0) {
			if ( (localStorage.userId && localStorage.userId.length > 30  && localStorage.openId && localStorage.openId.length > 27) || (wechat_nickname && wechat_nickname.length >= 1 && open_id && open_id.length > 27)) {
				this.$store.state.isLogin = true;
				if (wechat_nickname && wechat_nickname.length >= 1) {
					localStorage.setItem('userName',wechat_nickname);
					localStorage.setItem('union_id',union_id);
					localStorage.setItem('openId',open_id);
					localStorage.setItem('logo',wechat_headurl);
				}
				if(!(localStorage.userId && localStorage.userId.length > 30)){
					let LoginInfo = {
						'userName': localStorage.userName,
						'union_id': localStorage.union_id,
						'userId': "noUserid",
						'openId': localStorage.openId,
						'logo': localStorage.logo,
						'token': "999999",
						'types': 2
					}
					let data = await threePartLogin({
						data : LoginInfo
					})
					if (data.code == 200) {
						localStorage.setItem('userName', data.date.user_nick_name);
						localStorage.setItem('userId', data.date.user_id);
						localStorage.setItem('logo', data.date.user_logo);   
						if (url === 'redPack') {
							this.$router.push({name : 'redPack'})
						}else if (url === 'shareNewUser') {
							this.$router.push({name : 'shareNewUser'})
						}
					}
				}
				// 查询用户是否绑定手机号
				this.$store.dispatch('getBindPhone',localStorage.userId);
			}else {
				if (this.$device === 'miniprogram') {
					
				}else if (this.$device === 'wechat'){
					if (window.location.href.indexOf('redPack') >= 0) {
						window.location.href='../index.php/home/test/get_wx_code?url=redPack';
					}else if (window.location.href.indexOf('shareNewUser') >= 0) {
						window.location.href='../index.php/home/test/get_wx_code?url=shareNewUser';
					}else {
						window.location.href='../index.php/home/test/get_wx_code';
					}
				}
			}
		}
		if (this.$device === 'wechat') {
			this.wxLocation((res)=> {
				if (res !== 'cancel') {
					localStorage.setItem("lat",res.latitude);
					localStorage.setItem("lon",res.longitude);
					addressName({
						lat : res.latitude,
						lng : res.longitude
					}).then(data => {
						this.$store.state.addressName = data;
						localStorage.setItem("locationName",data);
					})
				}else {
					this.$toash('定位失败，请打开微信定位功能！');
				}
			});
		}else {
			if (localStorage.userId) {
				this.$store.dispatch('getBindPhone',localStorage.userId);
			}
		}
		this.initShopCark();
	},
	computed: {
		...mapState([
			'isShowMask',
			'isShowBindPhone',
			'isCoupMask'
		])
	},
	methods: {
		// 初始化购物车
		async initShopCark() {
			if (localStorage.userId) {
				let count = 0;
				let data = await initCark({user_id : localStorage.userId});
				if (data !== "") {
					data.forEach(element => {
						count += element.number;
					});
				}
				this.$store.state.shopCarkLenth = count;
				this.initCoupn(); 
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
		// 初始化全场优惠券
		async initCoupn() {
			let data = await getCoupn({
				user_id : localStorage.userId
			})
			if (data.is === 1) {
				this.$store.state.isCoupMask = true;
				data.list.forEach(element => {
					if (element.childName === '') {
						element.childName = '全场通用'
					}
				})
				this.coupn = data;
			}
		},
		// 全场优惠券领取
		async getCoupn(id) {
			const data = await receiveCoupn({
				activity : id,
				user_id : localStorage.userId
			})
			this.$store.state.isCoupMask = false;
			this.$router.push({name : 'Gift', query : {coupnId : data.message}});
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
	opacity: 0;
}
.page-lazyload-image[lazy="loaded"] {
	width: 100%;
	height: 100%;
	margin: auto;
	opacity: 1;
	transition: opacity 0.5s ease-in-out;
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
	background: url("./assets/image/tab/menu_add.png") center no-repeat;
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
.mint-cell-value {
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
	background: #000;
	padding-top: 20px;
	opacity: 0.6;
	img {
		display: block;
    	width: 100%;
	}
}
</style>
