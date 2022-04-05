<template>
  <div>
     <h2>自定义带hover提示的按钮</h2>
     <!-- 当用户在使用 按钮组件时 需要向按钮传递动态的参数过去 el-button 进行二次封装  b绑定自定义事件 click-->
     <HintButton type="success" icon="el-icon-delete" size="mini" title="提示按钮" @click="handler" />
  </div>
</template>

<script>
import HintButton from './HintButton'
export default {
  name: 'AttrsListennersTest',
  components:{
     HintButton
  },
  methods:{
     handler(){
        alert(6666)
     }
  }
}
</script>
