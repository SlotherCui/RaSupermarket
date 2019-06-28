<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.supermarket_id" placeholder="请输入商家编号" @input="change" @change="change"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!--<el-table-column type="index" width="60">-->
      <!--</el-table-column>-->
      <el-table-column prop="supermarket_id" :label="$t('message.supermarket_id')" width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_name" :label="$t('message.supermarket_name')"  width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_tel" :label="$t('message.supermarket_tel')"  width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_address" :label="$t('message.supermarket_address')" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_decription" :label="$t('message.supermarket_decription')" min-width="180" sortable>
      </el-table-column>
      <!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('message.operation')" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleOpen(scope.$index, scope.row)" :loading="openLoading" v-model="openVisible">{{$t('message.open')}}</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{$t('message.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length!==0">{{$t('message.batchDelete')}}</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" :current-page="page" style="float:right;">
      </el-pagination>
    </el-col>
    <!--新增界面-->
    <el-dialog :title="$t('message.shop_change_relation')" v-model="addFormVisible" v-show="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" :inline="true">
        <el-form-item :label="$t('message.supermarket_id')" prop="supermarket_id">
          <el-input v-model="addForm.supermarket_id" auto-complete="off" style="width: 280px"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native="addRelation" :loading="addLoading">{{$t('message.add')}}</el-button>
      </el-form>
      <!--新增关系列表-->
      <el-table :data="addRelationList"  style="width: 100%;" >
        <el-table-column prop="supermarket_id" :label="$t('message.supermarket_id')" min-width="120" >
        </el-table-column>
        <el-table-column prop="supermarket_name" :label="$t('message.supermarket_name')" width="150" >
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
import {requestRelation, requestRelationByID, postRelation, removeRelation, batchRemoveRelation, openRelation} from '../../../api/api'
export default {
  name: 'Find',
  data () {
    return {
      filters: {
        supermarket_id: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      openLoading: false,
      openVisible: true,
      addFormRules: {
        supermarket_id: [
          { required: true, message: '请输入超市编号', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        supermarket_id: ''
      },
      addRelationList: []
    }
  },
  methods: {

    handleAdd () {
      this.addFormVisible = true
    },
    // 添加关联超市
    addRelation () {
      // 获取超市名称
      let para = {supermarket_id: this.addForm.supermarket_id}
      this.addLoading = true
      requestRelationByID(para).then((res) => {
        if (res.code === 0) {
          var name = res.data.supermarket_name
          console.log(name)
          // 加入到购买表
          this.addRelationList.push({
            supermarket_id: this.addForm.supermarket_id,
            supermarket_name: name
          })
          // 输入表单重置
          this.addForm.supermarket_id = ''
        }
        // 关闭加载
        this.addLoading = false
      })
    },
    // 提交添加确认
    addSubmit () {
      // this.$alert(this.addGoodsList, 'fsdhkjaf')
      this.addLoading = true
      let para = {supermarket_list: this.addRelationList}
      console.log(para)
      postRelation(para).then((res) => {
        if (res.code === 0) {
          this.$message({message: '上传成功', type: 'success'})
          this.addFormVisible = false
          this.getRelationList(1)
        } else {
          this.$message({message: '上传失败', type: 'fail'})
          this.addLoading = false
        }
      })
    },
    // 删除方法
    handleDel (index, row) {
      this.$confirm('确认删除该商品吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { supermarket_id: row.supermarket_id }
        removeRelation(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getRelationList(1)
        })
      }).catch(() => {
      })
    },
    // 批量删除
    batchRemove () {
      var id = this.sels.map(item => item.supermarket_id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { supermarket_id: id }
        batchRemoveRelation(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getRelationList(1)
        })
      }).catch(() => {

      })
    },
    // 关联关系开启方法
    handleOpen (index, row) {
      let para = { supermarket_id: row.supermarket_id }
      this.openLoading = true
      openRelation(para).then((res) => {
        if (res.code === 0) {
          // 开启按钮变为关闭
        }
        // 关闭加载
        this.addLoading = false
      })
    },
    // 查询方法
    handleSearch () {
      this.listLoading = true
      this.getRelationList(1)
      this.filters.supermarket_id = ''
    },
    // 翻页方法
    handleCurrentChange (val) {
      this.listLoading = true
      this.getRelationList(this.page)
    },
    // 请求关系记录
    getRelationList (page) {
      this.listLoading = true
      let para = {page: page, supermarket_id: this.filters.supermarket_id}
      requestRelation(para).then((res) => {
        // this.editLoading = false
        // NProgress.done(
        if (res.code === 0) {
          this.users = res.data.relation
          this.total = res.data.total
        }
        this.listLoading = false
      })

    }
  },
  mounted () {
    this.getRelationList(this.page)
  }
}
</script>

<style scoped lang="stylus">

  .toolbar
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px
    .el-form-item
      margin-bottom: 10px;
</style>
