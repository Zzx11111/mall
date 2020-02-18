<template>
  <div class="goods-info">
    <div class="info-top">
      <div class="start"></div>
      <div>
        {{detailInfo.desc}}
      </div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-images">
      <div v-for="(item,index) in detailInfo.detailImage[0].list" :key="index">
        <img :src="item" alt="" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      detailInfo:{
        type:Array,
        default(){
          return {}
        }
      }
    },
    data() {
      return {
        counter:0,
        imagesLength:0
      }
    },
    methods:{
      imgLoad(){
        if(++this.counter === this.imagesLength){
          this.$emit('imageLoad')
        }
      }
    },
    watch:{
      detailInfo(){
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.goods-info .info-images img{
  width: 100%;
  height: 100%;
}
.info-top {
    padding: 0 15px;
  }
.info-top .start, .info-top .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-top .start {
    float: left;
  }

  .info-top .end {
    float: right;
  }
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
  .info-top .start::before, .info-top .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
</style>