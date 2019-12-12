// 专家维护
<template>
  <div class="contractManage_content">
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 内容搜索区 -->
      <el-row :gutter="20">
        <el-col :span="4">
            <el-input placeholder="专家名称" clearable v-model="expertMaintainData.search">
            </el-input>
        </el-col>
        <el-col :span="18">
            <el-button type="primary"  @click="getExpertList()">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <!-- 合同列表表格区 -->
      <el-row>
        <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="name" label="姓名" sortable min-width="20%" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sex" label="性别" sortable min-width="20%" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companyAddress" label="地址" sortable min-width="20%" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="产品" sortable min-width="20%" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="20%" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" min-width="20%" show-overflow-tooltip>
            <template slot-scope="scope">
              <div><a style="color: #409EFF; font-size: 14px" @click="getExpertInfo(scope.row.id)">编辑</a><a style="color: #409EFF; font-size: 14px" @click="delExpert([scope.row.id])">删除</a></div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="layout_row">
        <!-- 选择按钮 -->
        <el-button class="examine_btn" @click="clearSelection()">清除选择</el-button>
        <el-button class="cancelExamine_btn" @click="delExpertSelection()">删除所选</el-button>
        <!-- 分页功能 -->
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :page-size="expertMaintainData.size"
          :total="total">
        </el-pagination>
      </el-row>
    </el-card>
      <!-- 添加专家详情弹出框 -->
      <template>
        <div>
          <el-dialog title="专家详情" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <h4>基本信息<a href="javascript:;">打印</a></h4>
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="expertForm" :rules="rules" ref="ruleForm">
                  <div class="contact">
                    <p>专家姓名 </p><el-input v-model="expertForm.name" clearable autocomplete="off"></el-input>
                    <p>性别 </p>
                    <el-select v-model="expertForm.sex" placeholder="请选择性别">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                    <p>所在行业 </p><el-input v-model="expertForm.hangye" clearable autocomplete="off"></el-input>
                    <p>手机号码 </p><el-input v-model="expertForm.phone" clearable autocomplete="off"></el-input>
                    <p>产品名称 </p><el-input v-model="expertForm.chanping" clearable autocomplete="off"></el-input>
                    <p>邮编 </p><el-input v-model="expertForm.code" clearable autocomplete="off"></el-input>
                    <p>职位 </p><el-input v-model="expertForm.job" clearable autocomplete="off"></el-input>
                    <p>QQ </p><el-input v-model="expertForm.qq" clearable autocomplete="off"></el-input>
                    <p>邮箱 </p><el-input v-model="expertForm.email" clearable autocomplete="off"></el-input>
                  </div>
                  <h5>公司详情</h5>
                  <el-form-item prop="companyLogo" class="formImg">
                    <p>公司LOGO: </p>
                    <el-upload
                        class="avatar-uploader"
                        action="http://apisrm.soolcool.com/sys/common/upload-pic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="expertForm.companyLogo" :src="expertForm.companyLogo" class="avatar">
                        <span v-if="expertForm.companyLogo" class="el-upload-action" @click.stop="handleRemove()">
                            <i class="el-icon-delete"></i>
                        </span>
                        <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                    </el-upload>
                  </el-form-item>
                  <div class="contact">
                    <p>详细地址 </p><el-input v-model="expertForm.companyAddress" clearable autocomplete="off"></el-input>
                    <p>传真 </p><el-input v-model="expertForm.companyFax" clearable autocomplete="off"></el-input>
                    <p>电话 </p><el-input v-model="expertForm.companyTel" clearable autocomplete="off"></el-input>
                    <p>网址 </p><el-input v-model="expertForm.companyUrl" clearable autocomplete="off"></el-input>
                  </div>
                  <el-form-item>
                    <p>公司介绍 </p><el-input v-model="expertForm.companyContent" type="textarea"></el-input>
                  </el-form-item>
                  <h5>评估记录<a>新增</a></h5>
                    <el-table :data="recordInfo" height="194" border style="width: 100%">
                      <el-table-column prop="productId" label="商品id" width="100"></el-table-column>
                      <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
                      <el-table-column prop="rate" label="税率" width="80"></el-table-column>
                      <el-table-column prop="price" label="价格" width="100"></el-table-column>
                      <el-table-column prop="date" label="价格有效期" width="130"></el-table-column>
                      <el-table-column prop="number" label="库存量" width="100"></el-table-column>
                      <el-table-column prop="num" label="物料编码"></el-table-column>
                    </el-table>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addExpert()">添加</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
      <!-- 修改专家详情弹出框 -->
      <template>
        <div>
          <el-dialog title="专家详情" :visible.sync="editDialog" :close-on-click-modal="false">
            <h4>基本信息<a href="javascript:;">打印</a></h4>
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="editExpertForm" :rules="rules" ref="ruleForm">
                  <div class="contact">
                    <p>专家姓名 </p><el-input v-model="editExpertForm.name" clearable autocomplete="off"></el-input>
                    <p>性别 </p>
                    <el-select v-model="editExpertForm.sex">
                      <el-option label="男" :value="1"></el-option>
                      <el-option label="女" :value="2"></el-option>
                    </el-select>
                    <p>所在行业 </p><el-input v-model="editExpertForm.hangye" clearable autocomplete="off"></el-input>
                    <p>手机号码 </p><el-input v-model="editExpertForm.phone" clearable autocomplete="off"></el-input>
                    <p>产品名称 </p><el-input v-model="editExpertForm.chanping" clearable autocomplete="off"></el-input>
                    <p>邮编 </p><el-input v-model="editExpertForm.code" clearable autocomplete="off"></el-input>
                    <p>职位 </p><el-input v-model="editExpertForm.job" clearable autocomplete="off"></el-input>
                    <p>QQ </p><el-input v-model="editExpertForm.qq" clearable autocomplete="off"></el-input>
                    <p>邮箱 </p><el-input v-model="editExpertForm.email" clearable autocomplete="off"></el-input>
                  </div>
                  <h5>公司详情</h5>
                  <el-form-item prop="companyLogo" class="formImg">
                    <p>公司LOGO: </p>
                    <el-upload
                        class="avatar-uploader"
                        action="http://apisrm.soolcool.com/sys/common/upload-pic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :on-remove="handleRemove2"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="editExpertForm.companyLogo" :src="editExpertForm.companyLogo" class="avatar">
                        <span v-if="editExpertForm.companyLogo" class="el-upload-action" @click.stop="handleRemove2()">
                            <i class="el-icon-delete"></i>
                        </span>
                        <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                    </el-upload>
                  </el-form-item>
                  <div class="contact">
                    <p>详细地址 </p><el-input v-model="editExpertForm.companyAddress" clearable autocomplete="off"></el-input>
                    <p>传真 </p><el-input v-model="editExpertForm.companyFax" clearable autocomplete="off"></el-input>
                    <p>电话 </p><el-input v-model="editExpertForm.companyTel" clearable autocomplete="off"></el-input>
                    <p>网址 </p><el-input v-model="editExpertForm.companyUrl" clearable autocomplete="off"></el-input>
                  </div>
                  <el-form-item>
                    <p>公司介绍 </p><el-input v-model="editExpertForm.companyContent" type="textarea"></el-input>
                  </el-form-item>
                  <h5>评估记录<a>新增</a></h5>
                    <el-table :data="recordInfo" height="194" border style="width: 100%">
                      <el-table-column prop="productId" label="商品id" width="100"></el-table-column>
                      <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
                      <el-table-column prop="rate" label="税率" width="80"></el-table-column>
                      <el-table-column prop="price" label="价格" width="100"></el-table-column>
                      <el-table-column prop="date" label="价格有效期" width="130"></el-table-column>
                      <el-table-column prop="number" label="库存量" width="100"></el-table-column>
                      <el-table-column prop="num" label="物料编码"></el-table-column>
                    </el-table>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false">取消</el-button>
              <el-button type="primary" @click="editExpert()">修改</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
  </div>
