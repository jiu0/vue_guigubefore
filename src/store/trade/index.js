import { reqAddressInfo,reqOrderInfo, } from "@/api"
const state = {
    address:[],
    orderInfo:{},
}

const mutations = {
    GETUSERADDRESS(state,val){
        state.address = val
    },
    GETORDERINFO(state,val){
        state.orderInfo = val
    }
}
const actions = {
    //获取订单地址列表
   async getUserAddress({commit}){
     let result =  await reqAddressInfo()
     console.log('Address',result)
     if(result.code===200){
        commit('GETUSERADDRESS',result.data)
     }
   },
   // 获取订单交易页信息
   async getOrderInfo({commit}){
    let result =  await reqOrderInfo()
    console.log('order',result)
    if(result.code===200){
       commit('GETORDERINFO',result.data)
    }
  },
}
// 计算属性  简化 仓库中的数据
const getters = {
 
}

export default {
  state,
  mutations,
  actions,
  getters,
}
