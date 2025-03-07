<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/MainTabBar'
export default {
  name: 'App',
  components:{
    MainTabBar
  },
  method:{
    a() {
      // 拉卡拉账号:djiwsd@lakala.com 密码:fjkwJKs=23
       // 邦得数字账号:bangdeng234 密码:jerjiod334@#
       // user:jkewe@lakala.com pass:sdkke@304
       // user:dfjke@bonddigit.com pass:erl3934#
       // user:jower@kinorsoft.com pass:wejk3*3
    }
  }
}
</script>

<style>
 @import "./assets/css/base.css";
</style>
