import Mock from 'mockjs'
const suppliers = []

for (let i = 0; i < 20; i++) {
  suppliers.push(Mock.mock({
    goods_supplier_id: Mock.Random.integer(1000000000000, 99999999999999).toString(),
    goods_supplier: Mock.Random.cword(3, 7),
    supplier_user_name: Mock.Random.cword(2, 3),
    supplier_company: Mock.Random.cword(3, 7) + '公司',
    supplier_tel: Mock.Random.integer(10000000000, 19999999999),
    supplier_addr: Mock.Random.csentence(),
    supplier_contact: Mock.Random.cword(3, 7)
  }))
}
export { suppliers }
