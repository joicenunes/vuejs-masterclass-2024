import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'single-project',
      component: () => import('@/views/SingleProjectView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: h('p', { style: 'color: red;' }, 'Page not found'),
    },
  ],
})

export default router
