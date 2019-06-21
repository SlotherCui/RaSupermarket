import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.withCredentials = true
let base = ''

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }
// export const requestLogin = params => {
// return axios.get('/login', { params }).then(res => res.data)
// }

// 测试接口
export const requestTest = params => {
  return axios.get('/say2', { params }).then(res => res.data)
}
// export const requestLogin = params => { return axios.get('getthread.aspx', { params }).then(res => res.data) }
