<template>
    <div class="content">
      <article>
        <header>
          <div class="head_img">
            <img src="../../assets/img/defaultHead.jpg" alt="">
          </div>
          <div class="info">
            <div class="name"><span>王铁柱</span>采购专员</div>
            <p><span>用户名</span>:13567151666<a href="javascript:;">密码修改</a></p>
            <p><span>上次登录时间</span>:1999年12月21日</p>
          </div>
        </header>
        <section>
          <div class="base_info"><p>基本信息</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="昵称:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="职位:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="绑定邮箱:" prop="name">
                <span>snoopies@qq.com<a href="javascript:;">修改</a></span>
              </el-form-item>
              <el-form-item label="绑定手机:" prop="name">
                <span>130*****5810<a href="javascript:;">修改</a></span>
              </el-form-item>
              <el-form-item label="QQ:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="微信:" prop="name">
                <a href="javascript:;">绑定</a>
              </el-form-item>
            </el-form>
          </div>
        </section>
        <section>
          <div class="base_info"><p>公司信息</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="公司地址:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="电话:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="传真:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="公司介绍:" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>
      </article>
    </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped lang='less'>
article {
  width:1667px;
  height:100%;
  background:rgba(255,255,255,1);
  border-radius:3px;

}
header {
  display: flex;
  width: 550px;
  height: 170px;
  overflow: hidden;
}
.head_img {
  margin: 50px 60px 0 54px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: pink;
}
.head_img img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.info {
  width: 316px;
  height: 170px;
  // background-color: skyblue;
}
.name {
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:300;
  color:rgba(113,113,113,1);
  line-height:40px;
}
.name span {
  display: inline-block;
  margin: 46px 17px 0 44px;
  font-size:30px;
  font-weight:400;
  color:rgba(0,0,0,1);
  line-height:40px;
}
.info p {
  margin-top: 15px;
}
.info p span {
  display: inline-block;
  height: 14px;
  width: 100px;
  text-align: right;
}
.info p a {
  margin-left: 15px;
  color: #409EFF;
}
.base_info {
  margin: 40px 0 20px 54px;
  width: 850px;
  height: 360px;
  font-size:14px;
  color: #000;
  font-weight: 700;
  // background-color: yellowgreen;
}
// 基本表单样式
.el-form-item span a {
  margin-left: 15px;
  color: #409EFF;
}
.el-form-item a {
  color: #409EFF;
}
.el-form-item .el-button {
  width: 100px;
}
</style>
