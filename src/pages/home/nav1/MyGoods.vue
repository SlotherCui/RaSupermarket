<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="mygoodsfilters">
        <el-form-item>
          <el-input v-model="mygoodsfilters.barcode" :placeholder="$t('message.please_input_bar')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCommodity">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkin" :loading="addbuttonLoading">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="goodslist" :stripe="true" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="expand" width="55">
        <template slot-scope="props">
          <el-row>
            <el-col :span="4" style="margin-left: 6%">
              <el-card  :body-style="{ padding: '0px' }">
                <el-image :src="props.row.commodity_piclink" fit="fill" class="goodsimage"></el-image>
              </el-card>
            </el-col>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_barcode')}}</span><span>{{props.row.commodity_barcode}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_name')}}</span><span>{{props.row.commodity_name}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_specification')}}</span><span>{{props.row.commodity_specification}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_price')}}</span><span>{{props.row.commodity_current_price}}</span></div>
            </el-col>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_brand')}}</span><span>{{props.row.commodity_brand}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_producer')}}</span><span>{{props.row.commodity_producer}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_description')}}</span><span>{{props.row.commodity_description}}</span></div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="commodity_barcode" :label="$t('message.goods_barcode')" width="150" sortable>
      </el-table-column>
      <el-table-column prop="commodity_name" :label="$t('message.goods_name')" width="200"  sortable>
      </el-table-column>
      <el-table-column prop="commodity_specification" :label="$t('message.goods_model')" width=" 120" sortable>
      </el-table-column>
      <el-table-column prop="commodity_current_price" :label="$t('message.goods_price')" width=" 100" sortable>
      </el-table-column>
      <el-table-column prop="commodity_description" :label="$t('message.commodity_description')" min-width=" 180" sortable>
      </el-table-column>
      <el-table-column :label="$t('message.operation')"  width=" 150">
        <template scope="scope">
          <!--          编辑-->
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{$t('message.edit')}}</el-button>
          <!--          删除-->
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{$t('message.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar2">
      <!--      批量删除-->
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{$t('message.batchDelete')}}</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--编辑界面-->
    <el-dialog :title="$t('message.edit')"  :close-on-click-modal="false" width="30%" :visible.sync="editFormVisible">
      <el-form :model="createcommodityForm" label-width="80px" :rules="createcommodityFormRules" ref="editForm" :visible.sync="editFormVisible" >
        <el-form-item :label="$t('message.commodity_piclink')" prop="img">
          <!--<el-upload-->
            <!--v-if="!editPic"-->
            <!--accept="image/jpeg,image/gif,image/png"-->
            <!--multiple-->
            <!--:limit="3">-->
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">支持JPG、GIF、PNG格式</div>-->
          <!--</el-upload>-->
          <el-upload
            action="http://10.26.58.60:8080/uploadCommodityImg"
            class="avatar-uploader"
            accept="image/jpeg,image/gif,image/png"
            :http-request="myUpload"
            :data="editForm.commodity_barcod"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :disabled="editPic"
            :before-upload="onBeforeUpload">
            <img v-if="editPic" :src="editPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_name')" prop="commodity_name">
          <el-input v-model="editForm.commodity_name"  class="addinput" size="small"  :disabled="!editAbles[0]" ></el-input>
        </el-form-item>
        <!--<el-form-item :label="$t('message.commodity_barcode')" prop="commodity_barcode">-->
          <!--<el-input v-model="createcommodityForm.commodity_barcode" autocomplete="off" class="addinput" size="small" ></el-input>-->
        <!--</el-form-item>-->
        <el-form-item :label="$t('message.commodity_brand')" prop="commodity_brand">
          <el-input v-model="editForm.commodity_brand"  class="addinput" size="small"  :disabled="!editAbles[1]" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_specification')" prop="commodity_specification">
          <el-input v-model="editForm.commodity_specification" autocomplete="off" class="addinput"  size="small" :disabled="!editAbles[2]"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_producer')" prop="commodity_producer" >
          <el-input v-model="editForm.commodity_producer"  class="addinput" size="small" :disabled="!editAbles[3]"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_description')" prop="commodity_description" >
          <el-input type="textarea" v-model="editForm.commodity_description" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}" class="addinput" :disabled="!editAbles[4]"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false" :loading="editLoading">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="addLoading" :disabled="!editSubmitAble">{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
      <!--        添加商品表-->
    <el-dialog width="50%" title="选择添加商品" :visible.sync="hascommodity" :before-close="addFormClose">
      <el-table :data="commoditytoadd" max-height="300">
        <el-table-column property="commodity_barcode" label="条码号" width="150"></el-table-column>
        <el-table-column property="commodity_name" label="名称" width="150"></el-table-column>
        <el-table-column property="commodity_specification" label="规格" width="100"></el-table-column>
        <el-table-column property="supplier_min_price" label="参考价" width="100"></el-table-column>
        <el-table-column property="suggest_price" label="建议价"></el-table-column>
        <el-table-column :label="$t('message.operation')"  width=" 100">
          <template scope="scope">
<!--                      添加-->
            <el-button  size="mini" v-show="showbutton[scope.$index]" :loading="!rollbutton[scope.$index]" @click="doaddcommodity(scope.$index, scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog width="35%" title="添加您的价格" :visible.sync="addprice" append-to-body :before-close="canceladd">
          <!--商品基本信息-->
          <el-row>
            <el-col :span="6">
              <img :src="addpriceform.commodity_piclink" width="90px"/>
            </el-col>
            <el-col :span="18">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_barcode')}}</span><span>{{addpriceform.commodity_barcode}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_name')}}</span><span>{{addpriceform.commodity_name}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_specification')}}</span><span>{{addpriceform.commodity_specification}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_description')}}</span><span>{{addpriceform.commodity_description}}</span></div>
            </el-col>
          </el-row>
          <div style="margin-top: 15px;">
            <el-tag class="my_tag" type="info">{{$t('message.supplier_min_price')}} {{addpriceform.supplier_min_price}}</el-tag>
            <el-tag class="my_tag" type="info">{{$t('message.suggest_price')}} {{addpriceform.suggest_price}}</el-tag>
            <el-input style="margin-top: 15px" v-model="addpriceform.new_price" placeholder="请输入新价格"></el-input>
          </div>
          <el-row style="margin-top: 20px; text-align: right">
            <el-button size="small" @click.native='canceladd'>取消</el-button>
            <el-button type="primary" size="small" :loading="changeLoading" v-on:click="addPrice"> 确认修改</el-button>
          </el-row>
      </el-dialog>
    </el-dialog>
