import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Register from './components/register.vue'
import ResetPassword from './components/resetPassword.vue'
import Home from './components/home.vue'
import Index from './components/index.vue'
import PersonalCenter from './components/personalCenter/personalCenter.vue'
import PurchaseOrder from './components/collProcurement/purchaseOrder.vue'
import OnlineConfirmation from './components/collProcurement/onlineConfirmation.vue'
import InvoiceInforConfirm from './components/collProcurement/invoiceInforConfirm.vue'
import MatterCategory from './components/matterManage/matterCategory.vue'
import MatterDefine from './components/matterManage/matterDefine.vue'
import ContractManage from './components/contractManage/contractManage.vue'
import ExpertMaintain from './components/expertManage/expertMaintain.vue'
import MenuManage from './components/systemManange/menuManage.vue'
import RuleManage from './components/systemManange/roleManage.vue'
import AllowSellApplicate from './components/customerManage/allowSellApplicate.vue'
import OrderConfirm from './components//customerManage/orderConfirm.vue'
import OnlineDelivery from './components/customerManage/onlineDelivery.vue'
import InvoiceInfo from './components/customerManage/invoiceInfo.vue'
import OnlineReconcile from './components/customerManage/onlineReconcile.vue'
import Lunzi from './components/lunzi.vue'
import Lunzi2 from './components/lunzi2.vue'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/resetPassword',
    component: ResetPassword
  },
  {
    path: '/home',
    component: Home,
    redirect: '/index',
    children: [{
      path: '/index',
      component: Index
    },
    // 个人中心
    {
      path: '/personalCenter',
      component: PersonalCenter
    },
    // 采购协同
    // 1.采购订单
    {
      path: '/purchaseOrder',
      component: PurchaseOrder
    },
    // 2.在线收货确认
    {
      path: '/onlineConfirmation',
      component: OnlineConfirmation
    },
    // 3.发票信息确认
    {
      path: '/invoiceInforConfirm',
      component: InvoiceInforConfirm
    },
    // 物料管理
    // 1.物料分类
    {
      path: '/matterCategory',
      component: MatterCategory
    },
    // 2.物料定义
    {
      path: '/matterDefine',
      component: MatterDefine
    },
    // 合同管理
    // 1.合同列表
    {
      path: '/contractManage',
      component: ContractManage
    },
    // 2.专家维护
    {
      path: '/expertMaintain',
      component: ExpertMaintain
    },
    // 系统管理
    // 1.菜单管理
    {
      path: '/menuManage',
      component: MenuManage
    },
    // 2.角色管理
    {
      path: '/ruleManage',
      component: RuleManage
    },
    // 客户管理
    // 1.允销申请
    {
      path: '/allowSellApplicate',
      component: AllowSellApplicate
    },
    // 2.订单确认
    {
      path: '/orderConfirm',
      component: OrderConfirm
    },
    // 3.在线送货
    {
      path: '/onlineDelivery',
      component: OnlineDelivery
    },
    // 4.发票信息
    {
      path: '/invoiceInfo',
      component: InvoiceInfo
    },
    // 5.在线对账
    {
      path: '/onlineReconcile',
      component: OnlineReconcile
    },
    // 轮子
    {
      path: '/lunzi',
      component: Lunzi
    },
    {
      path: '/lunzi2',
      component: Lunzi2
    }
    ]
  }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/resetPassword') return next()
  const Token = window.sessionStorage.getItem('token')
  if (!Token) return next('/login')
  next()
})
export default router
