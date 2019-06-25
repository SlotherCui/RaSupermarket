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
    <el-table :data="sells"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <!--销售项-->
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
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
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" :visible.sync="addFormVisible">
        <!--输入商品条码-->
        <el-form-item :label="$t('message.commodity_barcode')" prop="commodity_barcode" >
          <el-input v-model="addForm.commodity_barcode" auto-complete="off" style="width: 180px"></el-input>
        </el-form-item>
        <!--输入商品个数-->
        <el-form-item :label="$t('message.commodity_each_count')" >
          <el-input-number v-model="addForm.commodity_each_count" :min="1" :max="200"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { requestOrderList } from '../../../api/api'
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
        commodity_each_count: 1
      }

    }
  },
  methods: {
    // 新增方法
    handleAdd () {
      this.addFormVisible = true
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
    // 请求消息记录
    getOrderList (page) {
      let para = {page: page, order_id: this.filters.order_id}
      requestOrderList(para).then((res) => {
        // this.editLoading = false
        // NProgress.done(
        if (res.code === 0) {
          this.sells = res.data.orders
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
