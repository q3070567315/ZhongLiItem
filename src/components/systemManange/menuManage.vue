// 菜单管理
<template>
    <div class="menuManage_contaner">
      <!-- 卡片视图区 -->
      <el-card>
        <el-row class="layout_row">
          <!-- 操作按钮 -->
          <el-button type="primary" class="examine_btn" @click="newMenuVisible = true">新增</el-button>
          <el-button type="primary" class="examine_btn" @click="getMenuDetail">修改</el-button>
          <el-button type="danger" class="examine_btn" @click="delTips">删除</el-button>
        </el-row>
        <!-- 菜单管理表格区 -->
        <el-row>
            <el-table ref="multipleTable" :data="allMenuData" border style="width: 100%" row-key="menuId" :tree-props="{childList: 'childList'}" highlight-current-row  :default-sort="{ prop: 'orderNum'}">
              <el-table-column label="选择" width="60" header-align="center" align="right">
                <template slot-scope="scope">
                    <el-radio v-model="radioValue" :label="scope.row.menuId">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="菜单名称" min-width="13%" show-overflow-tooltip></el-table-column>
              <el-table-column prop="menuId" label="菜单id" sortable min-width="11%" show-overflow-tooltip></el-table-column>
              <el-table-column prop="parentName" label="父级菜单" sortable min-width="13%" show-overflow-tooltip></el-table-column>
              <el-table-column prop="icon" label="图标" sortable min-width="13%" show-overflow-tooltip></el-table-column>
              <el-table-column prop="type" label="类型" sortable min-width="11%" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="list" v-if="scope.row.type === 0">目 录</div>
                  <div class="menu" v-else>菜 单</div>
                </template>
              </el-table-column>
              <el-table-column prop="orderNum" label="排序编号" sortable min-width="12%" show-overflow-tooltip></el-table-column>
              <el-table-column prop="url" label="菜单链接url" sortable min-width="15%" show-overflow-tooltip></el-table-column>
              <el-table-column prop="perms" label="授权编码" min-width="12%" show-overflow-tooltip></el-table-column>
            </el-table>
        </el-row>
      </el-card>
      <!-- 新增菜单模板 -->
      <template id="newMenu">
        <div>
          <el-dialog title="新增" :visible.sync="newMenuVisible" width="30%" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="type">
                  <p>类型:</p>
                  <el-radio-group v-model="ruleForm.type" @change="radiosChange">
                    <el-radio :label="0">目录</el-radio>
                    <el-radio :label="1">菜单</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item prop="name">
                  <p>新增菜单名称: </p><el-input v-model="ruleForm.name" placeholder="菜单名称" type="text" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="parentId" ref="parentId" style="display: none">
                  <p>父级菜单: </p><el-cascader :options="allMenuData" :props="defaultData" clearable v-model="ruleForm.parentId" placeholder="请选择父级菜单"></el-cascader>
              </el-form-item>
              <el-form-item prop="url">
                  <p>菜单跳转url: </p><el-input v-model="ruleForm.url" placeholder="菜单跳转url(没有则不填)" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="orderNum">
                  <p>排序编号: </p><el-input v-model="ruleForm.orderNum" placeholder="请输入排序编号" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="icon">
                  <p>图标: </p><el-input v-model="ruleForm.icon" placeholder="菜单图标" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <div class="tipsInfo"><a href="https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=19238">点我获取图标库</a>(写入前加入iconfont icon-)</div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="newMenuVisible = false">返 回</el-button>
              <el-button type="primary" @click="addMenuItem()">添 加</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
      <!-- 修改菜单模板 -->
      <template id="editMenu">
        <div slot="footer">
          <el-dialog title="修改" :visible.sync="editMenuVisible" width="30%" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="type">
                  <p>类型:</p>
                  <el-radio-group v-model="menuDetail.type" @change="radiosChange2">
                    <el-radio :label="0">目录</el-radio>
                    <el-radio :label="1">菜单</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item prop="name">
                  <p>修改菜单名称: </p><el-input v-model="menuDetail.name" placeholder="菜单名称" type="text" prefix-icon="el-icon-search" clearable autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="parentId" ref="parentId2" style="display: none">
                  <p>父级菜单: </p><el-cascader :options="allMenuData" :props="defaultData" clearable v-model="menuDetail.parentId" placeholder="请选择父级菜单"></el-cascader>
              </el-form-item>
              <el-form-item prop="url">
                  <p>菜单跳转url: </p><el-input v-model="menuDetail.url" placeholder="菜单跳转url(没有则不填)" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="orderNum">
                  <p>排序编号: </p><el-input v-model="menuDetail.orderNum" placeholder="请输入排序编号" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <el-form-item prop="icon">
                  <p>图标: </p><el-input v-model="menuDetail.icon" placeholder="菜单图标" type="text" prefix-icon="el-icon-search" clearable></el-input>
              </el-form-item>
              <div class="tipsInfo"><a href="https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=19238">点我获取图标库</a>(写入前加入iconfont icon-)</div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editMenuVisible = false">返 回</el-button>
              <el-button type="primary" @click="editMenuItem()">修 改</el-button>
            </span>
          </el-dialog>
        </div>
      </template>
    </div>
