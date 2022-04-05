<template>
  <div id="app">
     <!-- erha 是自定义的修饰符 v-upper 是自定义的指令 -->
     <h1 v-upper.erha="msg"></h1>
     <router-link to="/Communication" style="display:inline-block;line-height:30px;">去测试页</router-link>
     <Header/>
      <router-view/>
     <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default{
    name:'Index',  // name 的名字 不要 和  components 注册的组件名字一样
    components:{
      Header,
      Footer
    },
    data(){
        return{
          msg:'abc'
        }
    },
    mounted(){
      // 把三级分类的数据 放到 根组件里 只执行一次 这样 在 home 组件 search 组件切换时  只需要发一次请求 把数据放到仓库里
      this.$store.dispatch('categoryList')
    }
}
</script>


<style lang="less" scoped>

</style>
