<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" >
      <el-form :inline="true" :model="mygoodsfilters">
        <el-form-item>
          <el-input v-model="mygoodsfilters.barcode" :placeholder="$t('message.please_input_bar')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="searchcommodity">{{$t('message.query')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">{{$t('message.add')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="goodslist" stripe="true" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
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
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_price')}}</span><span>{{props.row.commodity_price}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.create_time')}}</span><span>{{props.row.create_time}}</span></div>
            </el-col>
            <el-col :span="9">
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_brand')}}</span><span>{{props.row.commodity_brand}}</span></div>
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_producer')}}</span><span>{{props.row.commodity_producer}}</span></div>
<!--              <div style="line-height: 25px"><span class="goodsItem">供应商ID</span><span>{{props.row.goods_ID}}</span></div>-->
<!--              <div style="line-height: 25px"><span class="goodsItem">供应价格</span><span>{{props.row.goods_inprice}}</span></div>-->
              <div style="line-height: 25px"><span class="goodsItem">{{$t('message.commodity_description')}}</span><span>{{props.row.commodity_description}}</span></div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="commodity_barcode" :label="$t('message.goods_barcode')" width="150" sortable>
      </el-table-column>
      <el-table-column prop="commodity_name" :label="$t('message.goods_name')" width="130"  sortable>
      </el-table-column>
      <el-table-column prop="commodity_specification" :label="$t('message.goods_model')" width=" 120" sortable>
      </el-table-column>
      <el-table-column prop="commodity_price" :label="$t('message.goods_price')" width=" 100" sortable>
      </el-table-column>
<!--      <el-table-column prop="goods_ID" :label="$t('message.goods_supplier_id')" width=" 130" sortable>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="goods_inprice" label="进价" width=" 100" sortable>-->
<!--      </el-table-column>-->
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
    <el-dialog :title="$t('message.edit')" v-model="editFormVisible" :close-on-click-modal="false" width="30%" :visible.sync="editFormVisible">
      <el-form :model="createcommodityForm" label-width="80px" :rules="createcommodityFormRules" ref="createcommodityForm" :visible.sync="editFormVisible" >
        <el-form-item :label="$t('message.commodity_piclink')" prop="img">
          <el-upload
            :action="uploadActionUrl"
            accept="image/jpeg,image/gif,image/png"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :on-remove="onRemoveTxt"
            :before-upload="onBeforeUpload"
            :file-list="files">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持JPG、GIF、PNG格式</div>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_name')" prop="commodity_name">
          <el-input v-model="createcommodityForm.commodity_name"  class="addinput" size="small" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_barcode')" prop="commodity_barcode">
          <el-input v-model="createcommodityForm.commodity_barcode" autocomplete="off" class="addinput" size="small" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_brand')" prop="commodity_brand">
          <el-input v-model="createcommodityForm.commodity_brand"  class="addinput" size="small" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_specification')" prop="commodity_specification">
          <el-input v-model="createcommodityForm.commodity_specification" autocomplete="off" class="addinput" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_producer')" prop="commodity_producer">
          <el-input v-model="createcommodityForm.commodity_producer"  class="addinput" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.commodity_description')" prop="commodity_description">
          <el-input type="textarea" v-model="createcommodityForm.commodity_description" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}" class="addinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="createcommodity = false">取消</el-button>
        <el-button type="primary" @click.native="createcommoditySubmit" :loading="addLoading">{{$t('message.confirm')}}</el-button>
      </div>
    </el-dialog>
<!--    <el-dialog :title="$t('message.edit')" v-model="editFormVisible" :close-on-click-modal="false" width="30%" :visible.sync="editFormVisible">-->
<!--      <el-form :model="editForm1" label-width="80px" :rules="editFormRules" ref="editForm1">-->
<!--        <el-form-item label="商品名称" prop="goods">-->
<!--          <el-input v-model="editForm1.goods" autocomplete="off" class="addinput"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="条码" prop="barcode">-->
<!--          <el-input v-model="editForm1.barcode" autocomplete="off" class="addinput"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="价格" prop="price">-->
<!--          <el-input v-model="editForm1.price" autocomplete="off" class="addinput"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click.native="editFormVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <!--新增界面 外层输入条码-->
    <el-dialog title="添加商品" :close-on-click-modal="false" width="30%" :visible.sync="addFormVisible">
      <el-form :model="addForm1"  label-position="left" ref="addForm1" :rules="addForm1Rules" :visible.sync="addFormVisible" label-width="100px" size="small">
        <el-form-item label="搜索商品" prop="commodity_barcode">
          <el-input v-model="addForm1.commodity_barcode" autocomplete="off" class="addinput"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addCommodity" :loading="addLoading">确认</el-button>
      </div>
      <!--        内层添加商品表-->
      <el-dialog width="50%" title="选择添加商品" :visible.sync="hascommodity" append-to-body>
        <el-table :data="commoditytoadd">
          <el-table-column property="commodity_barcode" label="条码号" width="150"></el-table-column>
          <el-table-column property="commodity_name" label="名称" width="200"></el-table-column>
          <el-table-column property="commodity_specification" label="规格"></el-table-column>
          <el-table-column :label="$t('message.operation')"  width=" 150">
            <template scope="scope">
              <!--          添加-->
              <el-button size="small" @click="alert(scope.$index, scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
