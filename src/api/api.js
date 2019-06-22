import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/api'

axios.defaults.withCredentials = true

export const getGoodListPage = params => { return axios.get(`/CommonGoods/listpage`, { params: params }).then(res => res.data) }

export const removeGood = params => { return axios.get(`/CommonGoods/remove`, { params: params }).then(res => res.data) }

export const batchRemoveGood = params => { return axios.get(`/CommonGoods/batchremove`, { params: params }).then(res => res.data) }

export const editGood = params => { return axios.get(`/CommonGoods/edit`, { params: params }).then(res => res.data) }

export const addGood = params => { return axios.get(`/CommonGoods/add`, { params: params }).then(res => res.data) }
export const getInfo = params => { return axios.get(`//information`, { params: params }).then(res => res.data) }
// MyGoods请求
export const getMyGoodListPage = params => { return axios.get(`/MyGoods/listpage`, { params: params }).then(res => res.data) }

export const addMyGoods = params => { return axios.get(`/MyGoods/add`, { params: params }).then(res => res.data) }

export const editGoods = params => { return axios.get(`/MyGoods/edit`, { params: params }).then(res => res.data) }

export const removeMyGoods = params => { return axios.get(`/MyGoods/remove`, { params: params }).then(res => res.data) }

export const batchRemoveMyGoods = params => { return axios.get(`/MyGoods/batchremove`, { params: params }).then(res => res.data) }

export const requestLogin = params => {
  return axios.post('/login', qs.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  ).then(res => res.data)
}
// qs.stringify({params})

// 测试接口
export const requestTest = params => {
  return axios.get('/say2', { params }).then(res => res.data)
}
// 测试cookie
export const requestCookie = params => {
  return axios.get('/cookie', { params }).then(res => res.data)
}

// export const requestLogin = params => { return axios.get('getthread.aspx', { params }).then(res => res.data) }
