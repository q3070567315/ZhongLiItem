// 物料分类
<template>
    <div class="matterCategory_content">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 内容搜索区 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加类</el-button>
          </el-col>
        </el-row>
        <!-- 物料分类表格区 -->
        <el-row>
            <el-table tooltip-effect="dark" ref="multipleTable" :data="matterData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" row-key="id" :tree-props="{children: 'childList', hasChildren: 'hasChildren'}" highlight-current-row>
              <el-table-column prop="name" label="分类名称" width="438"></el-table-column>
              <el-table-column prop="num" label="分类编码" sortable width="220"></el-table-column>
              <el-table-column prop="remark" label="说明" sortable width="721"></el-table-column>
              <el-table-column prop="" label="操作" width="180" class="operate">
                <template slot-scope="scope">
                  <!-- 修改分类 -->
                  <a class="el-icon-edit-outline" @click="editCategory(scope.row)"></a>
                  <!-- 新增子分类 -->
                  <a class="el-icon-circle-plus-outline" @click="addChildrenCategory(scope.row.id)"></a>
                  <!-- 删除分类 -->
                  <a class="el-icon-delete" @click="delCategory(scope.row.id)"></a>
                </template>
              </el-table-column>
            </el-table>
        </el-row>
      </el-card>
      <!-- 添加商品分类弹出框 -->
      <template>
        <div>
          <el-dialog title="添加分类" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <section>
              <!-- 新增分类表单 -->
              <el-form :model="branchForm" :rules="rules" ref="ruleForm">
                  <el-form-item prop="title" class="shopFullName">
                    <p>分类名称: </p><el-input v-model="branchForm.name" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>分类编码: </p><el-input v-model="branchForm.num" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>父级分类: </p><el-cascader @change="handlerValue" ref="refHandle" :options="matterData" :props="defaultData" clearable v-model="branchForm.parentId" placeholder="请选择父级分类(没有则不选)"></el-cascader>
                  </el-form-item>
                  <el-form-item>
                    <p>说明: </p><el-input v-model="branchForm.remark" clearable autocomplete="off" type="textarea"></el-input>
                  </el-form-item>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addNewCategory()">添加</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
      <!-- 修改商品分类弹出框 -->
      <template>
        <div>
          <el-dialog title="修改分类分类" :visible.sync="editDialog" :close-on-click-modal="false">
            <section>
              <!-- 修改分类表单 -->
              <el-form :model="branchInfoForm" :rules="rules" ref="ruleForm">
                  <el-form-item prop="title" class="shopFullName">
                    <p>分类名称: </p><el-input v-model="branchInfoForm.name" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>分类编码: </p><el-input v-model="branchInfoForm.num" clearable autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <p>父级分类</p><el-cascader :options="matterData" :props="defaultData" clearable v-model="branchInfoForm.parentId" placeholder="请选择父级分类(没有则不选)"></el-cascader>
                  </el-form-item>
                  <el-form-item>
                    <p>说明: </p><el-input v-model="branchInfoForm.remark" clearable autocomplete="off" type="textarea"></el-input>
                  </el-form-item>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false">取消</el-button>
              <el-button type="primary" @click="agreeEditCategory()">修改</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { matterCustomApi, addCategoryApi, delCategoryApi, editCategoryApi } from '@/api'
export default {
  data() {
    return {
      // 物料分类数据
      matterData: [],
      // 控制商品分类弹出框
      dialogVisible: false,
      // 控制修改分类弹出框
      editDialog: false,
      // 添加分支表单
      branchForm: {
        parentId: 0,
        name: '',
        num: '',
        remark: ''
      },
      // 修改分支表单
      branchInfoForm: {
        parentId: 0,
        name: '',
        num: '',
        remark: ''
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
      // 添加修改分类框校验
      rules: {
      }
    }
  },
  created() {
    this.getMatterList()
  },
  methods: {
    // 实现级联选择器选中文字关闭级联选择框
    handlerValue() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false
      }
    },
    // 获取物料分类数据
    async getMatterList() {
      const { data: res } = await matterCustomApi()
      this.matterData = this.getTreeData(res.data.typeList)
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
    // 添加新的商品分类
    async addNewCategory() {
      const { data: res } = await addCategoryApi(this.branchForm)
      if (res.code !== 0) return this.$message.error('添加分类失败')
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
      this.branchForm = {
        parentId: 0,
        name: '',
        num: ''
      }
      this.dialogVisible = false
      this.getMatterList()
    },
    // 删除分类弹框
    delCategory(id) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await delCategoryApi(id)
        if (res.code !== 0) return this.$message.error('删除分类失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.branchInfoForm = {
          parentId: 0,
          name: '',
          num: '',
          remark: ''
        }
        this.getMatterList()
      })
    },
    // 修改分类弹框数据渲染
    editCategory(res) {
      console.log(res)
      this.branchInfoForm = res
      this.editDialog = true
    },
    // 实现修改分类
    async agreeEditCategory() {
      const { data: res } = await editCategoryApi(this.branchInfoForm)
      if (res.code !== 0) return this.$message.error('修改分类失败')
      this.$message({
        type: 'success',
        message: '修改分类成功!'
      })
      this.editDialog = false
      this.getMatterList()
    },
    // 新增子分类
    addChildrenCategory(id) {
      this.branchForm.parentId = id
      this.dialogVisible = true
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
.operate a {
  cursor: pointer;
}
.el-table .cell a {
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}
</style>
