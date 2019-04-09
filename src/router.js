import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import NewProduct from './views/ProductsNew.vue'
import ShowProduct from './views/ShowProduct.vue'
import EditProduct from './views/EditProduct.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'product',
      component: Products
    },
     {
      path: '/products/new',
      name: 'productNew',
      component: NewProduct
    },
     {
      path: '/products/:id',
      name: 'productShow',
      component: ShowProduct
    },
      {
      path: '/products/:id/edit',
      name: 'productEdit',
      component: EditProduct
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

  ]
})
