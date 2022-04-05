import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// 解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location,resolve,reject){
   if(resolve && reject){
      originalPush.call(this,location,resolve,reject)
   }else{
      originalPush.call(this,location,()=>{},()=>{})
   }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
     originalReplace.call(this,location,resolve,reject)
  }else{
     originalReplace.call(this,location,()=>{},()=>{})
  }
}

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
      // 始终滚动到顶部 y=0表示 路由切换 时 滚动条滚动到顶部
      return { y:0 }
    },
})

router.beforeEach(async (to,form,next)=>{
   let token = store.state.user.token;
   let name = store.state.user.userInfo.name;
   if(token){  // 用户登录了 还想去 login 不能去 要留在首页
      if(to.path=='/login'){
          next('/home')
      }else{
        // 用户登录了 单数去的不是 login 
        if(name){  // 如果用户名 已有  直接放行 
           next()
        }else{  // 没有用户信息 需要派发 action  获取用户信息 再跳转
           try{
              // 获取用户信息成功
              await store.dispatch('getUserInfo')
              next()
           }catch(err){
              // token 过期了 需要重新登录  清除token
              await store.dispatch('userLogout')
              next('/login')
           }
         }
      }
   }else{ // 未登录 不能去交易相关 不能去支付相关(pay,paysuccess) 不能去个人中心
       // 未登录 去上面这些路由 ---=去登录
       // 去的不是不是上面这些路由 可以放行 (home search shopcart)
       let toPath = to.path
       if(toPath==='/trade'|| toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1){
          //把未登录想去而没有去成的路由 通过地址栏储存 当登录成功后直接跳到 想去的那个路由
          next('/login?redirect='+toPath)
       }else{
          next()
       }
   }
})

export default router
