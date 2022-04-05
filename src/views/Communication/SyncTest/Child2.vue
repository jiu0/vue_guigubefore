<template>
  <div>
     小明每次花 100元 <button @click="$emit('update:money1',money1-100)">花钱</button>, 爸爸还剩 {{ money1 }} 元
  </div>
</template>

<script>


export default {
  name: 'Child2',
  props:['money1']
  
}
</script>
