<template>
  <section>
    <!--工具条-->

    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="mygoodsfilters">
        <el-form-item>
          <el-input v-model="mygoodsfilters.barcode" placeholder="条码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGoods">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="goodslist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="图片">
              <div>
                <img src="/static/good.jpg" width="200px"/>
              </div>
            </el-form-item>
            <el-form-item label="详情">
              <span>{{ props.row.information}}</span>
            </el-form-item>
            <el-form-item label="进价">
              <span>{{ props.row.inprice }}</span>
            </el-form-item>
<!--            <el-form-item label="商品 ID">-->
<!--              <span>{{ props.row.information }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="店铺 ID">-->
<!--              <span>{{ props.row.information}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="商品分类">-->
<!--              <span>{{ props.row.information }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="店铺地址">-->
<!--              <span>{{ props.row.information }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="商品描述">-->
<!--              <span>{{ props.row.information }}</span>-->
<!--            </el-form-item>-->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="barcode" label="条形码" width="150" sortable>
      </el-table-column>
      <el-table-column prop="goods" label="商品" width="150"  sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" min-width=" 180" sortable>
      </el-table-column>
      <el-table-column label="操作"  width=" 150" >
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar2">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" width="30%" :visible.sync="editFormVisible">
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
        barcode: 12454789,
        goods: '垃圾',
        price: '1',
        information: '新鲜垃圾好吃不贵',
        inprice: '0'
      },
      {
        barcode: 12454780,
        goods: '垃圾',
        price: '10000$',
        information: '陈年垃圾有点贵',
        inprice: '0'
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
