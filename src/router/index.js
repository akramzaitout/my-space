import Vue from 'vue'
//import store from '../store';
import VueRouter from 'vue-router'

import Home from '../views/home/Home.vue'

import FirstPage from '../views/home/pages/FirstPage.vue'
import Events from '../views/home/pages/Events.vue'
import Tasks from '../views/home/pages/Tasks.vue'
import Notes from '../views/home/pages/Notes.vue'



Vue.use(VueRouter)


const routes = [
  {
    path:'*',
    redirect : '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children : [
      { path : '/' , component : FirstPage },
      { name : 'event' , path : '/events' , component : Events },
      { name : 'task' , path : '/tasks' , component : Tasks },
      { name : 'note' , path : '/notes' , component : Notes }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
