<template>
  <section>
    <!--公共商品信息-->
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.goods_supplier" :placeholder="$t('message.please_input_supplier_bar')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGoods">{{$t('message.query')}}</el-button>
        </el-form-item>
       <!-- <el-form-item>
          <el-button type="primary" @click="handleAdd">{{$t('message.add')}}</el-button>
        </el-form-item>
        -->
      </el-form>
    </el-col>

    <!--列表-->
    <!--goods: [-->
    <!--{-->
    <!--goods_supplier_id: '123',-->
    <!--goods_supplier: '臭弟弟',-->
    <!--supplier_user_name: '弟弟臭',-->
    <!--supplier_company: '小寅公司',-->
    <!--supplier_addr: '天津',-->
    <!--supplier_tel: '111',-->
    <!--supplier_contact: '董安'-->
    <!--},-->
    <el-table :data="goods"  style="width: 100%;" >
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <el-row>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_supplier_id')}}</span><span>{{props.row.goods_supplier_id}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.goods_supplier')}}</span><span>{{props.row.goods_supplier}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.supplier_user_name')}}</span><span>{{props.row.supplier_user_name}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.supplier_company')}}</span><span>{{props.row.supplier_company}}</span></div>
            </el-col>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.supplier_addr')}}</span><span>{{props.row.supplier_addr}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.supplier_tel')}}</span><span>{{props.row.supplier_tel}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.supplier_contact')}}</span><span>{{props.row.supplier_contact}}</span></div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!--<el-table-column type="expand" width="80">-->
        <!--<template slot-scope="props">-->
          <!--<el-form label-position="left" inline class="demo-table-expand" >-->
            <!--<el-form-item :label="$t('message.goods_supplier_id')" prop="goods_supplier_id">-->
              <!--<span>{{ goods.goods_supplier_id }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('message.goods_supplier')">-->
              <!--<span>{{ goods.goods_supplier }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('message.supplier_user_name')">-->
              <!--<span>{{ goods.supplier_user_name }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('message.supplier_company')" >-->
              <!--<span>{{ goods.supplier_company }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('message.supplier_addr')" >-->
              <!--<span>{{ goods.supplier_addr }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('message.supplier_tel')">-->
              <!--<span>{{ goods.supplier_tel }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('message.supplier_contact')" >-->
              <!--<span>{{ goods.supplier_contact }}</span>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="goods_supplier_id" :label="$t('message.goods_supplier_id')" width="180" sortable>
      </el-table-column>
      <el-table-column prop="goods_supplier" :label="$t('message.goods_supplier')" width="180" sortable>
      </el-table-column>
      <el-table-column prop="supplier_contact" :label="$t('message.supplier_contact')" width="180" sortable>
      </el-table-column>
      <el-table-column prop="supplier_tel" :label="$t('message.supplier_tel')" width="180" sortable>
      </el-table-column>
      <el-table-column prop="supplier_addr" :label="$t('message.supplier_addr')" width="300" sortable>
      </el-table-column>
      <!--  <el-table-column :label="$t('message.operation')" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{$t('message.edit')}}</el-button>
            <el-button size="small" type="success">{{$t('message.put_in')}}</el-button>
          </template>
      </el-table-column>
      -->
    </el-table>
    <el-col :span="24" class="toolbar2">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--&lt;!&ndash;编辑界面&ndash;&gt;-->
    <!--<el-dialog :title="$t('message.edit')" v-show="editFormVisible" :close-on-click-modal="false" width="30%"  :visible.sync="editFormVisible">-->
      <!--<el-form :model="editForm"  :rules="editFormRules" ref="editForm" label-position="left">-->
        <!--<el-form-item :label="$t('message.goods_img')" prop="img">-->
          <!--<el-form-item label="" prop="name">-->
            <!--<el-upload-->
              <!--class="avatar-uploader"-->
              <!--:show-file-list="false"-->
              <!--:on-success="uploadSuccess"-->
              <!--:before-upload="onBeforeUpload">-->
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar" width="100px">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_name')" prop="name">-->
          <!--<el-input v-model="editForm.name"  class="editinput"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_barcode')" prop="barcode">-->
          <!--<el-input v-model="editForm.barcode"  class="editinput"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_brand')" prop="brand">-->
          <!--<el-input v-model="editForm.brand"  class="editinput"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_price')" prop="price">-->
          <!--<el-input v-model="editForm.price" autocomplete="off" class="editinput"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_supplier_id')" prop="supplier">-->
          <!--<el-input v-model="editForm.supplier" autocomplete="off" class="editinput"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_producer')" prop="producer">-->
          <!--<el-input v-model="editForm.producer"  class="editinput"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_describe')" prop="desc">-->
          <!--<el-input type="textarea" v-model="editForm.desc" autocomplete="off" class="editinput"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click.native="editFormVisible = false">取消</el-button>-->
        <!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{$t('message.confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <!--&lt;!&ndash;新增界面&ndash;&gt;-->
    <!--<el-dialog :title="$t('message.add')" v-show="addFormVisible" :close-on-click-modal="false"   :visible.sync="addFormVisible">-->
      <!--<el-form :model="addForm"   :rules="addFormRules" ref="addForm" :visible.sync="addFormVisible" >-->
        <!--<el-form-item :label="$t('message.goods_img')" prop="img">-->
          <!--<el-upload-->
            <!--:action="uploadActionUrl"-->
            <!--accept="image/jpeg,image/gif,image/png"-->
            <!--multiple-->
            <!--:limit="3"-->
            <!--:on-exceed="handleExceed"-->
            <!--:on-error="uploadError"-->
            <!--:on-success="uploadSuccess"-->
            <!--:on-remove="onRemoveTxt"-->
            <!--:before-upload="onBeforeUpload"-->
            <!--:file-list="files">-->
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">支持JPG、GIF、PNG格式</div>-->
          <!--</el-upload>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_name')" prop="name">-->
          <!--<el-input v-model="addForm.name"  class="addinput" size="small" style="width:250px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_barcode')" prop="barcode">-->
          <!--<el-input v-model="addForm.barcode" autocomplete="off" class="addinput" size="small" style="width:250px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_brand')" prop="brand">-->
          <!--<el-input v-model="addForm.brand"  class="addinput" size="small" style="width:250px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_price')" prop="price">-->
          <!--<el-input v-model="addForm.price" autocomplete="off" class="addinput" size="small" style="width:250px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_supplier_id')" prop="supplier">-->
          <!--<el-input v-model="addForm.supplier" autocomplete="off" class="addinput" size="small" style="width:250px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_producer')" prop="producer">-->
          <!--<el-input v-model="addForm.producer"  class="addinput" size="small" style="width:250px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.goods_describe')" prop="desc">-->
          <!--<el-input type="textarea" v-model="addForm.desc" autocomplete="off" class="addinput"  style="width:250px"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click.native="addFormVisible = false">取消</el-button>-->
        <!--<el-button type="primary" @click.native="addSubmit" :loading="addLoading">{{$t('message.confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
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
// import util from '../../../common/js/util'
// // import NProgress from 'nprogress'
// import { getGoodListPage } from '../../../api/api'
import {suppliers} from '../../../mock/data/Supplier'
export default {
  data () {
    return {
      filters: {
        goods_supplier: ''
      },
      goods: suppliers,
      total: 0,
      page: 1
      // listLoading: false,
      // sels: [] // 列表选中列
      // editFormVisible: false, // 编辑界面是否显示
      // editLoading: false,
      // editFormRules: {
      //   name: [
      //     { required: true, message: '输入商品名称', trigger: 'blur' }
      //   ],
      //   price: [
      //     { required: true, message: '输入价格', trigger: 'blur' }
      //   ],
      //   barcode: [
      //     { required: true, message: '输入条形码', trigger: 'blur' }
      //   ],
      //   img: [
      //     { required: true, message: '上传图片', trigger: 'blur' }
      //   ],
      //   brand: [
      //     { required: true, message: '输入商标', trigger: 'blur' }
      //   ],
      //   producer: [
      //     { required: true, message: '输入生产厂家', trigger: 'blur' }
      //   ],
      //   desc: [
      //     { required: true, message: '商品描述', trigger: 'blur' }
      //   ],
      //   supplier: [
      //     { required: true, message: '供应商', trigger: 'blur' }
      //   ]
      // },
      // // 编辑界面数据
      // editForm: {
      //   barcode: 0,
      //   name: '',
      //   price: 0,
      //   desc: '',
      //   brand: '',
      //   prodecer: '',
      //   img: '/static/good.jpg',
      //   gys: ''
      // },
      //
      // addFormVisible: false, // 新增界面是否显示
      // addLoading: false,
      // addFormRules: {
      //   name: [
      //     { required: true, message: '输入商品名称', trigger: 'blur' }
      //   ],
      //   price: [
      //     { required: true, message: '输入价格', trigger: 'blur' }
      //   ],
      //   barcode: [
      //     { required: true, message: '输入条形码', trigger: 'blur' }
      //   ],
      //   img: [
      //     { required: true, message: '上传图片', trigger: 'blur' }
      //   ],
      //   brand: [
      //     { required: true, message: '输入商标', trigger: 'blur' }
      //   ],
      //   producer: [
      //     { required: true, message: '输入生产厂家', trigger: 'blur' }
      //   ],
      //   desc: [
      //     { required: true, message: '商品描述', trigger: 'blur' }
      //   ],
      //   supplier: [
      //     { required: true, message: '供应商', trigger: 'blur' }
      //   ]
      // },
      // // 新增界面数据
      // addForm: {
      //   barcode: '',
      //   name: '',
      //   price: '',
      //   desc: '',
      //   brand: '',
      //   prodecer: '',
      //   img: '',
      //   gys: ''
      // }

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
        commodity_barcode: this.filters.barcode
      }
      console.log(para)
      this.listLoading = true
      // NProgress.start();
      // getGoodListPage(para).then((res) => {
      //   console.log(res)
      //   this.total = res.data.total
      //   this.goods = res.data.goods
      //   this.listLoading = false
      //   // NProgress.done();
      // })
    },
    // // 显示编辑界面
    // handleEdit: function (index, row) {
    //   this.editFormVisible = true
    //   this.editForm = Object.assign({}, row)
    // },
    // // 显示新增界面
    // handleAdd: function () {
    //   this.addFormVisible = true
    // },
    // // 编辑
    // editSubmit: function () {
    //   this.$refs.editForm.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.editLoading = true
    //         // NProgress.start();
    //         let para = Object.assign({}, this.editForm)
    //         para.date = (!para.date || para.date === '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd')
    //         editGood(para).then((res) => {
    //           this.editLoading = false
    //           // NProgress.done();
    //           this.$message({
    //             message: '提交成功',
    //             type: 'success'
    //           })
    //           this.$refs['editForm'].resetFields()
    //           this.editFormVisible = false
    //           this.getGoods()
    //         })
    //       })
    //     }
    //   })
    // },
    // // 新增
    // addSubmit: function () {
    //   this.$refs.addForm.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.addLoading = true
    //         // NProgress.start();
    //         let para = Object.assign({}, this.addForm)
    //         para.date = (!para.date || para.date === '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd')
    //         addGood(para).then((res) => {
    //           this.addLoading = false
    //           // NProgress.done();
    //           this.$message({
    //             message: '提交成功',
    //             type: 'success'
    //           })
    //           this.$refs['addForm'].resetFields()
    //           this.addFormVisible = false
    //           this.getGoods()
    //         })
    //       })
    //     }
    //   })
    // },
    selsChange: function (sels) {
      this.sels = sels
    }
    // onBeforeUpload (file) {
    //   const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png'
    //   const isLt1M = file.size / 1024 / 1024 < 1
    //
    //   if (!isIMAGE) {
    //     this.$message.error('上传文件只能是图片格式!')
    //   }
    //   if (!isLt1M) {
    //     this.$message.error('上传文件大小不能超过 1MB!')
    //   }
    //   return isIMAGE && isLt1M
    // }
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
  .goodsItem {
    display:-moz-inline-box;
    display:inline-block;
    min-width: 80px;
    color: #99a9bf;
  }
</style>
