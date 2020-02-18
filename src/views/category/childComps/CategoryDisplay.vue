<template>
  <div id="category-display">
    <div class="item" v-for="(item,index) in subCategory" :key="index">
      <div class="item-image">
        <img :src="item.image" alt="">
      </div>
      <div class="title">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
import CategoryDisplayItem from './CategoryDisplayItem'
  export default {
    props:{
      subCategory:{
        type:Array,
        default(){
          return []
        }
      },
      components:{
        CategoryDisplayItem
      },

    },
  }
</script>

<style scoped>
#category-display{
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap:wrap;
  justify-content:space-between;
  overflow: scroll;
}
#category-display .item{
  
  width: 32.2%;
  height: 88px;
  margin-bottom: 10px;
}
#category-display .item .item-image{
  width: 100%;
  height: 80%;
}
#category-display .item .item-image img{
  width: 100%;
  height: 100%;
}
#category-display .item .title{
  
  text-align: center;
  font-size: 14px;
}

</style>