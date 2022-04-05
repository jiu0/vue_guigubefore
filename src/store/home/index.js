
import { reqCategoryList,reqGetBannerList,reqFloorList,} from '@/api'
const state = {
    categoryList:[],
    bannerList:[],   // 轮播数据
    floorList:[],
}

const mutations = {
    CATEGORYLIST(state,val){
        state.categoryList = val;
    },
    GETBANNERLIST(state,val){
        state.bannerList = val;
    },
    GETFLOORLIST(state,val){
        state.floorList = val;
    },
}

const actions = {
   async categoryList({commit}){
        const result = await reqCategoryList()
        console.log('result',result)
        if(result.code ===200){
          commit("CATEGORYLIST",result.data)
       }
    },
   async getBannerList({commit}){
       const result = await reqGetBannerList()
       if(result.code ===200){
          commit('GETBANNERLIST',result.data)
       }
       console.log('1111',result)
    },
   async getFloorList({commit}){
      let result = await reqFloorList();
      if(result.code ===200){
          commit('GETFLOORLIST',result.data)
      }
   }
}
const getters = {


}

export default {
  state,
  mutations,
  actions,
  getters,
}
