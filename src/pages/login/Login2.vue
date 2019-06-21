<template>
  <div class="backgroundimage">
    <div class="touming" v-show="show">
    </div>
    <div class="Loginbox" @mouseenter="show=!show" @mouseleave="show=!show">
      <el-form ref="form" :model="form" >
        <h2>用户登录</h2>
        <el-form-item>
          <el-input class="input" placeholder="用户名" suffix-icon="el-icon-user" v-model="form.UserName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="input" placeholder="请输入密码" suffix-icon="el-icon-key" v-model="form.Password" show-password></el-input>
        </el-form-item>
        <el-form-item class="remeber">
          <el-checkbox label="记住密码" v-model="form.Remember"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="todologin" class="LonginButton">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { requestTest } from '../../api/api'
export default {

  name: 'Login2',
  data () {
    return {
      form: {
        UserName: '',
        Password: '',
        Remember: false
      },
      show: false
    }
  },
  methods: {
    todologin () {
      console.log(this.form.UserName + this.form.Password + this.form.Remember)
      // 测试接口
      var Params = {page: 1}
      requestTest(Params).then(data => {
        console.log(data)
      })
    }
  }

}
</script>
<style scoped>
  .backgroundimage{
    position: absolute;
    margin-top: -60px;
    margin-left: -10px;
    width: 100%;
    height: 100%;
    background: url(/static/timg.jpg);

  }
  .touming{
    z-index: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    background: url(/static/timg.jpg);
    -webkit-filter: blur(10px)
  }
  .input{
    height: 1px;
  }
  .Loginbox{
    z-index: 10;
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
