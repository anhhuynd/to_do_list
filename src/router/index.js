import Vue from 'vue'
import Router from 'vue-router'
import TestScreen from '@/components/TestScreen'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'TestScreen',
      component: TestScreen
    }
  ]
})
