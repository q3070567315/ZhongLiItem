<template>
    <div class="roleManage_content">
      <!-- 卡片视图区 -->
      <el-card>
        <el-row>
          <!-- 操作按钮 -->
          <el-col :span="3">
            <el-input placeholder="角色名称" clearable v-model="roleManageData.search">
            </el-input>
          </el-col>
          <el-col :span="20">
            <el-button type="primary" @click="getRoleList()">查询</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="add_btn" @click="dialogVisible = true">添加</el-button>
          </el-col>
        </el-row>
        <!-- 角色列表表格区 -->
        <el-row>
          <el-table tooltip-effect="dark" ref="multipleTable" :data="tableData" border style="width: 100%">
            <el-table-column prop="roleId" label="角色id" sortable min-width="10%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roleName" label="角色名称" sortable min-width="25%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" sortable min-width="35%" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable min-width="20%" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" min-width="10%" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- 修改角色 -->
                <a class="el-icon-edit-outline" @click="getRoleInfo(scope.row.roleId)"></a>
                <!-- 删除角色 -->
                <a class="el-icon-delete" @click="delRole([scope.row.roleId])"></a>
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
      <!-- 添加角色展开框 -->
      <template>
        <div>
          <el-dialog title="新增角色并为其分配权限" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :model="addRoleForm" :rules="rules" ref="ruleForm">
              <p>角色名称: </p><el-input v-model="addRoleForm.roleName" placeholder="请输入角色名称" type="text" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
              <el-tree :data="allMenuData" show-checkbox node-key="menuId" :props="treeProps" ref="treeRef"></el-tree>
              <p>备注 </p><el-input v-model="addRoleForm.remark" type="textarea"></el-input>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRole()">新 增</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
      <!-- 修改角色展开框 -->
      <template>
        <div>
          <el-dialog title="修改角色信息" :visible.sync="editDialog" :close-on-click-modal="false">
            <el-form :model="editRoleForm" :rules="rules" ref="ruleForm">
              <p>角色名称: </p><el-input v-model="editRoleForm.roleName" placeholder="请输入角色名称" type="text" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
              <el-tree :data="allMenuData" show-checkbox node-key="menuId" :props="treeProps" ref="treeRef2" :default-checked-keys="editRoleForm.menuIdList"></el-tree>
              <p>备注 </p><el-input v-model="editRoleForm.remark" type="textarea"></el-input>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="clearRoleInfo()">取 消</el-button>
              <el-button type="primary" @click="editRoleInfo()">修 改</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { getRoleListApi, delRoleApi, getAllMenuApi, addRoleApi, getRoleInfoApi, editRoleInfoApi } from '@/api'
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
        size: 5,
        // 合同名称
        search: ''
      },
      // 新增角色弹出框
      dialogVisible: false,
      // 修改角色弹出框
      editDialog: false,
      // 所有菜单列表
      allMenuData: [],
      treeProps: {
        children: 'children',
        label: 'name',
        value: 'menuId'
      },
      // 新增角色数据
      addRoleForm: {
        roleName: '',
        menuIdList: [],
        remark: ''
      },
      // 修改角色数据
      editRoleForm: {
        roleId: '',
        roleName: '',
        menuIdList: [],
        remark: ''
      },
      // 添加修改框校验
      rules: {
      }
    }
  },
  created() {
    this.getRoleList()
    this.getAllMenu()
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
    },
    // 删除角色
    delRole(id) {
      this.$confirm('确定删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await delRoleApi(id)
        if (res.code !== 0) return this.$message.error('删除角色失败')
        this.$message({
          type: 'success',
          message: '删除角色成功!'
        })
        this.getRoleList()
      })
    },
    // 获取所有菜单
    async getAllMenu() {
      const { data: res } = await getAllMenuApi()
      let data1 = res.data.menuList
      // 左侧菜单数据修改为树形结构
      function setTreeData(arr) {
        let map = {}
        arr.forEach(i => {
          map[i.menuId] = i
        })
        let treeData = []
        arr.forEach(child => {
          const mapItem = map[child.parentId]
          if (mapItem) {
            (mapItem.children || (mapItem.children = [])).push(child)
          } else {
            treeData.push(child)
          }
        })
        return treeData
      }
      this.allMenuData = setTreeData(data1)
    },
    // 新增角色
    async addRole() {
      this.addRoleForm.menuIdList = this.$refs.treeRef.getCheckedKeys()
      const { data: res } = await addRoleApi(this.addRoleForm)
      if (res.code !== 0) return this.$message.error('添加角色失败!')
      this.$message({
        message: '添加角色成功!',
        type: 'success'
      })
      this.getRoleList()
      this.$refs.treeRef.setCheckedKeys([])
      this.addRoleForm = {
        roleName: '',
        menuIdList: [],
        remark: ''
      }
      this.dialogVisible = false
    },
    // 获取角色信息
    async getRoleInfo(id) {
      const { data: res } = await getRoleInfoApi(id)
      if (res.code !== 0) return false
      this.editRoleForm = res.data.role
      this.editDialog = true
    },
    // 修改角色信息
    async editRoleInfo() {
      this.editRoleForm.menuIdList = this.$refs.treeRef2.getCheckedKeys()
      const { data: res } = await editRoleInfoApi(this.editRoleForm)
      if (res.code !== 0) return this.$message.error('修改角色信息失败!')
      this.$message({
        message: '修改角色信息成功!',
        type: 'success'
      })
      this.$refs.treeRef2.setCheckedKeys([])
      this.getRoleList()
      this.editDialog = false
    },
    // 清除角色信息
    clearRoleInfo() {
      this.$refs.treeRef2.setCheckedKeys([])
      this.editDialog = false
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width: 100%;
  height: 100%;
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
  height: 60px;
  position: relative;
}
.el-pagination {
  position: absolute;
  top: 20px;
  right: 0;
}
.el-table .cell a {
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}
</style>
