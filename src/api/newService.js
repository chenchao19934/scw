import newFetch from '../utils/newFetch';

const apiUrl = '/public/index.php/home';
export const newHomeList = ({
    url = '/index/home',
    method = 'get',
    lat = '22.5616010583',
    lng = '113.8883778076'
})=> newFetch({
    method,
    url: `${apiUrl}${url}?lat=${lat}&lng=${lng}`
})

// 新鲜水果
export const fruitList = ({
    method = 'get',
    url = '/Category/index/category_id/722c906e5b5e4f2998341f4356a5c0b4'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})
// 蔬菜瓜果
export const vegeList = ({
    method = 'get',
    url = '/Category/index/category_id/fdf6f19b84ee462d9849b5e5db61b24f'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})
// 肉类禽蛋
export const porkList = ({
    method = 'get',
    url = '/Category/index/category_id/cef5a37f30544ccb909a658f6eb57143'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})
// 水产海鲜
export const seafoodList = ({
    method = 'get',
    url = '/Category/index/category_id/e5ded11c5c72403ba11678e767c0b707'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})
// 休闲零食
export const snacksList = ({
    method = 'get',
    url = '/Category/index/category_id/B6CE8DEC9EE3BD9162394A19ED2FBD6A'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})
// 酒水茶饮
export const milkList = ({
    method = 'get',
    url = '/Category/index/category_id/BF676C815DF8C9E1B221F615653B7193'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})
// 速食冷藏
export const coolfoodList = ({
    method = 'get',
    url = '/Category/index/category_id/cf5a37f3544cb90a658f6eb57143'
})=> newFetch({
    method,
    url: `${apiUrl}${url}`
})

export const listNav = ({
    method = 'get',
    url = '/goods/category',
})=> newFetch({
    method,
    url : `${apiUrl}${url}`
})

export const listCon = ({
    method = 'get',
    url = '/goods/child',
    id = 'fdf6f19b84ee462d9849b5e5db61b24f'
})=> newFetch({
    method,
    url : `${apiUrl}${url}?id=${id}`
})

// 分类页
export const secondNav = ({
    method = 'get',
    url = '/goods/category_child',
    id,
    lat,
    lng
}) => newFetch({
    method,
    url : `${apiUrl}${url}?id=${id}&lat=${lat}&lng=${lng}`
})

export const dishList = ({
    method = 'get',
    url = '/goods/goods_list',
    id,
    type,
    lat,
    lng
}) => newFetch({
    method,
    url : `${apiUrl}${url}?id=${id}&type=${type}&lat=${lat}&lng=${lng}`
})
// 食材详细
export const dishDetial = ({
    method = 'get',
    url = '/goods/goods',
    id,
})=> newFetch({
    method,
    url:`${apiUrl}${url}?id=${id}`
})
// 评论详细
export const dishComment = ({
    method = 'get',
    url = '/goods/goods_comment',
    id,
    attach = 1,
    type = 0,
    page = 1,
}) => newFetch({
    method,
    url:`${apiUrl}${url}?id=${id}&attach=${attach}&type=${type}&page=${page}`
})

// 是否收藏
export const isCollection = ({
    method = 'get',
    url = '/goods/isConcern',
    goods_id,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}`
})

// 收藏
export const collection = ({
    method = 'post',
    url = '/goods/user_concern/',
    eid,
    type = 30,
    user_id    
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
    data : {
        user_id,
        eid,
        type
    }
})
// 取消收藏 
export const cancelCollection = ({
    method = 'get',
    url = '/goods/user_del_concern',
    eid,
    type = 30,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/eid/${eid}/type/${type}`
})
// 热门商品
export const hotGoods = ({
    method = 'get',
    url = '/goods/hot_goods'
}) => newFetch({
    method,
    url : `${apiUrl}${url}`
})
// 搜索商品 https://scw.new.songcaiwa.cn/public/index.php/home/goods/search_goods/wd/%E6%A4%B0%E5%AD%90/lng/113.887233/lat/22.554575/page/1
export const dishSearch = ({
    method ='get',
    url = '/goods/search_goods',
    wd,
    lng,
    lat,
    page =1
}) => newFetch({
    method,
    url : `${apiUrl}${url}/wd/${wd}/lng/${lng}/lat/${lat}/page/${page}`
})


// 多规格商品
export const moreUnit = ({
    method = 'get',
    url = '/goods/goods_nulti',
    id,
}) => newFetch({
    url : `${apiUrl}${url}?goods_id=${id}`,
    method
})

