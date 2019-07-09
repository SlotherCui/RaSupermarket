<template>
  <section>
  <el-form ref="form" :model="form"  label-width="80px"  style="margin:20px;width:60%;min-width:600px;">
    <el-form-item :label="$t('message.supermarket_img')" label-width="150px" prop="img">
      <el-form-item label="" prop="name">
        <!--<template slot-scope="scope" >-->
        <!--<img src="/static/good.jpg" width="100px"/>-->
        <!--</template>-->
        <!--上传地址action-->
        <!--action="http://10.26.58.60:8080/uploadUserImg"-->
        <el-upload
        action="/uploadUserImg"
        uploadCommodityImg
          class="avatar-uploader"
          name="file"
          :http-request="myUpload"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="onBeforeUpload">
          <img id="touxiang" v-if="supermarket_piclink" :src="supermarket_piclink" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--<el-upload-->
        <!--:action="uploadActionUrl"-->
        <!--accept="image/jpeg,image/gif,image/png"-->
        <!--multiple-->
        <!--:limit="3"-->
        <!--:on-exceed="handleExceed"-->
        <!--:on-error="uploadError"-->
        <!--:on-success="uploadSuccess"-->
        <!--:on-remove="onRemoveTxt"-->
        <!--:before-upload="onBeforeUpload"-->
        <!--:file-list="files">-->
        <!--<el-button size="small" type="primary">点击修改</el-button>-->
      <!--</el-upload>-->
      <!--action="https://jsonplaceholder.typicode.com/posts/"-->

    </el-form-item>
    <el-form-item :label="$t('message.UserID')" label-width="150px">
      <el-input v-model="form.UserName" disabled=true style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_name')" label-width="150px">
      <el-input v-model="form.supermarket_name" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_manager_name')" label-width="150px">
      <el-input v-model="form.supermarket_manager_name" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <!--<el-form-item :label="$t('message.supermarket_piclink')" label-width="150px">-->
      <!--<el-input v-model="form.piclink" :disabled="inputDisabled"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item :label="$t('message.supermarket_address')" label-width="150px">
      <el-input v-model="form.supermarket_address" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_tel')" label-width="150px">
      <el-input v-model="form.supermarket_tel" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_tax')" label-width="150px">
      <el-input v-model="form.supermarket_tax" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_email')" label-width="150px">
      <el-input v-model="form.supermarket_email" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_decription')" label-width="150px">
      <el-input type="textarea" v-model="form.supermarket_decription" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click.native.prevent type="primary" v-show="editVisible" :visible.sync="editVisible" @click="edit">{{$t('message.edit')}}</el-button>
      <el-button @click.native.prevent type="success" v-show="setvisible" :visible.sync="setvisible" @click="Save">{{$t('message.confirm')}}</el-button>
      <el-button @click.native.prevent v-show="setvisible" :visible.sync="setvisible" @click="quit">{{$t('message.cancel')}}</el-button>
      <el-button type="danger" @click="PasswdChangeForm">{{$t('message.change_password')}}</el-button>
    </el-form-item>
  </el-form>
<!--修改密码界面-->
<el-dialog :title="$t('message.change_password')" v-show="changepasswdFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="changepasswdFormVisible">
  <el-form :model="changepasswdForm" labelWidth="80px" label-position="left">
    <el-form-item :label="$t('message.old_password')">
      <el-input type="password" v-model="changepasswdForm.oldpasswd" :placeholder="$t('message.please_old_password')"></el-input>
    </el-form-item>
    <el-form-item v-if="visible" :label="$t('message.new_password')">
      <el-input type="password" v-model="changepasswdForm.newpasswd" :placeholder="$t('message.please_new_password')">
        <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;"
           class="el-input__icon iconfont icon-xianshi"></i>
      </el-input>
    </el-form-item>
    <el-form-item v-else :label="$t('message.new_password')">
      <el-input type="text" v-model="changepasswdForm.newpasswd" placeholder="$t('message.please_new_password')">
        <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"
           class="el-input__icon iconfont icon-yincang"></i>
      </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click.native="changepasswdFormVisible = false">{{$t('message.cancel')}}</el-button>
    <el-button type="primary" @click.native="PasswdChange" :loading="changepasswdLoading">{{$t('message.commit')}}</el-button>
  </div>
</el-dialog>
  </section>
