<template>
    <div class="content">
      <article>
        <header>
          <div class="head_user">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="getImgAddress"
              :show-file-list="false"
              :limit="1"
              ref='uploadImg'>
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img v-else class="avatar-uploader-icon el-icon-plus" src="../../assets/img/defaultHead.jpg">
            </el-upload>
          </div>
          <div class="info">
            <div class="name"><span>{{ruleForm.username}}</span>采购专员</div>
            <p><span>用户名</span>: {{ruleForm.username}}<a href="javascript:;">密码修改</a></p>
            <p><span>上次登录时间</span>: {{ruleForm.createTime}}</p>
          </div>
        </header>
        <section>
          <div class="base_info"><p>基本信息</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="昵称:" prop="nickName">
                <el-input v-model="ruleForm.nickName"></el-input>
              </el-form-item>
              <el-form-item label="职位:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="绑定邮箱:" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="绑定手机:" prop="name">
                <span>{{ruleForm.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}<a href="javascript:;">修改</a></span>
              </el-form-item>
              <el-form-item label="QQ:" prop="qq">
                <el-input v-model="ruleForm.qq"></el-input>
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
import { getUserInfoApi, uploadHeadImgApi } from '@/api'
export default {
  data() {
    return {
      ruleForm: {
        mobile: '',
        email: '',
        nickName: '',
        qq: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // 图片地址
      imageUrl: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户的个人信息
    async getUserInfo() {
      const { data: res } = await getUserInfoApi()
      this.ruleForm = res.data.user
      console.log(this.ruleForm)
    },
    // 获取图片地址
    async getImgAddress(file, fileList) {
      console.log(file)
      console.log(fileList)
      // let picData = new FormData()
      // picData.append('file', this.$refs.uploadImg.submit)
      const { data: res } = await uploadHeadImgApi(file.raw)
      console.log(res)
    },
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
.head_user {
  margin: 50px 60px 0 54px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
// 用户头像
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}
.avatar-uploader-icon {
  border-radius: 50%;
  width: 119px;
  height: 119px;
}
.avatar-uploader-icon:hover {
  border: 1px solid #3C8DBC;
  font-size: 28px;
  color: #8c939d;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.info {
  width: 316px;
  height: 170px;
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
