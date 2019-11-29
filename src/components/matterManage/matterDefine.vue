//  物料定义
<template>
    <div class="mattterDefine_content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 锁定选择区 -->
        <el-row>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="allData">全部</el-menu-item>
            <el-menu-item index="2" @click="unLockData">未锁定</el-menu-item>
            <el-menu-item index="3" @click="lockData">已锁定</el-menu-item>
          </el-menu>
        </el-row>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="3">
            <el-cascader :options="matterListData" :props="defaultData" clearable  placeholder="选择分类" v-model="matterDefineData.typeId" @change="handleChange"></el-cascader>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="商品名称" clearable v-model="matterDefineData.name">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="matterDefine()">查询</el-button>
          </el-col>
          <el-col :span="16">
            <el-button type="primary" class="add_btn" @click="addNewGoods()">添加</el-button>
          </el-col>
        </el-row>
        <!-- 物料定义表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="商品图片" width="138">
                <img v-if="tableData.pic !== ''" src="../../assets/img/defaultHead.jpg">
                <!-- <img v-else :src="tableData.pic"> -->
              </el-table-column>
              <el-table-column prop="name" label="商品名称" sortable width="220"></el-table-column>
              <el-table-column prop="num" label="商品编码" sortable width="140"></el-table-column>
              <el-table-column prop="typeName" label="所属分类" sortable width="200"></el-table-column>
              <el-table-column prop="createTime" label="到期时间" sortable width="200"></el-table-column>
              <el-table-column prop="unit" label="计量单位" sortable width="211"></el-table-column>
              <el-table-column label="状态" width="260">
                <template slot-scope="scope">
                  <div v-if="scope.row.status === 1"><p></p>未锁定</div>
                  <div v-else-if="scope.row.status === 2"><p style="background-color: #409EFF;"></p>锁定</div>
                  <div v-else><p  style="background-color: #F56C6C;"></p>已停用</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <!-- 未启用 -->
                  <a v-if="scope.row.status === 1" class="el-icon-edit"></a>
                  <a v-if="scope.row.status === 1" class="el-icon-lock"></a>
                  <a v-if="scope.row.status === 1" class="el-icon-delete"></a>
                  <!-- 启用 -->
                  <a v-if="scope.row.status === 2" class="el-icon-unlock"></a>
                  <!-- 停用 -->
                  <a v-if="scope.row.status === 3">启用</a>
                </template>
              </el-table-column>
            </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 选择按钮 -->
          <el-button class="examine_btn">选择全部</el-button>
          <el-button class="cancelExamine_btn">反向选择</el-button>
          <el-button class="cancelExamine_btn">清除选择</el-button>
          <el-button class="cancelExamine_btn">删除所选</el-button>
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
          <el-dialog title="添加商品" :visible.sync="dialogVisible">
            <h4>商品基本信息</h4>
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                  <el-form-item prop="pic">
                    <p>商品图片: </p>
                    <el-upload
                        class="avatar-uploader"
                        action="http://apisrm.soolcool.com/sys/common/upload-pic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <span v-if="imageUrl" class="el-upload-action" @click.stop="handleRemove()">
                            <i class="el-icon-delete"></i>
                        </span>
                        <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item prop="title">
                    <p>商品全称: </p><el-input v-model="ruleForm.password" placeholder="设置六至二十位登录密码" type="password" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>商品简称</p>
                    <p>商品编码</p>
                  </el-form-item>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">修改</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { matterDefineApi, matterCategoryApi } from '@/api'
export default {
  data() {
    return {
      // 获取分页数据
      matterListData: [],
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
        children: null,
        expandTrigger: 'hover',
        // 控制级联选择器只选则单个值
        emitPath: false
      },
      // 选中状态的行
      multipleSelection: [],
      // 控制开闭添加商品框
      dialogVisible: false,
      // 表单数据
      ruleForm: {
      },
      // 登陆框校验
      rules: {
      },
      imageUrl: '',
      files: []
    }
  },
  created() {
    this.getMatterList()
    this.matterDefine()
  },
  methods: {
    // 获取分页数据
    async getMatterList() {
      const { data: res } = await matterCategoryApi()
      this.matterListData = res.data.cateList
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
      console.log(res.data.page)
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
    },
    // 点击展示全部数据(包含锁定和未锁定的)
    allData() {
      this.matterDefineData.status = 0
      this.matterDefine()
    },
    // 点击展示未锁定数据
    unLockData() {
      this.matterDefineData.status = 1
      this.matterDefine()
    },
    // 点击展示锁定数据
    lockData() {
      this.matterDefineData.status = 2
      this.matterDefine()
    },
    // 获取选中状态的每行数据
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 添加新的商品
    addNewGoods() {
      this.dialogVisible = true
    },
    // 移除图片
    handleRemove() {
      this.files = []
      this.imageUrl = ''
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.url
      this.files.push(file)
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
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width:1600px;
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
.el-card .examine_btn {
  margin: 22px 10px 0 0;
  padding: 12px 0;
  width: 80px;
  height: 34px;
  background: rgba(255,255,255,1);
  border: 1px solid rgba(220,220,220,1);
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
  margin: 8px 19px;
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
.el-dialog section {
  padding: 10px 20px;
  width: 710px;
  height: 300px;
  background-color: yellowgreen;
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
