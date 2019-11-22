<template>
    <div class="resetPassword_container">
        <!-- 注册页面头部 -->
        <div class="resetPassword_header">
            <h2>
                <span>众力</span>供应链管理系统<i>忘记密码</i>
            </h2>
            <p><a @click="routerJump">去登陆></a></p>
        </div>
        <!-- 找回密码页面表单 -->
        <div class="resetPassword_box">
            <div class="resetPassword_box_center">
                <el-steps :active="controlActive" align-center>
                    <el-step title="验证身份"></el-step>
                    <el-step title="设置新密码"></el-step>
                    <el-step title="验证成功"></el-step>
                </el-steps>
                <!-- 1.验证身份表单 -->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" type="text" prefix-icon="iconfont icon-shouji" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="code" class="el_form_item_shortMsg">
                        <el-input v-model="ruleForm.code" name="shortMsg" placeholder="请输入短信验证码" prefix-icon="iconfont icon-duanxinyanzhengma" clearable></el-input>
                        <el-button @click="sendVerification('ruleForm')" ref="sendVeri" :disabled="controlBtn">发送验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                    </el-form-item>
                </el-form>
                <!-- 2.设置新密码 -->
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" style="display:none;">
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm2.password" placeholder="设置六至二十位登录密码" type="password" prefix-icon="iconfont icon-iconmm" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPassword">
                        <el-input v-model="ruleForm2.checkPassword" placeholder="请再次输入登陆密码" type="password" prefix-icon="iconfont icon-iconmm" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm2('ruleForm2')">下一步</el-button>
                    </el-form-item>
                </el-form>
                <!-- 3.修改密码成功 -->
                <div class="resetPassword_box_success" style="display: none;" ref="resetSuccess">
                    <div class="congratulate"><i class="iconfont icon-gou1"></i></div>
                    <p>重置密码成功</p>
                    <span>请妥善保管您的账号信息</span>
                    <el-button type="primary" plain  @click="routerJump">重新登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { sendVerificationApi, checkShortMsgApi, changePasswordApi } from '@/api'
export default {
  data() {
    // 部分校验(密码校验)
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      ruleForm: {
        mobile: '',
        code: ''
      },
      ruleForm2: {
        mobile: '',
        code: '',
        password: ''
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
      // 控制步骤条
      controlActive: 1
    }
  },
  methods: {
    // 跳转至登录页面
    routerJump() {
      this.$router.push('/login')
    },
    // 发送验证码
    sendVerification(formName) {
      // 校验手机号格式是否正确
      this.$refs[formName].validateField('mobile', async mobileError => {
        if (!mobileError) {
          const { data: res } = await sendVerificationApi({ type: 2, mobile: this.ruleForm.mobile })
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
    // 前往第二部分(设置新密码)
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { data: res } = await checkShortMsgApi(this.ruleForm)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.ruleForm2.mobile = this.ruleForm.mobile
        this.ruleForm2.code = this.ruleForm.code
        this.controlActive = 2
        let firstFormEl = this.$refs.ruleForm.$el
        let seconedFormEl = this.$refs.ruleForm2.$el
        firstFormEl.style.display = 'none'
        seconedFormEl.style.display = 'block'
      })
    },
    // 前往第三部分(密码修改成功)
    submitForm2(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { data: res } = await changePasswordApi(this.ruleForm2)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.controlActive = 3
        let seconedFormEl = this.$refs.ruleForm2.$el
        let thirdEl = this.$refs.resetSuccess
        console.log(thirdEl)
        seconedFormEl.style.display = 'none'
        thirdEl.style.display = 'block'
      })
    }
  }
}
</script>
<style scoped lang='less'>
.resetPassword_container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    overflow: auto;
}
.resetPassword_header {
    position: relative;
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-shadow: 0px 6px 10px #dfdfdf;
}
.resetPassword_header h2 {
    position: absolute;
    left: 18.7%;
    width: 370px;
    height: 100%;
    line-height: 100px;
    font-size: 20px;
    font-weight: 400;
    color: #000;
}
.resetPassword_header h2 span {
    font-size: 26px;
    color: #e92020;
}
.resetPassword_header h2 i {
  margin-left: 30px;
}
.resetPassword_header p {
    position: absolute;
    right: 18.7%;
    line-height: 100px;
    color: #787878;
}
.resetPassword_header p a {
    color: #0079fe;
    cursor: pointer;
}

.resetPassword_box {
  position: absolute;
  top: 180px;
  left: 50%;
  width: 1000px;
  height: 500px;
  border-radius: 4px;
  background-color: #fff;
  transform: translate(-50%,0)
}
.resetPassword_box_center {
  margin-left: 30%;
  width: 40%;
  height: 100%;
}
.el-steps {
    padding: 20% 0 10% 0;
}
.el-form-item {
    height: 50px;
    margin: 18px 0;
    font-size: 13px;
}
.el-form-item .el-button {
    width: 100%;
    height: 100%;
}
.el_form_item_shortMsg .el-button {
    padding: 12px 0;
    text-align: center;
    position: absolute;
    right: 0;
    width: 30%;
}
.el-form p {
    text-align: center;
    margin-top: -10px;
    text-align: center;
}
.el-form p a {
    color: #54a5ff;
}

.resetPassword_box_success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 150px;
    left: 50%;
    width: 212px;
    height: 340px;
    transform: translate(-50%)
}
.resetPassword_box_success .congratulate {
  position: relative;
    margin: 30px 56px;
    width: 100PX;
    height: 100px;
    background-color: #67C23A;
    border-radius: 50%
}
.resetPassword_box_success .congratulate i {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 67px;
  color: #fff;
  transform: translate(-50%, -50%)
}
.resetPassword_box_success p {
    text-align: center;
    font-size: 30px;
    font-size: #666666;
}
.resetPassword_box_success span {
    display: block;
    margin: 16px 0;
    text-align: center;
    color: #bfbfbf;
}
.resetPassword_box_success .el-button {
    margin: 0 57px;
}
</style>
