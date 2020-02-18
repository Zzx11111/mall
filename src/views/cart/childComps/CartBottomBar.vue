<template>
  <div id="bottom-bar">
    <tick-btn ref="checkAll" @click.native="checkAllClick" :isChecked="isCheckAll"></tick-btn>
    <span class="all">全选</span>
    <span class="tatal">合计:¥{{totalPrice}}</span>
    <div class="topay">结算({{checkListCount}})</div>
  </div>
</template>

<script>
import TickBtn from '../../../components/content/tickbtn/TickBtn'
  export default {
    components:{
      TickBtn
    },
    methods:{
      checkAllClick(){
        const product = this.$store.state.cartList
        if(this.isCheckAll === true){
          for(let i = 0;i<product.length;i++){
            product[i].checked = false
          }
        }else{
          for(let i = 0;i<product.length;i++){
            product[i].checked = true
          }
        }
      },
    },
    computed:{
      totalPrice(){
        const product = this.$store.state.cartList
        let sum = 0
        for(let i = 0;i<product.length;i++){
          if(product[i].checked == true){
            sum += product[i].price * product[i].count
          }
          
        }
        return sum
      },
      checkListCount(){
        const product = this.$store.state.cartList
        let sum = 0
        for(let i = 0;i<product.length;i++){
          if(product[i].checked == true){
            sum += 1
          }
        }
        return sum
      },
      isCheckAll(){
        let isCheckAll = false
        const product = this.$store.state.cartList
        let sum = 0
        for(let i = 0;i<product.length;i++){
          if(product[i].checked == true){
            sum += 1
          }
        }
        if(sum>0){
          if(sum === product.length){
            isCheckAll = true
          }else{
            isCheckAll = false
          }
        }
        return isCheckAll
      }
    },
  } 
</script>

<style scoped>
  #bottom-bar {
    position: fixed;
    bottom: 48px;
    background-color: #eeeeee;
    height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .all {
    font-size: 14px;
    padding: 0 10px 0 3px;
  }

  .tatal {
    font-size: 14px;
    flex: 1;
    
  }

  .topay {
    width: 120px;
    font-size: 14px;
    color: #ffffff;
    line-height: 36px;
    text-align: center;
    background-color: #fa5421;
  }
</style>