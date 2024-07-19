import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
      // vscode插件内部不能使用动态导入，因为资源无法匹配到
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      component: HomeView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    //匹配前往的路由不存在
    next('/')
  } else {
    next()
  }
})

export default router
