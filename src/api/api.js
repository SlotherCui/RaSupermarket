import axios from 'axios'

axios.defaults.baseURL = 'http://211.87.230.18:8080/'
axios.defaults.withCredentials = true
// post请求
// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
// get请求
// // 为给定 ID 的 user 创建请求
// axios.get('/user?ID=12345')
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
// 可选地，上面的请求可以这样做
// axios.get('/user', {
//         params: {
//             ID: 12345
//         }
//     })
//     .then(function(response) {
//         console.log(response);
//     })

export const requestLogin = params => {
  return axios.get('/login', { params }).then(res => res.data)
}

// 测试接口
export const requestTest = params => {
  return axios.get('/say2', { params }).then(res => res.data)
}

// export const requestLogin = params => { return axios.get('getthread.aspx', { params }).then(res => res.data) }
