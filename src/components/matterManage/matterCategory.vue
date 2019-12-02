// 物料分类
<template>
    <div class="matterCategory_content">
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
            <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加类</el-button>
          </el-col>
        </el-row>
        <!-- 物料分类表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="matterData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column prop="name" label="分类名称" width="438"></el-table-column>
              <el-table-column prop="num" label="分类编码" sortable width="220"></el-table-column>
              <el-table-column prop="" label="说明" sortable width="721"></el-table-column>
              <el-table-column prop="" label="操作" width="180" class="operate">
                <a class="el-icon-edit-outline"></a>
                <a class="el-icon-circle-plus-outline"></a>
                <a class="el-icon-delete"></a>
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
      <!-- 添加商品分类弹出框 -->
      <template>
        <div>
          <el-dialog title="添加分类" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <section>
              <!-- 商品信息表单 -->
              <el-form :model="branchForm" :rules="rules" ref="ruleForm">
                  <el-form-item prop="title" class="shopFullName">
                    <p>分类名称: </p><el-input v-model="branchForm.name" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>分类编码: </p><el-input v-model="branchForm.code" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>父级分类</p><el-cascader :options="matterData" :props="defaultData" clearable v-model="branchForm.parentId" placehoder="请选择父级分类(没有则不填)"></el-cascader>
                  </el-form-item>
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
import { matterCustomApi } from '@/api'
export default {
  data() {
    return {
      // 物料分类数据
      matterData: [],
      // 控制商品分类弹出框
      dialogVisible: false,
      // 添加分支表单
      branchForm: {
        parentId: 0
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
      // 添加修改分类框校验
      rules: {
      }
    }
  },
  created() {
    this.getMatterList()
  },
  methods: {
    // 获取物料分类数据
    async getMatterList() {
      const { data: res } = await matterCustomApi()
      this.matterData = res.data.typeList
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
.el-table .cell a {
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}
</style>
