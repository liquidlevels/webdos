import { createRouter, createWebHistory } from "vue-router";
import {supabase} from '../lib/supabase'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth: true},
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to,from,next) => {
  const {data: {session}} = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && session) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router