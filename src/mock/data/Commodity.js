import Mock from 'mockjs'
const Commodity = []
const CommodityPrice = []
for (let i = 0; i < 86; i++) {
  Commodity.push(Mock.mock({
    commodity_barcode: Mock.Random.integer(1000000000000, 99999999999999).toString(),
    commodity_name: Mock.Random.cword(3, 7),
    commodity_specification: Mock.Random.cword(3, 5),
    commodity_price: Mock.Random.integer(1, 1000),
    commodity_description: Mock.Random.csentence(),
    commodity_brand: Mock.Random.cword(3, 5),
    commodity_producer: Mock.Random.cword(5, 10),
    commodity_piclink: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', '!')
  }))

  CommodityPrice.push(Mock.mock({
    commodity_barcode: Mock.Random.integer(1000000000000, 99999999999999).toString(),
    commodity_name: Mock.Random.cword(3, 7),
    commodity_specification: Mock.Random.cword(3, 5),
    commodity_price: Mock.Random.integer(1, 100),
    commodity_description: Mock.Random.csentence(),
    supplier_min_price: Mock.Random.integer(1, 100),
    suggest_price: Mock.Random.integer(1, 100),
    commodity_piclink: Mock.Random.image('100x100', '#894FC4', '#FFF', 'png', '!')
  }))
}

export { Commodity, CommodityPrice}
