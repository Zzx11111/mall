<template>
  <div class="detail-swiper">
    <swiper :options="options" :not-next-tick="options.notNextTick" class="swiper">
      <swiper-slide v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" v-if="options.pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
  export default {
    props:{
      topImages:{
        type:Array,
        default(){

        }
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
    components:{
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
.swiper{
  height: 300px;
  overflow: hidden;
}
.swiper img{
  width: 100%;
  height: 100%;
}
</style>