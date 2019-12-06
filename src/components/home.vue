<template>
    <div class="home_contaner">
        <!-- 侧边栏 style="display:none;" -->
        <el-aside :width="isCollapse ? '64px':'220px'">
            <div class="logo"><i>LOGO</i> SRM系统</div>
            <!-- 隐藏侧边栏时显示的图标L -->
            <div style="display: none" ref='reduceLogo' class="reduceLogo">L</div>
            <!-- 导航菜单start -->
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#24262F" text-color="#fff" unique-opened active-text-color="#fff" :collapse="isCollapse" :router="true" @select="asideChange">
                <!-- 一级菜单 -->
                <el-submenu :index="item.url + ''" v-for="item in navMenu" :key="item.menuId">
                    <template slot="title">
                      <!-- 图标 -->
                      <i :class="item.icon"></i>
                      <span>{{item.name}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/'+subItem.url" v-for="subItem in item.list" :key="subItem.menuId">
                      <template slot="title">
                      <!-- 图标 -->
                      <i :class="subItem.icon"></i>
                      <span>{{subItem.name}}</span>
                      </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
            <!-- 导航菜单end -->
        </el-aside>
        <el-container>
            <!-- 主体头部 -->
            <el-header>
                <a @click="hiddenAside"><i class="iconfont icon-zhankai-"></i></a>宁波香格里拉供应链有限公司
                <span>普通会员</span>
                <div class="el_header_right">
                    <el-badge :value="200" :max="99">
                        <el-button class="el-icon-bell"></el-button>
                    </el-badge>
                    <a href="javascript:;" class="iconfont icon-zhankai"></a>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <img src="../assets/img/defaultHead.jpg" alt="">
                            下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <a @click="personRouter()"><el-dropdown-item>个人中心</el-dropdown-item></a>
                            <a @click="dialogVisible = true"><el-dropdown-item>密码修改</el-dropdown-item></a>
                            <a @click="logout"><el-dropdown-item>退出登录</el-dropdown-item></a>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <!-- 主体内容区 -->
            <el-main>
                <!-- 主体内容导航栏 -->
                <el-tabs v-model="editableTabsValue" type="border-card" @tab-remove="removeTab">
                    <!-- 主体导航栏主页 -->
                    <el-tab-pane>
                        <span slot="label" @click="$router.push('/index')"><i class="iconfont icon-zhuye"></i></span>
                        <router-view></router-view>
                    </el-tab-pane>
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" closable>
                        <span slot="label" @click="$router.push(item.url)">{{item.title}}</span>
                        <router-view></router-view>
                    </el-tab-pane>
                </el-tabs>
                <!-- 尾部按钮 -->
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="iconfont icon-jiantouxia el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a @click="closeOnePage()"><el-dropdown-item>关闭当前页面</el-dropdown-item></a>
                        <a @click="closeOtherPage()"><el-dropdown-item>关闭其他页面</el-dropdown-item></a>
                        <a @click="closeAllPage()"><el-dropdown-item>关闭所有页面</el-dropdown-item></a>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-main>
            <el-footer>
                <div class="footer_left">
                    <span>
                        <a href="javascript:;">网站首页</a> |
                        <a href="javascript:;">帮助中心</a> |
                        <a href="javascript:;">联系我们</a> |
                        <a href="javascript:;">招聘信息</a> |
                        <a href="javascript:;">客户服务</a> |
                        <a href="javascript:;">隐私政策</a> |
                        <a href="javascript:;">广告服务</a> |
                        <a href="javascript:;">网站地图</a> |
                        <a href="javascript:;">意见反馈</a>
                    </span>
                </div>
                <div class="footer_right">
                    <a href="javascript:;">
                        <i class="iconfont icon-WeChat"></i>
                        <p>公众号</p>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-weibo"></i>
                        <p>微博</p>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-shouji"></i>
                        <p>400-888-888</p>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-youjian"></i>
                        <p>发送邮件</p>
                    </a>
                </div>
            </el-footer>
        </el-container>
        <!-- 修改密码弹出框 -->
        <template id="changePasswordBox">
          <div>
            <el-dialog
              title="修改密码"
              :visible.sync="dialogVisible">
                <!-- 注册表单 -->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop="password">
                        <p>新密码: </p><el-input v-model="ruleForm.password" placeholder="设置六至二十位登录密码" type="password" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPassword">
                        <p>再次确认: </p><el-input v-model="ruleForm.checkPassword" placeholder="请再次输入登陆密码" type="password" prefix-icon="el-icon-search" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <p>绑定手机: </p><a>{{ruleForm.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</a>
                    </el-form-item>
                    <el-form-item prop="code" class="el_form_item_shortMsg">
                        <p>验证码: </p><el-input v-model="ruleForm.code" name="shortMsg" placeholder="请输入短信验证码" prefix-icon="el-icon-search" clearable></el-input>
                        <el-button @click="sendVerification('ruleForm')" ref="sendVeri" :disabled="controlBtn">发送验证码</el-button>
                    </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="changePassword">修改</el-button>
              </span>
            </el-dialog>
          </div>
        </template>
    </div>
</template>
<script>
import { logoutApi, getNavMenuApi, sendVerificationApi, getUserInfoApi, changePasswordApi } from '@/api'
export default {
  data() {
    // 部分校验(密码校验)
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      ruleForm: {
        password: '',
        mobile: '',
        code: ''
      },
      // 登陆框校验
      rules: {
        mobile: [
          { required: false, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号码' }
        ],
        password: [
          { required: false, trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码长度应为6~16个字符且包含字母和数字' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 控制验证码按钮的禁用状态
      controlBtn: false,
      // 控制侧边栏的显示和隐藏
      isCollapse: false,
      // 控制标签页的当前下标
      editableTabsValue: '0',
      // 标签页渲染数组
      editableTabs: [],
      tabIndex: 2,
      // 左侧导航菜单
      navMenu: [],
      // 控制是否弹出修改密码框
      dialogVisible: false
    }
  },
  created() {
    this.getNavMenu()
    this.getUserInfo()
  },
  methods: {
    // 隐藏侧边栏
    hiddenAside() {
      this.isCollapse = !this.isCollapse
      console.log(this.$refs.reduceLogo)
      let box = this.$refs.reduceLogo
      box.style.display === 'block' ? box.style.display = 'none' : box.style.display = 'block'
    },
    // 个人中心路由跳转
    personRouter() {
      this.$router.push('/personalCenter')
      this.addTab(this.editableTabsValue, '个人中心', '/personalCenter')
    },
    // 添加标签页
    addTab(targetName, title, url) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: title,
        name: newTabName,
        url: url
      })
      this.editableTabsValue = newTabName
      this.$router.push(url)
    },
    // 移除标签
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.$router.push(nextTab.url)
            } else {
              this.$router.push('/index')
              window.location.reload()
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    // 导航栏下拉关闭当前页面
    closeOnePage() {
      const lastPage = this.editableTabs[this.editableTabs.length - 1]
      this.removeTab(lastPage.name)
    },
    // 导航栏下拉关闭其他页面
    closeOtherPage() {
      const lastPage = this.editableTabs[this.editableTabs.length - 1]
      this.editableTabs = []
      this.editableTabs.push(lastPage)
    },
    // 导航栏下拉关闭所有页面
    closeAllPage() {
      this.editableTabs = []
      this.$router.push('/index')
      window.location.reload()
    },
    // 退出登录状态
    async logout() {
      const { data: res } = await logoutApi()
      if (res.code !== 0) return this.$message.error('退出登录失败!')
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('userInfo')
      this.$router.push('/login')
    },
    // 获取左侧导航菜单
    async getNavMenu() {
      const { data: res } = await getNavMenuApi()
      this.navMenu = res.data.menuList
    },
    // 发送验证码
    sendVerification(formName) {
      // 校验手机号格式是否正确
      this.$refs[formName].validateField('mobile', async mobileError => {
        if (!mobileError) {
          const { data: res } = await sendVerificationApi({ type: 1, mobile: this.ruleForm.mobile })
          if (res.code !== 0) return this.$message.error('发送验证码失败!')
          this.$message.success('验证码发送成功!')
          console.log(res)
          // 获取验证码按钮元素(实现验证码倒计时功能)
          var sendBtn = this.$refs.sendVeri.$el
          let num = 60
          var that = this
          let timer = setInterval(function () {
            num--
            that.controlBtn = true
            sendBtn.innerHTML = num + '秒后重新获取'
            sendBtn.style.color = '#ccc'
            if (num === 0) {
              that.controlBtn = false
              sendBtn.style.color = '#ffa600'
              sendBtn.innerHTML = '发送验证码'
              clearInterval(timer)
            }
          }, 1000)
        } else {
          this.$message.error('请填入正确的手机号')
          return false
        }
      })
    },
    // 获取用户的个人信息
    async getUserInfo() {
      const { data: res } = await getUserInfoApi()
      window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.user))
      this.ruleForm.mobile = res.data.user.mobile
    },
    // 修改密码功能
    async changePassword() {
      const { data: res } = await changePasswordApi(this.ruleForm)
      if (res.code !== 0) return this.$message.error('修改密码失败!')
      this.$message({
        type: 'success',
        message: '修改密码成功!'
      })
      this.dialogVisible = false
    },
    // 侧边栏激活触发事件
    asideChange(index, res, e) {
      this.addTab(this.editableTabsValue, e._vnode.elm.innerText, index)
    }
  }
}
</script>
<style scoped lang='less'>
.home_contaner {
    display: flex;
    height: 100%;
    min-width: 1900px;
}
// 侧边栏
.el-aside {
    position: relative;
    height: 100%;
    background-color: #24262F;
}
.el-aside .logo {
    height: 50px;
    width: 100%;
    background-color: #3483b0;
    text-align: center;
    line-height: 50px;
    font-family:SourceHanSansCN;
    color: #fff;
    font-size: 19px;
}
.el-aside .logo i {
    height:17px;
    font-size:23px;
    font-weight:400;
    color:rgba(255,131,131,1);
    line-height:35px;
}
.el-aside .reduceLogo {
    position: absolute;
    left: 0;
    top: 0;
    height: 50px;
    width: 64px;
    line-height: 50px;
    text-align: center;
    font-size: 23px;
    font-weight: 400;
    color:rgba(255,131,131,1);
    background-color: #3483b0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    border: 0;
    width: 220px;
    min-height: 400px;
}
.el-dropdown-menu__item {
  width: 96px;
}

// 内容区
.el-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: pink;
}
// 内容区头部
.el-header {
    position: relative;
    height: 50px !important;
    background-color: #3C8DBC;
    line-height: 50px;
    color: #fff;
}
.el-header a {
    margin: 0 24px;
    width: 19px;
    height: 16px;
    color: #fff;
    cursor: pointer;
}

