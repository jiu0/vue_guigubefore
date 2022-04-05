 <template>
        <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                    <img :src="item.imgUrl">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Swiper',  // 这个name 在 注册全局组件的时候可以用得到
  props:['bannerList'],
  watch:{
       bannerList:{
         immediate:true,  
         handler(){    
           // handler 方法执行表示 bannerList 数组已经有了数据 但不代表 v-for 已经循坏完毕了 
           this.$nextTick(()=>{  // nextTick 表示 v-for已经循坏完毕了
             var mySwiper = new Swiper(this.$refs.mySwiper,{
                loop:true, // 是否循坏轮播
                pagination:{
                   el:".swiper-pagination",  //有上一页 下一页
                   clickable:true,   // 点击小球可以切换图片
                },
                navigation:{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
             })
           })
         }
       }
    },
}
</script>

<style lang="less" scoped>

</style>