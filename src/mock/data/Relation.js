import Mock from 'mockjs'
const Relation = []

for (let i = 0; i < 86; i++) {
  Relation.push(Mock.mock({
    supermarket_id: Mock.Random.integer(1000000000000, 99999999999999),
    supermarket_name: Mock.Random.cword(3, 7),
    supermarket_address: Mock.Random.cword(3, 5),
    supermarket_tel: Mock.Random.integer(1, 1000),
    supermarket_decription: Mock.Random.csentence()
  }))
}
export { Relation }
