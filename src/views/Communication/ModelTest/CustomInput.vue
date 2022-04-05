<template>
  <div>
     <h2>input包装组件</h2>
     <!-- 前面value 是input输入框自身的属性 后面的value 是props 属性  前面input是原生地 dom事件 后面input 是自定义事件-->
     <input type="text" :value="value" @input="$emit('input',$event.target.value)" />
  </div>
</template>

<script>

export default {
  name: 'CustomInput',
  props:['value']
  
}
</script>
