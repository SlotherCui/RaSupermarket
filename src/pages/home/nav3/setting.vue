<template>
  <el-form :inline="true" :model="formInline" class="settingform">

    <el-form-item label="语言" >
      <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="中文" value="chinese"></el-option>
        <el-option label="English" value="english"></el-option>
      </el-select>
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
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
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
