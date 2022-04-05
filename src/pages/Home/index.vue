 <template>
    <div>
        <!-- 三级联动 -->
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <!-- floor 组件自己内部没有发请求  数据是父组件给的 -->
        <Floor v-for="item in floorList" :key="item.id" :list="item"/>
        <Brand/>
    </div>
</template>

<script>
import { reqCategoryList } from "@/api/index"
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  name: 'index',
  components: {
     ListContainer,
     Recommend,
     Rank,
     Like,
     Floor,
     Brand,
  },
  mounted(){
     this.$store.dispatch('getFloorList')
     // 获取用户信息 在首页展示
  },
  computed:{
     ...mapState({
        floorList:state=>state.home.floorList
     })
  }
}
</script>

<style lang="less" scoped>

</style>