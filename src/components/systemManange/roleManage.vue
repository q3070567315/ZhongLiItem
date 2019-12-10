<template>
    <div class="contractManage_content">
      <!-- 卡片视图区 -->
      <el-card>
        <el-row class="layout_row">
          <!-- 操作按钮 -->
          <el-col :span="3">
            <el-input placeholder="角色名称" clearable v-model="roleManageData.search">
            </el-input>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="getRoleList()">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" class="edit_btn" @click="editContractData()">修改</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加</el-button>
          </el-col>
        </el-row>
        <!-- 角色列表表格区 -->
        <el-row>
          <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%">
            <el-table-column prop="roleId" label="角色id" sortable width="169"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" sortable width="320"></el-table-column>
            <el-table-column prop="remark" label="备注" sortable width="511"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable width="360"></el-table-column>
            <el-table-column label="操作" width="200">
              <template>
                <!-- 修改分类 -->
                <a class="el-icon-edit-outline"></a>
                <!-- 删除分类 -->
                <a class="el-icon-delete"></a>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 分页功能 -->
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="roleManageData.size"
            :total="total">
          </el-pagination>
        </el-row>
      </el-card>
    </div>
</template>
<script>
import { getRoleListApi } from '@/api'
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
      roleManageData: {
        // 当前页
        page: 1,
        // 当前页条数
        size: 7,
        // 合同名称
        search: ''
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { data: res } = await getRoleListApi(this.roleManageData)
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
      this.roleManageData.page = val
      this.currentPage = val
      this.getRoleList()
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
  margin-left: 20px;
  width:70px;
  height: 40px;
  border-radius: 3px;
  color: #fff;
}
.el-card .edit_btn {
  float: right;
  margin-right: 20px;
}
.el-card .add_btn {
  float: right;
}
.layout_row {
  position: relative;
}
.el-pagination {
  position: absolute;
  top: 30px;
  right: 0;
}
.el-table .cell a {
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}
</style>
