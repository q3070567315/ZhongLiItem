<template>
    <div class="register_container">
        <!-- 注册页面头部 -->
        <div class="register_header">
            <h2>
                <span>众力</span>供应链管理系统<i>新用户注册</i>
            </h2>
            <p>已有账号,<a @click="routerJump">请登陆></a></p>
        </div>
        <!-- 注册页面表单 -->
        <div class="register_box">
            <div class="register_box_center">
                <el-steps :active="controlActive" align-center>
                    <el-step title="用户注册"></el-step>
                    <el-step title="注册成功"></el-step>
                </el-steps>
                <!-- 注册表单 -->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <!-- 为了解决浏览器保存代码在注册页面自动填充(添加了两个隐藏的输入框) -->
                    <div class="hidden-input"><input type="text" class="form-control"></div>
                    <div class="hidden-input"><input type="password" class="form-control"></div>
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名称"  prefix-icon="iconfont icon-yonghuming" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" type="text" prefix-icon="iconfont icon-shouji" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="code" class="el_form_item_shortMsg">
                        <el-input v-model="ruleForm.code" name="shortMsg" placeholder="请输入短信验证码" prefix-icon="iconfont icon-duanxinyanzhengma" clearable></el-input>
                        <el-button @click="sendVerification('ruleForm')" ref="sendVeri" :disabled="controlBtn">发送验证码</el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" placeholder="设置六至二十位登录密码" type="password" prefix-icon="iconfont icon-iconmm" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPassword">
                        <el-input v-model="ruleForm.checkPassword" placeholder="请再次输入登陆密码" type="password" prefix-icon="iconfont icon-iconmm" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="choose" class="el_form_agree">
                      <el-checkbox v-model="ruleForm.choose" @click="agreeUserRule('ruleForm')"></el-checkbox>
                       <!--  -->
                      <span>勾选同意<el-button type="text" @click="dialogVisible = true">《用户服务协议》</el-button></span>
                    </el-form-item>
                    <el-form-item class="el-form-reg">
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    </el-form-item>
                    <p><a @click="routerJump">已有账号,立即登录</a></p>
                </el-form>
                <!-- 注册成功 -->
                <div class="register_box_success" ref="registerSuccess" style="display: none;">
                    <div class="congratulate"><i class="iconfont icon-gou1"></i></div>
                    <p>恭喜您注册成功</p>
                    <span>请妥善保管您的账号信息</span>
                    <el-button type="primary" plain @click="routerJump()">重新登录</el-button>
                </div>
            </div>
        </div>
        <!-- 用户服务协议 -->
        <template id="user">
          <div>
            <el-dialog
              title="用户隐私和服务条款"
              :visible.sync="dialogVisible">
              <h2>一、总则</h2>
              <p>1.1   用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中勾选"我已阅读并接受"模块即表示用户与产品名称达成协议，完全接受本协议项下的全部条款。</p>
              <p>1.2   用户注册成功后，产品名称将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
              <p>1.3   用户可以使用产品名称各个频道单项服务，当用户使用产品名称各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及产品名称在该单项服务中发出的各类公告的同意。</p>
              <h2>二、注册信息和隐私保护</h2>
              <p>2.1   产品名称帐号（即产品名称用户ID）的所有权归产品名称，用户完成注册申请后，获得产品名称帐号的使用权。所有原始键入的资料将引用为注册资料。如果因注册信息不真实而引起的问题，并对问题发生所带来的后果，产品名称不负任何责任。</p>
              <p>2.2   用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知产品名称。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，产品名称不承担任何责任。</p>
              <p>2.3   产品名称不对外公开或向第三方提供单个用户的注册资料，除非：<br>
                  • 事先获得用户的明确授权；<br>
                  • 只有透露您的个人资料，才能提供您所要求的产品和服务；<br>
                  • 根据有关的法律法规要求；<br>
                  • 按照相关政府主管部门的要求；<br>
                  • 为维护产品名称的合法权益。</p>
              <h2>三、使用规则</h2>
              <p>3.1   用户在使用产品名称服务时，必须遵守中华人民共和国相关法律法规的规定，用户应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶<br>
                  • 上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：<br>
                  • 不得为任何非法目的而使用网络服务系统<br>
                  不利用产品名称服务从事以下活动：<br>
                  • 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；<br>
                  • 未经允许，对计算机信息网络功能进行删除、修改或者增加的；<br>
                  • 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；<br>
                  • 故意制作、传播计算机病毒等破坏性程序的；<br>
                  • 其他危害计算机信息网络安全的行为。</p>
              <p>3.2   用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿数据堂与合作公司、关联公司，并使之免受损害。对此，产品名称有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、终止服务、限制使用、回收产品名称帐号、追究法律责任等措施。对恶意注册产品名称帐号或利用产品名称帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，产品名称有权回收其帐号。同时，产品名称会视司法部门的要求，协助调查。</p>
              <p>3.3   用户不得对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。</p>
              <p>3.4   用户须对自己在使用产品名称服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在产品名称首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予产品名称等额的赔偿。</p>
              <h2>四、服务内容</h2>
              <p>4.1   产品名称网络服务的具体内容由产品名称根据实际情况提供。</p>
              <p>4.2   除非您与产品名称另有约定，您同意本服务仅为您个人非商业性质的使用。</p>
              <p>4.3   产品名称的部分服务是以收费方式提供的，如您使用收费服务，请遵守相关的协议。</p>
              <p>4.4   产品名称可能根据实际需要对收费服务的收费标准、方式进行修改和变更，产品名称也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，产品名称将在相应服务页面进行通知或公告。如果您不同意上述修改、变更或付费内容，则应停止使用该服务。</p>
              <p>4.5   产品名称网络需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务（包括收费网络服务）在合理时间内的中断，产品名称网络无需为此承担任何责任。产品名称网络保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利。</p>
              <p>4.6   本服务或第三人可提供与其它国际互联网上之网站或资源之链接。由于产品名称网络无法控制这些网站及资源，您了解并同意，此类网站或资源是否可供利用，产品名称网络不予负责，存在或源于此类网站或资源之任何内容、广告、产品或其它资料，产品名称网络亦不予保证或负责。因使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、商品或服务所产生的任何损害或损失，产品名称网络不承担任何责任。</p>
              <p>4.7   产品名称网络对在服务网上得到的任何商品购物服务、交易进程、招聘信息，都不作担保。</p>
              <p>4.8   产品名称网络有权于任何时间暂时或永久修改或终止本服务（或其任何部分），而无论其通知与否，产品名称对用户和任何第三人均无需承担任何责任。</p>
              <p>4.9   终止服务<br>
                  您同意产品名称得基于其自行之考虑，因任何理由，包含但不限于产品名称认为您已经违反本服务协议的文字及精神，终止您的密码、帐号或本服务之使用（或服务之任何部分），并将您在本服务内任何内容加以移除并删除。您同意依本服务协议任何规定提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，产品名称可立即关闭或删除您的帐号及您帐号中所有相关信息及文件，或禁止继续使用前述文件或本服务。此外，您同意若本服务之使用被中断或终止或您的帐号及相关信息和文件被关闭或删除，产品名称对您或任何第三人均不承担任何责任。</p>
              <h2>五、知识产权和其他合法权益（包括但不限于名誉权、商誉权）</h2>
              <p>5.1   产品名称在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归产品名称所有，用户在使用本服务中所产生的内容的知识产权归用户或相关权利人所有。</p>
              <p>5.2   除另有特别声明外，产品名称提供本服务时所依托软件的著作权、专利权及其他知识产权均归产品名称所有。</p>
              <p>5.3   产品名称在本服务中所使用的“产品名称”等商业标识，其著作权或商标权归产品名称所有。</p>
              <p>5.4   上述及其他任何本服务包含的内容的知识产权均受到法律保护，未经产品名称、用户或相关权利人书面许可，任何人不得以任何形式进行使用或创造相关衍生作品。</p>
              <h2>六、未成年人使用条款</h2>
              <p>6.1   若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本服务。</p>
              <p>6.2 未成年人用户涉世未深，容易被网络虚象迷惑，且好奇心强，遇事缺乏随机应变的处理能力，很容易被别有用心的人利用而又缺乏自我保护能力。因此，未成年人用户在使用本服务时应注意以下事项，提高安全意识，加强自我保护：<br>
                  （1）认清网络世界与现实世界的区别，避免沉迷于网络，影响日常的学习生活；<br>
                  （2）填写个人资料时，加强个人保护意识，以免不良分子对个人生活造成骚扰；<br>
                  （3）在监护人或老师的指导下，学习正确使用网络；<br>
                  （4）避免陌生网友随意会面或参与联谊活动，以免不法分子有机可乘，危及自身安全。</p>
              <h2>七、其他</h2>
              <p>7.1   本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
              <p>7.2   如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向产品名称所在地的人民法院提起诉讼。</p>
              <p>7.3   产品名称未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。</p>
              <p>7.4   如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
                  请您在发现任何违反本服务协议以及其他任何单项服务的服务条款、产品名称各类公告之情形时，通知产品名称。</p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="disagree">不同意</el-button>
                <el-button type="primary" @click="agree">同 意</el-button>
              </span>
            </el-dialog>
          </div>
        </template>
    </div>
