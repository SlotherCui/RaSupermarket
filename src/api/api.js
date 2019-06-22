import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.defaults.withCredentials = true

export const getGoodListPage = params => { return axios.get(`/CommonGoods/listpage`, { params: params }) }

export const removeGood = params => { return axios.get(`/CommonGoods/remove`, { params: params }) }

export const batchRemoveGood = params => { return axios.get(`/CommonGoods/batchremove`, { params: params }) }

export const editGood = params => { return axios.get(`/CommonGoods/edit`, { params: params }) }

export const addGood = params => { return axios.get(`/CommonGoods/add`, { params: params }) }
export const getInfo = params => { return axios.get(`//information`, { params: params }) }
export const requestLogin = params => {
  return axios.post('/login', { params }).then(res => res.data)
}

// 测试接口
export const requestTest = params => {
  return axios.get('/say2', { params }).then(res => res.data)
}
// 测试cookie
export const requestCookie = params => {
  return axios.get('/cookie', { params }).then(res => res.data)
}

// export const requestLogin = params => { return axios.get('getthread.aspx', { params }).then(res => res.data) }
