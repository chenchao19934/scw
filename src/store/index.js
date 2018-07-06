import Vue from 'vue';
import Vuex from 'vuex';

import {initCark, bindPhone} from '@/api/newService'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 是否登录
		isLogin : null,
		// 购物车数量
		shopCarkLenth : 0,
		// 是否绑定手机号 true已绑定
		isBindPhone : false,
		isShowBindPhone : false,
		// 礼盒数量
		giftCount : 0,
		// 地址
		addressName : localStorage.locationName || '定位中。。。',
		// 订单时间
		orderTime : '请选择送达时间',
		// 订单留言 
		orderMsg : '',
		// 订单选择配送方式
		orderDlType : '1',
		// 显示分享蒙版
		isShowMask : false,
		// 全场优惠券
		isCoupMask : false,

		scrollTop : 0,

		dish : {
			leftId : 'fdf6f19b84ee462d9849b5e5db61b24f'
		},
		dishLish: {
			levelOne: '72cb3e95ef5aac949e7f36d9d8ad570c',
			levelIndex: 1,
			levelTitle : '新鲜水果',
			levelTwo: 'fdf6f19b84ee462d9849b5e5db61b24f',
			pageOffset : 0
		},
		locationName : {
			detail_address : '' || '请选择小区或大厦等',
			location : ''
		}
	},
	getters: {
		getLoginState : state => state.isLogin,
		carkLength : state => state.shopCarkLenth,

		levelOne: state => state.dishLish.levelOne,
		levelIndex: state => state.dishLish.levelIndex,
		levelTwo: state => state.dishLish.levelTwo,
		levelTitle: state => state.dishLish.levelTitle,
		pageOffset: state => state.dishLish.pageOffset,
		leftId: state => state.dish.leftId,
		address : state => state.locationName,
	},
	actions: {
		async getBindPhone({commit},id) {
			let data = await bindPhone({ user_id : id }),
				states;
			data.code === 1310 ? states = false : states = true;
			commit('setBindPhone',states);
		}
	},
	mutations: {
		setLevelOne(state, b) {
			state.dishLish.levelOne = b;
		},
		setLevelTwo(state, b) {
			state.dishLish.levelTwo = b;
		},
		setLevelIndex(state, b) {
			state.dishLish.levelIndex = b;
		},
		setLevelTitle(state, b) {
			state.dishLish.levelTitle = b;
		},
		setPageYOffset(state,b) {
			state.dishLish.pageOffset = b;
		},
		setleftId(state, b) {
			state.dish.leftId = b;
		},
		setLoginState(state,b) {
			state.isLogin = b;
		},
		setCarkLength(state,b) {
			state.shopCarkLenth = b;
		},
		setBindPhone(state,b) {
			state.isBindPhone = b;
		},
		setMsg(state,b) {
			state.orderMsg = b;
		},
		setLocation(state,b) {
			state.locationName = b;
		}
	},
});

export default store;
