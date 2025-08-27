import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import InventoryView from '@/views/InventoryView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import PasswordUpdated from '@/components/PasswordUpdated.vue'
import CreateInventoryItem from '@/components/CreateInventoryItem.vue'
import CreateClientForm from '@/components/CreateClientForm.vue'
import Clients from '@/components/Clients.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: false}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {requiresAuth: false, hideIfAuth: true}
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {requiresAuth: false, hideIfAuth: true}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {requiresAuth: true}
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: InventoryView,
    meta: {requiresAuth: true},
  },
  {
    path: '/inventory/create',
    name: 'create-inventory-item',
    component: CreateInventoryItem,
    meta: {requiresAuth: true}
  },
  {
    path: '/forgotpassword',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: { requiresAuth: false }
  },
  {
    path: '/changepassword',
    name: 'change-password',
    component: ChangePasswordView,
    meta: { requiresAuth: true }
  },
  {
    path: '/passwordupdated',
    name: 'password-updated',
    component: PasswordUpdated,
    meta: {requiresAuth: true}
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients,
    meta: {requiresAuth: true}
  },
  {
    path: '/clients/create',
    name: 'create-client',
    component: CreateClientForm,
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    return '/login'
  } else if (to.meta.hideIfAuth && session) {
    return '/'
  }
  
  return true
})

export default router