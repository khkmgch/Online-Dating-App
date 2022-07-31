import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'
import UserDetail from '../views/UserDetail.vue'
import ChatView from '../views/ChatView.vue'
import MessageList from '../views/MessageList.vue'
import UserMap from '../views/UserMap.vue'

const routes = [
  {
    path: '/',
    name: 'userList',
    component: UserList
  },
  {
    path: '/user/:id',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/user/:id/chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/message-list',
    name: 'messageList',
    component: MessageList
  },
  {
    path: '/usermap',
    name: 'userMap',
    component: UserMap
  },
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
