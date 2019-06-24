<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入销售号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="sells"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <el-row v-for="infor in props.row.infors" :key="infor.barcode" style="margin-left: 1%">
            <el-col :span="6" >
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_barcode')}}</span><span>{{infor.order_goods_barcode}}</span></div>
            </el-col>
            <el-col :span="4">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_name')}}</span><span>{{infor.order_goods_name}}</span></div>
            </el-col>
            <el-col :span="4">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_specification')}}</span><span>{{infor.order_goods_model}}</span></div>
            </el-col>
            <el-col :span="4">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_current_price')}}</span><span>{{infor.order_goods_num }}</span></div>
            </el-col>
            <el-col :span="3">
              <div style="line-height: 25px"><span class="goodsItem" >{{$t('message.commodity_each_count')}}</span><span>{{infor.order_goods_price }}</span></div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="order_id" :label="$t('message.order_id')" width="200" sortable>
      </el-table-column>
      <el-table-column prop="order_num" :label="$t('message.order_commodity_sum')" width="200" sortable>
      </el-table-column>
      <el-table-column prop="order_price" :label="$t('message.order_all_price')" width="200" sortable>
      </el-table-column>
      <el-table-column prop="order_time" :label="$t('message.order_create_time')" min-width="200" sortable>
      </el-table-column>
      <!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作" width="90">-->
        <!--<template scope="scope">-->
          <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
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
import { requestCookie } from '../../../api/api'
export default {
  name: 'page1',
  data () {
    return {
      filters: {
        name: ''
      },
      users: [],
      sells: [{
        order_id: '00000001',
        order_price: 5,
        order_time: '2019-6-30',
        order_num: 3,
        infors: [{
          order_goods_barcode: '6954767473673',
          order_goods_name: '纯悦',
          order_goods_model: '550ml',
          order_goods_num: '1',
          order_goods_price: '2'
        },
        {
          order_goods_barcode: '6954767473674',
          order_goods_name: '纯兑',
          order_goods_model: '550ml',
          order_goods_num: '2',
          order_goods_price: '1.5'
        }]
      },
      {
        order_id: '00000001',
        order_price: 5,
        order_time: '2019-6-30',
        order_num: 3,
        infors: [{
          order_goods_barcode: '6954767473673',
          order_goods_name: '纯悦',
          order_goods_model: '550ml',
          order_goods_num: '1',
          order_goods_price: '2'
        },
        {
          order_goods_barcode: '6954767473674',
          order_goods_name: '纯兑',
          order_goods_model: '550ml',
          order_goods_num: '2',
          order_goods_price: '1.5'
        }]
      },
      {
        order_id: '00000001',
        order_price: 5,
        order_time: '2019-6-30',
        order_num: 3,
        infors: [{
          order_goods_barcode: '6954767473673',
          order_goods_name: '纯悦',
          order_goods_model: '550ml',
          order_goods_num: '1',
          order_goods_price: '2'
        },
        {
          order_goods_barcode: '6954767473674',
          order_goods_name: '纯兑',
          order_goods_model: '550ml',
          order_goods_num: '2',
          order_goods_price: '1.5'
        }]
      },
      {
        order_id: '00000001',
        order_price: 5,
        order_time: '2019-6-30',
        order_num: 3,
        infors: [{
          order_goods_barcode: '6954767473673',
          order_goods_name: '纯悦',
          order_goods_model: '550ml',
          order_goods_num: '1',
          order_goods_price: '2'
        },
        {
          order_goods_barcode: '6954767473674',
          order_goods_name: '纯兑',
          order_goods_model: '550ml',
          order_goods_num: '2',
          order_goods_price: '1.5'
        }]
      },
      {
        order_id: '00000001',
        order_price: 5,
        order_time: '2019-6-30',
        order_num: 3,
        infors: [{
          order_goods_barcode: '6954767473673',
          order_goods_name: '纯悦',
          order_goods_model: '550ml',
          order_goods_num: '1',
          order_goods_price: '2'
        },
        {
          order_goods_barcode: '6954767473674',
          order_goods_name: '纯兑',
          order_goods_model: '550ml',
          order_goods_num: '2',
          order_goods_price: '1.5'
        }]
      },
      {
        order_id: '00000001',
        order_price: 5,
        order_time: '2019-6-30',
        order_num: 3,
        infors: [{
          order_goods_barcode: '6954767473673',
          order_goods_name: '纯悦',
          order_goods_model: '550ml',
          order_goods_num: '1',
          order_goods_price: '2'
        },
        {
          order_goods_barcode: '6954767473674',
          order_goods_name: '纯兑',
          order_goods_model: '550ml',
          order_goods_num: '2',
          order_goods_price: '1.5'
        }]
      }],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }

    }
  },
  methods: {
    handleAdd () {
      requestCookie({}).then(data => {
        console.log(data)
      })
    }
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
