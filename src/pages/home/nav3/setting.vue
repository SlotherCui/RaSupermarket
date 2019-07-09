<template>
  <section>
    <el-col>
      <el-row>
        <el-form :inline="true" :model="formInline" class="settingform">
          <!--属性进行言语替换必须加冒号  如：label-->
          <el-form-item :label="$t('message.lang')">
            <el-select v-model="formInline.lang">
              <el-option label="中文" value="cn"></el-option>
              <el-option label="English" value="en"></el-option>
              <el-option label="Español" value="es"></el-option>
            </el-select>
            <!--实例 $t必须有-->
            <!--<p>{{$t('message.lang')}}</p>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{$t('message.apply')}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-button type="text" @click="opinionVisible = true" style="font-size: large; padding-left: 5%;" icon="el-icon-info">{{$t('message.feedback')}}</el-button>
      </el-row>
      <el-row>
        <el-button type="text" @click="aboutus = true" style="font-size: large; padding-left: 5%;" icon="el-icon-question">{{$t('message.about')}}</el-button>
      </el-row>
    </el-col>

    <el-dialog :title="$t('message.about')" :visible.sync="aboutus" width="30%" >
      <span>山东大学2016级实训项目 超1</span>
      <span slot="footer" class="dialog-footer"><el-button type="primary" @click="aboutus = false">{{$t('message.commit')}}</el-button></span>
    </el-dialog>

    <el-dialog :title="$t('message.feedback')" :visible.sync="opinionVisible" width="30%">
      <el-form :model="opinionForm" label-width="80px" ref="opinionForm" :visible.sync="opinionVisible" >
        <el-form-item :label="$t('message.suggestion')">
        <el-input type="textarea" v-model="opinionForm.feedbcak" autocomplete="off" :autosize="{ minRows: 7, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="opinionForm.opinion=''; opinionVisible = false;  ">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click.native="upFeedBack">{{$t('message.commit')}}</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { postFeedBack } from '../../../api/api'
export default {
  name: 'page3',
  data () {
    return {
      formInline: {
        lang: '中文'
      },
      opinionForm: {
        feedbcak: ''
      },
      aboutus: false,
      opinionVisible: false
    }
  },
  methods: {
    onSubmit () {
      var lang = this.formInline.lang
      if (lang === '中文') {
        lang = 'cn'
      }
      this.$i18n.locale = lang
      // this.$alert(this.$t('message.lang'), lang, {
      // })
    },
    // 意见反馈上传接口
    upFeedBack () {
      let para = {feedback: this.opinionForm.feedbcak}
      console.log('输入', para)
      // 调用接口执行网络请求上传意见
      postFeedBack(para).then((res) => {
        console.log('输出', res)
        if (res.code === 0) {
          this.$message({message: this.$t('message.upload_success'), type: 'success'})
          this.opinionVisible = false
          this.this.opinionForm.feedbcak = ''
        } else {
          this.$message({message: this.$t('message.upload_fail') + res.codeInfo, type: 'fail'})
        }
      })
    }
  }
}
</script>

<style scoped>
  .settingform{
    padding-top: 5%;
    padding-left: 5%;
  }
</style>
