<template>
  <div>
     <h2>深入v-model</h2>
     <input type="text" v-model="msg"/>
     <span>{{msg}}</span>
     <br/>
     <h2>v-model实现的原理</h2>
     <!-- v-model 可以通过value 和 input 事件 实现数据的双向绑定 -->
     <input type="text" :value="msg" @input="msg = $event.target.value" />
     <span>{{msg}}</span>
     <!-- 同过v-model 实现父子组件的传值  组件上绑定的value 是props属性 input是自定义事件 可以简写成 v-model -->
     <CustomInput :value="msg" @input ="msg = $event" />
     <CustomInput v-model="msg" />
  </div>
</template>

<script>
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  components:{
       CustomInput,
  },
  data(){
      return{
          msg:'我是data数据'
      }
  }
}
</script>
