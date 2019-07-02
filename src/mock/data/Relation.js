import Mock from 'mockjs'
const relation = []

for (let i = 0; i < 86; i++) {
  relation.push(Mock.mock({
    supermarket_id_authority: Mock.Random.integer(1000000000000, 99999999999999).toString(),
    supermarket_name: Mock.Random.cword(3, 7),
    supermarket_address: Mock.Random.cword(3, 5),
    supermarket_tel: Mock.Random.integer(1, 1000),
    supermarket_decription: Mock.Random.csentence(),
    has_related: Mock.Random.integer(0, 1).toString()
}))
}
export { relation }