// 我的积分
export const addition = ({
    method = 'get',
    url = '/user/user_additional',
    user_id
})=> newFetch({
    method,
    url :`${apiUrl}${url}/user_id/${user_id}`
})
// 我的应用列表
export const myMenuList = ({
    method = 'get',
    url = '/index/get_user_logo/code/user_icon_three',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`
})
// 我的订单列表
export const orderList = ({
    method = 'get',
    url = '/index/get_user_logo/code/user_icon_to',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`
})
// 我的收藏列表
export const collectionList = ({
    method = 'get',
    url = '/goods/get_user_concern',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`
})
// 我的评价列表
export const evals =({
    method = 'get',
    url = '/user/user_comment',
    page = 1,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/page/${page}`
})
// 删除评价
export const deleteEval =({
    method = 'get',
    url = '/user/del_comment',
    comm_id,
})=> newFetch({
    method,
    url :`${apiUrl}${url}/comm_id/${comm_id}`
})
// 我的余额
export const BalanceList = ({
    method = 'get',
    url = '/user/getUserBalanceList',
    page = 1,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/page/${page}`
})

// 地址列表
export const addressList = ({
    method = 'get',
    url = '/user/address_list',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`
})
// 单个地址详情
export const addressDetial = ({
    method = 'get',
    url = '/user/address',
    id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/adr_id/${id}`
})
// 修改地址
export const setAddress = ({
    method = 'get',
    url = '/user/edit_address',
    adr_id,
    detail_address,
    house_number,
    phone_number,
    location,
    name,
    sex,
}) => newFetch({
    method,
    url : `${apiUrl}${url}?adr_id=${adr_id}&detail_address=${detail_address}&house_number=${house_number}&phone_number=${phone_number}&location=${location}&name=${name}&sex=${sex}`
})
// 新增地址
export const addAddress = ({
    method = 'get',
    url = '/user/add_address',
    detail_address,
    house_number,
    location,
    name,
    phone_number,
    sex = 1,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/detail_address/${detail_address}/house_number/${house_number}/location/${location}/name/${name}/phone_number/${phone_number}/sex/${sex}/user_id/${user_id}`
})
// 删除地址
export const deleteAddress = ({
    method = 'get',
    url = '/user/del_address',
    adr_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/adr_id/${adr_id}`
})

// 签到
export const sign = ({
    method ='get',
    url = '/user/user_integral',
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`
})

// 获取验证码
export const login = ({
    method = 'get',
    url = '/login/getCode',
    phone
})=> newFetch({
    method,
    url : `${apiUrl}${url}/phone/${phone}`
})
export const loginCode = ({
    method = 'get',
    url = '/login/send_code_app',
    phone,
    code
})=> newFetch({
    method,
    url : `${apiUrl}${url}/phone/${phone}/code/${code}`
})
// 登录
export const getUser = ({
    method = 'get',
    url = '/login/check_phone_login',
    phone,
    code
}) => newFetch({
    method,
    url : `${apiUrl}${url}/phone/${phone}/code/${code}`
})
// 退出登录
export const getUserInfo = ({
    method = 'get',
    url = '/Login/get_user_info',
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`
})
// 修改性别
export const setUserSex =({
    method = 'get',
    url = '/user/up_user_sex',
    sex,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/id/${user_id}/sex/${sex}`
})
// 登陆后本地添加到购物车
export const addLocalToCark = ({
    method = 'post',
    url = '/goods/add_shop_cart_list/',
    list,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}`,
    data : {
        user_id : user_id,
        list : list
    }
})
// 初始化购物车数量
export const initCark = ({
    method = 'get',
    url = '/user/get_user_cart',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`,
})

// 是否绑定手机号
export const bindPhone = ({
    method = 'get',
    url = '/user/real_user',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`,
})
// 绑定手机号
export const bingToPhone = ({
    method = 'get',
    url = '/user/merge_user',
    user_id,
    phone,
    code
})  => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/phone/${phone}/code/${code}`,
})

// 购物车提交详情
export const shopCarkOrder =({
    method = 'get',
    url = '/order/confirm_order',
    addr_id = 0,
    coup_id,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/addr_id/${addr_id}/coup_id/${coup_id}`,
})
// 获取当前服务器时间
export const getTime =({
    method = 'get',
    url = '/order/get_day_time'
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
})

//  提交订单
export const upOrderMessage = ({
    method = 'post',
    url = '/order/submit_order',
    type,
    data
}) => newFetch({
    method,
    url : `${apiUrl}${url}?type=${type}`,
    data: data
})

// 投诉建议
export const suggestion = ({
    method = 'post',
    url = '/index/addComplaint',
    data,
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
    data : data
})

// 积分商城
export const integral = ({
    method = 'get',
    url = '/goods/redemption',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`,
})
// 积分列表
export const intList = ({
    method = 'get',
    url = '/user/user_numerical',
    page = 1,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/page/${page}`,
})
// 积分兑换
export const intChange = ({
    method = 'get',
    url = '/user/redemption',
    rid,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/rid/${rid}`,
})

