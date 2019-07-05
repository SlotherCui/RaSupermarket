import Mock from 'mockjs'
// 模拟订单数据
const Orders = []
// 模拟生成86条订单数据
for (let i = 0; i < 86; i++) {
  Orders.push(Mock.mock({
    order_id: Mock.Random.integer(100000000, 9999999999).toString(), // 随机订单号
    order_all_price: Mock.Random.integer(1, 1000), // 随机价格
    order_create_time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'), // 随机创建时间
    order_commodity_sum: Mock.Random.integer(1, 100) // 随机订单商品数
  }))
}
export {Orders}