</template>
<script>
import { sendVerificationApi, userRegisterApi } from '@/api'
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
    let validatePass3 = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('未同意《用户服务协议》'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      ruleForm: {
        username: '',
        password: '',
        mobile: '',
        code: '',
        choose: false
      },
      // 登陆框校验
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '用户名过长', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号码' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{4}$/, message: '验证码格式不正确' }
        ],
        password: [
          { required: false, trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码长度应为6~16个字符且包含字母和数字' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        choose: [
          { validator: validatePass3, trigger: 'change' }
        ]
      },
      // 控制验证码按钮的禁用状态
      controlBtn: false,
      // 控制步骤条
      controlActive: 1,
      // 控制是否弹出用户服务协议
      dialogVisible: false
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
    // 登陆校验及调用登录接口
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        const { data: res } = await userRegisterApi(this.ruleForm)
        // 控制注册程序是否生效
        if (res.code !== 0) return this.$message.error(res.msg)
        this.controlActive = 2
        // 表单内容
        let formEl = this.$refs.ruleForm.$el
        // 注册成功内容
        let registerSuccessEl = this.$refs.registerSuccess
        formEl.style.display = 'none'
        registerSuccessEl.style.display = 'block'
      })
    },
    // 不同意协议
    disagree() {
      this.ruleForm.choose = false
      this.dialogVisible = false
    },
    // 同意协议
    agree() {
      this.ruleForm.choose = true
      this.dialogVisible = false
    },
    // 同意用户规则
    agreeUserRule(formName) {
      console.log(123)
      this.$refs[formName].validateField('choose', chooseError => {
        if (!chooseError) return false
      })
    }
  }
}
</script>
<style scoped lang='less'>
.register_container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    overflow: auto;
}
.register_header {
    position: relative;
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-shadow: 0px 6px 10px #dfdfdf;
}
.register_header h2 {
    position: absolute;
    left: 18.7%;
    width: 370px;
    height: 100%;
    line-height: 100px;
    font-size: 20px;
    font-weight: 400;
    color: #000;
}
.register_header h2 span {
    font-size: 26px;
    color: #e92020;
}
.register_header h2 i {
  margin-left: 30px;
}
.register_header p {
    position: absolute;
    right: 18.7%;
    line-height: 100px;
    color: #787878;
}
.register_header p a {
    cursor: pointer;
    color: #0079fe;
}

