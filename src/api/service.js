import fetch from '../utils/fetch';
import * as mUtils from '@/utils/mUtils.js';
// import store from '@/store';
// window.$bid = getQueryString('bid') || 77;
// const gobalBid = window.$bid || process.env.BID;
// const externalBid = process.env.EXTERNAL_BID;
// const testApi = process.env.TEST_API;
// const onLineApi = process.env.ONLINE_API;
// const payURL = process.env.PAY_URL;
// const gobalIstest = process.env.IS_TEST;
// const gobalWithCredentials = process.env.WITH_CREDENTIALS;
// console.log('gobalBid', gobalBid);

// function getQueryString(name) {
//   const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
//   const hash = window.location.hash.slice(window.location.hash.indexOf('?'));
//   console.log('hash', hash);
//   const r = hash.substr(1).match(reg);
//   console.log('search', window.location.search);
//   if (r != null) {
//     return unescape(r[2]);
//   }
//   return null;
// }

// 获取首页信息
export const getIndex = ({
  apiUrl = '/Webapi/Shop/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

/* 关于我们 */
export const getAbout = ({
  apiUrl = '/Webapi/About/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

/* 优惠活动 */
// 获取优惠活动列表
export const getActivityIndex = ({
  apiUrl = '/Webapi/Activity/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 获取商家活动
export const shopsActivity = ({
  apiUrl = '/Webapi/Activity/shopsActivity.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 获取活动详情
export const activityDetails = ({
  apiUrl = '/Webapi/Activity/activityDetails.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
  },
});

/* 卡券 */
export const couponsIndex = ({
  apiUrl = '/Webapi/Coupons/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  fromId,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
    fromId,
  },
});

/* 会员中心 */
// 获取会员中心信息
export const memberCenter = ({
  apiUrl = '/Webapi/Members/memberCenter.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 发送短信
export const sendMsgCode = ({
  apiUrl = '/Webapi/Members/sendMsgCode.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  tel,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    tel,
    istest,
  },
});

// 会员卡说明
export const memberCardInfo = ({
  apiUrl = '/Webapi/Members/memberCardInfo.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 我的卡券
export const myCoupons = ({
  apiUrl = '/Webapi/Members/myCoupons.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  type,
  flag,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    id,
    type,
    flag,
    curPos,
    istest,
  },
});

// 卡券详情
export const couponsDetail = ({
  apiUrl = '/Webapi/Members/couponsDetail.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    id,
    istest,
  },
});

// 会员卡尊享
export const memberInfo = ({
  apiUrl = '/Webapi/Members/memberInfo.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 我的积分
export const memberIntegral = ({
  apiUrl = '/Webapi/Members/memberIntegral.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  type,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    type,
    istest,
    curPos,
  },
});

// 会员注册
export const getWeixinCards = ({
  apiUrl = '/Webapi/Members/getWeixinCards.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  submit,
  verify,
  userTrueName,
  userPhone,
  identityCard,
  sex,
  fromId,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    submit,
    verify,
    userTrueName,
    userPhone,
    identityCard,
    sex,
    fromId,
    istest,
  },
});

// 完善资料
export const perfectInformation = ({
  apiUrl = '/Webapi/Members/perfectInformation.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  submit,
  YYYY,
  MM,
  DD,
  userTrueName,
  identityCard,
  email,
  userPhone,
  address,
  province,
  city,
  district,
  sex,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    submit,
    YYYY,
    MM,
    DD,
    userTrueName,
    identityCard,
    email,
    userPhone,
    istest,
    address,
    province,
    city,
    district,
    sex,
  },
});

// 绑定实体卡
export const getRealCards = ({
  apiUrl = '/Webapi/Members/getRealCards.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  submit,
  verify,
  userTrueName,
  userPhone,
  cardNumber,
  identityCard,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    submit,
    verify,
    userTrueName,
    userPhone,
    cardNumber,
    identityCard,
    istest,
  },
});

// 我的消息
export const myMessage = ({
  apiUrl = '/Webapi/Members/myMessage.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    curPos,
  },
});

// 微信卡券
export const wxCoupon = ({
  apiUrl = '/Webapi/Members/myWxCoupons',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    curPos,
  },
});

// 产品类型选择
export const fansTags = ({
  apiUrl = '/Webapi/Members/fansTags',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  tag,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    tag,
  },
});

/* 商铺列表 */
// 商铺列表首页
export const shopIndex = ({
  apiUrl = '/Webapi/Shops/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  cancelToken,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
  floorid,
  yetaiid,
  search_text,
  param1,
  param2,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  cancelToken,
  data: {
    curPos,
    bid,
    floorid,
    yetaiid,
    search_text,
    param1,
    param2,
    istest,
  },
});

// 商铺列表首页 - 印力
export const shopIndexYL = ({
  apiUrl = '/Member/shopsQuery',
  method = 'post',
  withCredentials = gobalWithCredentials,
  cancelToken,
  bid = gobalBid,
  istest = gobalIstest,
  pn,
  ps,
  code,
  name,
}) => fetch({
  baseURL: 'http://test2.api.w-lans.cn',
  // baseURL: '',
  url: apiUrl,
  method,
  withCredentials,
  cancelToken,
  data: {
    bid,
    istest,
    pn,
    ps,
    code,
    name,
  },
});

// 商铺列表详情
export const shopDetails = ({
  apiUrl = '/Webapi/Shops/shopDetails.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  sid,
  name,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    sid,
    name,
    istest,
  },
});

// 商铺评价
export const shopCommentMain = ({
  apiUrl = '/Webapi/Shops/shopCommentMain.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  is_submit,
  sid,
  comment,
  images,
  level,
  grade,
  token,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    is_submit,
    sid,
    comment,
    images,
    level,
    grade,
    token,
  },
});

