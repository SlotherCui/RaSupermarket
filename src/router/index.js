import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Login2 from '@/pages/login/Login2'

import Find from '@/pages/home/nav1/Find'
import GoodsManager from '@/pages/home/nav1/GoodsManager'
import SellsManager from '@/pages/home/nav1/SellsManager'

import page1 from '@/pages/home/nav2/page1'
import page2 from '@/pages/home/nav2/page2'
import page3 from '@/pages/home/nav2/page3'

import chart from '@/pages/home/nav3/chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: '导航1',
      component: Home,
      children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        {path: '/find', component: Find, name: 'find'},
        {path: '/good', component: GoodsManager, name: 'good'},
        {path: '/sell', component: SellsManager, name: 'sell'}
      ]
    },
    {
      path: '/',
      name: '导航2',
      component: Home,
      children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        {path: '/page1', component: page1, name: 'page1'},
        {path: '/page2', component: page2, name: 'page2'},
        {path: '/page3', component: page3, name: 'page3'}
      ]
    },
    {
      path: '/',
      name: '导航三',
      component: Home,
      children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        {path: '/chart', component: chart, name: 'chart'}
      ]
    },
    {
      path: '/2',
      name: 'Login2',
      component: Login2
    }
  ]
})
