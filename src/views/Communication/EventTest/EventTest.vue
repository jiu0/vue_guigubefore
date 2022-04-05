<template>
  <div>
     <h1>EventTest组件</h1>
     <!-- 原生dom 绑定系统事件 -->
     <button @click="handler">原生dom 绑定系统事件</button>
     <!-- Event1组件 Event1不是原生地dom 节点 绑定的 click 事件 不是原生dom 事件 而是 自定义事件 需要在子组件触发 $emit 事件触发 -->
     <!-- 可以在 click.native 变成 原生事件  是给子组件的根节点绑定点击事件 用到事件委派-->
     <Event1 @click="handler1" />
     <Event1 @click.native="handler2" />
     <!-- 原生 dom 绑定自定义事件 没有任何意义 因为没有办法 触发 $emit 函数 -->
     <button @xxx= "handler3">原生dom绑定自定义事件</button>
     <Event2 @click="handler4" @xxx ="handler4" />
  </div>
</template>

<script>
import Event1 from './Event1.vue';
import Event2 from './Event2.vue';
export default {
  name: 'EventTest',
  components:{
       Event1,
       Event2
   },
   methods:{
      handler(event){
         console.log('event',event)
      },
      handler1(flag){
           console.log('event1事件回调',flag)
      },
      handler2(){
          console.log('event2事件回调')
      },
      handler3(){
         console.log('3333')
      },
      handler4(prop){
         console.log('prop',prop)
      }
   }
}
</script>