// 美食列表
export const foods = ({
  apiUrl = '/Webapi/Shops/foods.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
  floorid,
  yetaiid,
  search_text,
  param1,
  param2,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    curPos,
    bid,
    floorid,
    yetaiid,
    search_text,
    param1,
    param2,
    istest,
  },
});

/* 商城 */
export const mallDetail = ({
  apiUrl = '/Webapi/MallDetail/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

/* 客户服务 */
export const customerService = ({
  apiUrl = '/Webapi/CustomerService/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

/* 反馈 */
export const feedback = ({
  apiUrl = '/Webapi/Feedback/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  uid,
  suggestion,
  submit,
  picPath,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    uid,
    suggestion,
    submit,
    picPath,
  },
});

/* 积分商城 */
// 积分商城-首页
export const integralMall = ({
  apiUrl = '/Webapi/IntegralMall/index.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  rangeId,
  search_text,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    rangeId,
    search_text,
    istest,
  },
});

// 积分商城兑换详情
export const exchangeDetails = ({
  apiUrl = '/Webapi/IntegralMall/exchangeDetails.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  search_text,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    search_text,
    id,
    istest,
  },
});

// 积分支付
export const exchangeGoods = ({
  apiUrl = '/Webapi/IntegralMall/exchangeGoods.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  buyNum,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    id,
    buyNum,
    istest,
  },
});

export const exchangeWxCard = ({
  apiUrl = '/Webapi/IntegralMall/exchangeWxCard.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  buyNum,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    id,
    buyNum,
    istest,
  },
});

// 兑换记录
export const exchangeList = ({
  apiUrl = '/Webapi/IntegralMall/exchangeList.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    curPos,
    istest,
  },
});


export const integralMallCheckWxCoupons = ({
  apiUrl = '/Webapi/IntegralMall/checkWxCoupons',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
  },
});

export const integralMallClickOrder = ({
  apiUrl = '/Webapi/IntegralMall/clickOrder',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
  },
});

// 积分商城兑换检测 - 只用于杭州大厦
export const buyAuthorIntegralMall = ({
  apiUrl = '/Webapi/IntegralMall/exchangeCheckWxCoupons',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  buyNum,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    id,
    buyNum,
    bid,
    istest,
  },
});

/* 卡券 */
// 领取卡券
export const getCoupons = ({
  apiUrl = '/Webapi/Coupons/getCoupons.shtml',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    id,
    istest,
  },
});

/* 自助积分 */
// 拍照积分
export const integralAdd = ({
  apiUrl = '/Webapi/AutoIntegral/integralAdd',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  sid,
  submit,
  picPath,
  number,
  money,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    id,
    sid,
    submit,
    picPath,
    number,
    money,
    istest,
  },
});

export const getJSSDK = ({
  apiUrl = '/Webapi/AutoIntegral/getJSSDK',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  url,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    url,
    istest,
  },
});

// 查询进度
export const integralList = ({
  apiUrl = '/Webapi/AutoIntegral/integralList',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 店铺查询
export const shopSearch = ({
  apiUrl = '/Webapi/AutoIntegral/shopSearch',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  search_text,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    search_text,
    istest,
  },
});

// 扫码积分
export const scanIetegral = ({
  apiUrl = '/Webapi/AutoIntegral/scanIetegral',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  data,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    data,
  },
});

