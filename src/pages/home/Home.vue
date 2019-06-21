<template>
  <el-container direction="vertical" class="container">
    <el-header class="header">
      <el-row>
        <el-col  :span="3" >supnuevo</el-col>
        <el-col  :span="18">
          <div class="tools" @click.prevent="collapse">
            <i class="el-icon-menu"></i>
          </div>
        </el-col>
        <el-col  :span="3">
          <el-dropdown trigger="hover">
            <div class="el-dropdown-link userinfo-inner">
              小王
              <img src="/static/Avator.jpg" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container direction="horizen">
      <el-aside width="250px" class="aside">
        <el-menu
          class="meau"
          :default-openeds="open_list"
          :collapse="collapsed"
          background-color="#E9EEF3"
          text-color="#48576a"
          active-text-color="#20a0ff"
          router
          >
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品信息维护</span>
            </template>
              <el-menu-item index="Mygoods">商家商品维护</el-menu-item>
              <el-menu-item index="CommonGoods">公共商品浏览</el-menu-item>
              <el-menu-item index="PriceChange">商品改价功能</el-menu-item>
              <el-menu-item index="RelationShip">改价关系维护</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>销售记录</span>
            </template>
            <el-menu-item index="sells">销售记录</el-menu-item>
            <el-menu-item index="chart">图表统计</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="information">商户信息管理</el-menu-item>
            <el-menu-item index="setting">其他设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--<el-main  class="content-wrapper">-->
        <!--<transition name="fade" mode="out-in">-->
          <!--<router-view></router-view>-->
        <!--</transition>-->
      <!--</el-main>-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-container>
    <!--<el-footer class="footer">@copyright 山东大学软件学院</el-footer>-->
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapsed: false,
      open_list: ['1', '2']
    }
  },
  methods: {
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  margin-left :-10px
  .header
    background: #20A0FF;
    color white
    font-size 25px
    text-align left
    line-height: 60px;
    .tools
      padding: 0px 23px;
      width:14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer
    .userinfo-inner {
      cursor: pointer;
      color:#fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  .aside
    background-color: #E9EEF3;
    .meau
      background-color: #E9EEF3
      text-align left
  .footer
    color:  white
    text-align: center;
    background: #20A0FF;
    line-height: 60px;
  .content-container {
    flex:1;
    text-align left
    overflow-y: scroll;
    padding: 20px;
    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
.el-main
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%
.el-menu-item
  background-color: #e4e8f1 !important;
  text-align left
</style>
