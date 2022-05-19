import { createRouter, createWebHashHistory } from 'vue-router'
import UserPanel from '@/components/UserPanel'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'

const routes = [
    {
      path: '/sign-in',
      component: SignIn
    },
    { 
      path: '/sign-up',
      component: SignUp
    },
    { path: '/profile', component: UserPanel },
  ]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
