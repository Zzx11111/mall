import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/home'
import Cart from '../views/cart/cart'
import Category from '../views/category/category'
import Profile from '../views/profile/profile'
import Detail from '../views/detail/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:iid',
      component:Detail
    },

  ],
  mode: 'history'
})
