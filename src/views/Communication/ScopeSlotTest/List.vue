<template>
  <div>
     <ul>
         <li v-for="(item,index) in todos" :key="index">
          <!-- 作用域插槽 -->
           <slot :todo="item"></slot>
         </li>
     </ul>
  </div>
</template>
<script>
export default {
  name: 'List',
  props:{
      todos:Array
  }
}
</script>