.register_box {
  position: absolute;
  top: 120px;
  left: 50%;
  width: 1000px;
  height: 800px;
  border-radius: 4px;
  background-color: #fff;
  transform: translate(-50%,0)
}
.register_box_center {
  margin-left: 30%;
  width: 40%;
  height: 100%;
}
.el-steps {
    padding: 20% 0 0;
}
.el-form-item {
    height: 50px;
    margin: 18px 0;
    font-size: 13px;
}
/* 注册界面勾选按钮 */
.el-form .el_form_agree {
    margin: -18px 5px;
}
.el-form .el_form_agree span {
    margin-left: 5px;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
}
.el-form .el_form_agree span .el-button {
  position: absolute;
  margin: 0 5px;
  width: 112px;
}
.el-form-item .el-button {
    width: 100%;
    height: 100%;
}
.el_form_item_shortMsg .el-button {
    position: absolute;
    padding: 12px 0;
    right: 0;
    width: 30%;
    text-align: center;
}
.el-form p {
    text-align: center;
    margin-top: -10px;
    text-align: center;
}
.el-form p a {
    color: #54a5ff;
    cursor: pointer;
}

.register_box_success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 200px;
    left: 50%;
    width: 212px;
    height: 340px;
    transform: translate(-50%)
}
.register_box_success .congratulate {
  position: relative;
    margin: 30px 56px;
    width: 100PX;
    height: 100px;
    background-color: #67C23A;
    border-radius: 50%
}
.register_box_success .congratulate i {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 67px;
  color: #fff;
  transform: translate(-50%, -50%)
}
.register_box_success p {
    font-size: 30px;
    font-size: #666;
}
.register_box_success span {
    display: block;
    margin: 16px 0;
    text-align: center;
    color: #bfbfbf;
}
.register_box_success .el-button {
    margin: 0 40px;
}
/*让input看不见，而不是直接display: none，如果直接display: none，则不生效*/
.hidden-input{
  position: relative;
  width: 0;
  height: 0;
  overflow: hidden;
}
.hidden-input .form-control{
  position: absolute;
  left: -1000px;
}
// 用户服务协议内容
.el-dialog h2{
  height: 18px;
  margin-bottom: 10px;
  color: #000;
  font-weight: 400;
}
.el-dialog p {
  margin: 15px 5px;
  line-height: 25px;
  font-weight: 400;
  color: #737373;
}
</style>
