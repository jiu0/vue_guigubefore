// 登录  注册的模块

import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout, } from "@/api"
import { setToken,getToken,romoveToken, } from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}

const mutations = {
    GETCODE(state,val){
        state.code = val
    },
    USERLOGIN(state,val){
        state.token = val
    },
    GETUSERINFO(state,val){
       state.userInfo = val
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = {};
        romoveToken();
    }
}
const actions = {
  async getCode({commit},phone){
     let result = await reqGetCode(phone);
     if(result.code===200){
         commit('GETCODE',result.data)
         // 持久化存token 
         //localStorage.setItem('TOKEN',result.data.token)
         setToken(result.data.token)
         return 'ok'
     }else{
         return Promise.reject(new Error('faile'))
     }
   },
   //用户注册
  async userRegister({commit},user){
        let result = await reqUserRegister(user);
        console.log('result8888',result)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
   },
   // 登录业务
   async userLogin({commit},data){
        let result = await reqUserLogin(data);
        console.log('7777',result)
        // 登录成功 服务器下发 token 是用户唯一的标识 将来经常通过带 token 找服务器要用户信息的展示
        if(result.code===200){
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
   },
   //获取用户信息
   async getUserInfo({commit}){
        let result = await reqUserInfo();
        console.log('result9999',result)
        if(result.code===200){
            commit('GETUSERINFO',result.data) 
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
   },
   // 退出登录
   async userLogout({commit}){
      let result =  await reqLogout();
      // action 里面不能操作 state
      if(result.code===200){
        commit('CLEAR') 
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
     }
   }
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

