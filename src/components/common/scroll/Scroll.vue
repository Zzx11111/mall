<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      //2.监听滚动的位置
      if(this.probeType ===2 || this.probeType ===3 ){
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
      }

      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll.scrollTo(x,y,time);
      },
      refresh(){
        console.log('----')
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>