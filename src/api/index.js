import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://apisrm.soolcool.com/'
// 请求拦截器
axios.interceptors.request.use(res => {
  Nprogress.start()
  return res
})
axios.interceptors.response.use(res => {
  Nprogress.done()
  return res
})

// 登录
export const loginApi = params => {
  return axios.post('sys/user/login', params)
}

// 退出登录
export const logoutApi = params => {
  return axios.get('sys/user/logout')
}

// 发送验证码
export const sendVerificationApi = params => {
  return axios.get('/sys/common/send-sms?type=' + params.type + '&mobile=' + params.mobile)
}

// 用户注册
export const userRegisterApi = params => {
  return axios.post('/sys/user/register', params)
}

// 验证短信验证码
export const checkShortMsgApi = params => {
  return axios.get('/sys/user/check-sms-code?code=' + params.code + '&mobile=' + params.mobile)
}

// 修改密码
export const changePasswordApi = params => {
  return axios.post('/sys/user/password', params)
}

// 获取所有菜单
export const getMenuListApi = params => {
  return axios.get('/sys/menu/list')
}