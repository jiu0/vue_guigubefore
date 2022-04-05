<template>
  <div>
     儿子小明 有存款 {{ money }}  <button @click="giveMoney(50)">给爸爸钱:50</button>
  </div>
</template>

<script>
import myMixin from '@/views/Communication/ChildrenParentTest/MyMixin/MyMixin'
export default {
  name: 'Son',
  mixins:[myMixin],
  data(){
      return{
          money:30000
      }
   },
}
</script>
