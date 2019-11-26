// 物料分类
<template>
    <div class="matter_content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input placeholder="分类名称" clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
          <el-col :span="19">
            <el-button type="primary" class="add_btn">添加类</el-button>
          </el-col>
        </el-row>
        <!-- 物料分类表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="matterData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column prop="name" label="分类名称" width="438"></el-table-column>
              <el-table-column prop="id" label="分类编码" sortable width="220"></el-table-column>
              <el-table-column prop="" label="说明" sortable width="721"></el-table-column>
              <el-table-column prop="" label="操作" width="180" class="operate">
                <a class="el-icon-delete-solid"></a>
                <a class="el-icon-delete-solid"></a>
                <a class="el-icon-delete-solid"></a>
              </el-table-column>
            </el-table>
        </el-row>
        <el-row class="layout_row">
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
import { matterDataApi } from '@/api'
export default {
  data() {
    return {
      // 物料分类数据
      matterData: []
    }
  },
  created() {
    this.getMatterList()
  },
  methods: {
    async getMatterList() {
      const { data: res } = await matterDataApi()
      this.matterData = res.data.cateList
      console.log(this.matterData)
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
  width:80px;
  height:34px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(220,220,220,1);
  border-radius:3px;
  color: #666;
  line-height: 0;
}
.el-card .add_btn {
  float: right;
  width: 100px;
}
.el-card .cancelExamine_btn {
  padding: 12px 0;
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
.operate a {
  cursor: pointer;
}
</style>
