<template>
  <div>
      <h2> 爸爸有存款:{{ money }}</h2>
      <button @click="jieQianFromXM(100)">找小明借钱100</button>
      <button @click="jieQianFromXH(150)">找小红借钱150</button>
      <button @click="jieQianFromAll(200)">找所有孩子借钱200</button>
      <br/>
      <Son ref="xm" />
      <br/>
      <Daughter  ref="xh" />
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'
export default {
  name: 'ChildrenParentTest',
  components:{
    Son,
    Daughter,
  },
  data(){
    return{
       money:1000
    }
  },
  methods:{
     jieQianFromXM(money){
        // 父组件的钱数 累加 100
        this.money += money;
        // ref 可以获取真实的dom 节点 可以获取到子组件的标签 操作子组件额数据和方法
        this.$refs.xm.money -= money;
     },
     //向女儿借钱
     jieQianFromXH(money){
        this.money += money;
        this.$refs.xh.money -= money;
     },
     jieQianFromAll(money){
        this.money += 2 * money;
        console.log('children',this.$children)
        this.$children.forEach(item=>{
           item.money -= 200;
        })
     }
  }
}
</script>
