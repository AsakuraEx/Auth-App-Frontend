import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authGuard from '@/guards/authGuard'
import notAuthGuard from '@/guards/notAuthGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true},
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: notAuthGuard
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UserView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('../views/RolesView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/roles/create',
      name: 'rolesCreate',
      component: () => import('../views/NuevoRolView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/roles/update/:id',
      name: 'rolesUpdate',
      component: () => import('../views/ActualizarRolView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/roles/:id',
      name: 'detalleRoles',
      component: () => import('../views/DetalleRolView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/permisos',
      name: 'permisos',
      component: () => import('../views/PermisosView.vue'),
      beforeEnter: authGuard
    },
  ],
})

export default router
