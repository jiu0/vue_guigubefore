// Vue 插件一定是暴露 一个对象
let myPlugins = {}
myPlugins.install = function(Vue,options){
  // Vue.prototype.$bus  Vue.directive  Vue.component Vue.filter  全局指令
  Vue.directive(options.name,(element,params)=>{
     console.log('params',params)
     element.innerHTML = params.value.toUpperCase()
  })
}

export default  myPlugins;