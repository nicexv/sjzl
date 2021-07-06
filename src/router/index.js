import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: "index"
  // },
  // {
  //   path: '/getopenid',
  //   name: 'getOpenid',
  //   component: () => import(/* webpackChunkName: "index" */'../views/index/getOpenid.vue'),
  //   meta: {
  //     keepAlive: false
  //   }
  // },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "index" */'../views/information/test.vue'),
    meta: {
      keepAlive: true 
    }
  },
  {
    path: '/',
    name: 'basic',
    component: () => import(/* webpackChunkName: "index" */'../views/information/students/basic.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/school',
    name: 'school',
    component: () => import(/* webpackChunkName: "index" */'../views/information/students/school.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/family',
    name: 'family',
    component: () => import(/* webpackChunkName: "index" */'../views/information/students/family.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/basic_teacher',
    name: 'basic_teacher',
    component: () => import(/* webpackChunkName: "index" */'../views/information/teachers/basic_teacher.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/education',
    name: 'education',
    component: () => import(/* webpackChunkName: "index" */'../views/information/teachers/education.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/unit',
    name: 'unit',
    component: () => import(/* webpackChunkName: "index" */'../views/information/teachers/unit.vue'),
    meta: {
      keepAlive: true
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
