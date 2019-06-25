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
        <el-button type="text" @click="opinionVisible = true" style="font-size: large; padding-left: 5%;" icon="el-icon-info">意见反馈</el-button>
      </el-row>
      <el-row>
        <el-button type="text" @click="aboutus = true" style="font-size: large; padding-left: 5%;" icon="el-icon-question">关于我们</el-button>
      </el-row>
    </el-col>

    <el-dialog title="关于我们" :visible.sync="aboutus" width="30%" >
      <span>山东大学2016级实训项目</span>
      <span slot="footer" class="dialog-footer"><el-button type="primary" @click="aboutus = false">确定</el-button></span>
    </el-dialog>

    <el-dialog title="意见反馈" :visible.sync="opinionVisible" width="30%">
      <el-form :model="opinionForm" label-width="80px" ref="opinionForm" :visible.sync="opinionVisible" >
        <el-form-item label="您的意见">
        <el-input type="textarea" v-model="opinionForm.opinion" autocomplete="off" :autosize="{ minRows: 7, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="opinionForm.opinion=''; opinionVisible = false;  ">取 消</el-button>
        <el-button type="primary" @click.native="opinionVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'page3',
  data () {
    return {
      formInline: {
        lang: '中文'
      },
      opinionForm: {
        opinion: ''
      },
      aboutus: false,
      opinionVisible: false
    }
  },
  methods: {
    onSubmit () {
      var lang = this.formInline.lang
      this.$i18n.locale = lang
      this.$alert('这是一段内容', lang, {
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
