<template>
  <div>
       <a :title="$attrs.title">
           <!-- v-bind 不能简写  v-on 不能简写-->
         <el-button v-bind="$attrs" v-on="$listeners"></el-button>
       </a>
  </div>
</template>

<script>


export default {
  name: 'index',
  //props:['type'],  使用了props 接收了属性值 在  attrs中 就获取不到了这个属性
  mounted(){
      // $attrs 是组件的一个属性 可以获取到父组件传递过来的props 数据
      console.log('attrs',this.$attrs)
      //$listeners 是组件的一个属性 可以获取到父组件给子组件传递的自定义事件
      console.log('listeners',this.$listeners) 
  }
  
}
</script>
