import { createRouter, createWebHistory } from 'vue-router';
import Boards from '../views/Boards.vue';
import Board from '../views/Board.vue';
import Login from '../views/Login.vue';
import store from '../store/index.js';

const routes = [
  {
    path: '/',
    redirect: '/boards',
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards,
    props: true,
  },
  {
    path: '/board/:slug',
    name: 'Board',
    component: Board,
    props: true,
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
