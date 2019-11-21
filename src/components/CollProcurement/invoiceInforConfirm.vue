// 发票信息确认
<template>
    <div class="content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input placeholder="订单号" clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="采购员" clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
          <el-col :span="16">
            <el-button type="primary" class="add_btn">添加</el-button>
          </el-col>
        </el-row>
        <!-- 采购订单表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column type="selection" width="40" label="订单"></el-table-column>
              <el-table-column prop="name" label="订单号" width="138"></el-table-column>
              <el-table-column prop="date" label="订单日期" sortable width="220"></el-table-column>
              <el-table-column prop="" label="供应商名称" sortable width="140"></el-table-column>
              <el-table-column prop="" label="开票单位" sortable width="140"></el-table-column>
              <el-table-column prop="" label="物料编号" sortable width="150"></el-table-column>
              <el-table-column prop="" label="物料名称" sortable width="211"></el-table-column>
              <el-table-column prop="" label="开票数量" sortable width="110"></el-table-column>
              <el-table-column prop="" label="开票金额" width="60"></el-table-column>
              <el-table-column prop="" label="税率" width="130"></el-table-column>
              <el-table-column prop="" label="状态" width="130"></el-table-column>
              <el-table-column prop="" label="操作" width="90"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 审核按钮 -->
          <el-button class="examine_btn">开票确认</el-button>
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
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width:1600px;
  height:700px;
  background:rgba(255,255,255,1);
  border-radius:3px;
}
.el-card .el-button {
  width:70px;
 height:40px;
 border-radius: 3px;
 color: #fff;
}
.el-card .examine_btn {
  margin: 22px 10px 0 0;
  width:100px;
  height:34px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(220,220,220,1);
  border-radius:3px;
  color: #666;
  line-height: 0;
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
</style>
