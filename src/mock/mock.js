import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Commodity, CommodityPrice, PublicCommodity} from './data/Commodity'
import { Orders } from './data/Order'
import { Relation } from './data/Relation'

let _Commodity = Commodity
let _CommodityPrice = CommodityPrice
let _Orders = Orders
let _Relation = Relation
let _PublicCommodity = PublicCommodity
export default {
  /**
   * mock bootstrap
   */
  bootstrap: function () {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 获取用户列表
    // mock.onGet('/user/list').reply(config => {
    //   let {name} = config.params
    //   let mockUsers = _Users.filter(user => {
    //     if (name && user.name.indexOf(name) == -1) return false
    //     return true
    //   })
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         users: mockUsers
    //       }])
    //     }, 1000)
    //   })
    // })

    // 获取用户列表（分页）
    // mock.onGet('/user/listpage').reply(config => {
    //   let {page, name} = config.params
    //   let mockUsers = _Users.filter(user => {
    //     if (name && user.name.indexOf(name) == -1) return false
    //     return true
    //   })
    //   let total = mockUsers.length
    //   mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         total: total,
    //         users: mockUsers
    //       }])
    //     }, 1000)
    //   })
    // })
    mock.onPost('/Commodity/AddNewPrice').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let para = JSON.parse(config.data)
      console.log(parma)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    mock.onPost('/Commodity/add').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let para = JSON.parse(config.data)
      console.log(para)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    // /Commodity/remove
    mock.onGet('/Commodity/remove').reply(config => {
      // 获取请求体
      let {commodity_barcode} = config.params
      //
      console.log('mock_delete', commodity_barcode)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    mock.onGet('/Commodity/searchAddCommodity').reply(config => {
      // 获取请求体
      let {commodity_barcode} = config.params
      //

      let mockCommodity = _PublicCommodity.filter(commodity => {
        if (commodity_barcode && commodity.commodity_barcode.indexOf(commodity_barcode) === -1) return false
        return true
      })
      var has = mockCommodity.length !== 0
      console.log('mock', has)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              has: has,
              Commodity: mockCommodity
            }}])
        }, 1000)
      })
    })
    mock.onGet('/Commodity/list').reply(config => {
      // 获取请求体
      let {page, commodity_barcode} = config.params
      //
      console.log(commodity_barcode)
      let mockCommodity = _Commodity.filter(commodity => {
        if (commodity_barcode && commodity.commodity_barcode.indexOf(commodity_barcode) === -1) return false
        return true
      })
      // 总长度
      let total = mockCommodity.length
      // 商品查询结果分页
      mockCommodity = mockCommodity.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              total: total,
              Commodity: mockCommodity
            }}])
        }, 1000)
      })
    })

    mock.onPost('/Commodity/edit').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let parma = JSON.parse(config.data)
      console.log(parma)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })

    // 获取销售记录列表
    mock.onGet('/Sell/OrderList').reply(config => {
      // 获取请求体
      let {page, order_id} = config.params
      //
      let mockOrders = _Orders.filter(commodity => {
        if (order_id && commodity.order_id.indexOf(order_id) === -1) return false
        return true
      })
      // 总长度
      let total = mockOrders.length
      // 商品查询结果分页
      mockOrders = mockOrders.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              total: total,
              orders: mockOrders
            }}])
        }, 1000)
      })
    })

    mock.onGet('/Sell/getPrice').reply(config => {
      // 获取请求体
      let {commodity_barcode} = config.params
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              commodity_current_price: 17
            }}])
        }, 1000)
      })
    })
    // 接受post请求
    mock.onPost('/Sell/postOrder').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let commodity_list = JSON.parse(config.data)
      console.log(commodity_list)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })

    mock.onGet('/Price/PriceChangeList').reply(config => {
      // 获取请求体
      let {page, commodity_barcode} = config.params
      //
      let mockCommodity = _CommodityPrice.filter(commodity => {
        if (commodity_barcode && commodity.commodity_barcode.indexOf(commodity_barcode) === -1) return false
        return true
      })
      // 总长度
      let total = mockCommodity.length
      // 商品查询结果分页
      mockCommodity = mockCommodity.filter((u, index) => index < 9 * page && index >= 9 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              total: total,
              Commodity: mockCommodity
            }}])
        }, 1000)
      })
    })

    mock.onPost('/Price/SingleChange').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let parma = JSON.parse(config.data)
      console.log(parma)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    mock.onPost('/Setting/FeedBack').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let parma = JSON.parse(config.data)
      console.log(parma)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })

    mock.onGet('/Setting/getInformation').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              supermarket_name: '德玛西亚超市',
              supermarket_tax: '1FSDAFDSAF10',
              supermarket_tel: '11VXCZVCZXVZXCV0',
              supermarket_manager_name: '盖伦',
              supermarket_piclink: '/static/',
              supermarket_address: '召唤师峡谷301号',
              supermarket_email: '110@163.com',
              supermarket_decription: '卖各种极品装备：无尽之刃、饮血剑、提莫的狗头'
            }}])
        }, 1000)
      })
    })
    mock.onPost('/Setting/postInformation').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let parma = JSON.parse(config.data)
      console.log(parma)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    mock.onPost('/Setting/postPassword').reply(config => {
      // 获取请求体
      // let {commodity_list} = config.params
      let parma = JSON.parse(config.data)
      console.log(parma)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    // 删除用户
    // mock.onGet('/user/remove').reply(config => {
    //   let { id } = config.params
    //   _Users = _Users.filter(u => u.id !== id)
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '删除成功'
    //       }])
    //     }, 500)
    //   })
    // })

    // 批量删除用户
    // mock.onGet('/user/batchremove').reply(config => {
    //   let { ids } = config.params
    //   ids = ids.split(',')
    //   _Users = _Users.filter(u => !ids.includes(u.id))
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '删除成功'
    //       }])
    //     }, 500)
    //   })
    // })

    // 编辑用户
    // mock.onGet('/user/edit').reply(config => {
    //   let { id, name, addr, age, birth, sex } = config.params
    //   _Users.some(u => {
    //     if (u.id === id) {
    //       u.name = name
    //       u.addr = addr
    //       u.age = age
    //       u.birth = birth
    //       u.sex = sex
    //       return true
    //     }
    //   })
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '编辑成功'
    //       }])
    //     }, 500)
    //   })
    // })

    // 新增用户
    // mock.onGet('/user/add').reply(config => {
    //   let { name, addr, age, birth, sex } = config.params
    //   _Users.push({
    //     name: name,
    //     addr: addr,
    //     age: age,
    //     birth: birth,
    //     sex: sex
    //   })
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '新增成功'
    //       }])
    //     }, 500)
    //   })
    // })
    // 获取列表
    mock.onGet('/RelationShip/list').reply(config => {
      let {page, supermarket_id} = config.params
      let mockRelation = _Relation.filter(Relation => {
        if (supermarket_id && Relation.supermarket_id.indexOf(supermarket_id) === -1) return false
        return true
      })
      let total = mockRelation.length
      // if (Relation.supermarket_state === 1) {
      //   // Relation.supermarket_state = '开启'
      // } else {
      //   // Relation.supermarket_state = '关闭'
      // }
      mockRelation = mockRelation.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              total: total,
              relation: mockRelation
            }}])
        }, 1000)
      })
    })
    // 添加列表 通过编号查询超市名字
    mock.onGet('/RelationShip/query').reply(config => {
      // 获取请求体
      let {supermarket_id} = config.params
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              supermarket_name: '德玛西亚超市'
            }}])
        }, 1000)
      })
    })
    // 接受post请求
    mock.onPost('/RelationShip/post').reply(config => {
      // 获取请求体
      let supermarket_list = JSON.parse(config.data)
      console.log(supermarket_list)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
    // 开启请求
    mock.onGet('/RelationShip/openrelation').reply(config => {
      let {supermarket_id} = config.params
      console.log('mock_close', supermarket_id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功'
          }])
        }, 1000)
      })
    })
    // /RelationShip/remove
    mock.onGet('/RelationShip/remove').reply(config => {
      // 获取请求体
      let {supermarket_id} = config.params
      //
      console.log('mock_delete', supermarket_id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
            }}])
        }, 1000)
      })
    })
  }
}
