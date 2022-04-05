<template>
    <div class="pagination">
        <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo ===1}">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" :class="{active:pageNo ===page}" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo',page)">{{ page}}</button>
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo ===totalPage}"> {{totalPage }}</button>
        <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
        <h1>{{ startNumAndEndNum }}--- 当前页码:{{ pageNo }} </h1>
    </div>
</template>

<script>
    export default {
        name:"Pagination",
        // pageNo 第几页   pageSize 一页显示多少条数据  total 总数据条数 continues 分页连续的页码个数
        props:['pageNo','pageSize','total','continues'],
        computed:{
          // 总共多少页
          totalPage(){
              return Math.ceil(this.total/this.pageSize)
          },
          //计算连续页码的起始值和结束值 (连续页码至少5页)
          startNumAndEndNum(){
            const { continues,pageNo,totalPage} = this;
            let start =0, end =0;  // 定义两个变量存放 起始值 和 结束值
            if(continues>totalPage){  // 总页数没有连续页码多 5页 
                start = 1;
                end = totalPage
            }else{  // 连续页码 有5页 正常现象  总页数大于 5 
               // start 出现 -1 0 都不对 要排除  end 大于 totalPage 也要纠正 end 32 33 
               start = pageNo - parseInt(continues/2);
               end =  pageNo + parseInt(continues/2);
               if(start < 1){
                   start = 1;
                   end = continues
               }
               if(end>totalPage){
                  end = totalPage
                  start = totalPage - continues + 1;
               }
             }
             return { start, end }
           }
        }
    }
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
    background: skyblue;
}
</style>