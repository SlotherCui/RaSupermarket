import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

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
