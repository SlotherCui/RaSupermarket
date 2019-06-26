import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Commodity } from './data/Commodity'
import { Orders } from './data/Order'
import { Relation } from './data/Relation'

let _Commodity = Commodity
let _Orders = Orders
let _Relation = Relation
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
    mock.onGet('/Commodity/searchaddcommodity').reply(config => {
      // 获取请求体
      let {commodity_barcode} = config.params
      //

      let mockCommodity = _Commodity.filter(commodity => {
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
    mock.onGet('/relationship/list').reply(config => {
      let {page, supermarket_id} = config.params
      let mockRelation = _Relation.filter(Relation => {
        if (supermarket_id && Relation.supermarket_id.indexOf(supermarket_id) === -1) return false
        return true
      })
      let total = mockRelation.length
      mockRelation = mockRelation.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            codeInfo: '成功',
            data: {
              total: total,
              orders: mockRelation
            }}])
        }, 1000)
      })
    })
    // 添加列表 通过编号查询超市名字
    mock.onGet('/relationship/query').reply(config => {
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
    mock.onPost('/relationship/post').reply(config => {
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
  }
}
