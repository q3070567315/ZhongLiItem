//  合同管理
<template>
    <div class="contractManage_content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 锁定选择区 -->
        <el-row>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="allData">全部</el-menu-item>
            <el-menu-item index="2" @click="unAgreeData">待确定</el-menu-item>
            <el-menu-item index="3" @click="unPurchaseData">待采购商确认</el-menu-item>
            <el-menu-item index="4" @click="agreeData">已确认</el-menu-item>
          </el-menu>
        </el-row>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input placeholder="合同名称" clearable v-model="contractManageData.title">
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="contractManage()">查询</el-button>
          </el-col>
          <el-col :span="19">
            <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加</el-button>
          </el-col>
        </el-row>
        <!-- 物料定义表格区 -->
        <el-row>
          <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="title" label="合同信息" sortable width="369"></el-table-column>
            <el-table-column prop="" label="项目名称" sortable width="240"></el-table-column>
            <el-table-column prop="" label="合同详情" sortable width="300"></el-table-column>
            <el-table-column prop="finishTime" label="签订日期" sortable width="200"></el-table-column>
            <el-table-column prop="type" label="状态" width="260">
            </el-table-column>
            <el-table-column label="操作" width="150"></el-table-column>
          </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 选择按钮 -->
          <el-button class="examine_btn" @click="clearSelection()">清除选择</el-button>
          <el-button class="cancelExamine_btn">删除所选</el-button>
          <!-- 分页功能 -->
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="contractManageData.size"
            :total="total">
          </el-pagination>
        </el-row>
      </el-card>
            <!-- 添加商品弹出框 -->
      <template>
        <div>
          <el-dialog title="合同明细" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <h4>基本信息<a href="javascript:;">打印</a></h4>
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="contractForm" :rules="rules" ref="ruleForm">
                  <el-form-item prop="pic" class="formImg">
                    <p>标题: </p><el-input v-model="contractForm.title" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item prop="title" class="shopFullName">
                    <p>合同编号: </p><el-input v-model="contractForm.num" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>客户目录: </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- 导入富文本 -->
                  <h5>商品信息<a href="javascript:;">新增</a></h5>
                    <el-table :data="shopInfo" height="194" border style="width: 100%; border-size: 0;">
                      <el-table-column prop="date" label="日期" width="180"></el-table-column>
                      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                      <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                  <h5>合同条款<a href="javascript:;">新增</a></h5><quill-editor v-model="contractForm.content" :options="editorOption"></quill-editor>
                  <h5>联系方式</h5>
                  <div class="contact">
                    <p>甲方 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>乙方 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>地址 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>地址 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>电话 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>电话 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>开户行 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>开户行 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>代表签字 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>代表签字 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>日期 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                    <p>日期 </p><el-input v-model="contractForm.brand" clearable autocomplete="off"></el-input>
                  </div>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addNewGoods()">添加</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { contractManageApi } from '@/api'
export default {
  data() {
    return {
      // 当前激活状态栏
      activeIndex: '1',
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
      contractManageData: {
        type: 0,
        // 当前页
        page: 1,
        // 当前页条数
        size: 7,
        // 合同名称
        title: ''
      },
      // 控制开闭新增合同框
      dialogVisible: false,
      // 新增校验
      rules: {
      },
      shopInfo: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
      // 新增合同弹出框数据
      contractForm: {
        title: '',
        num: '',
        toId: 0,
        fromCompany: '',
        fromAddress: '',
        fromMobile: '',
        fromName: '',
        fromSignDate: '',
        fromBank: '',
        toCompany: '',
        toAdress: '',
        toMobile: '',
        toSignDate: '',
        toBank: '',
        productList: []
      }
    }
  },
  created() {
    this.contractManage()
  },
  methods: {
    // 获取物料展示数据
    async contractManage() {
      const { data: res } = await contractManageApi(this.contractManageData)
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
      this.contractManageData.page = val
      this.currentPage = val
      this.contractManage()
    },
    // 获取每行数据
    handleSelectionChange(val) {
      console.log(val)
    },
    // 删除选中状态的数据
    // 清空选中状态的数据
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    // 点击展示全部数据
    allData() {
      this.contractManageData.type = 0
      this.contractManage()
    },
    unAgreeData() {
      this.contractManageData.type = 1
      this.contractManage()
    },
    unPurchaseData() {
      this.contractManageData.type = 2
      this.contractManage()
    },
    agreeData() {
      this.contractManageData.type = 3
      this.contractManage()
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
  width: 710px;
  height: 300px;
}
// 联系方式下的样式
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
</style>
