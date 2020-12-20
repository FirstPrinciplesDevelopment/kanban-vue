import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Boards from '../views/Boards.vue'
import Board from '../views/Board.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards,
    props: true
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: Board,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
