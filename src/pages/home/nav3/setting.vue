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
            <el-button type="primary" @click="onSubmit">应用</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-button type="text" @click="dialogVisible = true">关于我们</el-button>
      </el-row>
    </el-col>

    <el-dialog
      title="关于我们"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>实训项目</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      dialogVisible: false
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
