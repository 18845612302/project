<template>
  <div>
    <div style="margin-top: 20px" class="btn_box">
      <el-button type="primary" @click="handleAdd">创建角色</el-button>
      <el-button
        type="primary"
        @click="roleAuthVisible = true"
        :disabled="!currentRow ? true : false"
        >设置角色权限</el-button
      >
    </div>
    <el-table
      :data="roleList"
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      border
      height="400"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" :formatter='resetDate'> </el-table-column>
          <el-table-column prop="auth_name" label="授权人"> </el-table-column>
      <el-table-column prop="auth_time" label="授权时间" :formatter='resetDate'> </el-table-column>
  
    </el-table>
    <!-- 新增角色弹窗 -->
    <el-dialog title="添加角色" :visible.sync="roleFormVisible" width="500px">
      <el-form
        :model="role"
        :rules="roleRules"
        ref="roleForm"
        style="width: 400px"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="角色名称" props="name">
          <el-input v-model="role.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 为角色添加权限 -->
    <el-dialog
      title="设置角色权限"
      :visible.sync="roleAuthVisible"
      width="500px"
    >
      <auth :role="currentRow" ref='auth'></auth>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAuthVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole,updateRole } from "@/api/role.js";
import Auth from "./auth.vue";
import memoryUtils from '@/utils/memoryUtils.js'
import {formateDate} from '@/utils/dateUtils.js'
export default {
  data() {
    return {
      currentRow: null,
      roleList: [],
      role: {
        name: "",
        menus: [],
      },
      roleAuthVisible: false,
      roleFormVisible: false,
      roleRules: {
        name: { require: true, message: "请输入角色名称", trigger: "blur" },
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  components: { Auth },

  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(this.role.name).then((response) => {
            const res = response.data;
            if (res.status == 0) {
              this.$message({
                message: "新增角色成功",
                type: "success",
              });
              this.roleFormVisible = false;
              this.fetchData();
            }
          });
        } else {
          return false;
        }
      });
    },
    handleAdd() {
      this.roleFormVisible = true;
      /* 
this.$nextTick()是一个异步时间，当渲染结束之后，它的回调才会被执行
触发新增角色时，打开弹窗以及渲染表单需要加载DOM，这个过程需要一定的时间，等待DOM加载完成之后，
在调用.resetFields()重置表单

*/
      this.$nextTick(() => {
        this.$refs["roleForm"].resetFields();
      });
    },
    updataRole() {
      const newRole=this.$refs['auth'].getMenus()
      this.currentRow.menus=newRole.menus
      this.currentRow.name=newRole.name
      this.currentRow.auth_name=memoryUtils.user.username;
      updateRole(this.currentRow).then(response=>{
        const res=response.data;
        if(res.status==0){
          this.$message({
            message:'更新成功',
            type:'success'
            
          })
        }
        this.roleAuthVisible=false
        this.fetchData()
      })
    
    },
    fetchData() {
      getRoleList().then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.roleList = res.data;
        } else {
          this.$message = {
            message: res.msg,
            type: "warning",
          };
        }
      });
    },
    resetDate(row,column,cellValue,index){
       return formateDate(cellValue)
    }
  },
};
</script>

<style scoped>
</style>