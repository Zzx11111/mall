<template>
  <div id="category-list">
    <div class="list">
      <div v-for="(item,index) in category" :key="index" class="item" :class="{selection:index === isCilck}" @click="itemCilck(index,item.maitKey,item.miniWallkey)">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      category:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        isCilck: 0
      }
    },
    methods:{
      itemCilck(index,maitKey,miniWallkey){
        this.isCilck = index
        this.$emit("selectionList",maitKey)
      }
    },
  }
</script>

<style scoped>
#category-list{
  width: 100%;
  height: 100%;
  overflow: scroll;
}
#category-list .list .item{
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  background-color:	#EEEEEE;
  border-bottom: 1px solid #DDDDDD;
}
#category-list .list .selection{
  background-color: #fff;
  color: var(--color-tint);
}
</style>