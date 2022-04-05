
import { reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
//封装 临时游客的身份  作用是区别 购物车 是谁的 只能一次 下次同一个人进来 不能变
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo:{},
    uuid_token:getUUID()
}

const mutations = {
    GETGOODSINFO(state,val){
        state.goodsInfo = val
    }
}
const actions = {
    async getGoodsInfo({commit},skuId){
       let result = await reqGoodsInfo(skuId);
       console.log('2333',result)
       if(result.code===200){
           commit('GETGOODSINFO',result.data)
       }
    },
    // 将产品添加购物车中  点击购物车 服务器只返回 添加是否成功  并没有返回其他数据
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code===200){
            return 'ok';
        }else{
            return Promise.reject(new Error('file')) 
        }
    },
}
const getters = {
    // 产品导航部分的数据
    categoryView(state){  // 没有获取到数据时,state.goodsInfoh是undefined  undefined 没有categoryView 属性
        return state.goodsInfo.categoryView || {}
    },
    // 产品标题部分的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    // 产品售卖属性部分数据简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
