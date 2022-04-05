//import Home from '@/pages/Home'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

// // 引入二级路由
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'

export default [
    {
       path:'/',
       redirect:'/home',
    },
    {
      path: '/home',
      name: 'home',
      component:()=>import('@/pages/Home'),   //  路由濑加载
      meta:{ show:true },
    },
    {
      path: '/communication',
      name: 'communication',
      component:()=>import('@/views/Communication/Communication'),   //  路由濑加载
      meta:{ show:true },
      children:[
         {
            path: '/event',
            name: 'event',
            component:()=>import('@/views/Communication/EventTest/EventTest'),   //  路由濑加载
            meta:{ show:true },
         },
         {
            path: '/model',
            name: 'model',
            component:()=>import('@/views/Communication/ModelTest/ModelTest'),   //  路由濑加载
            meta:{ show:true },
         },
         {
            path: '/sync',
            name: 'sync',
            component:()=>import('@/views/Communication/SyncTest/SyncTest'),   //  路由濑加载
            meta:{ show:true },
         },
         {
            path: '/attrs-listennersTest',
            name: 'attrs-listennersTest',
            component:()=>import('@/views/Communication/AttrsListennersTest/AttrsListennersTest'),   //  路由濑加载
            meta:{ show:true },
         },
         {
            path: '/children-parentTest',
            name: 'children-parentTest',
            component:()=>import('@/views/Communication/ChildrenParentTest/ChildrenParentTest'),   //  路由濑加载
            meta:{ show:true },
         },
         {
          path: '/scope-slottest',
          name: 'scope-slottest',
          component:()=>import('@/views/Communication/ScopeSlotTest/ScopeSlotTest'),   //  路由濑加载
          meta:{ show:true },
       },
      ]
    },
    {
      path: '/detail/:skuId',
      name: 'detail',
      component:()=>import('@/pages/Detail'),
      meta:{ show:true },
    },
    {
      path: '/addcartsuccess',
      name: 'addcartsuccess',
      component: ()=>import('@/pages/AddCartSuccess'),
      meta:{ show:true },
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: ()=>import('@/pages/ShopCart'),
      meta:{ show:true },
    },
    {
      path: '/trade',
      name: 'trade',
      component: ()=>import('@/pages/Trade'),
      meta:{ show:true },
      // 路由独享守卫
      beforeEnter:(to,from,next)=>{
         // 去交易页面 必须从购物车而来 
         if(from.path==='/shopcart'){
            next()
         }else{
            // 从其他路由去交易页面 就停留在当前的页面
            next(false)
         }
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component:()=>import('@/pages/Pay'),
      meta:{ show:true },
      // 路由独享守卫
      beforeEnter:(to,from,next)=>{
        // 去支付页面 必须从交易而来 
        if(from.path==='/trade'){
           next()
        }else{
           // 从其他路由去交易页面 就停留在当前的页面
           next(false)
        }
     }
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: ()=>import('@/pages/PaySuccess'),
      meta:{ show:true },
    },
    {
      path: '/center',
      name: 'center',
      component: ()=>import('@/pages/Center'),
      meta:{ show:true },
      children:[
         {
          path: 'myorder',
          name: 'myorder',
          component: ()=>import('@/pages/Center/MyOrder'),
         },
         {
          path: 'grouporder',
          name: 'grouporder',
          component: ()=>import('@/pages/Center/GroupOrder'),
        },
        {
          path: '/center',
          redirect: '/center/myorder',
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '@/pages/Login'),
      meta:{ show:false },
    },
    {
      path: '/search/:keyword?',   //? 代表 params 参数可传可不传
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ '@/pages/Search'),
      meta:{ show:true },  // 控制页脚组件是否显示
      //props:true,  // 路由组件传递 props 数据
      //props:{ a:1,b:2},  // 对象的写法
      //props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})  // 路由组件传递 props 数据 函数写法
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ '@/pages/Register'),
      meta:{ show:false },
    },
  ]