<template>
  <section>
    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.number" placeholder="请输入商品条码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGoods">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-card :span="24" class="card">
      <!--商品基本信息-->
      <el-row>
        <el-col :span="6">
          <img src="/static/good.jpg" width="100px"/>
        </el-col>
        <el-col :span="18">
          <div style="line-height: 25px"><span class="goodsItem">商品条码</span><span>18764871568751</span></div>
          <div style="line-height: 25px"><span class="goodsItem">商品名称</span><span>好滋味鸡蛋仔</span></div>
          <div style="line-height: 25px"><span class="goodsItem">商品规格</span><span>14ml</span></div>
          <div style="line-height: 25px"><span class="goodsItem">商品描述</span><span>荷兰优质淡荷兰优质淡</span></div>
        </el-col>
      </el-row>
      <div style="margin-top: 15px">
        <el-tag class="my_tag" type="suss">原价格 14元</el-tag>
        <el-tag class="my_tag" type="info">建议价 17元</el-tag>
        <el-tag class="my_tag" type="info">最低价 19元</el-tag>
      </div>
      <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
      <!--<div style="line-height: 25px"><span class="goodsItem">建议价</span><span>14元</span></div>-->
      <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
      <el-row style="margin-top: 20px; text-align: right">
        <el-button type="primary" size="small"> 确认修改</el-button>
        <el-button type="primary" size="small">组改价</el-button>
        <el-button type="primary" size="small">联动改价</el-button>
      </el-row>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'SellsManager',
  data () {
    return {
      filters: {
        barcode: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.toolbar
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  .el-form-item
    margin-bottom: 10px
.card
  margin-top: 20px
  margin-bottom: 20px
  width 480px
  .goodsItem
    display:-moz-inline-box
    display:inline-block
    min-width: 80px
    color: #99a9bf
  .my_tag
    display: -webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;
    -webkit-box-orient: vertical;
    text-align: center
    font-size 13px
</style>
