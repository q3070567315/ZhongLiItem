// 菜单管理
<template>
    <div class="menuManage_contaner">
      <!-- 卡片视图区 -->
      <el-card>
        <!-- 菜单管理表格区 -->
        <el-row>
            <el-table ref="multipleTable" :data="allMenuData" border style="width: 100%" row-key="menuId" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="name" label="菜单名称" width="180"></el-table-column>
              <el-table-column prop="menuId" label="菜单id" sortable width="110"></el-table-column>
              <el-table-column prop="parentName" label="父级菜单" sortable width="180"></el-table-column>
              <el-table-column prop="icon" label="图标" sortable width="249"></el-table-column>
              <el-table-column prop="type" label="类型" sortable width="80"></el-table-column>
              <el-table-column prop="orderNum" label="排序编号" sortable width="110"></el-table-column>
              <el-table-column prop="url" label="菜单链接url" sortable width="350"></el-table-column>
              <el-table-column prop="perms" label="授权编码" width="260"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="layout_row">
          <!-- 操作按钮 -->
          <el-button type="primary" class="examine_btn" @click="dialogVisible = true">新增</el-button>
          <el-button type="primary" class="examine_btn">修改</el-button>
          <el-button type="danger" class="examine_btn">删除</el-button>
          <!-- 分页功能 -->
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-row>
      </el-card>
      <template id="newMenu">
        <div>
          <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="type">
                  <p>类型:</p>
                  <el-radio-group v-model="ruleForm.type" @change="radiosChange">
                    <el-radio :label="0">目录</el-radio>
                    <el-radio :label="1">菜单</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item prop="name">
                  <p>菜单名称: </p><el-input v-model="ruleForm.name" placeholder="菜单名称" type="text" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="parentId" ref="parentId" style="display: none">
                  <p>父级菜单id: </p><el-input v-model="ruleForm.parentId" placeholder="请输入父级菜单的id" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="url">
                  <p>菜单跳转url: </p><el-input v-model="ruleForm.url" placeholder="菜单跳转url" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="orderNum">
                  <p>排序编号: </p><el-input v-model="ruleForm.orderNum" placeholder="请输入排序编号" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="icon">
                  <p>图标: </p><el-input v-model="ruleForm.icon" placeholder="菜单图标" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">返 回</el-button>
              <el-button type="primary" @click="newMenuItem()">添 加</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { getAllMenuApi, newMenuItemApi } from '@/api'
export default {
  data() {
    return {
      // 表单数据
      ruleForm: {
        name: '',
        icon: '',
        url: '',
        type: 0,
        parentId: 0,
        orderNum: 1
      },
      // 登陆框校验
      rules: {
      },
      // 控制新增菜单的弹出框
      dialogVisible: false,
      allMenuData: []
    }
  },
  created() {
    this.getAllMenu()
  },
  methods: {
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
      console.log(this.allMenuData)
    },
    // 单选按钮触发事件(新增菜单)
    radiosChange() {
      let inputElm = this.$refs.parentId.$el
      if (this.ruleForm.type === 0) {
        inputElm.style.display = 'none'
      } else if (this.ruleForm.type !== 0) {
        inputElm.style.display = 'block'
      }
    },
    // 新增菜单
    async newMenuItem() {
      console.log(this.ruleForm)
      const { data: res } = await newMenuItemApi(this.ruleForm)
      console.log(res)
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
  border-radius:3px;
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
