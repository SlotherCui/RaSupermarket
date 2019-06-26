<template>
  <section>
    <el-row>
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
    </el-row>
    <el-row :gutter="15" v-for="(item,index) of GoodsList.length" :key="index" >
      <el-col :span="8" v-for="(carditem,cardindex) of GoodsList.slice(index*3,index*3+3)" :key="carditem.commodity_barcode">
      <el-card :span="24" class="card">
        <!--商品基本信息-->
          <el-row>
            <el-col :span="6">
            <img :src="carditem.commodity_piclink" width="90px"/>
          </el-col>
          <el-col :span="18">
            <div>{{index*3+cardindex}}</div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_barcode')}}</span><span>{{carditem.commodity_barcode}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_name')}}</span><span>{{carditem.commodity_name}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_specification')}}</span><span>{{carditem.commodity_specification}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_description')}}</span><span>{{carditem.commodity_description}}</span></div>
          </el-col>
        </el-row>
        <!--商品四种价格-->
        <div style="margin-top: 15px">
          <el-tag class="my_tag" type="suss">{{$t('message.commodity_price_before')}} {{carditem.commodity_price}}</el-tag>
          <el-tag class="my_tag" type="info">{{$t('message.suggest_price')}} {{carditem.suggest_price}}</el-tag>
          <el-tag class="my_tag" type="info">{{$t('message.supplier_min_price')}} {{carditem.supplier_min_price}}</el-tag>
          <el-input style="margin-top: 15px" v-model="new_price[index*3+cardindex]" placeholder="请输入新价格"></el-input>
        </div>
        <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
        <!--<div style="line-height: 25px"><span class="goodsItem">建议价</span><span>14元</span></div>-->
        <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
        <!--三种改价操作-->
        <el-row style="margin-top: 20px; text-align: right">
          <el-button type="primary" size="small" v-on:click="SingleChange(index*3+cardindex, carditem.commodity_barcode)"> 确认修改</el-button>
          <el-button type="primary" size="small" v-on:click="GroupChange(index*3+cardindex,carditem.commodity_barcode)">组改价</el-button>
          <el-button type="primary" size="small" v-on:click="RelationChange(index*3+cardindex,carditem.commodity_barcode)">联动改价</el-button>
        </el-row>
      </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import {requestPriceChangeList, requestSingleChange, requestGroupChange, requestRelationChange} from '../../../api/api'
export default {
  name: 'SellsManager',
  data () {
    return {
      filters: {
        commodity_barcode: ''
      },
      GoodsList: [],
      // 输入的新价格
      new_price: ['', '', '', '', '', '', '', '', '']
    }
  },
  methods: {
    // 查询商品
    getGoods () {
      let para = {page: 1, commodity_barcode: this.filters.commodity_barcode}
      requestPriceChangeList(para).then((res) => {
        if (res.code === 0) {
          this.GoodsList = res.data.Commodity
        }
      })
    },
    // 单个修改
    SingleChange (index, commodity_barcode) {
      console.log(commodity_barcode)
      let para = {commodity_barcode: commodity_barcode, new_price: this.new_price[index]}
      requestSingleChange(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: '修改成功', type: 'success'})
          this.getGoods()
        } else {
          this.$message({message: '修改失败' + res.code, type: 'fail'})
        }
      })
    },
    // 组修改
    GroupChange (index, commodity_barcode) {
      console.log(commodity_barcode)
      let para = {commodity_barcode: commodity_barcode, new_price: this.new_price[index]}
      requestGroupChange(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: '修改成功', type: 'success'})
          this.getGoods()
        } else {
          this.$message({message: '修改失败' + res.code, type: 'fail'})
        }
      })
    },
    // 关联改价
    RelationChange (index, commodity_barcode) {
      console.log(commodity_barcode)
      let para = {commodity_barcode: commodity_barcode, new_price: this.new_price[index]}
      requestRelationChange(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: '修改成功', type: 'success'})
          this.getGoods()
        } else {
          this.$message({message: '修改失败' + res.code, type: 'fail'})
        }
      })
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
