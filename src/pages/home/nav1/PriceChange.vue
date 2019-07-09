<template>
  <section>
    <el-row>
      <el-col :span="24" class="toolbar" >
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.commodity_barcode" :placeholder="$t('message.please_input_bar')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getGoods" icon="el-icon-search">{{$t('message.query')}}</el-button>
          </el-form-item>
          <el-form-item style="float: right">
              <el-button type="primary" v-on:click="getData" icon="el-icon-download"> {{$t('message.down_load')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-loading="listLoading" v-if="listLoading">
        <div  style="min-height: 100px"  v-if="listLoading"></div>
      </el-col>
    </el-row>
    <el-row :gutter="15" v-for="(item,index) of GoodsList.length" :key="index">
      <el-col :span="8" v-for="(carditem,cardindex) of GoodsList.slice(index*3,index*3+3)" :key="carditem.commodity_barcode">
      <el-card :span="24" class="card">
        <!--商品基本信息-->
          <el-row>
            <el-col :span="6">
            <img :src="carditem.commodity_piclink" width="90px"/>
          </el-col>
          <el-col :span="18">
<!--            <div>{{index*3+cardindex}}</div>-->
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_barcode')}}</span><span>{{carditem.commodity_barcode}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_name')}}</span><span>{{carditem.commodity_name}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_specification')}}</span><span>{{carditem.commodity_specification}}</span></div>
            <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_description')}}</span><span>{{carditem.commodity_description}}</span></div>
          </el-col>
        </el-row>
        <!--商品四种价格-->
        <div style="margin-top: 15px">
          <el-tag class="my_tag" type="suss">{{$t('message.commodity_price_before')}} {{carditem.commodity_current_price}}</el-tag>
          <el-tag class="my_tag" type="info">{{$t('message.suggest_price')}} {{carditem.suggest_price}}</el-tag>
          <el-tag class="my_tag" type="info">{{$t('message.supplier_min_price')}} {{carditem.supplier_min_price}}</el-tag>
          <el-input style="margin-top: 15px" v-model="new_price[index*3+cardindex]" :placeholder="$t('message.please_input_newprice')"></el-input>
        </div>
        <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
        <!--<div style="line-height: 25px"><span class="goodsItem">建议价</span><span>14元</span></div>-->
        <!--<div style="line-height: 25px"><span class="goodsItem">原价格</span><span>14元</span></div>-->
        <!--三种改价操作-->
        <el-row style="margin-top: 20px; text-align: right">
          <el-button type="primary" size="small" :loading="changeLoading" v-on:click="SingleChange(index*3+cardindex, carditem.commodity_barcode)">{{$t('message.confirm')}}</el-button>
          <el-button type="primary" size="small" :loading="changeLoading" v-on:click="GroupChange(index*3+cardindex,carditem.commodity_barcode)">{{$t('message.team_price_change')}}</el-button>
          <el-button type="primary" size="small" :loading="changeLoading" v-on:click="RelationChange(index*3+cardindex,carditem.commodity_barcode)">{{$t('message.relation_price_change')}}</el-button>
        </el-row>
      </el-card>
      </el-col>
    </el-row>
  </section>
</template>s

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
      GoodsListTest: [],
      // 输入的新价格
      new_price: ['', '', '', '', '', '', '', '', ''],

      changeLoading: false,
      listLoading: false
    }
  },
  methods: {
    // 查询商品
    getGoods () {
      this.listLoading = true
      let para = {page: 1, commodity_barcode: this.filters.commodity_barcode}
      console.log(para)
      requestPriceChangeList(para).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.GoodsList = res.data.commodity
        }
        this.GoodsListTest = res.data.commodity
        console.log('here')
        console.log(this.GoodsListTest)
        if (this.GoodsListTest.length === 0) {
          this.$message({message: this.$t('message.not_sell')})
        }
        this.listLoading = false
      })
    },
    getData () {
      // console.log("fjdaskllfj")
      // console.log(this.$cookie.get('user_id'))
      // window.open('http://10.27.193.222:8080/Price/GetData?user_id=' + this.$cookie.get('user_id'))
      window.open('/Price/GetData?user_id=' + this.$cookie.get('user_id'))
    },
    // 单个修改
    SingleChange (index, commodity_barcode) {
      this.changeLoading = true
      console.log(commodity_barcode)
      let para = {commodity_barcode: commodity_barcode, new_price: this.new_price[index]}
      requestSingleChange(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: this.$t('message.change_success'), type: 'success'})
          this.getGoods()
        } else {
          this.$message({message: this.$t('message.change_fail') + res.code, type: 'fail'})
        }
        this.changeLoading = false
      })
    },
    // 组修改
    GroupChange (index, commodity_barcode) {
      this.changeLoading = true
      console.log(commodity_barcode)
      let para = {commodity_barcode: commodity_barcode, new_price: this.new_price[index]}
      requestGroupChange(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: this.$t('message.change_success'), type: 'success'})
          this.getGoods()
        } else {
          this.$message({message: this.$t('message.change_fail') + res.code, type: 'fail'})
        }
        this.changeLoading = false
      })
    },
    // 关联改价
    RelationChange (index, commodity_barcode) {
      this.changeLoading = true
      console.log(commodity_barcode)
      let para = {commodity_barcode: commodity_barcode, new_price: this.new_price[index]}
      console.log(para)
      requestRelationChange(para).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.$message({message: this.$t('message.change_success'), type: 'success'})
          this.getGoods()
        } else {
          this.$message({message: this.$t('message.change_fail') + res.code, type: 'fail'})
        }
        this.changeLoading = false
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
