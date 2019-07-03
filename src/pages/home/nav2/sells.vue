<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.order_id" placeholder="请输入销售号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleSearch">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table
      ref = "table"
      :data="sells"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      @expand-change="expandSell"
      @row-click="rowclick"
      style="width: 100%;">
      <!--销售项-->
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <!--sellInfos[props.$index]-->
          <!--props.row.infors-->
          <el-row v-for="infor in props.row.infors" :key="infor.barcode" style="margin-left: 1%">
            <el-col :span="6" >
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_barcode')}}</span><span>{{infor.commodity_barcode}}</span></div>
            </el-col>
            <el-col :span="4">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_name')}}</span><span>{{infor.commodity_name}}</span></div>
            </el-col>
            <el-col :span="4">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_specification')}}</span><span>{{infor.commodity_specification}}</span></div>
            </el-col>
            <el-col :span="4">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_current_price')}}</span><span>{{infor.commodity_current_price }}</span></div>
            </el-col>
            <el-col :span="3">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_each_count')}}</span><span>{{infor.commodity_each_count }}</span></div>
            </el-col>
          </el-row>
        </template>
        <!--销售记录-->
      </el-table-column>
      <el-table-column prop="order_id" :label="$t('message.order_id')" width="200" sortable>
      </el-table-column>
      <el-table-column prop="order_commodity_sum" :label="$t('message.order_commodity_sum')" width="200" sortable>
      </el-table-column>
      <el-table-column prop="order_all_price" :label="$t('message.order_all_price')" width="200" sortable>
      </el-table-column>
      <el-table-column prop="order_create_time" :label="$t('message.order_create_time')" min-width="200" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        :current-page="page"
        style="float:right;">
      </el-pagination>
    </el-col>
    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" v-show="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" :visible.sync="addFormVisible" :inline="true" >
          <!--输入商品条码-->
          <el-form-item :label="$t('message.commodity_barcode')" prop="commodity_barcode" >
            <el-input v-model="addForm.commodity_barcode" auto-complete="off" style="width: 180px"></el-input>
          </el-form-item>
          <!--输入商品个数-->
          <el-form-item :label="$t('message.commodity_each_count')" >
            <el-input-number v-model="addForm.commodity_each_count" :min="1" :max="200"></el-input-number>
          </el-form-item>
            <el-button type="primary" @click.native="addGood" :loading="addLoading">增加</el-button>
        </el-form>
      <!--新增商品列表-->
        <el-table :data="addGoodsList"  style="width: 100%;" >
            <el-table-column prop="commodity_barcode" :label="$t('message.commodity_barcode')" min-width="120" >
            </el-table-column>
            <el-table-column prop="commodity_each_count" :label="$t('message.commodity_each_count')" min-width="130" >
            </el-table-column>
            <el-table-column prop="commodity_price" :label="$t('message.commodity_price')" width="150" >
            </el-table-column>
        </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {requestOrderList, requestPriceByBarcode, postOrder, requestOrderItem} from '../../../api/api'
