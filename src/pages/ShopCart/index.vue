<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" @change="updateChecked(cart,$event)" name="chk_list" :checked="cart.isChecked===1">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$evevt.target.value * 1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deteleAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalPrice.isCheckedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice.total}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    mounted(){
        this.getCartData()
    },
    methods:{
       getCartData(){
           this.$store.dispatch('getCartList')
       },
      // 点击购物车 哪里 添加节流操作
      handler:throttle(async function(type,disNum,cart){  // 节流
        //  type 区分是哪个按钮   disNum 区分变化量 点击加 传 +1 点击减 传 -1  输入框里传的不是变化量  接口需要的是变化量   cart 区分点击的是哪个商品
        switch(type){
           case "add":
             disNum = 1;
             break;
           case "mins":
             disNum = cart.skuNum > 1 ? -1 : 0;
             break;
           case "change":
             // 用户输入 非法(汉字| 负数)  带给服务器是 0  
             if(isNaN(disNum)||disNum < 1){
                 disNum = 0;
             }else{
                // 正常 出现小数 需要取整
                disNum = parseInt(disNum) - cart.skuNum
             }
             break;
          } // 派发了 action 之后(向服务器发请求) 还要重新刷新一下列表  放入 try catch  中  捕捉到 后台请求发成功 再获取列表数据
          try{
              await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
                this.cartInfoList.forEach(item=>{
                  if(item.isChecked ===1){
                     this.getCartData();
                 }
            })
           }catch(err){
              alert(err.message)
          }
       },500),
       //删除某一个商品
      async deleteCartById(cart){
          try{
              await this.$store.dispatch('deleteCartListBySkuId',cart.skuId)
              this.getCartData();
          }catch(err){
              alert(err.message)
          }
       },
       //修改购物车状态
       async updateChecked(cart,event){
           try{
              console.log('event',event.target.checked) // true false  但是 服务器 isChecked 需要的是 0 或者 1 
              let isChecked = event.target.checked ? '1' : '0';
              await this.$store.dispatch('updateCheckedById',{skuId:cart.skuId,isChecked:isChecked})
              this.getCartData()
            }catch(err){
              alert(err.message)
          }
       },
       //删除全部选中的商品  这个函数没法收集有用的数据
      async deteleAllCheckedCart(){
           try{
              await this.$store.dispatch('deteleAllCheckedCart')
              this.getCartData()
            }catch(err){
              alert(err.message)
          }
       },
       // 修改全部选中的商品
       async updateAllCartChecked(event){
            try{
              let isChecked = event.target.checked ? '1' :'0';
              await this.$store.dispatch('updateAllCartIsChecked',isChecked)
              this.getCartData()
            }catch(err){
              alert(err.message)
          }
       }
    },
    computed:{
       ...mapGetters(['cartList']),
       cartInfoList(){
          return this.cartList.cartInfoList || []
       },
       totalPrice(){
         let total = 0,isCheckedNum=0;
         this.cartInfoList.forEach(item=>{
             console.log('item777',item)
             if(item.isChecked ===1){
                total += item.skuNum * item.skuPrice
                isCheckedNum += item.skuNum
             }
         })
         return {total,isCheckedNum};
       },
       // 遍历数组里面的元素 获取 isChecked的值  每个元素里 isChecked 都是 1 就返回true  否则 返回false 
       isAllChecked(){
          return this.cartInfoList.every(item=>item.isChecked === 1)
       }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

         

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>