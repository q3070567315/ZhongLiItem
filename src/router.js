import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Register from './components/register.vue'
import ResetPassword from './components/resetPassword.vue'
import Home from './components/home.vue'
import Index from './components/index.vue'
import PersonalCenter from './components/personalCenter/personalCenter.vue'
import PurchaseOrder from './components/CollProcurement/purchaseOrder.vue'
import OnlineConfirmation from './components/CollProcurement/onlineConfirmation.vue'

Vue.use(Router)

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
    // 采购订单
    {
      path: '/purchaseOrder',
      component: PurchaseOrder
    },
    // 在线收货确认
    {
      path: '/onlineConfirmation',
      component: OnlineConfirmation
    }
    ]
  }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/resetPassword') return next()
  const codeStr = window.sessionStorage.getItem('code')
  if (!codeStr) return next('/login')
  next()
})
export default router
