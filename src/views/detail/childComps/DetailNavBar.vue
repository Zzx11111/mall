<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backHome">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div class="title" slot="center">
        <div v-for="(item,index) in title" :key="index" class="title-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar'
  export default {
    components:{
      NavBar
    },
    data() {
      return {
        title:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('itemClick',index)
      },
      backHome(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title .title-item{
  flex: 1;
}
.active{
  color :var(--color-high-text)
}
.back img{
  margin-left: 20px;
  margin-top: 12px;
}
</style>