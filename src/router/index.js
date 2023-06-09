import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/FrontView.vue"),
      children:[
        {
          path: '/easy',
          name: 'easy',
          component: () => import('../views/front/OrderDrinksEasy.vue')
        },
        {
          path: '/normal',
          name: 'normal',
          component: () => import('../views/front/OrderDrinks.vue')
        },
        {
          path: '/viewpoint',
          name: 'viewpoint',
          component: () => import('../views/front/ViewPoint.vue')
        }
      ]
    }    
  ]
})

export default router
