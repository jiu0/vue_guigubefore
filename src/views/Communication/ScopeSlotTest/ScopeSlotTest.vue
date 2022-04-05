<template>
  <div>
    <h2>效果1 显示TODO列表时,已完成的todo 为绿色</h2>
    <!-- 子组件 数据来源父组件 -->
    <List :todos="todos">
        <template slot-scope="todo">
           <span :style="{color:todo.todo.isComplete?'green':'red'}"> {{ todo.todo.text }}</span>
       </template>
    </List>
    <hr/>
    <h2>效果2 显示TODO列表时,带序号,todo 的绿色为蓝绿搭配</h2>
    <List1 :todos="todos">
       <template slot-scope="{ todo,$index } ">
           <span :style="{color:todo.isComplete?'blue':'green'}">{{ $index }}---- {{ todo.text }}</span>
       </template>
    </List1>
  </div>
</template>

<script>
import List from './List.vue'
import List1 from './List1.vue'
export default {
  name: 'ScopeSlotTest',
  components:{
     List,
     List1,
  },
  data(){
    return{
      todos:[
          {id:1,text:'AAA',isComplete:false},
          {id:2,text:'BBB',isComplete:true},
          {id:3,text:'CCC',isComplete:false},
          {id:4,text:'DDD',isComplete:false}
       ]
    }
  }
}
</script>
