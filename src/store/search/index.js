import { reqGetSearchInfo } from "@/api"
const state = {
    searchList:{}
}

const mutations = {
  GETSEARCHLIST(state,val){
    state.searchList = val;
  }
}

const actions = {
  // 获取search 模块的数据
  async getSearchList({commit},params={}){
    let result = await reqGetSearchInfo(params);
    console.log('222',result)
    if(result.code===200){ 
      commit('GETSEARCHLIST',result.data)
    }
  }
}
// 计算属性  简化 仓库中的数据
const getters = {
   goodsList(state){
      return state.searchList.goodsList || []
   },
   trademarkList(state){
      return state.searchList.trademarkList || []
   },
   attrsList(state){
      return state.searchList.attrsList || []
   },

}

export default {
  state,
  mutations,
  actions,
  getters,
}
