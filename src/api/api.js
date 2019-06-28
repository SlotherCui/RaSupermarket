import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

// export const removeGood = params => { return axios.get(`/CommonGoods/remove`, { params: params }) }
// export const batchRemoveGood = params => { return axios.get(`/CommonGoods/batchremove`, { params: params }) }
// export const editGood = params => { return axios.get(`/CommonGoods/edit`, { params: params }) }
// export const addGood = params => { return axios.get(`/CommonGoods/add`, { params: params }) }
// export const getInfo = params => { return axios.get(`/information`, { params: params }) }商家信息接口


// *************************  我的商品维护相关接口
// 根据条码号分页获取商品 & 搜索自身商品库商品
export const getMyGoodListPage = params => { return axios.get(`/Commodity/list`, { params: params }).then(res => res.data) }
// 请求方法 get /Commodity/list
// 请求体  page 页号
//         commodity_barcode  商品条码号   空是查询全部
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data
//           total
//           [{
//           commodity_barcode
//           commodity_name
//           commodity_specification
//           commodity_price
//           commodity_description
//           commodity_brand
//           commodity_producer
//           commodity_piclink
//           }]
// toolbar 搜索公共库是否已有目标商品
export const searchAddCommodity = params => { return axios.get(`/Commodity/searchAddCommodity`, { params: params }).then(res => res.data) }
// 请求方法 get /Commodity/searchAddCommodity
// 请求体  commodity_barcode 输入的搜索商品
// 公共商品浏览接口
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data
//           has 公共库是否有所搜商品
//           Commodity:[
//           {
//           commodity_barcode
//           commodity_name
//           commodity_specification
//           supplier_min_price
//           suggest_price
//           commodity_piclink
//           commodity_description
//           }]
export const removeMyGoods = params => { return axios.get(`/Commodity/remove`, { params: params }).then(res => res.data) }
// 请求方法 get /Commodity/remove
// 请求体  commodity_barcode   数组例commodity_barcode:"1234,1234"
// 商家商品删除
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data

export const addMyGoods = params => { return axios.post(`/Commodity/add`, { params: params }).then(res => res.data) }
// 请求方法 post /Commodity/add
// 请求体
//              {
//                 commodity_name
//                 commodity_barcode
//                 commodity_brand
//                 commodity_price
//                 commodity_specification
//                 commodity_producer
//                 commodity_description
//              }
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//

export const editGoods = params => { return axios.get(`/MyGoods/edit`, { params: params }).then(res => res.data) }

export const batchRemoveMyGoods = params => { return axios.get(`/MyGoods/batchremove`, { params: params }).then(res => res.data) }

// *********************************************公共商品库界面
// 获取供应商商品列表
export const getGoodListPage = params => { return axios.get(`/CommonGoods/listpage`, { params: params }) }








// *********************************************登录页面相关接口
// 登录接口
export const requestLogin = params => {
  return axios.post('/login ', qs.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  ).then(res => res.data)
}
// 注销登录接口
export const requestLogout = params => {
  return axios.post('/logout', { params }).then(res => res.data)
}




// ********************************************相关测试接口
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





// ***************************************** 销售相关接口
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









// **********************************改价页面相关接口
// 根据条码查询需要改价的列表，要包含建议价，原价, 参考价
export const requestPriceChangeList = params => { return axios.get(`/Price/PriceChangeList`, { params: params }).then(res => res.data) }
// 请求方法 get /Price/PriceChangeList
// 请求体  page 页号
//         commodity_barcode  销售记录
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//           Commodity:[
//                   {commodity_barcode
//                     commodity_name
//                     commodity_specification
//                     commodity_price
//                     commodity_description
//                     supplier_min_price
//                     suggest_price
//                     commodity_piclink}
//           ],
//          total:   5    总页数方便显示

// 单一商品改价
export const requestSingleChange = params => { return axios.post(`/Price/SingleChange`, { params: params }).then(res => res.data) }
// 请求方法 post /Price/SingleChange
// 请求体 commodity_barcode:
//        new_price:
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据

// 组改价
export const requestGroupChange = params => { return axios.post(`/Price/GroupChange`, { params: params }).then(res => res.data) }
// 请求方法 post /Price/GroupChange
// 请求体 commodity_barcode:
//        new_price:
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
// 设置界面相关接口

// 联动改价
export const requestRelationChange = params => { return axios.post(`/Price/RelationChange`, { params: params }).then(res => res.data) }
// 请求方法 post /Price/RelationChange
// 请求体 commodity_barcode:
//        new_price:
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据








// **********************************  设置相关接口
// 意见反馈接口
export const postFeedBack = params => { return axios.post(`/Setting/FeedBack`, { params: params }).then(res => res.data) }
// 请求方法 POST /Setting/FeedBack
// 请求体  feedback
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据

// 查询已有信息接口
export const requestInformation = params => { return axios.get(`/Setting/getInformation`, { params: params }).then(res => res.data) }
// 请求方法 get /Setting/getInformation
// 请求体
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//             supermarket_name: '德玛西亚超市',
//             supermarket_tax: '110',
//             supermarket_tel: '110',
//             supermarket_manager_name: '盖伦',
//             supermarket_address: '召唤师峡谷301号',
//             supermarket_email: '110@163.com',
//             supermarket_decription: '卖各种极品装备：无尽之刃、饮血剑、提莫的狗头'

//  提交修改信息
export const postInformation = params => { return axios.post(`/Setting/postInformation`, { params: params }).then(res => res.data) }
// 请求方法 get /Setting/getInformation
// 请求体
//             supermarket_name: '德玛西亚超市',
//             supermarket_tax: '110',
//             supermarket_tel: '110',
//             supermarket_manager_name: '盖伦',
//             supermarket_address: '召唤师峡谷301号',
//             supermarket_email: '110@163.com',
//             supermarket_decription: '卖各种极品装备：无尽之刃、饮血剑、提莫的狗头'
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据

// 提交修改密码
export const postPassword = params => { return axios.post(`/Setting/postPassword`, { params: params }).then(res => res.data) }
// 请求方法 get /Setting/getInformation
// 请求体
//         oldpasswd
//         newpasswd
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据







// ******************************************改价关系界面接口
// 关系列表获取
export const requestRelation = params => {
  return axios.get('/RelationShip/list', { params }).then(res => res.data)
}
// 请求方法 get /RelationShip/list
// 请求体 page:
//        supermarket_id:
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
// 通过编号查找商家
export const requestRelationByID = params => {
  return axios.get('/RelationShip/query', { params }).then(res => res.data)
}
// 请求方法 get /RelationShip/query
// 请求体   supermarket_id  商品条码
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//        supermarket_name： 德玛西亚超市
// 提交关联关系
export const postRelation = params => {
  return axios.post('/RelationShip/post', { params }).then(res => res.data)
}
// 请求方法 post /RelationShip/post
// 请求体 supermarket_list:
//       [{supermarket_id
//         supermarket_name
//       }]
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
//
// 删除/批量删除关联关系
export const removeRelation = params => { return axios.get(`/RelationShip/remove`, { params: params }).then(res => res.data) }

export const batchRemoveRelation = params => { return axios.get(`/RelationShip/batchremove`, { params: params }).then(res => res.data) }
// 关联关系开启
export const openRelation = params => { return axios.get(`/RelationShip/openrelation`, { params: params }).then(res => res.data) }
// 请求方法 post /RelationShip/openrelation
// 请求体 supermarket_list:
//       [{
//       supermarket_id
//       }]
//
// 返回结果
//      code     错误码
//      codeInfo 错误信息
//      data     数据
