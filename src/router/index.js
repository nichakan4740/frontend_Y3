import { createRouter, createWebHistory } from 'vue-router'
import addevent from '../views/addevent.vue'
import editevent from '../components/editevent.vue'
import showeventall from '../views/showeventall.vue'
import showeventwithid from '../views/showeventwithid.vue'
import home from '../views/Home.vue'
import showcategory from '../views/category.vue'
import editcategory from '../views/editcategorywithid.vue'
import show from '../views/show.vue'
import showusers from '../views/showusers.vue'
import adduser from '../views/adduser.vue'
import editusers from '../views/edituser.vue'
import homeadduser from '../views/Home.vue'
import login from '../views/login.vue'

const history = createWebHistory(`${import.meta.env.VITE_BASE_URL}`)

const routes = [

 
  
  {
    path: '/',
    name: 'home',
    component: home,
  },

  {
    path: '/adduser',
    name: 'homeadduser',
    component: homeadduser,
  },

  {
    path: '/login',
    name: 'login',
    component: login,
  },

  {
    path: '/category',
    name: 'showcategory',
    component: showcategory,
  }
  ,
  {
    path: '/showusers',
    name: 'showusers',
    component: showusers,
  }
  ,
  {
    path: '/adduser',
    name: 'adduser',
    component: adduser,
  },
  {
    path: '/edit-users/:usersid',
    name: 'editusers',
    component: editusers,
  }
  ,
  {
    path: '/filter-categorys/:id',
    name: 'show',
    component: show,
  },
  {
    path: '/edit-categorys/:categoryid',
    name: 'editcategory',
    component: editcategory,
  },
 {
    path: '/eventall',
    name: 'showeventall',
    component: showeventall,
  },
  {
    path: '/addevent',
    name: 'addevent',
    component: addevent,
  },
  {
    path: '/edit-events/:editid',
    name: 'editevent',
    component: editevent,
  },
  {
    path: '/event-id/:eventid',
    name: 'showeventwithid',
    component: showeventwithid,
  },

]
const router = createRouter({ history, routes })
export default router