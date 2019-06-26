import axios from 'axios'
import qs from 'qs'
import Mock from 'mockjs'
axios.defaults.baseURL = '/api'

axios.defaults.withCredentials = true

export const removeGood = params => { return axios.get(`/CommonGoods/remove`, { params: params }) }

export const batchRemoveGood = params => { return axios.get(`/CommonGoods/batchremove`, { params: params }) }

// MyGoods请求
// 根据条码号分页获取商品
export const getMyGoodListPage = params => { return axios.get(`/Commodity/list`, { params: params }).then(res => res.data) }
// 请求方法 get /MyCommodity/listpage
// 请求体  page 页号
//         commodity_barcode  商品条码号
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data
//           commodity_barcode  ：条码号
//           commodity_name     ：
//           commodity_specification
//           commodity_price
//           commodity_description
//           commodity_brand
//           commodity_producer
//           commodity_piclink
// Relationship 請求
// 根據超市id分頁獲取
export const getRelationship = params => { return axios.get(`/Relationship/listpage`, { params: params }).then(res => res.data) }
export const addMyGoods = params => { return axios.get(`/MyGoods/add`, { params: params }).then(res => res.data) }

export const editGoods = params => { return axios.get(`/MyGoods/edit`, { params: params }).then(res => res.data) }

export const removeMyGoods = params => { return axios.get(`/MyGoods/remove`, { params: params }).then(res => res.data) }

export const batchRemoveMyGoods = params => { return axios.get(`/MyGoods/batchremove`, { params: params }).then(res => res.data) }
// toolbar 新增弹窗搜索公共库是否已有目标商品
export const searchAddCommodity = params => { return axios.get(`/Commodity/searchaddcommodity`, { params: params }).then(res => res.data) }
// 请求方法 get /MyGoods/searchaddcommodity
// 请求体  searchcommodity 输入的搜索商品
// 公共商品浏览接口
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data[
//           commodity_barcode  ：条码号
//           commodity_name     ：
//           commodity_specification
//           supplier_min_price 参考价
//           suggest_price 建议价     ]
export const getGoodListPage = params => { return axios.get(`/CommonGoods/listpage`, { params: params }) }
export const editGood = params => { return axios.get(`/CommonGoods/edit`, { params: params }) }
export const addGood = params => { return axios.get(`/CommonGoods/add`, { params: params }) }
// 商家信息接口
export const getInfo = params => { return axios.get(`/information`, { params: params }) }

// 登录接口
export const requestLogin = params => {
  return axios.post('/login', qs.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  ).then(res => res.data)
}
// 相关测试接口
// 测试接口
export const requestTest = params => {
  return axios.get('/say2', { params }).then(res => res.data)
}
// 测试cookie
export const requestCookie = params => {
  return axios.get('/cookie', { params }).then(res => res.data)
}

export const requestMock = params => {
  return axios.get('/commodity/list', { params }).then(res => res.data)
}

// 销售相关接口
// 根据销售号查询销售记录/ 返回所有销售记录
export const requestOrderList = params => { return axios.get(`/Sell/OrderList`, { params: params }).then(res => res.data) }
// 请求方法 get /Sell/OrderList
// 请求体  page 页号
//         order_id  销售记录
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//           orders:[
//             order_id
//             order_all_price
//             order_create_time
//             order_commodity_sum
//             infors: [{
//             commodity_barcode
//             commodity_name
//             commodity_specification
//             commodity_each_count
//             commodity_current_price
//             }]
//           ],
//          total:   5    总页数方便显示

// 根据条码号获取价格
export const requestPriceByBarcode = params => { return axios.get(`/Sell/getPrice`, { params: params }).then(res => res.data) }
// 请求方法 get /Sell/getPrice
// 请求体   commodity_barcode  商品条码
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//        commodity_current_price： 17

// 提交所有销售商品/ 提交销售记录
export const postOrder = params => { return axios.post(`/Sell/postOrder`, { params: params }).then(res => res.data) }
// 请求方法 post /Sell/postOrder
// 请求体 commodityList:
//       [{commodity_barcode
//         commodity_each_count
//         commodity_price
//       }]
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//


// 關係測試接口
export const RealtionrequestMock = params => {
  return axios.get('/relationship/list', { params }).then(res => res.data)
}
