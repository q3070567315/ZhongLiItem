//  物料定义
<template>
    <div class="matterDefine_content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 锁定选择区 -->
        <el-row>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="switchData(0)">全部</el-menu-item>
            <el-menu-item index="2" @click="switchData(1)">未锁定</el-menu-item>
            <el-menu-item index="3" @click="switchData(2)">已锁定</el-menu-item>
          </el-menu>
        </el-row>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="4">
            <el-cascader ref="refHandles" :options="matterCustomData" :props="defaultData" clearable  placeholder="选择分类" v-model="matterDefineData.typeId" @change="handleChange"></el-cascader>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="商品名称" clearable v-model="matterDefineData.name">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="matterDefine()">查询</el-button>
          </el-col>
          <el-col :span="14">
            <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加</el-button>
          </el-col>
        </el-row>
        <!-- 物料定义表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%" show-overflow-tooltip :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column type="selection" width="36" show-overflow-tooltip></el-table-column>
              <el-table-column label="商品图片" min-width="8%" align="center">
                <template slot-scope="scope">
                  <img v-if="scope.row.pic !== ''" :src="scope.row.pic">
                  <img v-else src="../../assets/img/defaultHead.jpg">
                </template>
              </el-table-column>
              <el-table-column prop="id" label="商品id" sortable min-width="10%" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="name" label="商品名称" min-width="10%" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="num" label="商品编码" sortable min-width="11%"  show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="typeName" label="所属分类" min-width="10%" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="createTime" label="到期时间" sortable min-width="12%" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="unit" label="单位" min-width="6%" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column label="状态" min-width="10%" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.status === 1"><p></p>未锁定</div>
                  <div v-else-if="scope.row.status === 2"><p style="background-color: #409EFF;"></p>锁定</div>
                  <div v-else><p  style="background-color: #F56C6C;"></p>已停用</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="14%">
                <template slot-scope="scope">
                  <!-- 1.未启用状态 -->
                  <!-- 修改 -->
                  <a v-if="scope.row.status === 1" class="el-icon-edit" @click="getShopInfo(scope.row.id)"></a>
                  <!-- 锁定 -->
                  <a v-if="scope.row.status === 1" class="el-icon-lock" @click="changeState(scope.row.status,scope.row.id)"></a>
                  <!-- 删除 -->
                  <a v-if="scope.row.status === 1" class="el-icon-delete" @click="delCategory([scope.row.id])"></a>
                  <!-- 2.启用状态 -->
                  <!-- 锁定 -->
                  <a v-if="scope.row.status === 2" class="el-icon-unlock" @click="changeState(scope.row.status,scope.row.id)"></a>
                  <!-- 3.停用状态 -->
                  <a v-if="scope.row.status === 3">启用</a>
                </template>
              </el-table-column>
            </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 选择按钮 -->
          <el-button class="examine_btn" @click="clearSelection()">清除选择</el-button>
          <el-button class="cancelExamine_btn" @click="delSelection()">删除所选</el-button>
          <!-- 分页功能 -->
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="matterDefineData.size"
            :total="total">
          </el-pagination>
        </el-row>
      </el-card>
      <!-- 添加商品弹出框 -->
      <template>
        <div>
          <el-dialog title="添加商品" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <h4>商品基本信息</h4>
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="shopForm" :rules="rules" ref="ruleForm">
                  <el-form-item prop="pic" class="formImg">
                    <p>商品图片: </p>
                    <el-upload
                        class="avatar-uploader"
                        action="http://apisrm.soolcool.com/sys/common/upload-pic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="shopForm.pic" :src="shopForm.pic" class="avatar">
                        <span v-if="shopForm.pic" class="el-upload-action" @click.stop="handleRemove()">
                            <i class="el-icon-delete"></i>
                        </span>
                        <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item prop="title" class="shopFullName">
                    <p>商品全称: </p><el-input v-model="shopForm.title" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <div class="layoutBox">
                    <el-form-item>
                      <p>商品简称</p><el-input v-model="shopForm.name" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <p>商品编码</p><el-input v-model="shopForm.num" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <p>商品类目</p><el-cascader :options="matterListData" :props="defaultData" clearable v-model="shopForm.cateId" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item>
                      <p>物料分类</p><el-cascader ref="refHandle" :options="matterCustomData" :props="defaultData" clearable v-model="shopForm.typeId" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item>
                      <p>到期时间</p>
                      <template>
                        <div class="block">
                          <el-date-picker
                            v-model="shopForm.data"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                      </template>
                    </el-form-item>
                    <el-form-item>
                      <p>商品品牌</p><el-input v-model="shopForm.brand" clearable autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <!-- 导入富文本 -->
                  <h5>商品详情</h5><quill-editor v-model="shopForm.content" :options="editorOption"></quill-editor>
                  <h5>包装清单</h5><el-input v-model="shopForm.packages" type="textarea"></el-input>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addNewGoods()">添加</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
      <!-- 修改商品弹出框 -->
      <template>
        <div>
          <el-dialog title="修改商品" :visible.sync="dialogChange" :close-on-click-modal="false">
            <h4>商品基本信息</h4>
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="shopInfoData" :rules="rules" ref="ruleForm">
                  <el-form-item prop="pic" class="formImg">
                    <p>商品图片: </p>
                    <el-upload
                        class="avatar-uploader"
                        action="http://apisrm.soolcool.com/sys/common/upload-pic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :on-remove="handleRemove2"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="shopInfoData.pic" :src="shopInfoData.pic" class="avatar">
                        <span v-if="shopInfoData.pic" class="el-upload-action" @click.stop="handleRemove2()">
                            <i class="el-icon-delete"></i>
                        </span>
                        <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item prop="title" class="shopFullName">
                    <p>商品全称: </p><el-input v-model="shopInfoData.title" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <div class="layoutBox">
                    <el-form-item>
                      <p>商品简称</p><el-input v-model="shopInfoData.name" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <p>商品编码</p><el-input v-model="shopInfoData.num" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <p>商品类目</p><el-cascader :options="matterListData" :props="defaultData" clearable v-model="shopInfoData.cateId" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item>
                      <p>物料分类</p><el-cascader ref="refHand" :options="matterCustomData" :props="defaultData" clearable v-model="shopInfoData.typeId" @change="handleChange"></el-cascader>
                    </el-form-item>
                    <el-form-item>
                      <p>到期时间</p>
                      <template>
                        <div class="block">
                          <el-date-picker
                            v-model="shopInfoData.data"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                      </template>
                    </el-form-item>
                    <el-form-item>
                      <p>商品品牌</p><el-input v-model="shopInfoData.brand" clearable autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <!-- 导入富文本 -->
                  <h5>商品详情</h5><quill-editor v-model="shopInfoData.content" :options="editorOption"></quill-editor>
                  <h5>包装清单</h5><el-input v-model="shopInfoData.packages" type="textarea"></el-input>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogChange = false">取消</el-button>
              <el-button type="primary" @click="changeShopContent()">修改</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { matterDefineApi, matterCategoryApi, matterCustomApi, addNewGoodsApi, changeStateApi, deleteShopApi, getMatterInfoApi, changeMatterApi } from '@/api'
