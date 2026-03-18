import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import TablePractice from './views/TablePractice.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/table/:table', component: TablePractice },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
