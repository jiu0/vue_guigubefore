import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"
const state = {
   cartList:[]
}

const mutations = {
  GETCARTLIST(state,val){
      state.cartList = val
  }
}
const actions = {
  // 获取购物车 数据
  async getCartList({commit}){
     let result = await reqCartList();
     if(result.code ===200){
        commit('GETCARTLIST',result.data)
     }
  },
  //删除购物车 商品 
 async deleteCartListBySkuId({commit},skuId){
     let result = await reqDeleteCartById(skuId);
     if(result.code===200){
        return 'ok'
     }else{
        return Promise.reject(new Error('falie'))
     }
  },
  // 修改购物车商品的状态
  async updateCheckedById({commit},{skuId,isChecked}){
    let result = await reqUpdateCheckedById(skuId,isChecked);
    console.log('23333',result)
    if(result.code===200){
       return 'ok'
    }else{
       return Promise.reject(new Error('falie'))
    }
 },
 //删除全部已经勾选的商品  把每次删除商品的接口 循环调 选中商品的个数次数 进行删除
 deteleAllCheckedCart({dispatch,getters}){
       // context是一个小仓库  
       console.log('getters',getters)
       // 获取购物车中所有的商品 是一个数组
       let PromiseAll = []
       getters.cartList.cartInfoList.forEach(item=>{
          // 返回的 每个  promise 都是一个 Promise 对象 需要用Promise.all['p1','p2'] 方法 获取 删除全部选中商品 返回的整体结果
          let promise = item.isChecked===1 ? dispatch('deleteCartListBySkuId',item.skuId) : ''
          PromiseAll.push(promise)
       })
       // Promise.all['p1','p2'] p1 p2 都成功返回 成功  有一个失败 就返回失败
       return Promise.all(PromiseAll)
   },
   // 修改全部商品的状态
   updateAllCartIsChecked({dispatch,state},isChecked){
     console.log('isChecked',isChecked)  // 0 1
     console.log('state',state)
     let PromiseAll = []
     state.cartList[0].cartInfoList.forEach(item=>{
         let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked:isChecked})
         PromiseAll.push(promise)
     })
     return Promise.all(PromiseAll)
   }
}
// 计算属性  简化 仓库中的数据
const getters = {
  cartList(state){
     return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