import util from '../../../common/js/util'
// import {formatDate}
export default {
  name: 'page1',
  data () {
    return {
      // 查询变量
      filters: {
        order_id: ''
      },
      sells: [],
      // 页表项
      total: 0, // 总页数
      page: 1, // 当前页数
      // 是否加载
      listLoading: true,
      // 新增界面相关变量
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        commodity_barcode: [
          { required: true, message: '请输入商品条码', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        commodity_barcode: '',
        commodity_each_count: 1,
        commodity_price: 0
      },
      addGoodsList: []

    }
  },
  methods: {

    isRealNum (val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
      if (val === '' || val == null) {
        return false
      }
      return !isNaN(val)
    },
    // rowclick(row, val, index) {
    //   console.log(row)
    //   console.log(val)
    //   console.log(index)
    // },
    // 展开销售记录
    expandSell (row, val) {
      // console.log(row)
      // console.log(val)
      let para = {order_id: row.order_id}
      requestOrderItem(para).then((res) => {
        // this.editLoading = false
        // NProgress.done(
        console.log(res)
        if (res.code === 0) {
          // console.log(row.infors)
          // console.log(res.data)
          // row.infors = res.data
          // console.log(row.infors)
          // this.$set(row.infors, res.data)
          this.$set(row, 'infors', res.data)
          this.$refs['table'].setCurrentRow(row)
          // for (let i = 0; i < res.data.length; i++) {
          //   this.$set(row.infors, i, res.data[i])
          //   console.log('jhe')
          // }
        }
      })
    },
    // 新增方法
    handleAdd () {
      this.addFormVisible = true
      this.addLoading = false
      this.addGoodsList = []
    },
    // 增加一个商品
    addGood () {
      // 获取商品单价
      let para = {commodity_barcode: this.addForm.commodity_barcode}
      this.addLoading = true

      // 相同物品合并
      for (var i = 0; i < this.addGoodsList.length; i++) {
        if (this.addGoodsList[i].commodity_barcode === this.addForm.commodity_barcode) {
          var price = this.addGoodsList[i].commodity_price / this.addGoodsList[i].commodity_each_count
          this.addGoodsList[i].commodity_each_count += this.addForm.commodity_each_count
          this.addGoodsList[i].commodity_price += price * this.addForm.commodity_each_count
          // 输入表单重置
          this.addForm.commodity_barcode = ''
          this.addForm.commodity_each_count = 1
          // 关闭加载
          this.addLoading = false
          return
        }
      }
      // 请求
      requestPriceByBarcode(para).then((res) => {
        if (res.code === 0) {
          var price = res.data.commodity_current_price
          console.log(price)
          // 加入到购买表

          this.addGoodsList.push({commodity_barcode: this.addForm.commodity_barcode,
            commodity_each_count: this.addForm.commodity_each_count,
            commodity_price: price * this.addForm.commodity_each_count
          })
          // 输入表单重置
          this.addForm.commodity_barcode = ''
          this.addForm.commodity_each_count = 1
        } else if (res.code === 200) {
          this.$message({message: '该商品不在售', type: 'fail'})
        } else {
          this.$message({message: '未知错误', type: 'fail'})
        }
        // 关闭加载
        this.addLoading = false
      })
    },
    // 提交销售记录
    addSubmit () {
      // this.$alert(this.addGoodsList, 'fsdhkjaf')
      this.addLoading = true
      let para = {commodity_list: this.addGoodsList}
      console.log('para')
      console.log(para)
      postOrder(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: '上传成功', type: 'success'})
          this.addFormVisible = false
          this.getOrderList(1)
        } else {
          this.$message({message: '上传失败', type: 'fail'})
          this.addLoading = false
        }
      })
    },
    // 查询方法
    handleSearch () {
      this.listLoading = true
      // var order_id = this.filters.order_id
      this.getOrderList(1)
    },
    // 翻页方法
    handleCurrentChange (val) {
      this.listLoading = true
      this.getOrderList(this.page)
    },
    // 请求销售记录
    getOrderList (page) {
      this.listLoading = true
      let para = {page: page, order_id: this.filters.order_id}
      requestOrderList(para).then((res) => {
        // this.editLoading = false
        // NProgress.done(
        console.log('销售记录', res)
        if (res.code === 0) {
          this.sells = res.data.orders
          for (let i = 0; i < this.sells.length; i++) {
            this.sells[i].order_create_time = this.sells[i].order_create_time.substring(0, 19).replace('T', ' ')
            this.sells[i].infors = []
          }
          // 转换时间戳
          // for (let i = 0; i < this.sells.length; i++) {
          //   this.sells[i].order_create_time = util.formatDate.format(new Date(this.sells[i].order_create_time), 'yyyy-MM-dd hh:mm:ss')
          //   this.sells[i].infors = []
          // }
          console.log(this.sells)
          this.total = res.data.total
        }
        this.listLoading = false
      })
    }
  },
  // 生命周期初始函数
  mounted () {
    this.getOrderList(this.page)
  }
}
</script>

<style scoped lang="stylus">
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }
  .goodsItem {
    display:-moz-inline-box;
    display:inline-block;
    min-width: 80px;
    color: #99a9bf;
  }
  .toolbar {
    text-align: left;
    background: #f2f2f2;
    padding: 10px 10px 0 10px;
    margin: 10px 0px
  }
  .el-form-item
    margin-bottom: 10px;
</style>
