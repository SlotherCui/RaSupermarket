<template>
  <section>
    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.commodity_barcode" placeholder="请输入商品条码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGoods">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-row :gutter="15" v-for="item of 1">
      <el-col :span="8" v-for="item of 3">
      <el-card :span="24" class="card">
        <!--商品基本信息-->
          <el-row>
            <el-col :span="6">
            <img src="/static/good.jpg" width="90px"/>
          </el-col>
          <el-col :span="18">
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_barcode')}}</span><span>{{GoodsList.commodity_barcode}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_name')}}</span><span>{{GoodsList.commodity_name}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_specification')}}</span><span>{{GoodsList.commodity_specification}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_description')}}</span><span>{{GoodsList.commodity_description}}</span></div>
          </el-col>
        </el-row>
        <!--商品四种价格-->
        <div style="margin-top: 15px">
          <el-tag class="my_tag" type="suss">{{$t('message.commodity_price_before')}} {{GoodsList.commodity_price}}</el-tag>
          <el-tag class="my_tag" type="info">{{$t('message.suggest_price')}} {{GoodsList.suggest_price}}</el-tag>
          <el-tag class="my_tag" type="info">{{$t('message.supplier_min_price')}} {{GoodsList.supplier_min_price}}</el-tag>
          <el-input style="margin-top: 15px" v-model="new_price" placeholder="请输入新价格"></el-input>
        </div>
        <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
        <!--<div style="line-height: 25px"><span class="goodsItem">建议价</span><span>14元</span></div>-->
        <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
        <!--三种改价操作-->
        <el-row style="margin-top: 20px; text-align: right">
          <el-button type="primary" size="small" v-on:click="SingleChange"> 确认修改</el-button>
          <el-button type="primary" size="small" v-on:click="GroupChange">组改价</el-button>
          <el-button type="primary" size="small" v-on:click="RelationChange">联动改价</el-button>
        </el-row>
      </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'SellsManager',
  data () {
    return {
      filters: {
        commodity_barcode: ''
      },
      GoodsList: {
        commodity_barcode: '18764871568751',
        commodity_name: '纯悦',
        commodity_specification: '14ml',
        commodity_description: '荷兰优质淡荷兰优质淡',
        commodity_price: 17,
        supplier_min_price: 14,
        suggest_price: 15

      },
      // 输入的新价格
      new_price: ''
    }
  },
  methods: {
    // 查询商品
    getGoods () {

    },
    // 单个修改
    SingleChange () {

    },
    // 组修改
    GroupChange () {

    },
    // 关联改价
    RelationChange () {

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
  width 440px
  .goodsItem
    display:-moz-inline-box
    display:inline-block
    min-width: 80px
    color: #99a9bf
  .my_tag
    width 100%
    text-align: center
    font-size 13px
</style>
