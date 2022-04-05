<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword}}<i @click="removeKeyword">×</i></li>
             <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i></li>
             <!-- 平台属性的面包屑 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{ item.split(":")[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrParInfo="attrParInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne }" @click="changeOrder('1')">
                  <a>综合 <span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                     <!-- 路由跳转不要忘了带 id -->
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  //import {mapState} from 'vuex'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    data(){
      return{
        //携带给服务器参数
      searchParams: {
          category1Id: "", //一级分类的id
          category2Id: "", //二级分类的id
          category3Id: "", //三级分类的id
          categoryName: "", //产品的名字
          keyword: "", //关键字
          props: [], //平台属性的选择参数
          trademark: "", //品牌参数
          //上面这七个参数：有用户选择决定的，因此初始值为空的
          //下面这三个：都有初始值
          order: "1:desc", //携带给服务器参数order--->初始值"1:desc"[综合降序]
          pageNo:1,
          // pageNo:parseInt(localStorage.getItem('pageNo'))||1, //获取第几页的数据，默认即为第一个的数据
          pageSize:3, //每一页需要展示多少条数据
        },
      }
    },
    // 在发请求之前  把 接口需要的参数整理好 
    beforeMount(){
      //  this.searchParams.category1Id = this.$route.query.category1Id;
      //  this.searchParams.category2Id = this.$route.query.category2Id;
      //  this.searchParams.category3Id = this.$route.query.category3Id;
      //  this.searchParams.categoryName = this.$route.query.categoryName;
      //  this.searchParams.keyword = this.$route.params.keyword;
          Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    // 组件挂载完毕 执行一次 仅仅执行一次
    mounted(){
       this.getSearchData()
    },
    computed:{
      // ...mapState({
      //    goodsList:state=>state.search.searchList.goodsList
      // })
      ...mapGetters(['goodsList']),
      isOne(){
         return this.searchParams.order.indexOf('1') !== -1
      },
      isTwo(){
         return this.searchParams.order.indexOf('2') !== -1
      },
      isAsc(){
         return this.searchParams.order.indexOf('asc') !== -1
      },
      isDesc(){
         return this.searchParams.order.indexOf('desc') !== -1
      },
      ...mapState({
         total:state=>state.search.searchList.total
      })
    },
    methods:{
       // 获取分页 当前第几页
       getPageNo(pageNo){
           console.log('pageNo',pageNo)
           this.searchParams.pageNo = pageNo;
           this.getSearchData();
       },
       getSearchData(){
           console.log('searchParams',this.searchParams)
           this.$store.dispatch('getSearchList',this.searchParams)
       },
       // 删除分类的名字
       removeCategoryName(){
          // 分类名字没有 对应的id  也要清空
          // 带给服务器的参数可有可无时  当传过去的参数值 是 '' 时  可以写成 undefined  少带过去参数的个数
          this.searchParams.categoryName = undefined;  // ''
          this.searchParams.category1Id = undefined;   // ''
          this.searchParams.category2Id = undefined;   // ''
          this.searchParams.category3Id = undefined;   // ''
          this.getSearchData();
          // 地址栏也要改 地址栏里面 有 params 参数 时不应该删掉  只删除 query 参数
          if(this.$route.params){
              this.$router.push({name:'search',params:this.$route.params})
          }
       },
       // 删除关键字 创造的选项卡
       removeKeyword(){
            this.searchParams.keyword = undefined;
            this.getSearchData();
            this.$bus.$emit('clear')
            if(this.$route.query){
              this.$router.push({name:'search',query:this.$route.query})
           }
        },
        // 自定义事件
        trademarkInfo(val){
           // 整理参数
           this.searchParams.trademark = `${val.tmId}:${val.tmName}`
           this.getSearchData();
        },
        // 将品牌信息置空
        removeTrademark(){
           this.searchParams.trademark = undefined;
           this.getSearchData();
        },
        //平台售卖的属性
        attrParInfo(attr,attrValue){
            // ['属性ID:属性值:属性名']
            let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
            // 数组去重
            if(this.searchParams.props.indexOf(props)===-1){
                this.searchParams.props.push(props);
            }
            this.getSearchData();
        },
        removeAttr(index){
            this.searchParams.props.splice(index,1)
            this.getSearchData();
        },
        // flag 是一个标识 表示用户点击的是综合 1  价格 2 
        changeOrder(flag){
            let originOrder = this.searchParams.order;
            let orderFlag = originOrder.split(':')[0];
            let originSort = originOrder.split(':')[1];
            let newOrder = '';
            if(flag === orderFlag){ // 这里可以确定一定点击的是综合 多次点击是不是点击的是同一个按钮
                newOrder = `${orderFlag}:${originSort==="desc"?"asc":"desc"}`
            }else{  // 点击的是价格 默认降序 点击的是不同的按钮
                newOrder = `${flag}:${'desc'}`
            }
            // 将新的order 赋值给 order 
            this.searchParams.order = newOrder;
            this.getSearchData();
        }
     },
     // 点击搜索 再发请求 需要 用 watch 监听路由的变化 时 发起请求
     watch:{
       // 监听路由是否发生变化 如果发生变化 就发起请求  再发起请求之前 需要再次整理 服务器参数
      $route(newV,oldV){
          Object.assign(this.searchParams,this.$route.query,this.$route.params)
          this.getSearchData();
          // 每次发请求之前 把 分类的ID 清空   categoryName  keyword 不要清空 是因为 重组参数时  会动态更新
          this.searchParams.category1Id = '';
          this.searchParams.category2Id = '';
          this.searchParams.category3Id = '';
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>