</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
<script>
import {requestInformation, postInformation, postPassword} from '../../../api/api'
import axios from 'axios'
export default {
  data () {
    return {
      supermarket_piclink: '',
      // form: {
      //   name: '德玛西亚超市',
      //   tax: '110',
      //   tel: '110',
      //   mnama: '盖伦',
      //   piclink: '/static/',
      //   addr: '召唤师峡谷301号',
      //   email: '110@163.com',
      //   desc: '卖各种极品装备：无尽之刃、饮血剑、提莫的狗头'
      // },
      form: {
        UserName: '',
        supermarket_name: '',
        supermarket_tax: '',
        supermarket_tel: '',
        supermarket_manager_name: '',
        // supermarket_piclink: '',
        supermarket_address: '',
        supermarket_email: '',
        supermarket_decription: ''
      },
      changepasswdFormVisible: false, // 修改密码界面是否显示
      changepasswdLoading: false,
      changepasswdFormRules: {
        oldpasswd: [
          {required: true, message: this.$t('message.please_old_password'), trigger: 'blur'}
        ],
        newpasswd: [
          {required: true, message: this.$t('message.please_new_password'), trigger: 'blur'}
        ]
      },
      // 密码显示
      visible: true,
      // 输入框可写
      inputDisabled: true,
      // 保存按钮显示
      setvisible: false,
      // 修改按钮显示
      editVisible: true,
      // 新增界面数据
      changepasswdForm: {
        oldpasswd: '',
        newpasswd: ''
      }
    }
  },
  methods: {
    myUpload (content) {
      var form = new FormData()
      form.append('file', content.file)
      // form.append('barcode', 'zycCB')
      console.log('img', form)
      axios.defaults.withCredentials = true
      axios.post(content.action, form).then(res => {
        if (res.data.code !== 0) {
          this.$message({message: this.$t('message.file_fail'), type: 'fail'})
        } else {
          this.$message({message: this.$t('message.file_success'), type: 'success'})
          var user = sessionStorage.getItem('user')
          if (user) {
            user = JSON.parse(user)
            user.supermarket_piclink = user.supermarket_piclink + '?v=' + Date.parse(new Date())
          }
          sessionStorage.setItem('user', JSON.stringify(user))
          this.supermarket_piclink = user.supermarket_piclink
          // check
          var user1 = sessionStorage.getItem('user')
          if (user1) {
            user1 = JSON.parse(user1)
            console.log('重新设置图片', user1)
          }
        }
      }).catch(error => {
        if (error.response) {
          this.$message({message: this.$t('message.file_fail'), type: 'fail'})
        } else if (error.request) {
          this.$message({message: this.$t('message.upload_fail_server'), type: 'fail'})
        } else {
          this.$message({message: this.$t('message.upload_fail_request'), type: 'fail'})
        }
      })
    },
    // 获取商家信息
    getInfo () {
      let para = {}
      // 网络请求
      requestInformation(para).then((res) => {
        if (res.code === 0) {
          this.form = res.data
          this.form.UserName = this.$cookie.get('user_id')
        }
        // NProgress.done();
      })
    },
    // 保存修改文本信息
    Save (ev) {
      // alert('保存成功')
      // this.$message({message: '保存成功', type: 'success'})
      this.editVisible = true
      this.inputDisabled = true
      this.setvisible = false
      console.log('输入')
      console.log(this.form)
      postInformation(this.form).then((res) => {
        console.log('输出')
        console.log(res)
        if (res.code === 0) {
          this.$message({message: this.$t('message.save_success'), type: 'success'})
        } else {
          this.$message({message: this.$t('message.save_fail'), type: 'fail'})
        }
        this.getInfo()
        // NProgress.done();
      })
    },
    // 提交密码修改
    PasswdChange () {
      console.log('请求', this.changepasswdForm)
      postPassword(this.changepasswdForm).then((res) => {
        console.log('返回', res)
        if (res.code === 0) {
          this.$message({message: this.$t('message.save_success'), type: 'success'})
        } else {
          this.$message({message: this.$t('message.save_success'), type: 'fail'})
        }
        this.changepasswdFormVisible = false
        // NProgress.done();
      })
    },
    PasswdChangeForm: function () {
      this.changepasswdFormVisible = true
      this.changepasswdForm = {
        oldpasswd: '',
        newpasswd: ''
      }
    },
    // 判断渲染，true:暗文显示，false:明文显示
    changePass (value) {
      this.visible = !(value === 'show')
    },
    edit: function () {
      this.editVisible = false
      this.inputDisabled = false
      this.setvisible = true
    },
    quit: function () {
      this.editVisible = true
      this.inputDisabled = true
      this.setvisible = false
    }
  },
  mounted () {
    this.getInfo()
    // 加载头像
    var user = sessionStorage.getItem('user')
    console.log(user)
    if (user) {
      user = JSON.parse(user)
      console.log('img1', user.supermarket_piclink)
      this.supermarket_piclink = user.supermarket_piclink
    }
  }
}
</script>
