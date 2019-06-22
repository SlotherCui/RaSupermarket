<template>
  <section>
    <!--公共商品信息-->
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.barcode" placeholder="条码"></el-input>
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
    <el-table :data="goodslist"  style="width: 100%;">
      <el-table-column type="expand" width="200">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="" >
              <template slot-scope="scope" >
                <img src="/static/good.jpg" width="100px"/>
              </template>
            </el-form-item>
            <el-form-item label="商品名称:" >
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="商品价格:" >
            <span>{{ props.row.price }}</span>
            <span>元</span>
          </el-form-item>
          <el-form-item label="条形码:" >
            <span>{{ props.row.barcode }}</span>
          </el-form-item>
          <el-form-item label="修改日期:" >
            <span>{{ props.row.date }}</span>
          </el-form-item>
          <el-form-item label="商品描述:" >
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="barcode" label="条形码" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="商品名" width="200"  sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格(/元)" width="180" sortable>
      </el-table-column>
      <el-table-column prop="desc" label="描述" width="250" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑界面-->
    <el-dialog title="编辑" v-show="editFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="editFormVisible">
      <el-form :model="editForm"  :rules="editFormRules" ref="editForm" label>
        <el-form-item label="商品码" prop="barcode">
          <el-input v-model="editForm.barcode" autocomplete="off" class="editinput"></el-input>
        </el-form-item>
        <el-form-item label="商品名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" class="editinput"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="editForm.price" :min="0" autocomplete="off" class="editinput"></el-input-number>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date" autocomplete="off" class="editinput"></el-date-picker>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="editForm.desc" autocomplete="off" class="editinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--新增界面-->
    <el-dialog title="添加商品" v-show="addFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="addFormVisible">
      <el-form :model="addForm"  label-position="left" :rules="addFormRules" ref="addForm" :visible.sync="addFormVisible" >
        <el-form-item label="商品名称" prop="goods">
          <el-input v-model="addForm.goods" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="条形码" prop="barcode">
          <el-input v-model="addForm.barcode" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
        <el-form-item label="修改日期" prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date" autocomplete="off" class="addinput"></el-date-picker>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="addForm.desc" autocomplete="off" class="addinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<style>
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
</style>
<script>
import util from '../../../common/js/util'
// import NProgress from 'nprogress'
import { getGoodListPage, editGood, addGood } from '../../../api/api'

export default {
  data () {
    return {
      filters: {
        baocode: ''
      },
      users: [],
      total: 20,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      goodslist: [{
        barcode: 12987122,
        name: '好滋好味鸡蛋仔',
        price: 5,
        date: '2011-11-11',
        desc: '荷兰优质淡奶，奶香浓而不腻'
      },
      {
        barcode: 12987122,
        name: '好滋好味鸡蛋仔',
        price: 5,
        date: '2011-11-11',
        desc: '荷兰优质淡奶，奶香浓而不腻'
      }
      ],
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '输入价格', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: '条形码', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        barcode: 0,
        name: '',
        price: 0,
        date: '',
        desc: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '输入价格', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: '条形码', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        barcode: 0,
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
    // 获取商品列表
    getGoods () {
      let para = {
        page: this.page,
        barcode: this.filters.barcode
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
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
      this.addForm = {
        barcode: 0,
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
