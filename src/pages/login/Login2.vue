<template>
  <div>
    <div class="backgroundimage" v-show="!show">
      <img src="/static/Login1.png" style="width: 100%;height: 100%" class="img"/>
    </div>
    <div class="touming" v-show="show">
      <img src="/static/Login1.png" style="width: 100%;height: 100%" class="img"/>
    </div>
    <div style="z-index: 11;width: 99%;text-align: right">
      <el-dropdown trigger="click" @command="selectlang">
                <span class="el-dropdown-link">
                  <i class="el-icon-setting avatar-uploader-icon">{{$t('message.lang')}}</i>
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cn">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
          <el-dropdown-item command="es">Español</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--<i style="margin-left: 57px" class="el-icon-setting"></i>-->
    <div class="Loginbox" @mouseenter="show=!show" @mouseleave="show=!show">
      <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm login-container">
        <el-row>
            <h2>{{$t('message.userlogin')}}</h2>
        </el-row>
        <el-form-item prop="UserName">
          <el-input class="input" auto-complete="off" :placeholder="$t('message.username')" prefix-icon="el-icon-user" v-model="form.UserName" clearable></el-input>
        </el-form-item>
        <el-form-item prop="Password">
          <el-input class="input" auto-complete="off" :placeholder="$t('message.password')" prefix-icon="el-icon-key" v-model="form.Password" @keyup.enter.native="Logincheck" show-password ></el-input>
        </el-form-item>
        <el-form-item class="remeber">
          <el-checkbox :label="$t('message.remeber')" v-model="form.Remember"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="Logincheck" class="LonginButton" :loading="loading">{{$t('message.login')}}</el-button>
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

    messageUtil (val) {
      this.$message({
        message: val,
        center: true,
        type: 'error'
      })
      this.loading = false
    },
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
        if (data.code === 0) {
          var user = data.data
          user.supermarket_piclink = user.supermarket_piclink + '?v=' + Date.parse(new Date())
          console.log('logindata', user)
          sessionStorage.setItem('user', JSON.stringify(user))
          this.$router.push({path: '/Mygoods'})
        } else if (data.code === 100) {
          this.messageUtil('用户名未注册')
        } else if (data.code === 201) {
          this.messageUtil('密码不正确')
        } else {
          this.messageUtil('用户名未注册')
        }
      })
    },
    selectlang (command) {
      var lang = command
      this.$i18n.locale = lang
      // this.$alert('这是一段内容', lang, {
      // })
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
  .avatar-uploader-icon {
    color: white;
    font-size: 17px;
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
