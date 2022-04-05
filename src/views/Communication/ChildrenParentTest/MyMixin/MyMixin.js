export default {
    methods:{
        giveMoney(money){
            this.money -= money;
            // $parent 可以在子组件里面获取某一个父组件 可以操作父组件的数据 和方法
            this.$parent.money += money;
         }
     }
}