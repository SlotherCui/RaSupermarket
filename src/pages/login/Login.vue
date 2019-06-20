<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text"  v-model="account.username"  auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="LoginSend" >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import {requestLogin} from '../../api'

export default {
  data () {
    return {
      logining: false,
      account: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        } ],
        pwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        } ]
      },
      checked: true
    }
  },

  methods: {
    LoginSend (ev) {
      //  对输入的检测
      if ((this.account.username.length !== 0) && (this.account.pwd.length !== 0)) {
        alert('账号：' + this.account.username + '    密码：' + this.account.pwd)
        this.logining = true
        var loginParams = {
          username: this.account.username,
          userpwd: this.account.pwd
        }
      } else {
        alert('请输入有效账号和密码！')
        this.account.username = ''
        this.account.pwd = ''
      }
      requestLogin(loginParams).then(data => {
        debugger
        // this.logining = false;
        alert(data)
      })
    }
  }
}
</script>

<style>
  body {
    background: #DFE9FB;
  }

  .login-container {
    width: 350px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
