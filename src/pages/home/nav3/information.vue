<template>
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
    <el-form-item label="接受外送">
      <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
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
    </el-form-item>
  </el-form>
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
      this.getGoods()
    }

  }
}

</script>
