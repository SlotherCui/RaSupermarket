<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.supermarket_id" :placeholder="$t('message.please_input_sid_bar')" @input="change" @change="change"></el-input>
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
      <el-table-column prop="supermarket_id_authority" :label="$t('message.supermarket_id')" width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_name" :label="$t('message.supermarket_name')"  width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_tel" :label="$t('message.supermarket_tel')"  width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_address" :label="$t('message.supermarket_address')" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="supermarket_decription" :label="$t('message.supermarket_decription')" min-width="180" sortable>
      </el-table-column>
      <!--<el-table-column prop="supermarket_state" :label="$t('message.supermarket_state')" min-width="180" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('message.operation')" width="150">
        <!--magic(){{$t('message.open')}}-->
        <template scope="scope">
          <!--<el-button-->
            <!--size="small"-->
           <!--@click="handleOpen(scope.$index, scope.row)"-->
           <!--:loading="openLoading"-->
           <!--v-model="openVisible"-->
           <!--v-text="magic(users[scope.$index].has_related)"-->
          <!--:type="magic2(users[scope.$index].has_related)"></el-button>-->
          <el-switch prop="has_related" v-model="users[scope.$index].has_related" active-value="1" inactive-value="0" active-color="#13ce66" @change="handleOpen(scope.$index, scope.row)"></el-switch>
          <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{$t('message.delete')}}</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{$t('message.batchDelete')}}</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" :current-page="page" style="float:right;">
      </el-pagination>
    </el-col>
    <!--新增界面-->
    <el-dialog :title="$t('message.shop_change_relation')" v-model="addFormVisible" v-show="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" :inline="true" v-model="addVisible" v-show="addVisible" :visible.sync="addVisible">
        <el-form-item :label="$t('message.supermarket_id')" prop="supermarket_id">
          <el-input v-model="addForm.supermarket_id" auto-complete="off" style="width: 280px"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native="addRelation" :loading="addLoading">{{$t('message.add')}}</el-button>
      </el-form>
      <!--新增关系列表-->
      <el-table ref="addList" :data="addlist" style="width: 100%;" >
        <el-table-column prop="supermarket_id" :label="$t('message.supermarket_id')" min-width="120" >
        </el-table-column>
        <el-table-column prop="supermarket_name" :label="$t('message.supermarket_name')" width="150" >
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="clearAddForm">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">{{$t('message.commit')}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {requestRelation, requestRelationByID, postRelation, removeRelation, openRelation} from '../../../api/api'
export default {
  name: 'Find',
  data () {
    return {
      filters: {
        supermarket_id: ''
      },
      // Loading: [],
      users: [],
      addlist: [],
      // 页码 页数
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      openLoading: false,
      openVisible: true,
      addVisible: true,
      addFormRules: {
        supermarket_id: [
          { required: true, message: this.$t('message.please_input_sid_bar'), trigger: 'blur' }
        ]
      },
      OpenStauts: [{text: this.$t('message.close'), color: 'success'}],
      // 新增界面数据
      addForm: {
        supermarket_id: ''
      },
      addRelationList: []
    }
  },
  methods: {
    handleAdd () {
      this.addVisible = true
      this.addFormVisible = true
    },
    // 添加关联超市
    addRelation () {
      // 获取超市名称
      if (this.addForm.supermarket_id === '') {
        this.$message({message: this.$t('message.please_input_sid_bar'), type: 'fail'})
      } else {
        let para = {supermarket_id: this.addForm.supermarket_id}
        this.addLoading = true
        console.log(para)
        requestRelationByID(para).then((res) => {
          console.log(res)
          if (res.code === 0) {
            if (res.data === null) {
              this.$message({message: this.$t('message.no_sup'), type: 'fail'})
              this.addLoading = false
              this.addForm.supermarket_id = ''
            } else {
              var name = res.data
              // 加入到购买表
              console.log(name)
              console.log(this.addForm.supermarket_id)
              let wei = {supermarket_id: this.addForm.supermarket_id, supermarket_name: name}
              this.addlist.push(wei)
              this.addVisible = false
            }
          }
          // 关闭加载
          this.addLoading = false
        })
      }
    },
    // 提交添加确认
    addSubmit () {
      // this.$alert(this.addGoodsList, 'fsdhkjaf')
      this.addLoading = true
      let para = {supermarket_id: this.addlist[0].supermarket_id}
      console.log('输入')
      console.log(para)
      postRelation(para).then((res) => {
        console.log('输出')
        console.log(res)
        if (res.code === 0) {
          this.$message({message: this.$t('message.file_success'), type: 'success'})
          this.addFormVisible = false
          this.addLoading = false
          this.getRelationList(1)
          this.addlist = null
          this.addForm.supermarket_id = ''
        } else {
          this.$message({message: this.$t('message.file_fail'), type: 'fail'})
          this.addLoading = false
          this.addlist = null
          this.addForm.supermarket_id = ''
        }
      })
    },
    // 取消按钮点击后
    clearAddForm () {
      this.addlist = []
      this.addFormVisible = false
      this.addForm.supermarket_id = ''
    },
    // 删除方法
    // handleDel (index, row) {
    //   this.$confirm('确认删除该商户吗?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     this.listLoading = true
    //     let para = { supermarket_id: [row.supermarket_id] }
    //     removeRelation(para).then((res) => {
    //       this.listLoading = false
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //       this.getRelationList(1)
    //     })
    //   }).catch(() => {
    //   })
    // },
    // 左侧选中
    selsChange (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove () {
      console.log('sel', this.sels)
      var id = this.sels.map(item => item.supermarket_id_authority)
      this.$confirm(this.$t('message.delete_confirm'), this.$t('message.prompt'), {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { supermarket_id: id }
        console.log('输入', para)
        removeRelation(para).then((res) => {
          console.log('输出', res)
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: this.$t('message.delete_success'),
            type: 'success'
          })
          this.getRelationList(1)
        })
      }).catch(() => {

      })
    },
    // 关联关系开启方法
    handleOpen (index, row) {
      let para = {supermarket_id_authority: row.supermarket_id_authority, has_related: this.users[index].has_related}
      // index.openLoading = true
      console.log(para)
      openRelation(para).then((res) => {
        console.log(res)
        if (res.code === 0) {
          // 按钮转换关闭开启
          this.$message({
            message: this.$t('message.change_state_success'),
            type: 'success'
          })
        } else {
          this.$message({
            message: this.$t('message.change_state_fail'),
            type: 'fail'
          })
        }
        // 关闭加载
        // this.openLoading = false
      })
    },
    // 查询方法
    handleSearch () {
      this.listLoading = true
      this.getRelationList(1)
      this.filters.supermarket_id = ''
    },
    // 翻页方法
    handleCurrentChange () {
      this.listLoading = true
      this.getRelationList(this.page)
    },
    // 请求关系记录
    getRelationList (page) {
      this.listLoading = true
      let para = {page: page, supermarket_id: this.filters.supermarket_id}
      console.log(para)
      requestRelation(para).then((res) => {
        console.log('list')
        console.log(res)
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