</template>
<script>
import { getAllMenuApi, addMenuItemApi, getMenuDetailApi, editMenuItemApi, delMenuItemApi } from '@/api'
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
      newMenuVisible: false,
      // 控制修改菜单的弹出框
      editMenuVisible: false,
      // 所有菜单数据
      allMenuData: [],
      // 单选按钮选中状态menuId值
      radioValue: 0,
      // 当前选中菜单详情数据
      menuDetail: [],
      defaultData: {
        value: 'menuId',
        label: 'name',
        children: null,
        expandTrigger: 'hover',
        // 控制级联选择器只选则单个值
        emitPath: false
        // 不关联父子节点
        // checkStrictly: true
      }
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
    },
    // 单选按钮触发事件(新增菜单)
    radiosChange() {
      let inputElm = this.$refs.parentId.$el
      if (this.ruleForm.type === 0) {
        this.ruleForm.parentId = 0
        inputElm.style.display = 'none'
      } else if (this.ruleForm.type !== 0) {
        inputElm.style.display = 'block'
      }
    },
    // 单选按钮触发事件(修改菜单)
    radiosChange2() {
      let inputElm2 = this.$refs.parentId2.$el
      if (this.menuDetail.type === 0) {
        this.menuDetail.parentId = 0
        inputElm2.style.display = 'none'
      } else if (this.menuDetail.type !== 0) {
        inputElm2.style.display = 'block'
      }
    },
    // 新增菜单
    async addMenuItem() {
      const { data: res } = await addMenuItemApi(this.ruleForm)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message({
        message: '新增菜单成功',
        type: 'success'
      })
      setTimeout(() => {
        window.location.reload()
      }, 300)
    },
    // 通过菜单id获取当前菜单信息并渲染到弹出框中
    async getMenuDetail() {
      if (this.radioValue === 0) return this.$message.error('请选择需要修改的菜单项')
      const { data: res } = await getMenuDetailApi(this.radioValue)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.menuDetail = res.data.menu
      this.$nextTick(() => {
        this.radiosChange2()
      })
      this.editMenuVisible = true
    },
    // 修改菜单
    async editMenuItem() {
      const { data: res } = await editMenuItemApi(this.menuDetail)
      if (res.code !== 0) return this.$message.error(res.msg)
      this.$message({
        message: '修改菜单成功',
        type: 'success'
      })
      setTimeout(() => {
        window.location.reload()
      }, 300)
    },
    // 确认删除提示
    delTips() {
      if (this.radioValue === 0) return this.$message.error('请选择需要删除的菜单项')
      this.$confirm('确定要删除该菜单项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        setTimeout(() => {
          this.delMenuItem()
        }, 300)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除菜单
    async delMenuItem() {
      const { data: res } = await delMenuItemApi(this.radioValue)
      if (res.code !== 0) return this.$message.error(res.msg)
      window.location.reload()
    }
  }
}
</script>
<style scoped lang='less'>
.el-card {
  width: 100%;
  background:rgba(255,255,255,1);
  border-radius:3px;
  overflow: auto;
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
  margin-top: -20px;
}
.el-table .list {
  width: 59px;
  background-color:purple;
  text-align: center;
  border-radius: 3px;
  color: #fff;
  font-weight: 400;
}
.el-table .menu {
  width: 59px;
  background-color:yellowgreen;
  text-align: center;
  border-radius: 3px;
  color: #fff;
  font-weight: 400;
}
.tipsInfo {
  margin: -5px 0 0 100px;
  padding-left: 20px;
  height: 30px;
  width: 280px;
  background-color: #F9F2F4;
  border-radius: 4px;
  line-height: 30px;
  color: #FF838C;
}
.el-form-item {
  margin-bottom: 12px;
}
.tipsInfo a {
  color: #C7254E;
}
</style>
