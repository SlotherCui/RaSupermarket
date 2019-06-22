<template>
  <section>
    <!--工具条-->

    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.number" placeholder="条码"></el-input>
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
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="barcode" label="条形码" width="150" sortable>
      </el-table-column>
      <el-table-column prop="goods" label="商品" width="150" :formatter="formatSex" sortable>
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
<!--    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" width="30%" :visible.sync="editFormVisible">-->
<!--      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->
<!--        <el-form-item label="商品名称" prop="goods">-->
<!--          <el-input v-model="editForm.goods" autocomplete="off" class="addinput"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="条码" prop="barcode">-->
<!--          <el-input v-model="editForm.barcode" autocomplete="off" class="addinput"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="价格" prop="price">-->
<!--          <el-input v-model="editForm.price" autocomplete="off" class="addinput"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click.native="editFormVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <!--新增界面-->
    <el-dialog title="添加商品" v-show="addFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="addFormVisible">
      <el-form :model="addForm"  label-position="left" :rules="addFormRules" ref="addForm" :visible.sync="addFormVisible" >
        <el-form-item label="商品名称" prop="goods">
          <el-input v-model="addForm.goods" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="条码" prop="barcode">
          <el-input v-model="addForm.barcode" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price" autocomplete="off" class="addinput"></el-input>
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
export default {
  name: 'Find',
  data () {
    return {
      filters: {
        barcode: ''
      },
      sels: [],
      total: 5,
      listLoading: false,
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      goodslist: [{
        barcode: 12454789,
        goods: '垃圾',
        price: -1
      },
      {
        barcode: 12454789,
        goods: '垃圾',
        price: -1
      }
      ],
      editFormVisible: false,
      addForm: {
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
      // let para = {
      //   page: this.page,
      //   barcode: this.filters.barcode
      // }
      this.listLoading = true
      // NProgress.start();
      // getGoodsListPage(para).then((res) => {
      //   this.total = res.data.total
      //   this.users = res.data.users
      //   this.listLoading = false
      //   // NProgress.done();
      // })
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    addGoods () {
      this.addFormVisible = true
      this.addForm = {
        barcode: '',
        goods: '',
        price: 0
      }
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        // let para = { id: row.id }
        // removeUser(para).then((res) => {
        //   this.listLoading = false
        //   // NProgress.done();
        //   this.$message({
        //     message: '删除成功',
        //     type: 'success'
        //   })
        //   this.getUsers()
        // })
      }).catch(() => {

      })
    },
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { ids: ids }
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {

      })
    },
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            // let para = Object.assign({}, this.addForm)
            // para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            // addUser(para).then((res) => {
            //   this.addLoading = false
            //   // NProgress.done();
            //   this.$message({
            //     message: '提交成功',
            //     type: 'success'
            //   })
            //   this.$refs['addForm'].resetFields()
            //   this.addFormVisible = false
            //   this.getUsers()
            // })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .toolbar {
    text-align: left;
    background: #f2f2f2;
    padding: 10px;
    padding-bottom: 0px;
    /*border:1px solid #dfe6ec;*/
    margin: 10px 0px;
  }
  .toolbar2 {
    text-align: left;
    background: #f2f2f2;
    padding: 10px;
    /*border:1px solid #dfe6ec;*/
    margin: 10px 0px;
  }
  .addinput{
    min-width: 0px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
