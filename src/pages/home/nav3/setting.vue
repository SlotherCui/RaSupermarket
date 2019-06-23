<template>
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
</template>

<script>
export default {
  name: 'page3',
  data () {
    return {
      formInline: {
        lang: '中文'
      }
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