<!--   内层   提示创建商品-->
      <el-dialog width="35%" title="提示" :visible.sync="hasnotcommodity" append-to-body>
        <span>暂无在售信息，可以添加一条</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="hasnotcommodity = false">取 消</el-button>
          <el-button type="primary" @click="hasnotcommodity = false ;createcommodity=true">确 定</el-button>
        </span>
      </el-dialog>
<!--      内层新建产品表单-->
      <el-dialog width="40%" title="新建" :visible.sync="createcommodity" append-to-body>
        <el-form :model="createcommodityForm" label-width="80px" :rules="createcommodityFormRules" ref="createcommodityForm" :visible.sync="createcommodity" >
          <el-form-item :label="$t('message.commodity_piclink')" prop="img">
            <el-upload
              :action="uploadActionUrl"
              accept="image/jpeg,image/gif,image/png"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :on-remove="onRemoveTxt"
              :before-upload="onBeforeUpload"
              :file-list="files">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持JPG、GIF、PNG格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_name')" prop="commodity_name">
            <el-input v-model="createcommodityForm.commodity_name"  class="addinput" size="small" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_barcode')" prop="commodity_barcode">
            <el-input v-model="createcommodityForm.commodity_barcode" autocomplete="off" class="addinput" size="small" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_brand')" prop="commodity_brand">
            <el-input v-model="createcommodityForm.commodity_brand"  class="addinput" size="small" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_price')" prop="commodity_price">
            <el-input v-model="createcommodityForm.commodity_price" autocomplete="off" class="addinput" size="small"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_specification')" prop="commodity_specification">
            <el-input v-model="createcommodityForm.commodity_specification" autocomplete="off" class="addinput" size="small"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_producer')" prop="commodity_producer">
            <el-input v-model="createcommodityForm.commodity_producer"  class="addinput" size="small"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.commodity_description')" prop="commodity_description">
            <el-input type="textarea" v-model="createcommodityForm.commodity_description" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}" class="addinput"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="createcommodity = false">取消</el-button>
          <el-button type="primary" @click.native="createcommoditySubmit" :loading="addLoading">{{$t('message.confirm')}}</el-button>
        </div>
      </el-dialog>
    </el-dialog>
<!--    修改信息-->
  </section>
</template>