export default {
  name: 'App',
  data() {
    return {
      // 获取分页数据
      matterListData: [],
      // 获取自定义分类数据
      matterCustomData: [],
      // 获取表格数据
      tableData: [],
      // 当前激活状态栏
      activeIndex: '1',
      // 默认显示页码
      currentPage: 1,
      // 默认每页显示条数
      pageSize: 7,
      // 总页数
      totalNum: 0,
      // 总条数
      total: 0,
      // 展示参数
      matterDefineData: {
        typeId: 0,
        // 当前页
        page: 1,
        // 当前页条数
        size: 7,
        name: '',
        status: 0
      },
      // 级联选择器分类
      defaultData: {
        value: 'id',
        label: 'name',
        children: 'childList',
        expandTrigger: 'hover',
        // 控制级联选择器只选则单个值
        emitPath: false,
        // 不关联父子节点
        checkStrictly: true
      },
      // 控制开闭添加商品框
      dialogVisible: false,
      // 控制开闭修改商品框
      dialogChange: false,
      // 添加物料弹出框表单数据
      shopForm: {
        title: '',
        name: '',
        num: '',
        cateId: '',
        typeId: '',
        pic: '',
        packages: '',
        brand: '',
        content: '',
        data: ''
      },
      // 添加修改框校验
      rules: {
      },
      // 富文本表头内容
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            [{ 'size': ['small', false, 'large', 'huge'] }]
          ]
        }
      },
      // 商品详情数据
      shopInfoData: [],
      // 获取当前浏览器的宽度
      screenWidth: ''
    }
  },
  created() {
    this.getMatterList()
    this.getMatterCustom()
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    if (this.screenWidth >= 1600) {
      this.matterDefineData.size = 8
    } else if (this.screenWidth >= 1440) {
      this.matterDefineData.size = 6
    } else {
      this.matterDefineData.size = 4
    }
    this.matterDefine()
  },
  methods: {
    // 获取分页数据
    async getMatterList() {
      const { data: res } = await matterCategoryApi()
      this.matterListData = res.data.cateList
    },
    // 获取自定义物料分类数据
    async getMatterCustom() {
      const { data: res } = await matterCustomApi()
      this.matterCustomData = this.getTreeData(res.data.typeList)
    },
    // 递归遍历移除空的children(为了让级联选择器不显示空的子菜单)
    getTreeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].childList.length < 1) {
          data[i].childList = undefined
        } else {
          this.getTreeData(data[i].childList)
        }
      }
      return data
    },
    // 获取物料展示数据
    async matterDefine() {
      const { data: res } = await matterDefineApi(this.matterDefineData)
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
      this.matterDefineData.page = val
      this.currentPage = val
      this.matterDefine()
    },
    // 级联选择器改变触发
    handleChange(e) {
      if (e === null) {
        this.matterDefineData.typeId = 0
      }
      // 实现级联选择器选中文字关闭级联选择框
      if (this.$refs.refHandles) { this.$refs.refHandles.dropDownVisible = false }
      if (this.$refs.refHandle) { this.$refs.refHandle.dropDownVisible = false }
      if (this.$refs.refHand) { this.$refs.refHand.dropDownVisible = false }
    },
    // 点击展示切换数据(包含锁定和未锁定的)
    switchData(status) {
      this.matterDefineData.status = status
      this.matterDefine()
    },
    // 删除选中状态的数据
    delSelection() {
      let idArr = []
      this.$refs.multipleTable.selection.forEach(res => {
        idArr.push(res.id)
        this.delCategory(idArr)
      })
    },
    // 清空选中状态的数据
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    // 移除图片
    handleRemove() {
      this.shopForm.pic = ''
    },
    // 移除图片(修改状态)
    handleRemove2() {
      this.shopInfoData.pic = ''
    },
    // 图片上传成功回调
    handleAvatarSuccess(res, file) {
      this.shopForm.pic = file.response.data.url
    },
    // 图片上传成功回调(修改状态)
    handleAvatarSuccess2(res, file) {
      this.shopInfoData.pic = file.response.data.url
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
    // 添加新的商品
    async addNewGoods() {
      const { data: res } = await addNewGoodsApi(this.shopForm)
      if (res.code !== 0) return this.$$message.error('添加商品失败,请重试!')
      this.$message({
        message: '添加商品成功!',
        type: 'success'
      })
      this.shopForm = {
        title: '',
        name: '',
        num: '',
        cateId: '',
        typeId: '',
        pic: '',
        packages: '',
        brand: '',
        content: '',
        data: ''
      }
      this.matterDefine()
      this.dialogVisible = false
    },
    // 修改锁定状态
    async changeState(status, id) {
      status === 1 ? status = 2 : status = 1
      const { data: res } = await changeStateApi({ status: status, id: id })
      if (res.code !== 0) return this.$message.error('锁定商品失败')
      this.matterDefine()
    },
    // 获取商品详情
    async getShopInfo(id) {
      const { data: res } = await getMatterInfoApi(id)
      if (res.code !== 0) return this.$message.error('获取商品详情失败!')
      this.dialogChange = true
      this.shopInfoData = res.data.product
    },
    // 修改商品内容
    async changeShopContent() {
      const { data: res } = await changeMatterApi(this.shopInfoData)
      if (res.code !== 0) return this.$message.error('修改商品内容失败!')
      this.$message({
        message: '修改商品成功!',
        type: 'success'
      })
      this.matterDefine()
      this.shopInfoData = []
      this.dialogChange = false
    },
    // 删除商品
    async delShop(id) {
      const { data: res } = await deleteShopApi(id)
      if (res.code !== 0) return this.$message.error('删除商品失败')
      this.$message({
        type: 'success',
        message: '删除商品成功!'
      })
      this.branchInfoForm = {
        parentId: 0,
        name: '',
        num: '',
        remark: ''
      }
      this.matterDefine()
    },
    // 删除商品弹框
    delCategory(id) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delShop(id)
      })
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width: 100%;
  background: rgba(255,255,255,1);
  border-radius: 3px;
  overflow: auto;
  @media screen and (min-width: 1600px){
    height: 700px;
  }
  @media screen and (min-width: 1440px) {
    height: 100%;
  }
}
.el-card .el-button {
  width:70px;
  height: 40px;
  border-radius: 3px;
  color: #fff;
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
.el-card .add_btn {
  float: right;
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
  margin: 8px 10px;
  width: 8px;
  height: 8px;
  background-color: #B7B7B7;
  border-radius: 50%;
}
.el-table .cell a {
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}
.el-table .cell img {
  margin: 0 auto;
  display: block;
  width: 33px;
  height: 33px;
}
.el-menu-demo {
  margin: -20px 0 20px 0;
  font-weight: 400;
}
// 添加框
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
  margin: 10px 0 5px -20px;
  width: 100%;
  height: 30px;
  color: #000;
  font-family:Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
}
.el-dialog section {
  padding: 10px 20px;
  width: 710px;
  height: 300px;
}
.formImg p {
  line-height: 100px;
}
.el-form .el-form-item {
  margin-bottom: 15px;
}
.el-form .el-input {
  width: 250px !important;
}
.el-form .shopFullName .el-input {
  width: 605px !important;
}
.el-form .layoutBox {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #E5E5E5;
}
.el-form .layoutBox .el-form-item {
  width: 50%;
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
