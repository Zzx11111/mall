<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommend{
  display: flex;
  text-align: center;
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 12px solid #eee;
}
.recommendItem{
  flex: 1;
}
.recommendItem img{
  width:80px;
  height: 80px;
  margin-bottom: 8px;
}
</style>