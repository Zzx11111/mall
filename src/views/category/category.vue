<template>
  <div id="category">
    <category-nav-bar class="nav-bar"></category-nav-bar>
    <div class="context">
      <category-list :category="category" class="list" @selectionList="selectionList"></category-list>
      <scroll class="scroll-context">
        <category-display :subCategory="subCategory"></category-display>
      </scroll>
    </div>
  </div>
</template>

<script>
import CategoryNavBar from './childComps/CategoryNavBar'
import {getCategory,getSubcategory} from '../../network/category'
import CategoryList from './childComps/CategoryList'
import Scorll from '../../components/common/scroll/Scroll'
import CategoryDisplay from './childComps/CategoryDisplay'
  export default {
    name:'category',
    components:{
      CategoryNavBar,
      CategoryList,
      Scorll,
      CategoryDisplay
    },
    data(){
      return {
        category:[],
        subCategory:[]
      }
    },
    created(){
      getCategory().then(res => {
        /* console.log(res) */
        this.category = res.data.category.list
        //获取正在流行的分类
        this.getSubcategory(res.data.category.list[0].maitKey)
      })

    },
    methods:{
      //详细的分类
      selectionList(maitKey){
        this.getSubcategory(maitKey)
      },
      //网络请求详细分类
      getSubcategory(maitKey){
        console.log(maitKey)
        getSubcategory(maitKey).then(res => {
          console.log(res)
          this.subCategory = res.data.list
        })
      },
    },
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
#category{
  position: relative;
  height: 100vh;
}
#category .context{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  display: flex;
}
#category .list{
  flex: 1;
}
#category .context .scroll-context{
  flex: 3;
}
</style>