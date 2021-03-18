import VueRouter from 'vue-router'
import Search from "@/views/Search";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Search
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: "history",
  routes: routes
})

export default router
