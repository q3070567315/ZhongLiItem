import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://apisrm.soolcool.com/'
// 请求拦截器
axios.interceptors.request.use(res => {
  Nprogress.start()
  res.headers['token'] = window.sessionStorage.getItem('token')
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

// 获取导航菜单栏
export const getNavMenuApi = params => {
  return axios.get('/sys/menu/nav')
}

// 获取用户自己的详情
export const getUserInfoApi = params => {
  return axios.get('/sys/user/curr-info')
}

// 获取所有菜单
export const getAllMenuApi = params => {
  return axios.get('/sys/menu/list')
}

// 新增菜单项
export const addMenuItemApi = params => {
  return axios.post('/sys/menu/save', params)
}

// 获取菜单详情
export const getMenuDetailApi = params => {
  return axios.get('/sys/menu/info?menuId=' + params)
}

// 修改菜单
export const editMenuItemApi = params => {
  return axios.post('/sys/menu/update', params)
}

// 删除菜单
export const delMenuItemApi = params => {
  return axios.post('/sys/menu/delete?menuId=' + params)
}

// 物料定义数据
export const matterDefineApi = params => {
  return axios.get('/sys/product/list?typeId=' + params.typeId + '&name=' + params.name + '&page=' + params.page + '&size=' + params.size + '&status=' + params.status)
}

// 自定义物料分类
export const matterCustomApi = params => {
  return axios.get('/sys/product/type-list')
}

// 添加新物料
export const addNewGoodsApi = params => {
  return axios.post('/sys/product/save', params)
}

// 删除物料
export const deleteShopApi = params => {
  return axios.post('/sys/product/delete', params)
}

// 修改物料锁定状态
export const changeStateApi = params => {
  return axios.post('/sys/product/set-status', params)
}

// 获取物料详情
export const getMatterInfoApi = params => {
  return axios.post('/sys/product/info?id=' + params)
}

// 修改物料
export const changeMatterApi = params => {
  return axios.post('/sys/product/update', params)
}

// 物料分类数据
export const matterCategoryApi = params => {
  return axios.get('/sys/product/cate-list')
}

// 添加物料分类
export const addCategoryApi = params => {
  return axios.post('/sys/product/save-type', params)
}

// 删除物料分类
export const delCategoryApi = params => {
  return axios.post('/sys/product/delete-type?id=' + params)
}

// 修改物料分类
export const editCategoryApi = params => {
  return axios.post('/sys/product/update-type', params)
}

// 合同管理数据
export const contractManageApi = params => {
  return axios.get('/sys/contract/list?type=' + params.type + '&title=' + params.title + '&page=' + params.page + '&size=' + params.size)
}
