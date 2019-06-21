import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.withCredentials = true
let base = ''
export const getGoodList = params => { return axios.get(`${base}/good/list`, { params: params }) }

export const getGoodListPage = params => { return axios.get(`${base}/good/listpage`, { params: params }) }

export const removeGood = params => { return axios.get(`${base}/good/remove`, { params: params }) }

export const batchRemoveGood = params => { return axios.get(`${base}/good/batchremove`, { params: params }) }

export const editGood = params => { return axios.get(`${base}/good/edit`, { params: params }) }

export const addGood = params => { return axios.get(`${base}/good/add`, { params: params }) }
export const requestLogin = params => {
  return axios.get('/login', { params }).then(res => res.data)
}

// 测试接口
export const requestTest = params => {
  return axios.get('/say2', { params }).then(res => res.data)
}
// export const requestLogin = params => { return axios.get('getthread.aspx', { params }).then(res => res.data) }
