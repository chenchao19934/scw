import Vue from 'vue';
import Router from 'vue-router';


// 首页
// const home = () => import('@/page/home/index');

const home = () => import('@/page/newHome/homePage/index');
const homeAddress = () => import('@/page/my_location/choose_address');
// 分类
const list = () => import('@/page/newHome/listPage/index');
const dishList = () => import('@/page/dishList/index');
const dishDetail = () => import('@/page/dishDetailed/index');
// 我的
const my = () => import('@/page/newHome/myPage/index');
const search = () => import('@/page/dishSearch/index');
const searchDish = () => import('@/page/dishSearch/searchDish');
const location = () => import('@/page/my_location/address_list');
const locationEdit = () => import('@/page/my_location/address_edit');
const locationAdd = () => import('@/page/my_location/address_add');
const collection = () => import('@/page/my_collection/index');
const evals = () => import('@/page/my_evaluate/index');
const Map = () => import('@/page/compon/map');
const Suggestion = () => import('@/page/my_suggestion/index');
// 积分商城
const Integral = () => import('@/page/integral/index');
const InteRule = () => import('@/page/integral/InteRule');
const IntegralList = () => import('@/page/integral_list/index');
// 优惠券列表
const Coupon = ()=> import('@/page/my_coupon/index');
// 我的礼品盒
const Gift = ()=> import('@/page/my_gift/index');
// 我的余额
const Balanced = ()=> import('@/page/my_banlace/index');
// 邀请有礼
const Invited = ()=> import('@/page/my_invited/index');
const InvitedRule = ()=> import('@/page/my_invited/invited_rule');
// 登录退出
const Login = () => import('@/page/login/index');
const LoginExit = () => import('@/page/login_exit/index');
// 订单
const Order = () => import('@/page/order/index');
const OrderDetails = () => import('@/page/order_details/index');
const OrderEval = () => import('@/page/order_eval/index');

// 购物车
const cark = ()=> import('@/page/newHome/cark/index');
const CarkChange = ()=> import('@/page/cark_exchange/index');
const carkCouponList = ()=> import('@/page/cark_redPack/index');
const carkOrder = ()=> import('@/page/cark_settlement/index');
const carkAddress = () => import('@/page/my_location/choose_cark');

// 活动外链
const ActiveLink = () => import('@/page/web_link/index');

Vue.use(Router);

export default new Router({
	// 关闭history模式，因为微信下的iphone可能会导致一些问题
	// mode: 'history',
	base: __dirname,
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		/* 首页 */
		{
			path: '/home',
			name: 'home',
			component: home,
			meta :{
				keepAlive : true
			}
		},
		{
			path: '/homeAddress',
			name: 'homeAddress',
			component: homeAddress,
			meta :{
				keepAlive : false
			}
		},

		// 列表中心
		{
			path: '/list',
			name: 'list',
			component: list,
			meta :{
				keepAlive : true
			}
		},
		{
			path: '/dishList/:id/:number/:childId',
			name: 'dishList',
			component: dishList,
			meta : {
			  keepAlive: true,
			  isBack : false
			}
		},
		{
			path:'/dishDetail/:pid',
			name : 'dishDetail',
			component : dishDetail,
			meta : {
			  keepAlive: false
			}
		},
		{
			path: '/search',
			name: 'search',
			component: search,
			meta : {
				keepAlive:true
			}
		},
		{
			path: '/searchDish/:searchName',
			name: 'searchDish',
			component: searchDish
		},

		// 购物车
		{
			path : '/cark',
			name : 'cark',
			component: cark,
			meta :{
				keepAlive : false
			}
		},
		// 加价换购
		{
			path : '/CarkChange/:money',
			name : 'CarkChange',
			component: CarkChange,
			meta :{
				keepAlive : true
			}
		},
		// 购物车优惠券列表
		{
			path : '/carkCouponList/:coupId/:newprice/:dPrice',
			name : 'carkCouponList',
			component: carkCouponList,
			meta :{
				keepAlive : false
			}
		},
		// 确认订单
		{
			path : '/carkOrder',
			name : 'carkOrder',
			component : carkOrder,
			meta : {
				isLogin : true,
				keepAlive : false
			}	
		},
		// 购物车选择地址
		{
			path: '/carkAddress',
			name: 'carkAddress',
			component: carkAddress,
			meta :{
				keepAlive : false
			}
		},

		// 个人中心
		{
			path: '/my',
			name: 'my',
			component: my,
			meta :{
				keepAlive : true
			}
		},
		{
			path: '/location',
			name: 'location',
			component: location,
			meta :{
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path: '/locationEdit/:editId',
			name: 'locationEdit',
			component: locationEdit,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		{
			path: '/locationAdd',
			name: 'locationAdd',
			component: locationAdd,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		{
			path: '/Map/:from',
			name: 'Map',
			component: Map,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		{
			path: '/collection',
			name: 'collection',
			component: collection,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path: '/evals',
			name: 'evals',
			component: evals,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		{
			path: '/Suggestion',
			name: 'Suggestion',
			component: Suggestion,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		// 积分商城
		{
			path : '/Integral',
			name : 'Integral',
			component : Integral,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		// 积分规则
		{
			path : '/InteRule',
			name : 'InteRule',
			component : InteRule,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		// 积分详情
		{
			path : '/IntegralList',
			name : 'IntegralList',
			component : IntegralList,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		// 优惠券列表
		{
			path : '/Coupon',
			name : 'Coupon',
			component : Coupon,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		// 礼品盒
		{
			path : '/Gift',
			name : 'Gift',
			component : Gift,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		// 用户余额
		{
			path : '/Balanced',
			name : 'Balanced',
			component : Balanced,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		// 邀请有礼
		{
			path : '/Invited',
			name : 'Invited',
			component : Invited,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '/InvitedRule',
			component : InvitedRule,
			meta : {
				keepAlive : true,
				isLogin : true
			}
		},
		// 登录
		{
			path: '/Login',
			name: 'Login',
			component: Login,
			meta : {
				keepAlive : false
			}
		},
		{
			path: '/LoginExit',
			name: 'LoginExit',
			component: LoginExit,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		// 订单
		{
			path: '/Order/:type',
			name: 'Order',
			component: Order,
			meta : {
				keepAlive : true,
				isBack : false,
				isLogin : true
			}
		},
		// 订单详情
		{
			path: '/OrderDetails/:groupId',
			name: 'OrderDetails',
			component: OrderDetails,
			meta : {
				keepAlive : false,
				isLogin : true
			}
		},
		{
			path : '/OrderEval/:groupId',
			name : 'OrderEval',
			component : OrderEval,
			meta : {
				keepAlive : false,
				isLogin : true
			}	
		},
		// 活动外链
		{
			path : '/ActiveLink/:urls',
			name : 'ActiveLink',
			component : ActiveLink,
			meta : {
				keepAlive : false,
				isLogin : false
			}	
		},
		/* 其他非法路由 */
		{
			path: '*',
			redirect: '/home'
		}
	],
});
