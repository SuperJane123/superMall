import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 1.使用插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [{
  path: "",
  redirect: "/home",
}, {
  path: "/home",
  component: Home
}, {
  path: "/category",
  component: Category
}, {
  path: "/cart",
  component: Cart
}, {
  path: "/crofile",
  component: Profile
}]
const router = new VueRouter({
  routes
})

// 3.导出路由
export default router
