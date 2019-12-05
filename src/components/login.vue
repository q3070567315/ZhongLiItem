<template>
    <!-- 登陆页面 -->
    <div class="login_container">
        <!-- 登陆页面头部 -->
        <div class="login_header">
            <h1>
                <a href="javascript:;">
                    <span>众力</span>供应链管理系统
                </a>
            </h1>
            <p>欢迎您登陆</p>
        </div>
        <!-- 登陆页面中间部分(包括登陆框) -->
        <div class="login_body">
            <div class="login_box">
                <!-- 标签页切换 -->
                <div class="tabs">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="手机登陆" name="first">
                            <!-- 手机登陆表单 -->
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                                <el-form-item prop="username">
                                    <el-input v-model="ruleForm.username" placeholder="请输入手机号码" type="text" prefix-icon="el-icon-mobile-phone" clearable></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="ruleForm.password" placeholder="请输入登陆密码" type="password" prefix-icon="iconfont icon-iconmm" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                                </el-form-item>
                                <div class="form_layout">
                                    <el-checkbox v-model="ruleForm.choose">记住登陆状态</el-checkbox>
                                    <el-link @click="routerJump('/register')" type="primary" :underline="false">注册新用户</el-link>
                                    <el-link @click="routerJump('/resetPassword')" type="primary" :underline="false">忘记密码?</el-link>
                                </div>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="邮箱登陆" name="second">
                            <!-- 邮箱登陆表单 -->
                            <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                                <el-form-item prop="username">
                                    <el-input v-model="ruleForm.email" placeholder="请输入登陆邮箱"  prefix-icon="el-icon-search" clearable></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="ruleForm.password" placeholder="请输入登陆密码"  prefix-icon="el-icon-search" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="form_layout">
                                <el-checkbox v-model="ruleForm.choose">记住登陆状态</el-checkbox>
                                <el-link @click="routerJump('/register')" type="primary" :underline="false">注册新用户</el-link>
                                <el-link @click="routerJump('/resetPassword')" type="primary" :underline="false">忘记密码?</el-link>
                            </div> -->
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <!-- 特效波形图 -->
        <!-- <div class="bolang">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div> -->
        <!-- 登陆页面尾部 -->
        <div class="login_footer" :style="{'height': actionHeight+'px'}">
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
            <p>众力供应链 版权所有©️2019</p>
        </div>
    </div>
</template>
<script>
import { loginApi } from '@/api'
import Utils from '@/utils'
export default {
  data() {
    return {
      // 动态获取底部盒子高度
      actionHeight: 220,
      // 登陆框默认选中
      activeName: 'first',
      // 表单数据
      ruleForm: {
        username: '',
        password: '',
        // 记住登陆状态勾选状态
        choose: false
      },
      // 登陆框校验
      rules: {
        username: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号码' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.actionHeight = window.innerHeight - 800
    if (this.$cookies.isKey('username')) {
      this.ruleForm.username = this.$cookies.get('username')
    }
    if (this.$cookies.isKey('password')) {
      this.ruleForm.password = Utils.decrypt(this.$cookies.get('password'), 'hAw6eqnFLKxpsDv3')
    }
    if (this.$cookies.isKey('choose')) {
      this.ruleForm.choose = true
    }
  },
  methods: {
    // 跳转至登录页面
    routerJump(path) {
      this.$router.push(path)
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    // 登陆校验及调用登录接口
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { data: res } = await loginApi(this.ruleForm)
        if (res.code !== 0) return this.$message.error('您输入的账号或者密码不正确')
        if (this.ruleForm.choose === true) {
          // 设置cookies保存时间
          var date = new Date()
          date.setDate(date.getDate() + 15
          )
          // 对cookies中的密码进行crypt-js加密
          let psd = Utils.encrypt(this.ruleForm.password, 'hAw6eqnFLKxpsDv3')
          this.$cookies.set('username', this.ruleForm.username, date)
          this.$cookies.set('password', psd, date)
          this.$cookies.set('choose', this.ruleForm.choose, date)
        } else {
          this.$cookies.remove('username')
          this.$cookies.remove('password')
          this.$cookies.remove('choose')
        }
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style scoped lang='less'>
.login_container {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.login_header {
    position: relative;
    width: 100%;
    height: 100px;
}
.login_header h1 {
    position: absolute;
    width: 370px;
    height: 100px;
}
.login_header h1 a {
    margin: 0 60px;
    line-height: 100px;
    font-size: 26px;
    font-weight: 400;
    color: #000;
}
.login_header h1 a span {
    color: #e92020;
}
.login_header p {
    position: absolute;
    right: 105px;
    line-height: 100px;
    font-size: 20px;
    color: #848484;
    cursor: default;
}

.login_body {
    position: relative;
    height: 700px;
    background-color: #000;
}
.login_box {
    position: absolute;
    top: 50%;
    right: 18%;
    height: 510px;
    width: 430px;
    background-color: #fff;
    border-radius: 8px;
    transform: translate(0,-50%);
    z-index: 1;
}
.login_box .tabs {
    box-sizing: border-box;
    padding: 20px 40px;
    height: 360px;
    width: 430px;
    border-radius: 8px;
    background-color:#fff;
}
.el-form-item {
    height: 50px;
}
.el-checkbox {
    color: #747474;
}

.el-button {
    width: 100%;
    height: 100%;
}
.form_layout {
    display: flex;
}
.form_layout .el-checkbox {
    flex: 2;
}
.form_layout .el-link {
    flex: 1;
}

.login_footer span {
    position: absolute;
    top: 820px;
    left: 50%;
    width: 650px;
    height: 20px;
    font-size: 14px;
    transform: translate(-50%);
}
.login_footer p {
    position: absolute;
    top: 854px;
    left: 50%;
    height: 20px;
    font-size: 14px;
    transform: translate(-50%);
}

// 特效波形图
// .bolang {
//     position: absolute;
//     top: 661px;
//     width: 100%;
// }
// .waves {
//   position:relative;
//   width: 100%;
//   height:15vh;
//   margin-bottom:-7px;
//   min-height:100px;
//   max-height:150px;
// }
// /* Animation */

// .parallax > use {
//   animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
// }
// .parallax > use:nth-child(1) {
//   animation-delay: -2s;
//   animation-duration: 7s;
// }
// .parallax > use:nth-child(2) {
//   animation-delay: -3s;
//   animation-duration: 10s;
// }
// .parallax > use:nth-child(3) {
//   animation-delay: -4s;
//   animation-duration: 13s;
// }
// .parallax > use:nth-child(4) {
//   animation-delay: -5s;
//   animation-duration: 20s;
// }
// @keyframes move-forever {
//   0% {
//    transform: translate3d(-90px,0,0);
//   }
//   100% {
//     transform: translate3d(85px,0,0);
//   }
// }
// @media (max-width: 768px) {
//   .waves {
//     height:40px;
//     min-height:40px;
//   }
//   .content {
//     height:30vh;
//   }
// }
</style>