// 自助积分指南
export const integralShow = ({
  apiUrl = '/Webapi/AutoIntegral/integralShow',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

/* Public */
export const wxCardSign = ({
  apiUrl = '/Webapi/Public/wxCardSign',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  cardId,
  timestamp,
  nonceStr,
  outer_str,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid: istest === 'yes' ? externalBid : bid,
    istest,
    cardId,
    timestamp,
    nonceStr,
    outer_str,
  },
});

export const getPublicJSSDK = ({
  apiUrl = '/Webapi/Public/getJSSDK',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  url,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid: istest === 'yes' ? externalBid : bid,
    istest,
    url,
  },
});

/* 停车场 */
// 停车场首页
export const parkCar = ({
  apiUrl = '/webapi/ParkCar/index',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    curPos,
    istest,
  },
});

/* 课程列表 */
// 获取课程列表
export const lessonList = ({
  apiUrl = '/Webapi/shopTeach/lessonList',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  search_text,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    search_text,
  },
});

// 获取课程详情
export const lessonDetails = ({
  apiUrl = '/Webapi/shopTeach/lessonDetails',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
  },
});

// 获取课程详情
export const lessonDetail = ({
  apiUrl = '/Webapi/shopTeach/lessonDetails',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
  },
});

// 课程积分支付
export const exchangeWxCardLesson = ({
  apiUrl = '/Webapi/shopTeach/exchangeWxCard',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  buyNum,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    buyNum,
    id,
  },
});

export const checkWxCoupons = ({
  apiUrl = '/Webapi/shopTeach/checkWxCoupons',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    id,
  },
});

// 课程兑换检测 - 只用于杭州大厦
export const exchangeCheckWxCoupons = ({
  apiUrl = '/Webapi/ShopTeach/exchangeCheckWxCoupons',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  id,
  buyNum,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    id,
    buyNum,
    bid,
    istest,
  },
});

/* 支付 */
// 进行混合支付
export const mixPay = ({
  apiUrl = '/pay/unifiedorder2?wox=1',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  openid,
  body,
  total_fee,
  notify_url,
  reurl,
  attach,
}) => fetch({
  baseURL: istest === 'yes' ? '' : payURL, // 支付接口需要服务器代理进行跨域
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    openid,
    body,
    total_fee,
    notify_url,
    reurl,
    attach,
  },
});

/* 预约服务 */
// 预约服务首页
export const AppointmentIndex = ({
  apiUrl = '/Webapi/Appointment/index',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 开始预约
export const appointmentAdd = ({
  apiUrl = '/Webapi/Appointment/appointmentAdd',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  cateid,
  userName,
  cardNumber,
  userPhone,
  yyNum,
  remark,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    cateid,
    userName,
    cardNumber,
    userPhone,
    yyNum,
    remark,
  },
});

/* 签到 */
// 查看最近一次签到时间
export const IntegralSign = ({
  apiUrl = '/Webapi/IntegralSign/index',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 进行签到
export const IntegralSignIntegralSignAdd = ({
  apiUrl = '/Webapi/IntegralSign/integralAdd',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

/* Public */
// 获取省
export const getProvinces = ({
  apiUrl = '/Webapi/Public/getProvinces ',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});

// 获取市
export const getCities = ({
  apiUrl = '/Webapi/Public/getCities',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  pid,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    pid,
  },
});

// 获取区
export const getDistricts = ({
  apiUrl = '/Webapi/Public/getDistricts',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  cid,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    cid,
  },
});

/* 停车场 */
// 查询车辆
export const carQuery = ({
  apiUrl = '/Webapi/parkCarNew/parkPay',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  carNo,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    carNo,
  },
});

// 积分支付
export const parkIntegralPay = ({
  apiUrl = '/Webapi/parkCarNew/integralPay',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  integral,
  orderNo,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    integral,
    orderNo,
  },
});

// 微信支付回调
// attach传integral和orderNo和bid和uid和payType=2混合和=3微信
export const parkWeixinPay = ({
  apiUrl = '/Webapi/parkCarNew/getWeixin',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  attach,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    attach,
  },
});

// 缴费记录
export const parkPayRecord = ({
  apiUrl = '/Webapi/parkCarNew/payRecord',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
  curPos,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
    curPos,
  },
});

// 常用车牌
export const parkCarNo = ({
  apiUrl = '/Webapi/parkCarNew/carNo',
  method = 'post',
  withCredentials = gobalWithCredentials,
  bid = gobalBid,
  istest = gobalIstest,
}) => fetch({
  baseURL: istest === 'yes' ? testApi : onLineApi,
  url: apiUrl,
  method,
  withCredentials,
  data: {
    bid,
    istest,
  },
});