<script>
import {getMyGoodListPage, editGoods, removeMyGoods, batchRemoveMyGoods} from '../../../api/api'
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
      addLoading: false,
      editLoading: false,
      goodslist: [{
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml',
        commodity_price: '2元',
        commodity_description: '纯悦包装饮用水',
        commodity_brand: '可口可乐',
        commodity_producer: '可口可乐青岛',
        commodity_piclink: '/static/chunyue.jpg',
        create_time: '2019-6-20'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml',
        commodity_price: '2元',
        commodity_description: '纯悦包装饮用水',
        commodity_brand: '可口可乐',
        commodity_producer: '可口可乐青岛',
        commodity_piclink: '/static/chunyue.jpg',
        create_time: '2019-6-20'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml',
        commodity_price: '2元',
        commodity_description: '纯悦包装饮用水',
        commodity_brand: '可口可乐',
        commodity_producer: '可口可乐青岛',
        commodity_piclink: '/static/chunyue.jpg',
        create_time: '2019-6-20'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml',
        commodity_price: '2元',
        commodity_description: '纯悦包装饮用水',
        commodity_brand: '可口可乐',
        commodity_producer: '可口可乐青岛',
        commodity_piclink: '/static/chunyue.jpg',
        create_time: '2019-6-20'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml',
        commodity_price: '2元',
        commodity_description: '纯悦包装饮用水',
        commodity_brand: '可口可乐',
        commodity_producer: '可口可乐青岛',
        commodity_piclink: '/static/chunyue.jpg',
        create_time: '2019-6-20'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml',
        commodity_price: '2元',
        commodity_description: '纯悦包装饮用水',
        commodity_brand: '可口可乐',
        commodity_producer: '可口可乐青岛',
        commodity_piclink: '/static/chunyue.jpg',
        create_time: '2019-6-20'
      }
      ],
      showbutton: [{showb: true}, {showb: true}, {showb: true}, {showb: true}],
      commoditytoadd: [{
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml'
      },
      {
        commodity_barcode: '6954767473673',
        commodity_name: '纯悦',
        commodity_specification: '550ml'
      }
      ],
      editFormVisible: false,
      addForm1: {
        commodity_barcode: ''
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
      editForm1: {
        barcode: '',
        goods: '',
        price: ''
      },
      createcommodityFormRules: {
        commodity_barcode: [
          { required: true, message: '请输入商品条码号', trigger: 'blur' }
        ],
        commodity_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        commodity_brand: [
          { required: true, message: '请输入商品商标', trigger: 'blur' }
        ],
        commodity_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        commodity_specification: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        commodity_producer: [
          { required: true, message: '请输入商品厂家', trigger: 'blur' }
        ],
        commodity_description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ]
      },
      addForm1Rules: {
        commodity_barcode: [
          { required: true, message: '请输入商品条码号', trigger: 'blur' }
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
    // toolbar   搜 索   +   新 增
    searchcommodity () {
      var searchstring = this.mygoodsfilters.barcode
      // 条码搜索
      if (/^[0-9]+$/.test(searchstring)) {
        if (searchstring.length !== 13) {
          this.$alert('条码位数必须为13位', '提示', {
            confirmButtonText: '确定'
          })
        }
      }
      // 模糊搜索
      else {

      }
      // let para = {
      //   page: this.page,
      //   barcode: this.mygoodsfilters.barcode
      // }
      // console.log(para)
      // this.listLoading = true
      // getMyGoodListPage(para).then((res) => {
      //   this.total = res.data.total
      //   this.goodslist = res.data.goodslist
      //   this.listLoading = false
      // })
    },
    clearValidate (formName) {
      this.$refs[formName].clearValidate()
    },
    handleCurrentChange (val) {
      this.page = val
      this.regetGoods()
    },
    regetGoods () {
      let para = {
        page: this.page,
        barcode: ''
      }
      console.log(para)
      this.listLoading = true
      getMyGoodListPage(para).then((res) => {
        this.total = res.data.total
        this.goodslist = res.data.goodslist
        this.listLoading = false
      })
    },
    // 新增商品填写完成后提交
    createcommoditySubmit () {
      this.createcommodity = false
      this.clearValidate('createcommodityForm')
      this.createcommodityForm.commodity_name = ''
      this.createcommodityForm.commodity_barcode = ''
      this.createcommodityForm.commodity_brand = ''
      this.createcommodityForm.commodity_price = ''
      this.createcommodityForm.commodity_specification = ''
      this.createcommodityForm.commodity_producer = ''
      this.createcommodityForm.commodity_description = ''
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
        length: '50%'
      })
      // this.$message({
      //   message: '警告哦，这是一条警告消息',
      //   type: 'warning'
      // });
      // this.$message.error('错了哦，这是一条错误消息');
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm1 = Object.assign({}, row)
    },
    addGoods () {
      this.addFormVisible = true
      this.addForm1 = {
        commodity_barcode: ''
      }
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('确认删除该商品吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { barcode: row.barcode }
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
    selsChange (sels) {
      this.sels = sels
    },
    batchRemove () {
      var barcodes = this.sels.map(item => item.barcode).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = { barcodes: barcodes }
        batchRemoveMyGoods(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.regetGoods()
        })
      }).catch(() => {

      })
    },
    // 提交添加商品时的搜索条目，根据返回结果，显示不同内层提示
    addCommodity () {
      this.clearValidate('addForm1')
      var has = false
      this.hascommodity = has
      this.hasnotcommodity = !has
    },
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
    // 编辑
    editSubmit () {
      this.$refs.editForm1.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.editForm1)
            editGoods(para).then((res) => {
              this.editLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm1'].resetFields()
              this.editFormVisible = false
              this.regetGoods()
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .goodsimage {
    width: 130px;
    height: 130px;
  }
  /*div img{*/
  /*  z-index: 100;*/
  /*  cursor: pointer;*/
  /*  transition: all 1s;*/
  /*}*/
  /*div img:hover{*/
  /*  transform: scale(2,2);*/
  /*}*/
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
</style>
