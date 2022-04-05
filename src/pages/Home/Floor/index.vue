 <template>
     <!--楼层-->
<div class="floor">
    <div class="py-container">
        <div class="title clearfix">
            <h3 class="fl">{{list.name}}</h3>
            <div class="fr">
                <ul class="nav-tabs clearfix">
                    <li class="active" v-for="(nav,index) in list.navList" :key="index">
                        <a href="#tab1" data-toggle="tab">{{ nav.text}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content">
            <div class="tab-pane">
                <div class="floor-1">
                    <div class="blockgary">
                        <ul class="jd-list">
                            <li v-for="(keyword,index) in list.keywords" :key="index">{{ keyword }}</li>
                        </ul>
                        <img :src="list.imgUrl" />
                    </div>
                    <div class="floorBanner">
                        <Swiper :bannerList="list.carouselList" />
                        <!-- <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item in list.carouselList" :key="item.id">
                                    <img :src="item.imgUrl">
                                </div>
                            </div>  -->
                            <!-- 如果需要分页器 -->
                            <!-- <div class="swiper-pagination"></div> -->
                            <!-- 如果需要导航按钮 -->
                            <!-- <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>  -->
                    </div>
                    <div class="split">
                        <span class="floor-x-line"></span>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[0]" />
                        </div>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[1]" />
                        </div>
                    </div>
                    <div class="split center">
                        <img :src="list.bigImg" />
                    </div>
                    <div class="split">
                        <span class="floor-x-line"></span>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[2]" />
                        </div>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[3]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//import Swiper from 'swiper'
export default {
  name: 'index',
  props:['list'],
  mounted(){  // 这里可以在 mounted  使用  Swiper 是因为 不是在它自身内发请求获取的数据 是父组件传递过来的数据 
       //在使用 Swiper之前 页面结构已经有了
    //    var mySwiper = new Swiper(this.$refs.mySwiper,{
    //             loop:true, // 是否循坏轮播
    //             pagination:{
    //                el:'.swiper-pagination',  //有上一页 下一页
    //                clickable:true,   // 点击小球可以切换图片
    //             },
    //             navigation:{
    //               nextEl: '.swiper-button-next',
    //               prevEl: '.swiper-button-prev',
    //             }
    //    })  //把 Swiper 方法放入 watch 中  方便把 Swiper组件抽离出来
    },
    watch:{
    //    list:{
    //      immediate:true,   // 立即监听 不管数据是否发生变化 就监听一次  不使用 immediate 是监听不到 list 数据 因为list 数据是父亲给的 数据从来没有发生变化
    //      handler(){    
    //          console.log(55577777)
    //        // handler 方法执行表示 bannerList 数组已经有了数据 但不代表 v-for 已经循坏完毕了 
    //        this.$nextTick(()=>{  // nextTick 表示 v-for已经循坏完毕了
    //          var mySwiper = new Swiper(this.$refs.mySwiper,{
    //             loop:true, // 是否循坏轮播
    //             pagination:{
    //                el:".swiper-pagination",  //有上一页 下一页
    //                clickable:true,   // 点击小球可以切换图片
    //             },
    //             navigation:{
    //               nextEl: ".swiper-button-next",
    //               prevEl: ".swiper-button-prev",
    //             }
    //          })
    //        })
    //      }
    //    }
    },
}
</script>

<style lang="less" scoped>
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #c81623;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #e1251b;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #c81623;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}

</style>