import Mock from 'mockjs'
const Orders = []

// 销售数据Mock, 尽量保证字段名与cn.js文件的变量相同 , 命名规范化
for (let i = 0; i < 86; i++) {
  Orders.push(Mock.mock({
    order_id: Mock.Random.integer(100000000, 9999999999).toString(),
    order_all_price: Mock.Random.integer(1, 1000),
    order_create_time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    order_commodity_sum: Mock.Random.integer(1, 100),
    infors: [{
      commodity_barcode: Mock.Random.integer(1000000000000, 99999999999999),
      commodity_name: Mock.Random.cword(3, 7),
      commodity_specification: Mock.Random.cword(3, 5),
      commodity_each_count: Mock.Random.integer(1, 10),
      commodity_current_price: Mock.Random.integer(1, 100)
    },
    {
      commodity_barcode: Mock.Random.integer(1000000000000, 99999999999999),
      commodity_name: Mock.Random.cword(3, 7),
      commodity_specification: Mock.Random.cword(3, 5),
      commodity_each_count: Mock.Random.integer(1, 10),
      commodity_current_price: Mock.Random.integer(1, 100)
    }]

  }))
}
export {Orders}