</template>
<script>
import { getExpertListApi, addExpertApi, delExpertApi, getExpertInfoApi, editExpertApi } from '@/api'
export default {
  data() {
    return {
      // 获取表格数据
      tableData: [],
      // 默认显示页码
      currentPage: 1,
      // 默认每页显示条数
      pageSize: 7,
      // 总页数
      totalNum: 0,
      // 总条数
      total: 0,
      // 展示参数
      expertMaintainData: {
        // 当前页
        page: 1,
        // 当前页条数
        size: 7,
        // 专家名称
        search: ''
      },
      // 添加修改框校验
      rules: {
      },
      // 新增专家详情框
      dialogVisible: false,
      // 修改专家详情框
      editDialog: false,
      // 新增专家详情弹出框数据
      expertForm: {
        name: '',
        phone: '',
        email: '',
        job: '',
        qq: '',
        code: '',
        sex: '',
        companyLogo: '',
        companyAddress: '',
        companyUrl: '',
        companyTel: '',
        companyFax: '',
        companyContent: ''
      },
      // 修改专家详情弹出框数据
      editExpertForm: {
        name: '',
        phone: '',
        email: '',
        job: '',
        qq: '',
        code: '',
        sex: '',
        companyLogo: '',
        companyAddress: '',
        companyUrl: '',
        companyTel: '',
        companyFax: '',
        companyContent: ''
      },
      // 商品信息数据
      recordInfo: []
    }
  },
  created() {
    this.getExpertList()
  },
  methods: {
    // 获取专家列表展示数据
    async getExpertList() {
      const { data: res } = await getExpertListApi(this.expertMaintainData)
      console.log(res)
      // 获取表单数据
      this.tableData = res.data.page.list
      // 获取当前页面
      this.currentPage = res.data.page.currPage
      // 获取页面总页数
      this.totalNum = res.data.page.totalPage
      // 获取总条数
      this.total = res.data.page.totalCount
    },
    // 当前页数据动态改变
    handleCurrentChange(val) {
      this.expertMaintainData.page = val
      this.currentPage = val
      this.getExpertList()
    },
    // 清空选中状态的数据
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    // 移除图片
    handleRemove() {
      this.expertForm.companyLogo = ''
    },
    // 移除图片(修改状态时)
    handleRemove2() {
      this.editExpertForm.companyLogo = ''
    },
    // 图片上传成功回调
    handleAvatarSuccess(res, file) {
      this.expertForm.companyLogo = file.response.data.url
    },
    // 图片上传成功回调(修改状态时)
    handleAvatarSuccess2(res, file) {
      this.editExpertForm.companyLogo = file.response.data.url
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return type && isLt2M
    },
    // 新增专家
    async addExpert() {
      const { data: res } = await addExpertApi(this.expertForm)
      if (res.code !== 0) return this.$message.error('新增专家详情失败')
      this.$message({
        type: 'success',
        message: '新增专家详情成功!'
      })
      this.getExpertList()
      this.dialogVisible = false
      // 新增专家详情弹出框数据
      this.expertForm = {
        name: '',
        phone: '',
        email: '',
        job: '',
        qq: '',
        code: '',
        sex: '',
        companyLogo: '',
        companyAddress: '',
        companyUrl: '',
        companyTel: '',
        companyFax: '',
        companyContent: ''
      }
    },
    // 删除选中状态的数据
    delExpertSelection() {
      if (this.$refs.multipleTable.selection.length === 0) return this.$message.error('请勾选需要删除的专家详情!')
      this.$confirm('确定删除所选专家详情吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let idArr = []
        this.$refs.multipleTable.selection.forEach(res => {
          idArr.push(res.id)
        })
        const { data: res } = await delExpertApi(idArr)
        if (res.code !== 0) return this.$message.error('删除失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getExpertList()
      })
    },
    // 删除商品弹框
    delExpert(id) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await delExpertApi(id)
        if (res.code !== 0) return this.$message.error('删除失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getExpertList()
      })
    },
    // 获取专家详情
    async getExpertInfo(id) {
      const { data: res } = await getExpertInfoApi(id)
      this.editExpertForm = res.data.expert
      this.editDialog = true
    },
    // 修改专家详情
    async editExpert() {
      const { data: res } = await editExpertApi(this.editExpertForm)
      if (res.code !== 0) return this.$message.error('修改失败,请重试!')
      this.$message({
        message: '修改成功!',
        type: 'success'
      })
      this.editDialog = false
      this.getExpertList()
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width: 100%;
  height: 700px;
  background: rgba(255,255,255,1);
  border-radius: 3px;
}
.el-card .el-button {
  width:70px;
  height: 40px;
  border-radius: 3px;
  color: #fff;
}
.el-card .add_btn {
  float: right;
}
.el-card .examine_btn {
  margin: 22px 10px 0 0;
  padding: 12px 0;
  width: 80px;
  height: 34px;
  background: rgba(255,255,255,1);
  border-radius: 3px;
  color: #666;
  line-height: 0
}
.el-card .cancelExamine_btn {
  padding:12px 0;
  width:80px;
  height:34px;
  background:rgba(255,255,255,1);
  border-radius:3px;
  color: #666;
  line-height: 0;
}
.layout_row {
  position: relative;
}
.el-pagination {
  position: absolute;
  top: 30px;
  right: 0;
}
.el-table .cell div {
  display: flex;
}
.el-table .cell p {
  margin: 8px 19px;
  width: 8px;
  height: 8px;
  background-color: #B7B7B7;
  border-radius: 50%;
}
.el-table .cell a {
  margin-left: 10px;
  font-size: 18px;
  cursor: pointer;
}
.el-table .cell img {
  display: block;
  width: 33px;
  height: 33px;
}
// 新增框
.el-dialog h4 {
  margin-bottom: 10px;
  width: 100%;
  height: 30px;
  color: #000;
  font-family:Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
}
.el-dialog h5 {
  margin: 30px 0 5px -20px;
  padding-top: 30px;
  width: 100%;
  height: 30px;
  color: #000;
  font-family:Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  border-top: 1px solid #eee;
}
.el-dialog h4 a {
  float: right;
  color: #409EFF;
  margin-right: 15px;
}
.el-dialog h5 a {
  float: right;
  color: #409EFF;
  margin-right: -12px;
}
.el-dialog section {
  padding: 10px 20px;
  width: 690px;
  height: 300px;
}
// 基本信息下的样式
.contact {
  display: flex;
  flex-wrap: wrap;
  width: 830px;
}
.contact p {
  margin: 0 10px 0 50px;
  height: 34px;
  width: 60px;
  line-height: 34px;
  text-align: right;
}
.el-form .el-form-item {
  margin-left: 43px;
}
.formImg p {
  line-height: 100px;
}
// 添加框添加图片样式
.avatar-uploader{
  width: 100PX;
  height: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
.avatar-uploader-icon{
  box-sizing: border-box;
  font-size: 28px;
  color: #b7b7b7;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar-uploader-icon:hover{
  border: 1px dashed #b7b7b7;
  color: #fff;
  background-color: rgba(0, 0, 0, .3);
}
.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  display: block;
}
.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: #fff;
  text-align: center;
  line-height: 100px;

}
.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, .3)
}
</style>
