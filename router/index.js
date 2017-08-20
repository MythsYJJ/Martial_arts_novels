import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserDetail from '@/components/UserDetail'
import Test from '@/components/Test'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/UserDetail',
      name: 'UserDetail',
      component: UserDetail
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})
