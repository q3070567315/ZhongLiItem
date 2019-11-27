//  物料定义
<template>
    <div class="content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 锁定选择区 -->
        <el-row>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="2">未锁定</el-menu-item>
            <el-menu-item index="3">已锁定</el-menu-item>
          </el-menu>
        </el-row>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input placeholder="选择分类" clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="商品名称" clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
          <el-col :span="16">
            <el-button type="primary" class="add_btn">添加</el-button>
          </el-col>
        </el-row>
        <!-- 物料定义表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="pic" label="商品图片" width="138">
                <img :src="tableData.pic">
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
            :total="400">
          </el-pagination>
        </el-row>
      </el-card>
    </div>
</template>
<script>
import { matterDefineApi } from '@/api'
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      // 当前激活状态栏
      activeIndex: '1',
      // 展示参数
      matterDefineData: {
        typeId: 0,
        page: 1,
        size: 10,
        name: null
      }
    }
  },
  created() {
    this.matterDefine()
  },
  methods: {
    // 获取物料展示数据
    async matterDefine() {
      const { data: res } = await matterDefineApi(this.matterDefineData)
      this.tableData = res.data.page.list
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
.el-menu-demo {
  margin: -20px 0 20px 0;
  font-weight: 400;
}
</style>
