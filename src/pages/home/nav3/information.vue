<template>
  <section>
  <el-form ref="form" :model="form" label-width="80px"  style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="超市名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="税号" >
      <el-input v-model="form.tax" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="超市类型">
      <el-select v-model="form.stype" placeholder="请选择超市类型">
        <el-option label="直销" value="直销"></el-option>
        <el-option label="连锁" value="连锁"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="营业时间">
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date1" style="width: 100%;"></el-time-picker>
      </el-col>
      <el-col class="line" :span="1">至</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="商品类型">
      <el-checkbox-group v-model="form.gtype">
        <el-checkbox label="食品粮油" name="gtype"></el-checkbox>
        <el-checkbox label="烟酒" name="gtype"></el-checkbox>
        <el-checkbox label="日用百货" name="gtype"></el-checkbox>
        <el-checkbox label="进口商品" name="gtype"></el-checkbox>
        <el-checkbox label="其他" name="gtype"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="超市位置">
      <el-input type="textarea" v-model="form.addr"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Save">保存</el-button>
      <el-button @click.native.prevent>取消</el-button>
      <el-button type="danger" @click="PasswdChangeForm">修改密码</el-button>
    </el-form-item>
  </el-form>
<!--修改密码界面-->
<el-dialog title="修改密码" v-show="changepasswdFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="changepasswdFormVisible">
  <el-form :model="changepasswdForm"  label-position="left" :rules="changepasswdFormRules" ref="changepasswdForm" :visible.sync="changepasswdFormVisible" >
    <el-form-item label="原密码" prop="oldpasswd">
      <el-input v-model="changepasswdForm.oldpasswd" autocomplete="off" class="changeinput"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpasswd1">
      <el-input v-model="changepasswdForm.newpasswd1" autocomplete="off" class="changeinput"></el-input>
    </el-form-item>
    <el-form-item label="再次输入新密码" prop="newpasswd2">
      <el-input v-model="changepasswdForm.newpasswd2" autocomplete="off" class="changeinput"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click.native="changepasswdFormVisible = false">取消</el-button>
    <el-button type="primary" @click.native="PasswdChange" :loading="changepasswdLoading">提交</el-button>
  </div>
</el-dialog>
  </section>
</template>
<script>
import { getInfo } from '../../../api/api'
export default {
  data () {
    return {
      form: {
        name: '',
        tax: '',
        phone: '',
        stype: '',
        date1: '',
        date2: '',
        delivery: false,
        gtype: [],
        addr: ''
      },
      changepasswdFormVisible: false, // 修改密码界面是否显示
      changepasswdLoading: false,
      changepasswdFormRules: {
        oldpasswd: [
          {required: true, message: '输入旧密码', trigger: 'blur'}
        ],
        newpasswd1: [
          {required: true, message: '输入新密码', trigger: 'blur'}
        ],
        newpasswd2: [
          {required: true, message: '请再次输入新密码', trigger: 'blur'}
        ]
      },
      // 新增界面数据
      changepasswdForm: {
        oldpasswd: '',
        newpasswd1: '',
        newpasswd2: ''
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
        this.phone = res.data.phone
        this.stype = res.data.stype
        this.date1 = res.data.date1
        this.date2 = res.data.date2
        this.delivery = res.data.delivery
        this.gtype = res.data.gtype
        this.addr = res.data.addr
        // NProgress.done();
      })
    },
    Save (ev) {
      alert('保存成功')
      this.getInfo()
    },
    PasswdChangeForm: function () {
      this.changepasswdFormVisible = true
      this.changepasswdForm = {
        oldpasswd: '123',
        newpasswd1: '123',
        newpasswd2: '123'
      }
    },
    PasswdChange (ev) {
    }
  }
}

</script>
