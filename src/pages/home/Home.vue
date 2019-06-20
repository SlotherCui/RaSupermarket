<template>
  <el-container direction="vertical" class="container">
    <el-header class="header">
      <el-row>
        <el-col  :span="3">supnuevo</el-col>
        <el-col  :span="19">
          <div class="tools" @click.prevent="collapse">
            <i class="el-icon-menu"></i>
          </div>
        </el-col>
        <el-col  :span="2">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner"><img src="/static/Avator.jpg" />小王</span>
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
              <span>导航一</span>
            </template>
              <el-menu-item index="find">选项1</el-menu-item>
              <el-menu-item index="good">选项2</el-menu-item>
              <el-menu-item index="sell">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航二</span>
            </template>
            <el-menu-item index="page1">选项1</el-menu-item>
            <el-menu-item index="page2">选项2</el-menu-item>
            <el-menu-item index="page3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="chart">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
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
      margin-left  -100px
  .footer
    color:  white
    text-align: center;
    background: #20A0FF;
    line-height: 60px;
.el-main
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%
.el-menu-item
  background-color: #d1dbe5 !important;
</style>
