import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import AddressFilter from '../components/AddressFilter.vue'
import AddressConverter from '../components/AddressConverter.vue'

Vue.use(VueRouter)

// !TODO: 离开时 check worker是否仍在工作 仍在工作时给出警告
// worker 设较大参数时给警告
const routes = [
  {
    path: '*',
    name: 'Home',
    component: Home,
  },
  {
    path: '/address-filter',
    name: 'AddressFilter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddressFilter,
  },
  {
    path: '/address-converter',
    name: 'AddressConverter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddressConverter,
  }
]

const router = new VueRouter({
  routes
})

export default router
