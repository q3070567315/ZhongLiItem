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

// 新增合同
export const addContractApi = params => {
  return axios.post('/sys/contract/save', params)
}

// 确认合同
export const agreeContractApi = params => {
  return axios.post('/sys/contract/confirm', params)
}

// 删除合同
export const delContractApi = params => {
  return axios.post('/sys/contract/delete', params)
}

// 合同详情
export const getContractInfoApi = params => {
  return axios.get('/sys/contract/info?id=' + params)
}

// 修改合同
export const editContractApi = params => {
  return axios.post('/sys/contract/update', params)
}

// 专家列表
export const getExpertListApi = params => {
  return axios.get('/sys/expert/list?search=' + params.search + '&page=' + params.page + '&size=' + params.size)
}

// 新增专家
export const addExpertApi = params => {
  return axios.post('/sys/expert/save', params)
}

// 删除专家
export const delExpertApi = params => {
  return axios.post('/sys/expert/delete', params)
}

// 获取专家详情
export const getExpertInfoApi = params => {
  return axios.get('/sys/expert/info?id=' + params)
}

// 修改专家
export const editExpertApi = params => {
  return axios.post('/sys/expert/update', params)
}

// 获取角色列表
export const getRoleListApi = params => {
  return axios.get('/sys/role/list?search=' + params.search + '&page=' + params.page + '&size=' + params.size)
}

// 删除角色
export const delRoleApi = params => {
  return axios.post('/sys/role/delete', params)
}

// 新增角色
export const addRoleApi = params => {
  return axios.post('/sys/role/save', params)
}

// 获取角色详情
export const getRoleInfoApi = params => {
  return axios.get('/sys/role/info?id=' + params)
}

// 修改角色详情
export const editRoleInfoApi = params => {
  return axios.post('/sys/role/update', params)
}