.el-header span {
    margin: 0 20px;
    font-size: 14px;
}
.el-header .el-button {
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-color: #3C8DBC;
    border: 0px;
}
.el_header_right {
    position: absolute;
    display: inline-block;
    right: 0;
    height: 100%;
    width: 240px;
    font-size: 14px;
}
.el_header_right a {
    font-size: 18px;
    margin-left: 30px;
    margin-right: 0;
}
// 头部下拉列表
.el-header .el-dropdown {
    vertical-align: middle;
    cursor: pointer;
    color: #fff;
}
.el-header .el-dropdown-link {
    padding-bottom: 10px;
    display: inline-block;
}
.el-header .el-dropdown-link img {
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.el_form_item_shortMsg .el-button {
    position: absolute;
    padding: 12px 0;
    right: 40px;
    width: 30%;
    text-align: center;
}

.el-main .el-tabs span {
    display: inline-block;
    text-align: center;
    padding: 0 0 0 15px;
    height: 100%;
}
.el-main .el-tabs:nth-child(1) .el-tabs__item:nth-child(1)  span {
    padding: 0 20px;
}
.el-main {
    flex: 1;
    position: relative;
    background-color: #fff;
    padding: 0;
}
// 导航条下拉列表
.el-main .el-dropdown {
    position: absolute;
    top: 0;
    right: 0;
    border-left: 1px solid rgba(238,238,238,1);
}
.el-main .el-dropdown i {
    margin: 5px;
    font-size: 30px;
}
.el-footer {
    display: flex;
    height: 80px !important;
    width: 100%;
    background-color: #383a42;
}
.footer_left {
    height: 100%;
    width: 75%;
    line-height: 80px;
    color: #fff;
}
.footer_left a{
    color: #fff;
}
.footer_right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 25%;
}
.footer_right>a {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
}
.footer_right>a i {
    font-size: 30px;
    margin: 5px 10px;
    color: #959595;
}
.footer_right>a:nth-child(1) i {
    color: #86C610;
}
.footer_right>a p {
    white-space:nowrap;
    color: #fff;
}
/* 鼠标经过大导航背景颜色 */
.el-submenu__title:hover {
    background-color: rgba(44,46,56,1) !important;
}
.home_contaner .el-menu-item {
    border-left: 3px solid #24262F;
}
/* 鼠标经过小导航背景颜色 */
.home_contaner .el-menu-item:hover {
    background-color: rgba(44,46,56,1) !important;
    border-left: 3px solid #3c8dbc;
}
/* 选中状态背景颜色 */
.home_contaner .el-menu-item.is-active {
    background-color: #3c8dbc !important;
}
</style>
