import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/spa/Main.vue'
import Signin from '@/spa/auth/Signin.vue'
import Signup from '@/spa/auth/Signup.vue'
import TaskList from '@/spa/task/TaskList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Main 
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/task',
      name: 'task',
      component: TaskList
    },

    // todo 
    // 페이지 라우팅 때 token 확인 
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
