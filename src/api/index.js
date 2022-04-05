import request from './request'
import mockRequest from './mockRequest'
// /api/product/getBaseCategoryList
// 获取三级分类
export const reqCategoryList = ()=>{
    return request({
        url:'/product/getBaseCategoryList',
        method:'get',
    })
}
// 获取 轮播图数据
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取 floor组件的 数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取 search模块的 数据  params 什么都不传  至少是个 {} 不然请求会报错
export const reqGetSearchInfo = (params) =>{ 
   return request({
        url:'/list',
        method:'post',
        data:params,
   })
}

// 获取商品
export const reqGoodsInfo = (skuId) =>{ 
    return request({
         url:`/item/${skuId}`,
         method:'get',
    })
 }

// 将产品添加到购物车中 或者更改产品的个数  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>{ 
    return request({
         url:`/cart/addToCart/${skuId}/${skuNum}`,
         method:'post',
    })
 }

//获取购物车 列表数据
export const reqCartList = ()=>{
    return request({
        url:'/cart/cartList',
        method:'get',
   })
}


//删除购物车 商品  /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete',
   })
}


//修改 商品 选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get',
   })
}


// 获取验证码 /api/user/passport/sendCode/phone
export const reqGetCode = (phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
   })
}


// 注册 /api/user/passport/register
export const reqUserRegister = (data)=>{
    return request({
        url:'/user/passport/register',
        method:'post',
        data
   })
}


// 登录 /api/user/passport/login
export const reqUserLogin = (data)=>{
    return request({
        url:'/user/passport/login',
        method:'post',
        data
   })
}

//获取用户信息的接口  通过 token 找服务器要用户的信息
//api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>request({url:`/user/passport/auth/getUserInfo`,method:'get'});


//退出登录  /api/user/passport/logout
export const reqLogout = ()=>{
    return request({
        url:'/user/passport/logout',
        method:'get',
   })
}


//获取用户地址信息   地址数组 为空
//export const reqAddressInfo = ()=>request({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
export const reqAddressInfo = ()=>mockRequest.get('/adress');

//获取订单交易页信息  /api  
export const reqOrderInfo = ()=>{
    return request({
        url:'/order/auth/trade',
        method:'get',
   })
}

// 获取订单交易页信息 
//export const reqOrderInfo = () => mockRequest.get('/order')


// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data,
   })
}


// 获取支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get',
   })
}


// 获取支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get',
   })
}

//获取个人中心 订单列表  /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get',
   })
}

