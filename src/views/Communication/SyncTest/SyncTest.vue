<template>
  <div>
     小明的爸爸现在 有{{money}}元 
     <h2>不使用 sync 修饰符</h2>
     <!-- money1 父组件给子组件传递的 props  @update:money1 给子组件绑定的自定义事件 只不过名字叫update:money1 -->
     <Child1 :money1="money" @update:money1="money = $event" />
     <h2>使用 sync 修饰符</h2>
     <!-- sync 作用 1 给父组件给子组件传递 props money1 2 给当前子组件绑定了一个 自定义事件 事件名叫 update:money1  
     使用 sync 可以达到 简写的目的-->
     <Child2 :money1.sync="money"  />
  </div>
</template>

<script>
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
export default {
  name: 'SyncTest',
  components:{
     Child1,
     Child2,
  },
  data(){
    return{
      money:10000
    }
  }
}
</script>