<!--   内层   提示创建商品-->
    <el-dialog width="35%" title="提示" :visible.sync="hasnotcommodity">
      <span>暂无在售信息，可以添加一条</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hasnotcommodity = false">取 消</el-button>
        <el-button type="primary" @click="tocreate">确 定</el-button>
      </span>
    </el-dialog>
<!--      内层新建产品表单-->
    <el-dialog width="40%" title="新建" :visible.sync="createcommodity" :before-close="createCommodityCancle">
      <el-form :model="createcommodityForm" label-width="80px" :rules="createcommodityFormRules" ref="createcommodityForm" :visible.sync="createcommodity" >
<!--        <el-form-item :label="$t('message.commodity_piclink')" prop="img">-->
<!--          <el-upload-->
<!--            action=""-->
<!--            class="avatar-uploader"-->
<!--            :show-file-list="false"-->
<!--            accept="image/jpeg,image/gif,image/png"-->
<!--            multiple-->
<!--            :limit="3">-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            <div slot="tip" class="el-upload__tip">支持JPG、GIF、PNG格式</div>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
        <el-form-item :label="$t('message.commodity_barcode')" prop="commodity_barcode">
          <el-input v-model="createcommodityForm.commodity_barcode" autocomplete="off" class="addinput" size="small" disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_name')" prop="commodity_name">
          <el-input v-model="createcommodityForm.commodity_name"  autocomplete="off" class="addinput" size="small" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_brand')" prop="commodity_brand">
          <el-input v-model="createcommodityForm.commodity_brand"  autocomplete="off" class="addinput" size="small" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_price')" prop="commodity_price">
          <el-input v-model="createcommodityForm.commodity_price" autocomplete="off" class="addinput" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_specification')" prop="commodity_specification">
          <el-input v-model="createcommodityForm.commodity_specification" autocomplete="off" class="addinput" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_producer')" prop="commodity_producer">
          <el-input v-model="createcommodityForm.commodity_producer"  autocomplete="off" class="addinput" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_description')" prop="commodity_description">
          <el-input type="textarea" v-model="createcommodityForm.commodity_description" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}" class="addinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="createCommodityCancle">取消</el-button>
        <el-button type="primary" @click.native="createCommoditySubmit" :loading="addLoading">{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
<!--    </el-dialog>-->
<!--    修改信息-->
  </section>
</template>

<script>
import {getMyGoodListPage, editGoods, removeMyGoods, searchAddCommodity, addMyGoods} from '../../../api/api'
import axios from 'axios'
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
      hascommodity: false, // 查询时，已有条目，显示的内层表
      hasnotcommodity: false, // 查询时，没有条目，显示的内层提示添加
      createcommodity: false, // 新建商品
      addprice: false,
      addLoading: false,
      editLoading: false,
      changeLoading: false, // 添加商品时，按钮loading
      addbuttonLoading: false, // toolbar新增按钮loading
      addindex: -1, // 记录添加商品的位置，取消时按钮停止loading
      goodslist: [],
      rollbutton: [],
      showbutton: [],
      commoditytoadd: [],
      editFormVisible: false,
      addForm1: {
        commodity_barcode: ''
      },
      addpriceform: {
        commodity_piclink: '',
        commodity_barcode: '',
        commodity_name: '',
        commodity_specification: '',
        commodity_description: '',
        suggest_price: '',
        supplier_min_price: '',
        new_price: ''
      },
      createcommodityForm: {
        commodity_name: '',
        commodity_barcode: '',
        commodity_brand: '',
        commodity_price: '',
        commodity_specification: '',
        commodity_producer: '',
        commodity_description: ''
      },
      createcommodityFormRules: {
        commodity_barcode: [
          { required: true, message: '请输入商品条码号', trigger: 'blur' }
        ]
      },
      addForm1Rules: {
        commodity_barcode: [
          { required: true, message: '请输入商品条码号', trigger: 'blur' }
        ]
      },
      // 编辑相关变量
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
      },
      editPic: null,
      // 五种编辑选项
      editAbles: [false, false, false, false, false],
      editForm: {
        commodity_barcode: '',
        commodity_name: '',
        commodity_brand: '',
        commodity_specification: '',
        commodity_producer: '',
        commodity_description: ''
      },
      editSubmitAble: false
    }
  },
  methods: {

    myUpload (content) {
      var form = new FormData()
      form.append('file', content.file)
      form.append('barcode', this.createcommodityForm.commodity_barcode)
      axios.defaults.withCredentials = true
      axios.post(content.action, form).then(res => {
        if (res.data.code !== 0) {
          content.onError('文件上传失败, code:' + res.data.code)
        } else {
          content.onSuccess('文件上传成功！')
        }
      }).catch(error => {
        if (error.response) {
          content.onError('文件上传失败,' + error.response.data)
        } else if (error.request) {
          content.onError('文件上传失败，服务器端无响应')
        } else {
          content.onError('文件上传失败，请求封装失败')
        }
      })
    },
    // ********************************************************   清空表单的验证提示
    clearValidate (formName) {
      this.$refs[formName].resetFields()
    },
    // ********************************************************   获取商品表
    // 获取第几个页面 条码固定0
    regetGoods () {
      let para = {
        page: this.page,
        commodity_barcode: 0
      }
      this.listLoading = true
      getMyGoodListPage(para).then((res) => {
        console.log(res)
        this.total = res.data.total
        this.goodslist = res.data.commodity_list
        this.listLoading = false
      })
    },
    // ******************************************************************页面操作
    // 翻页  设置页码后，reget
    handleCurrentChange (val) {
      this.page = val
      this.regetGoods()
    },
    // ***** toolbar   搜 索   +   新 增
    // 搜索
    searchCommodity () {
      let para = {
        page: 1,
        commodity_barcode: this.mygoodsfilters.barcode
      }
      this.listLoading = true
      getMyGoodListPage(para).then((res) => {
        this.total = res.data.total
        this.goodslist = res.data.commodity_list
        this.listLoading = false
      })
      // if (/^[0-9]+$/.test(searchstring) && searchstring.length === 13) {
      // } else {
      //   this.$alert('条码必须为13位数字', '提示', {confirmButtonText: '确定'})
      // }
    },
    checkin () {
      this.addbuttonLoading = true
      if (this.mygoodsfilters.barcode.toString() === '') {
        this.$alert('搜索不能为空', '提示', {confirmButtonText: '确定'})
        this.addbuttonLoading = false
      } else {
        let para = {
          page: 1,
          commodity_barcode: this.mygoodsfilters.barcode.toString()
        }
        getMyGoodListPage(para).then((res) => {
          const checklist = res.data.commodity_list
          for (let i = 0; i < checklist.length; i++) {
            if (checklist[i].commodity_barcode === this.mygoodsfilters.barcode.toString()) {
              console.log('here', checklist[i].commodity_barcode === this.mygoodsfilters.barcode.toString())
              this.$alert('商品已在商品库', '提示', {confirmButtonText: '确定'})
              this.addbuttonLoading = false
              return
            }
          }
          this.addGoods()
        })
      }
    },
    // 添加商品，有没有，有-> 列表，没有-> 提示新增
    addGoods () {
      let para = { commodity_barcode: this.mygoodsfilters.barcode }
      searchAddCommodity(para).then((res) => {
        console.log(res)
        var has = res.data.has
        if (has) {
          this.commoditytoadd = res.data.commodity
          for (var i = 0; i < this.commoditytoadd.length; i++) {
            this.rollbutton.push(true)
            this.showbutton.push(true)
          }
        }
        this.addbuttonLoading = false
        this.hascommodity = has
        this.hasnotcommodity = !has
      })
    },
    // ******************************************************************** 有-> 列表 ， 新增结果是公共商品库已有所查询内容
    // 新增dialog列表 右上关闭方法
    addFormClose () {
      this.rollbutton = []
      this.showbutton = []
      this.commoditytoadd = []
      this.hascommodity = false
    },
    // 新增dialog列表 右侧添加按钮 按钮转动 显示内层dialog
    doaddcommodity (index, row) {
      this.addindex = index
      this.$set(this.rollbutton, index, false)
      this.addprice = true
      this.addpriceform = Object.assign({}, row)
    },
    // 内层dialog下方取消添加以及右上关闭  内层消失 按钮停转
    canceladd () {
      this.addprice = false
      this.$set(this.rollbutton, this.addindex, true)
      this.addindex = -1
    },
    // 内层dialog右下确认了修改价格，按钮旋转，post进行提交 框消失 添加按钮消失 使用了改价中的接口
    addPrice () {
      this.changeLoading = true
      var price = this.addpriceform.new_price
      if (/^[0-9]+$/.test(price)) {
        let para = {
          commodity_barcode: this.addpriceform.commodity_barcode,
          commodity_price: this.addpriceform.new_price,
          commodity: null
        }
        console.log('addprice', para)
        addMyGoods(para).then((res) => {
          console.log('addprice', res)
          if (res.code === 0) {
            this.$message({message: '增加成功', type: 'success'})
            this.$set(this.showbutton, this.addindex, false)
          } else {
            this.$message({message: '增加失败' + res.code, type: 'fail'})
            this.$set(this.rollbutton, this.addindex, true)
          }
          this.changeLoading = false
          this.addprice = false
        })
      } else {
        this.$alert('请输入数字', '提示', {confirmButtonText: '确定'})
        this.changeLoading = false
      }
    },
    // ************************************************************** 删除 + 批量删除 同一接口
    // 右侧删除按钮
    handleDel (index, row) {
      this.$confirm('确认删除该商品吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = {commodity_barcode: [row.commodity_barcode]}
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
    // 左侧选中
    selsChange (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove () {
      var commodityBarcode = this.sels.map(item => item.commodity_barcode)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { commodity_barcode: commodityBarcode }
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
    tocreate () {
      this.hasnotcommodity = false
      this.createcommodity = true
      this.createcommodityForm.commodity_barcode = this.mygoodsfilters.barcode
    },
    // 新增商品填写完成后提交
    createCommoditySubmit () {
      this.addLoading = true
      let barcode = this.createcommodityForm.commodity_barcode
      if (/^[0-9]+$/.test(barcode) && barcode.length === 13) {
        let para = {
          commodity_barcode: this.createcommodityForm.commodity_barcode,
          commodity_price: this.createcommodityForm.commodity_price,
          commodity: {
            commodity_name: this.createcommodityForm.commodity_name,
            commodity_brand: this.createcommodityForm.commodity_brand,
            commodity_specification: this.createcommodityForm.commodity_specification,
            commodity_producer: this.createcommodityForm.commodity_producer,
            commodity_description: this.createcommodityForm.commodity_description
          }
        }
        console.log('createCommoditySubmit', para)
        addMyGoods(para).then((res) => {
          console.log(res)
          if (res.code === 0) {
            this.$message({message: '上传成功', type: 'success'})
            this.addLoading = false
            this.clearValidate('createcommodityForm')
            this.createcommodity = false
          } else {
            this.$message({message: '上传失败', type: 'fail'})
            this.addLoading = false
          }
        })
      } else {
        this.$alert('条码必须为13位数字', '提示', {confirmButtonText: '确定'}).then(() => {
          this.addLoading = false
        }
        )
      }
    },
    createCommodityCancle () {
      this.clearValidate('createcommodityForm')
      this.addLoading = false
      this.createcommodity = false
    },
    // ************************************************************ 编 辑 + 新 建
    // 提交新增商品
    // addSubmit () {
    //   this.$refs.addForm1.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.addLoading = true
    //         // NProgress.start();
    //         let para = Object.assign({}, this.addForm1)
    //         addMyGoods(para).then((res) => {
    //           this.addLoading = false
    //           // NProgress.done();
    //           this.$message({
    //             message: '提交成功',
    //             type: 'success'
    //           })
    //           this.$refs['addForm1'].resetFields()
    //           this.addFormVisible = false
    //           this.regetGoods()
    //         })
    //       })
    //     }
    //   })
    // },
    // *************************************************************编辑
    // 编辑界面
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm1 = Object.assign({}, row)
      console.log(this.goodslist[index])
      this.editPic = this.goodslist[index].commodity_piclink
      this.editForm.commodity_barcode = this.goodslist[index].commodity_barcode
      // 将已有值填充
      this.editForm.commodity_name = this.goodslist[index].commodity_name
      this.editForm.commodity_brand = this.goodslist[index].commodity_brand
      this.editForm.commodity_specification = this.goodslist[index].commodity_specification
      this.editForm.commodity_producer = this.goodslist[index].commodity_producer
      this.editForm.commodity_description = this.goodslist[index].commodity_description
      // 设置界面是否可以编辑
      this.$set(this.editAbles, 0, this.goodslist[index].commodity_name === null || this.goodslist[index].commodity_name === '')
      this.$set(this.editAbles, 1, this.goodslist[index].commodity_brand === null || this.goodslist[index].commodity_brand === '')
      this.$set(this.editAbles, 2, this.goodslist[index].commodity_specification === null || this.goodslist[index].commodity_specification === '')
      this.$set(this.editAbles, 3, this.goodslist[index].commodity_producer === null || this.goodslist[index].commodity_producer === '')
      this.$set(this.editAbles, 4, this.goodslist[index].commodity_description === null || this.goodslist[index].commodity_description === '')

      // 提交按钮是否可以点击  如果均已上传则不可点击
      this.editSubmitAble = this.editAbles[0] || this.editAbles[1] || this.editAbles[2] || this.editAbles[3] || this.editAbles[4]
    },
    uploadSuccess () {
      this.$message({message: '上传成功', type: 'success'})
    },
    onBeforeUpload (file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M
    },
    // 提交编辑
    editSubmit () {
      // this.$refs.editForm1.validate((valid) => {
      //   if (valid) {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editLoading = true
        // NProgress.start();
        let para = Object.assign({}, this.editForm)
        // console.log(para)
        // console.log( this.editForm)
        editGoods(para).then((res) => {
          console.log(res)
          if (res.code === 0) {
            this.editLoading = false
            this.editFormVisible = false
            this.$message({message: '提交成功', type: 'success'})
            this.$refs['editForm'].resetFields()
            this.regetGoods()
          } else {
            this.editLoading = false
            this.$message({message: '提交失败', type: 'fail'})
          }

          // NProgress.done();
        })
      })
      //   }
      // })
    }
  },
  mounted () {
    this.regetGoods()
  }
}
</script>

<style scoped>
  .goodsimage {
    width: 130px;
    height: 130px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .el-card {
    width: 130px;
    height: 130px;
  }
  .goodsItem {
    display:-moz-inline-box;
    display:inline-block;
    min-width: 80px;
    color: #99a9bf;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
