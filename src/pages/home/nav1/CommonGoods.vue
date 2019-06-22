<template>
  <section>
    <!--公共商品信息-->
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="条码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGoods">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="goodslist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="修改日期">
            <span>{{ props.row.date }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="barcode" label="条形码" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="商品名" width="200"  sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="180" sortable>
      </el-table-column>
      <el-table-column prop="desc" label="描述" width="250" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" label>
        <el-form-item label="商品码" prop="barcode">
          <el-input v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="editForm.price" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="条形码" prop="barcode">
          <el-input v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="editForm.price" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../../common/js/util'
// import NProgress from 'nprogress'
import { getGoodListPage, removeGood, batchRemoveGood, editGood, addGood } from '../../../api/api'

export default {
  data () {
    return {
      filters: {
        id: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        id: [
          { required: true, message: '条形码', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        price: 0,
        date: '',
        desc: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        barcode: [
          { required: true, message: '条形码', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        id: 0,
        name: '',
        price: 0,
        date: '',
        desc: ''
      }

    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getGoods()
    },
    // 获取用户列表
    getGoods () {
      let para = {
        page: this.page,
        id: this.filters.id
      }
      this.listLoading = true
      // NProgress.start();
      getGoodListPage(para).then((res) => {
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
        // NProgress.done();
      })
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { id: row.id }
        removeGood(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getGoods()
        })
      }).catch(() => {

      })
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        id: 0,
        name: '',
        price: 0,
        date: '',
        desc: ''
      }
    },
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.editForm)
            para.date = (!para.date || para.date === '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd')
            editGood(para).then((res) => {
              this.editLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getGoods()
            })
          })
        }
      })
    },
    // 新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.addForm)
            para.date = (!para.date || para.date === '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd')
            addGood(para).then((res) => {
              this.addLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getGoods()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { ids: ids }
        batchRemoveGood(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getGoods()
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getGoods()
  }
}

</script>

<style scoped lang="stylus">

  .toolbar
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px
    height 70px
    .el-form-item
      margin-bottom: 10px;
</style>