// 优惠券列表
export const couponList = ({
    method = 'get',
    url = '/user/user_coupon',
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`,
})
export const exchange = ({
    method = 'get',
    url = '/user/activity_coupon',
    activity,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/activity/${activity}`,
})
export const addExCark = ({
    method = 'get',
    url = '/goods/add_shop_cart',
    goods_id,
    markup_id,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}/markup_id/${markup_id}`,
})
// 礼品盒列表
export const giftList = ({
    method = 'get',
    url = '/gift/user_gift',
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`,
})
// 领取礼品
export const giftRecive = ({
    method = 'get',
    url = '/gift/received',
    gift_id,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/gift_id/${gift_id}`,
})
// 邀请新人
export const userInvited = ({
    method = 'get',
    url = '/user/new_user_invit',
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}`,
})

// 购物车
export const shopCark = ({
    method = 'get',
    url = '/goods/get_shop_cart',
    coupon_id = null,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/id/${user_id}/coupon_id/${coupon_id}`,
})
// 换购
export const changeGoods = ({
    method = 'get',
    url = '/goods/markup_title'
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
})
export const changeList = ({
    method = 'get',
    url = '/goods/markup_goods'
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
})
// 购物车优惠券选择
export const carkCopunList = ({
    method = 'get',
    url = '/user/user_coupon',
    type = 'cark',
    money,
    catelist,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}?user_id=${user_id}&type=${type}&money=${money}&catelist=${catelist}`,
})
// 确认订单
export const confirmOrder = ({
    method = 'post',
    url = '/order/check_shopcart/',
    data,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
    data : {
        user_id : user_id,
        goods : data
    }
})

// 全选
export const selectAll = ({
    method = 'get',
    url = '/goods/goods_check',
    goods_id = 'all',
    check,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}/check/${check}`,
})
// 单个商品选中
export const selectOne = ({
    method = 'get',
    url = '/goods/goods_check',
    goods_id,
    check,
    multitype_id,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}/check/${check}/multitype_id/${multitype_id}`,
})

// 添加商品数量
export const addGoodsCount = ({
    method = 'get',
    url = '/goods/add_shop_cart',
    goods_id,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}`,
})
export const addMoreUnitGoods = ({
    method = 'get',
    url = '/goods/add_shop_cart',
    goods_id,
    multitype_id,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}/multitype_id/${multitype_id}`,
})
// 减少商品数量
export const reduceGoods = ({
    method = 'get',
    url = '/goods/del_shop_cart',
    goods_id,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}`,
})

export const removeGoods = ({
    method = 'post',
    url = '/goods/del_total_shop_cart/',
    list,
    user_id
})=> newFetch({
    method,
    url : `${apiUrl}${url}`,
    data : {
        user_id,
        list
    }
})
// 加入购物车
export const addToCark = ({
    method = 'get',
    url = '/goods/add_shop_cart',
    goods_id,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}`,
})
// export const addMoreCark = ({
//     method = 'get',
//     url = '/goods/add_shop_cart',
//     goods_id,
//     multitype_id,
//     user_id
// }) => newFetch({
//     method,
//     url : `${apiUrl}${url}/user_id/${user_id}/goods_id/${goods_id}/multitype_id/${multitype_id}`,
// })

//  订单
export const order = ({
    method = 'get',
    url = '/order/get_order_list',
    page = 1,
    type = 0,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/page/${page}/type/${type}`,
})
// 取消and删除订单
export const deleteOrder = ({
    method = 'get',
    url = '/order/del_order',
    group_id,
    user_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/user_id/${user_id}/group_id/${group_id}`,
})
// 催单
export const reminOrede =({
    method = 'get',
    url = '/order/urge_order',
    group_id,
}) => newFetch({
    method,
    url : `${apiUrl}${url}/group_id/${group_id}`,
})

// 订单详情
export const orderDetial = ({
    method = 'get',
    url = '/order/get_order_detail',
    order_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/order_id/${order_id}`
})
// 评价订单
export const evalOrder = ({
    method = 'get',
    url = '/order/dictionaries_next_order',
    group_id
}) => newFetch({
    method,
    url : `${apiUrl}${url}/group_id/${group_id}`
})
// 提交评价订单
export const evalCommit = ({
    method = 'post',
    url = '/order/order_comment/',
    data
}) => newFetch({
    method,
    url : `${apiUrl}${url}`,
    data : data
})

// 微信获取config信息
export const getConfig = ({
    method = 'get',
    url = '/wechat/get_config',
    urlLink
}) => newFetch({
    method,
    url : `${apiUrl}${url}?url=${urlLink}`
})
// 定位详情
export const addressName = ({
    method = 'get',
    url = '/index/geocode_regeo',
    lat,
    lng
}) => newFetch({
    method,
    url : `${apiUrl}${url}?lat=${lat}&lng=${lng}`
})
// 微信照片上传
export const upPhoto = ({
    method = 'get',
    url = '/wechat/save_media',
    serverid
}) => newFetch({
    method,
    url : `${apiUrl}${url}?serverid=${serverid}`
})