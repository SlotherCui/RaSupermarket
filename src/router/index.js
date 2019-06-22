import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Login2 from '@/pages/login/Login2'

import Find from '@/pages/home/nav1/MyGoods'
import GoodsManager from '@/pages/home/nav1/CommonGoods'
import SellsManager from '@/pages/home/nav1/PriceChange'
import RelationShip from '@/pages/home/nav1/RelationShip'

import chart from '@/pages/home/nav2/chart'
import page1 from '@/pages/home/nav2/sells'

import page2 from '@/pages/home/nav3/information'
import page3 from '@/pages/home/nav3/setting'

import NotFound from '@/pages/home/NotFound'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      hidden: true
    },
    {
      path: '/',
      name: '导航1',
      component: Home,
      children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        {path: '/Mygoods', component: Find, name: '商家商品维护'},
        {path: 'c', component: GoodsManager, name: '公共商品浏览'},
        {path: '/PriceChange', component: SellsManager, name: '商品改价功能'},
        {path: '/RelationShip', component: RelationShip, name: '改价关系维护'}
      ]
    },
    {
      path: '/',
      name: '导航2',
      component: Home,
      children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        {path: '/sells', component: page1, name: '销售记录'},
        {path: '/chart', component: chart, name: '图表统计'}
      ]
    },
    {
      path: '/',
      name: '导航三',
      component: Home,
      children: [
        // { path: '/main', component: Main, name: '主页', hidden: true },
        {path: '/information', component: page2, name: 'information'},
        {path: '/setting', component: page3, name: 'setting'}
      ]
    },
    {
      path: '/login2',
      name: 'Login2',
      component: Login2
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
