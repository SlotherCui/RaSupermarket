<template>
  <section>
    <!--工具条-->

    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="mygoodsfilters">
        <el-form-item>
          <el-input v-model="mygoodsfilters.barcode" :placeholder="$t('message.goods_barcode')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGoods">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="goodslist" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <el-row>
            <el-col :span="4" style="margin-left: 6%">
              <el-card  :body-style="{ padding: '0px' }">
                <el-image :src="props.row.goods_img" fit="contain" class="goodsimage"></el-image>
              </el-card>
            </el-col>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_barcode')}}</span><span>{{props.row.goods_barcode}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_name')}}</span><span>{{props.row.goods_name}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_model')}}</span><span>{{props.row.goods_model}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_price')}}</span><span>{{props.row.goods_price}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_update_time')}}</span><span>{{props.row.goods_update_time}}</span></div>
            </el-col>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_brand')}}</span><span>{{props.row.goods_brand}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_producer')}}</span><span>{{props.row.goods_producer}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_describe')}}</span><span>{{props.row.goods_describe}}</span></div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="goods_barcode" :label="$t('message.goods_barcode')" width="150" sortable>
      </el-table-column>
      <el-table-column prop="goods_name" :label="$t('message.goods_name')" width="150"  sortable>
      </el-table-column>
      <el-table-column prop="goods_model" :label="$t('message.goods_model')" width=" 180" sortable>
      </el-table-column>
      <el-table-column prop="goods_price" :label="$t('message.goods_price')" width=" 180" sortable>
      </el-table-column>
      <el-table-column prop="goods_describe" :label="$t('message.goods_describe')" min-width=" 180" sortable>
      </el-table-column>
      <el-table-column :label="$t('message.operation')"  width=" 150" >
        <template scope="scope">
<!--          编辑-->
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{$t('message.edit')}}</el-button>
<!--          删除-->
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{$t('message.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar2">
<!--      批量删除-->
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{$t('message.batchDelete')}}</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--编辑界面-->
    <el-dialog :title="$t('message.edit')" v-model="editFormVisible" :close-on-click-modal="false" width="30%" :visible.sync="editFormVisible">
      <el-form :model="editForm1" label-width="80px" :rules="editFormRules" ref="editForm1">
        <el-form-item label="商品名称" prop="goods">
          <el-input v-model="editForm1.goods" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="条码" prop="barcode">
          <el-input v-model="editForm1.barcode" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editForm1.price" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加商品" v-show="addFormVisible" :close-on-click-modal="false" width="30%" :visible.sync="addFormVisible">
      <el-form :model="addForm1"  label-position="left" ref="addForm1" :rules="addFormRules" :visible.sync="addFormVisible" label-width="80px" size="small">
        <el-form-item label="商品名称" prop="goods">
          <el-input v-model="addForm1.goods" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="条码" prop="barcode">
          <el-input v-model="addForm1.barcode" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm1.price" autocomplete="off" class="addinput"></el-input>
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
import {getMyGoodListPage, addMyGoods, editGoods, removeMyGoods, batchRemoveMyGoods} from '../../../api/api'
export default {
  name: 'Find',
  data () {
    return {
      mygoodsfilters: {
        barcode: ''
      },
      sels: [],
      page: 1,
      total: 5,
      listLoading: false,
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      editLoading: false,
      goodslist: [{
        goods_barcode: '6954767473673',
        goods_name: '纯悦',
        goods_model: '550ml',
        goods_price: '2元',
        goods_describe: '纯悦包装饮用水',
        goods_brand: '可口可乐',
        goods_producer: '可口可乐青岛',
        goods_img: '/static/good.jpg',
        goods_update_time: '2019-6-20'
      },
      {
        goods_barcode: '6954767473673',
        goods_name: '纯悦',
        goods_model: '550ml',
        goods_price: '2元',
        goods_describe: '纯悦包装饮用水',
        goods_brand: '可口可乐',
        goods_producer: '可口可乐青岛',
        goods_img: '/static/good.jpg',
        goods_update_time: '2019-6-20'
      },
      {
        goods_barcode: '6954767473673',
        goods_name: '纯悦',
        goods_model: '550ml',
        goods_price: '2元',
        goods_describe: '纯悦包装饮用水',
        goods_brand: '可口可乐',
        goods_producer: '可口可乐青岛',
        goods_img: '/static/good.jpg',
        goods_update_time: '2019-6-20'
      },
      {
        goods_barcode: '6954767473673',
        goods_name: '纯悦',
        goods_model: '550ml',
        goods_price: '2元',
        goods_describe: '纯悦包装饮用水',
        goods_brand: '可口可乐',
        goods_producer: '可口可乐青岛',
        goods_img: '/static/good.jpg',
        goods_update_time: '2019-6-20'
      }
      ],
      editFormVisible: false,
      addForm1: {
        barcode: '',
        goods: '',
        price: ''
      },
      editForm1: {
        barcode: '',
        goods: '',
        price: ''
      },
      addFormRules: {
        goods: [
          { required: true, message: '输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '输入价格', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: '输入条码', trigger: 'blur' }
        ]
      },
      editFormRules: {
        goods: [
          { required: true, message: '输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '输入价格', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: '输入条码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getGoods () {
      let para = {
        page: this.page,
        barcode: this.mygoodsfilters.barcode
      }
      console.log(para)
      this.listLoading = true
      getMyGoodListPage(para).then((res) => {
        this.total = res.data.total
        this.goodslist = res.data.goodslist
        this.listLoading = false
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.regetGoods()
    },
    regetGoods () {
      let para = {
        page: this.page,
        barcode: ''
      }
      console.log(para)
      this.listLoading = true
      getMyGoodListPage(para).then((res) => {
        this.total = res.data.total
        this.goodslist = res.data.goodslist
        this.listLoading = false
      })
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm1 = Object.assign({}, row)
    },
    addGoods () {
      this.addFormVisible = true
      this.addForm1 = {
        barcode: '',
        goods: '',
        price: ''
      }
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { barcode: row.barcode }
        removeMyGoods(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.regetGoods()
        })
      }).catch(() => {
      })
    },
    selsChange (sels) {
      this.sels = sels
    },
    batchRemove () {
      var barcodes = this.sels.map(item => item.barcode).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { barcodes: barcodes }
        batchRemoveMyGoods(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.regetGoods()
        })
      }).catch(() => {

      })
    },
    // 提交新增商品
    addSubmit () {
      this.$refs.addForm1.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.addForm1)
            addMyGoods(para).then((res) => {
              this.addLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm1'].resetFields()
              this.addFormVisible = false
              this.regetGoods()
            })
          })
        }
      })
    },
    // 编辑
    editSubmit () {
      this.$refs.editForm1.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.editForm1)
            editGoods(para).then((res) => {
              this.editLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm1'].resetFields()
              this.editFormVisible = false
              this.regetGoods()
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .goodsimage {
    /*margin-left: -20px;*/
    /*margin-top: -20px;*/
    width: 130px;
    height: 130px;
  }
  /*div img{*/
  /*  z-index: 100;*/
  /*  cursor: pointer;*/
  /*  transition: all 1s;*/
  /*}*/
  /*div img:hover{*/
  /*  transform: scale(2,2);*/
  /*}*/
  .demo-table-expand {
    font-size: 0;
  }
  .el-card {
    width: 130px;
    height: 130px;
  }
  .goodsItem {
    display:-moz-inline-box;
    display:inline-block;
    min-width: 80px;
    color: #99a9bf;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .toolbar {
    text-align: left;
    background: #f2f2f2;
    padding: 10px 10px 0 10px;
    margin: 10px 0px;
  }
  .toolbar2 {
    text-align: left;
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
  }
  .addinput{
    min-width: 0px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
