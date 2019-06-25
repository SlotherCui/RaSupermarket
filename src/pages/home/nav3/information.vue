<template>
  <section>
  <el-form ref="form" :model="form"  label-width="80px"  style="margin:20px;width:60%;min-width:600px;">
    <el-form-item :label="$t('message.supermarket_img')" label-width="150px" prop="img">
      <el-form-item label="" prop="name">
        <!--<template slot-scope="scope" >-->
          <!--<img src="/static/good.jpg" width="100px"/>-->
        <!--</template>-->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="onBeforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
    <el-form-item :label="$t('message.supermarket_name')" label-width="150px">
      <el-input v-model="form.name" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_manager_name')" label-width="150px">
      <el-input v-model="form.mnama" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <!--<el-form-item :label="$t('message.supermarket_piclink')" label-width="150px">-->
      <!--<el-input v-model="form.piclink" :disabled="inputDisabled"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item :label="$t('message.supermarket_address')" label-width="150px">
      <el-input v-model="form.addr" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_tel')" label-width="150px">
      <el-input v-model="form.tel" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_tax')" label-width="150px">
      <el-input v-model="form.tax" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_email')" label-width="150px">
      <el-input v-model="form.email" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.supermarket_decription')" label-width="150px">
      <el-input type="textarea" v-model="form.desc" :disabled="inputDisabled" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click.native.prevent type="primary" v-show="editVisible" :visible.sync="editVisible" @click="edit">{{$t('message.edit')}}</el-button>
      <el-button @click.native.prevent type="success" v-show="setvisible" :visible.sync="setvisible" @click="Save">{{$t('message.confirm')}}</el-button>
      <el-button @click.native.prevent v-show="setvisible" :visible.sync="setvisible" @click="quit">取消</el-button>
      <el-button type="danger" @click="PasswdChangeForm">修改密码</el-button>
    </el-form-item>
  </el-form>
<!--修改密码界面-->
<el-dialog title="修改密码" v-show="changepasswdFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="changepasswdFormVisible">
  <el-form :model="changepasswdForm" labelWidth="80px" label-position="left">
    <el-form-item label="旧密码">
      <el-input type="password" v-model="changepasswdForm.oldpasswd" placeholder="请输入旧密码"></el-input>
    </el-form-item>
    <el-form-item v-if="visible" label="新密码">
      <el-input type="password" v-model="changepasswdForm.newpasswd" placeholder="请输入新密码">
        <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;"
           class="el-input__icon iconfont icon-xianshi"></i>
      </el-input>
    </el-form-item>
    <el-form-item v-else label="新密码">
      <el-input type="text" v-model="changepasswdForm.newpasswd" placeholder="请输入新密码">
        <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"
           class="el-input__icon iconfont icon-yincang"></i>
      </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click.native="changepasswdFormVisible = false">取消</el-button>
    <el-button type="primary" @click.native="PasswdChange" :loading="changepasswdLoading">提交</el-button>
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
import { getInfo } from '../../../api/api'
export default {
  data () {
    return {
      imageUrl: '/static/Avator.jpg',
      form: {
        name: '德玛西亚超市',
        tax: '110',
        tel: '110',
        mnama: '盖伦',
        piclink: '/static/',
        addr: '召唤师峡谷301号',
        email: '110@163.com',
        desc: '卖各种极品装备：无尽之刃、饮血剑、提莫的狗头'
      },
      changepasswdFormVisible: false, // 修改密码界面是否显示
      changepasswdLoading: false,
      changepasswdFormRules: {
        oldpasswd: [
          {required: true, message: '输入旧密码', trigger: 'blur'}
        ],
        newpasswd: [
          {required: true, message: '输入新密码', trigger: 'blur'}
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
    // 获取商家信息
    getInfo () {
      let para = {
        page: this.page
      }
      getInfo(para).then((res) => {
        this.name = res.data.total
        this.tax = res.data.tax
        this.tel = res.data.tel
        this.mnama = res.data.mnama
        this.email = res.data.email
        this.piclink = res.data.piclink
        this.desc = res.data.desc
        this.addr = res.data.addr
        // NProgress.done();
      })
    },
    Save (ev) {
      alert('保存成功')
      this.getInfo()
      this.editVisible = true
      this.inputDisabled = true
      this.setvisible = false
    },
    PasswdChangeForm: function () {
      this.changepasswdFormVisible = true
      this.changepasswdForm = {
        oldpasswd: '',
        newpasswd: ''
      }
    },
    PasswdChange (ev) {
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
  }
}
</script>
