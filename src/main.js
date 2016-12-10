// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Seller from 'components/seller/seller'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import VueResource from 'vue-resource'

import 'common/stylus/index.styl'

/* eslint-disable no-new */
const routes = [
  {path: '/seller', component: Seller},
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings}
]
Vue.use(VueRouter)
Vue.use(VueResource)

// !!!  注意,一般配置参数传的都是对象!!!
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  router,
  template: '<App />',
  components: {App}
}).$mount('#app')

// 代替router.go()
router.push('/goods')
