<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @itemClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
    <detail-Swiper :topImages="topImages" ref="base"></detail-Swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
    <detail-param-info :GoodParam="GoodParam" ref="param"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommends"></goods-list>
  </scroll>
  <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam, getRecommend} from '../../network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShioInfo'
import Scroll from '../../components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from '../../components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from '../../components/content/backTop/BackTop'
  export default {
    name:'detail',
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        GoodParam:{},
        commentInfo:{},
        recommends:[],
        themeTops: [],
        isShowBackTop: false,
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        const data = res.result;
        //1.获取轮播图数据
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.获取店铺信息对象
        this.shop = new Shop(data.shopInfo)
        //4.获取商品详情信息
        this.detailInfo = data.detailInfo
        //5.获取参数的信息
        this.GoodParam = new  GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.获取评论信息
        if(data.rate.cRare !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        //1.获取推荐信息
        this.recommends = res.data.list
      })
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    updated() {
		  // 获取需要的四个offsetTop
      this.getOffsetTops()
    },
    methods:{
      addToCart(){
        
        //1.h获取购物车需要展示的商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.detailInfo.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加购物车里
        this.$store.commit('addCart', product);  
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      getOffsetTops(){
        this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommends.$el.offsetTop)
      },
      imgLoad(){
         this.$refs.scroll.refresh()
      },
      titleClick(index){
        this.getOffsetTops()
        this.$refs.scroll.scrollTo(0,-this.themeTops[index],100)
      },
      contentScroll(position){
        //1.获取Y值
        const positionY = -position.y
        let length = this.themeTops.length
        //2.Y和主题对比
        for(let i = 0;i<this.themeTops.length;i++){
          if((i < length - 1 && positionY > 
          this.themeTops[i] && positionY < this.themeTops[i+1]) || (i === length -1
           && positionY > this.themeTops[i])){
            this.$refs.nav.currentIndex = i
          }
        }
        //3.判断返回顶部
        if((-position.y)>1000){
          this.isShowBackTop = true
        }else{
          this.isShowBackTop= false
        }
      },
    },
  }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content{
  height: calc(100% - 93px);
}

</style>