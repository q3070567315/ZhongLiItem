// 允销申请
<template>
    <div class="contractManage_content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 锁定选择区 -->
        <el-row>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="2">待提交</el-menu-item>
            <el-menu-item index="3">待确认</el-menu-item>
            <el-menu-item index="4">已确认</el-menu-item>
            <el-menu-item index="5">被驳回</el-menu-item>
          </el-menu>
        </el-row>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input placeholder="采购商名称" clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
        <!-- 合同列表表格区 -->
        <el-row>
          <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="title" label="商品名称" sortable min-width="20%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="采购企业" sortable min-width="20%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="钢材" sortable min-width="20%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="finishTime" label="到期时间" sortable min-width="18%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="状态" sortable min-width="20%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" sortable min-width="20%" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 选择按钮 -->
          <el-button class="examine_btn" @click="clearSelection()">清除选择</el-button>
          <el-button class="cancelExamine_btn" @click="delContract()">删除所选</el-button>
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
    </div>
</template>
<script>
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
      }
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width: 100%;
  background: rgba(255,255,255,1);
  border-radius: 3px;
  @media screen and (min-width: 1600px){
    height: 700px;
  }
  @media screen and (min-width: 1440px) and (max-width: 1600px) {
    height: 600px;
  }
  @media screen and (max-width: 1440px) {
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
  display: block;
  width: 33px;
  height: 33px;
}
.el-menu-demo {
  margin: -20px 0 20px 0;
  font-weight: 400;
}
</style>
