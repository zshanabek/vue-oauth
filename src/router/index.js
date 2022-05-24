import { createRouter, createWebHashHistory } from 'vue-router'
import UserPanel from '@/components/UserPanel'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import ChatRoom from '@/components/ChatRoom'
import HomeComponent from '@/components/HomeComponent'
import UserList from '@/components/UserList'

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/sign-in',
    component: SignIn
  },
  { 
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/profile',
    component: UserPanel
  },
  {
    path: '/user-list',
    component: UserList
  },
  {
    path: '/chat/:receiver_id/',
    component: ChatRoom
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
