<template>
  <div>
    <div style="margin-top: 20px" class="btn_box">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
    </div>
    <el-table :data="users" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        :formatter="resetDate"
      >
      </el-table-column>
       <el-table-column
        prop="role_id"
        label="所属角色"
        :formatter="formatRole"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 新增或者编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="userForemVisible" width="500px">
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="userForm"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if='user._id===null?true:false'>
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="user.role_id" placeholder="请点击选择">
            <el-option
              v-for="option in roleOptions"
              :label="option.name"
              :value="option._id"
              :key="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="user.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userForemVisible = false">取 消</el-button>
        <el-button type="primary" @click="user._id===null?addData('userForm'):updateData('userForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

      

<script>
import { formateDate } from "@/utils/dateUtils.js";
import userApi from "@/api/user.js";
export default {
  data() {
    var validataUsername = (rule, value, callback) => {
      value = value.trim();
      const length = value && value.length;
      const pwdReg = /^[a-zA-Z0-9]+$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (length < 4 || length > 12) {
        callback(new Error("长度在4到12之间"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("用户名必须是英文，数字或下划线"));
      } else {
        callback();
      }
    };
    var vaildataPhone = (rule, value, callback) => {
      value = value.trim();
      const pwdReg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("请输入正确得手机号"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        username: [
          { required: true, validator: validataUsername, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, message: "密码长度需要大于等于4", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: vaildataPhone,
            trigger: ["blur", "change"],
          },
        ],
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,

      users: [],

      roleOptions: [],
      userForemVisible: false,
      user: {
        _id: null,
        username: "",
        password: "",
        name: "",
        role_id: "",
        phone: "",
      },
    };
  },
  mounted() {
    this.fetchUsers();
  },
  components: {},

  methods: {
    handleEdit(id) {
      this.handleAdd(),
      userApi.getById(id).then(response=>{
        const res=response.data;
        if(res.status==0)
        {
          this.user=res.data
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确认删除这条记录？',"提示",{
        confirmButtonText:'确定',
        cancelButtonText:"取消",
        type:'warning',
      }).then(()=>{
        userApi.deleteById(id).then(response=>{
          const res=response.data
          if(res.status==0)
          {
            this.$message({
              message:'删除用户成功',
              type:'success'
            })
            this.fetchUsers()
          }
        })



      }).catch(()=>{
        alert('N')
      })
      

    },
    resetDate(row, column, cellValue, index) {
      return formateDate(cellValue);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchUsers();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchUsers();
    },
    fetchUsers() {
      userApi.getUserList(this.currentPage, this.pageSize).then((response) => {
        const res = response.data;

        if (res.status == 0) {
          this.users = res.data.data;
          this.total = res.data.total;
          this.roleOptions = res.data.roles;
        }
      });
    },
       formatRole(row, column, cellValue, index) {
      const role =
        this.roleOptions.find((item) => item._id === cellValue) || {};
      return role.name;
      
    },
    handleAdd() {
      this.user={
          _id: null,
        username: "",
        password: "",
        name: "",
        role_id: "",
        phone: "",
      }
      this.userForemVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].resetFields();
      });
    },

    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，提交添加
          userApi.add(this.user).then((response) => {
            const res = response.data;
            console.log(res);
            if (res.status === 0) {
              // 新增成功, 刷新列表数据
              this.fetchUsers();
              this.userForemVisible = false; //关闭窗口
            }
          });
        } else {
          // 验证不通过
          return false;
        }
      });
    },
    updateData(formName){
      this.$refs[formName].validate(valid=>{
        if(valid)
        {
userApi.update(this.user).then(response=>{
const res=response.data;
if(res.status==0)
{
  this.fetchUsers();
  this.userForemVisible=false
}
else{
  console.log("res不是0");
}
})
        }
        else{
return false
        }
      })
    }
   
  },
};
</script>

<style scoped>
</style>