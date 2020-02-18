import Vue from 'vue'
import Vuex from 'vuex'
//1.安装插件
Vue.use(Vuex)
//2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      payload.checked = true
      let oldProduct = state.cartList.find(function (item){
        return item.iid === payload.iid
      })
      if(oldProduct){
        oldProduct.count +=1
      }else{
        payload.count = 1
        state.cartList.push(payload)
      }
      
    }
  },
})

//3.挂载
export default store