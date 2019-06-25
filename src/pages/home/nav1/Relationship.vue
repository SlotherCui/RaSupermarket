<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入商家编号" @input="change" @change="change"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers" @click="searchRelation">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="sells"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{$t('message.open')}}</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{$t('message.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length!==0">{{$t('message.batchDelete')}}</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--新增界面-->
    <el-dialog :title="$t('message.shop_change_relation')" v-model="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item :label="$t('message.supermarket_id')" prop="id">
          <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">{{$t('message.add')}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {RealtionrequestMock, getRelationship} from '../../../api/api'
export default {
  name: 'Find',
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
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入超市名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入超市描述', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入超市编号', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入超市电话', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入超市地址', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        tel: '',
        desc: '',
        id: '',
        addr: ''
      }

    }
  },
  methods: {
    handleAdd () {
      // requestCookie({}).then(data => {
      //   console.log(data)
      // })
      this.addFormVisible = true
    },
    searchRelation () {
      var searchstring = this.filters.id
      // 条码搜索
      if ((/^[0-9]+$/.test(searchstring)) && searchstring.length === 13) {
        // 搜索
      } else {
        console.log(searchstring.length)
        this.$alert('超市编号必须为13位且为数字', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.regetRelation()
    },
    regetRelation () {
      let para = {
        page: this.page,
        id: ''
      }
      console.log(para)
      this.listLoading = true
      getRelationship(para).then((res) => {
        this.total = res.data.total
        this.sells = res.data.sells
        this.listLoading = false
      })
    }
  },
  mounted () {
    console.log('改價關係MOCK')
    let para = {page: 1, supermarket_id: 0}
    RealtionrequestMock(para).then((res) => {
      // this.editLoading = false
      // NProgress.done(
      this.sells = res.Relation
      this.total = res.total
      console.log(res)
    })
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
