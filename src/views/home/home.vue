<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import Swiper from '../../components/common/swiper/swiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from '../../network/home';
import {debounce} from '../../common/utils'
  export default {
    components:{
      NavBar,
      Swiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed:false
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      // 1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
      //2.获取tabControl的Offsettop
      
    },
    methods:{
      /*事件监听*/
      swiperImageLoad(){
        console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      contentScroll(position){
        //1.判断backtop是否显示
        if((-position.y)>1000){
          this.isShowBackTop = true
        }else{
          this.isShowBackTop= false
        }
        //2.决定tabcontrol是否吸顶
       this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      /*网络请求*/
      getHomeMultidata(){
         getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>{
          
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          this.$refs.scroll.scroll.finishPullUp()
        })
      },
    }
  }
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
#home .home-nav{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;

  /* 在浏览器原生滚动使用 */
 /*  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control{
  position: sticky;
  top: 44px; 
  background-color: #fff;
} */
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.tab-control {
    position: relative;
    z-index: 9;
  }
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>