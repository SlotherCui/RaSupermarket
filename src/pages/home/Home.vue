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
              {{UserName}}
              <img :src="UserAvatar" />
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
              <span>{{$t('message.My_goods')}}</span>
            </template>
              <el-menu-item index="Mygoods">{{$t('message.My_goods')}}</el-menu-item>
              <el-menu-item index="CommonGoods">{{$t('message.common_goods')}}</el-menu-item>
              <el-menu-item index="PriceChange">{{$t('message.shop_change_price')}}</el-menu-item>
              <el-menu-item index="RelationShip">{{$t('message.shop_change_relation')}}</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{$t('message.sells')}}</span>
            </template>
            <el-menu-item index="sells">{{$t('message.sells')}}</el-menu-item>
            <el-menu-item index="chart">{{$t('message.chart')}}</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{$t('message.other_setting')}}</span>
            </template>
            <el-menu-item index="information">{{$t('message.shop_information')}}</el-menu-item>
            <el-menu-item index="setting">{{$t('message.other_setting')}}</el-menu-item>
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
            <strong class="title" >{{ $t('message["'+ $route.name+'"]') }}</strong>
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
      open_list: ['1', '2'], // 初始打开导航条
      // 用户名 用户头像ID
      UserName: '测试人员',
      UserAvatar: '/static/Avator.jpg'
    }
  },
  methods: {
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    logout () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        _this.$router.push('/login2')
      }).catch(() => {
      })
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.UserName = user.name
      this.UserAvatar = user.headpic
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
  // background: #00C9FF;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #92FE9D, #00C9FF);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #92FE9D, #00C9FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-color: #e4e8f1 !important;
  text-align left
</style>
