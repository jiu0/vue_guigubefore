<template>
  <div>
      event2 组件
      <button @click="$emit('click','参数1')">分发自定义点击事件</button>
      <button @click="$emit('xxx','参数2')">分发自定义xxx事件</button>
  </div>
</template>

<script>


export default {
  name: 'Event2',
  
}
</script>
