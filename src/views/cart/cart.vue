<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <!--商品展示-->
    <scroll class="cart-scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from '../../components/common/scroll/Scroll'
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
  export default {
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
 #cart {
    height: 100vh;
    /* height: calc(100% - 44px - 55px); */
  }
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
 .cart-scroll {
    height: 100%;
    overflow: hidden;
    /* background-color: antiquewhite; */
  }
</style>