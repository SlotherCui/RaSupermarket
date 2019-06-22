<template>
  <div >
    <div class="backgroundimage" v-show="!show">
      <img src="/static/Login1.png" style="width: 100%;height: 100%" class="img"/>
    </div>
    <div class="touming" v-show="show">
      <img src="/static/Login1.png" style="width: 100%;height: 100%" class="img"/>
    </div>
    <div class="Loginbox" @mouseenter="show=!show" @mouseleave="show=!show">
      <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm login-container">
        <h2>用户登录</h2>
        <el-form-item prop="UserName">
          <el-input class="input" auto-complete="off" placeholder="用户名" prefix-icon="el-icon-user" v-model="form.UserName" clearable></el-input>
        </el-form-item>
        <el-form-item prop="Password">
          <el-input class="input" auto-complete="off" placeholder="密码" prefix-icon="el-icon-key" v-model="form.Password" show-password></el-input>
        </el-form-item>
        <el-form-item class="remeber">
          <el-checkbox label="记住密码" v-model="form.Remember"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="Logincheck" class="LonginButton" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { requestLogin } from '../../api/api'
export default {

  name: 'Login2',
  data () {
    return {
      form: {
        UserName: '',
        Password: '',
        Remember: false
      },
      rules: {
        UserName: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        } ],
        Password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        } ]
      },
      show: false,
      loading: false
    }
  },
  methods: {
    Logincheck () {
      if ((this.form.Password.length !== 0) && (this.form.UserName.length !== 0)) {
        console.log(this.form.UserName + this.form.Password + this.form.Remember)
        this.Todologin()
      } else {
        alert('请输入有效账号和密码！')
        this.form.UserName = ''
        this.form.Password = ''
      }
    },
    Todologin () {
      // console.log(this.form.UserName + this.form.Password + this.form.Remember)
      // 测试接口

      this.loading = true
      var Params = {username: this.form.UserName, password: this.form.Password}
      // var Params = {username: 'admin', password: '123'}
      requestLogin(Params).then(data => {
        this.logining = false
        console.log(data)

        if (data.code === 0) {
          var user = data.data
          sessionStorage.setItem('user', JSON.stringify(user))
          this.$router.push({ path: '/Mygoods' })
        } else {
          this.$message({
            message: '登录失败',
            center: true,
            type: 'error'
          })
        }
      })
    }
  }

}
</script>
<style scoped>
  .backgroundimage{
    position: absolute;
    margin-top: -10px;
    margin-left: -10px;
    width: 100%;
    height: 100%;
    /*-ms-transform: translate(-50px, -100px);*/
    /*-webkit-transform: translate(-50px, -100px);*/
    /*transform: translate(-50px, -100px);*/
    /*-webkit-animation:run 6s linear 0s infinite;*/
  }
  .touming{
    z-index: 0;
    position: absolute;
    margin-top: -7px;
    margin-left: -8px;
    height: 100%;
    width: 100%;
    -webkit-filter: blur(5px);
  }
  div img{
    cursor: pointer;
    transition: all 5s;
  }
  div img:hover{
    transform: scale(1.3,1.3);
  }

  .input{
    height: 1px;
  }
  .Loginbox{
    z-index: 10;
    border-radius: 5px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 450px;
    height: 300px;
    background-color: rgba(255,255,255,1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5)
  }
  .LonginButton{
    width: 100%;
  }
  .remeber{
    text-align: left;
  }
  .el-form{
    margin: auto;
    width: 400px;
    height: 240px;
  }
  </style>
