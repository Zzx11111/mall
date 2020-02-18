<template>
  <swiper :options="options" :not-next-tick="options.notNextTick">
    <swiper-slide v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" v-if="options.pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
  export default {
    components:{
      swiper,
      swiperSlide
    },
    data() {
      return {
        isLoad:false
      }
    },
    props:{
      banners:{
        type:Array,
        default: []
      },
      options:{
        type:Object,
        default(){
            return{
              autoplay: {
              disableOnInteraction: false,
              delay: 2000
            },
            loop:false,
            pagination: {
              el: '.swiper-pagination',
            },
            notNextTick: false
          }
        }
      },
     
    },
    methods:{
      
      imageLoad(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    }
  }
</script>

<style scoped>
img{
  width: 100%
}

</style>