<template>
  <div>
     女儿小红 有存款 {{ money }}  <button @click="giveMoney(100)">给爸爸钱:100</button>
  </div>
</template>

<script>
import myMixin from '@/views/Communication/ChildrenParentTest/MyMixin/MyMixin'
export default {
  name: 'Daughter',
  mixins:[myMixin],
  data(){
      return{
        money:20000
      }
  },
}
</script>
