<template>
  <section>
    <!--工具条-->
<!--    <el-col class="title1">用户商品维护</el-col>-->
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
      <el-table-column type="selection" width="155">
      </el-table-column>
      <el-table-column type="index" width="150">
      </el-table-column>
      <el-table-column prop="barcode" label="条形码" width="250" sortable>
      </el-table-column>
      <el-table-column prop="goods" label="商品" width="200" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="200" sortable>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
<!--    &lt;!&ndash;编辑界面&ndash;&gt;-->
<!--    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">-->
<!--      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->
<!--        <el-form-item label="姓名" prop="name">-->
<!--          <el-input v-model="editForm.name" auto-complete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="性别">-->
<!--          <el-radio-group v-model="editForm.sex">-->
<!--            <el-radio class="radio" :label="1">男</el-radio>-->
<!--            <el-radio class="radio" :label="0">女</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="年龄">-->
<!--          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="生日">-->
<!--          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址">-->
<!--          <el-input type="textarea" v-model="editForm.addr"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click.native="editFormVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <!--新增界面-->
    <el-dialog title="新增" v-show="addFormVisible" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm"  :rules="addFormRules" ref="addForm">
        <el-form-item label="商品名称" prop="goods">
          <el-input v-model="addForm.goods" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="条码" prop="barcode">
          <el-input-number v-model="addForm.barcode"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="addForm.price"></el-input-number>
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
      goodslist: [],
      editFormVisible: false,
      addForm: {
        barcode: '',
        goods: '',
        price: 0
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
    /*border:1px solid #dfe6ec;*/
    margin: 10px 0px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
