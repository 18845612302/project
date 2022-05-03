<template>
  <div>
    <!-- 行内表单 查询 -->
    <el-form
      :inline="true"
      ref="searchForm"
      :model="search"
      style="margin-top: 20px"
    >
      <el-form-item prop="teacher">
        <el-input
          v-model="search.teacher"
          placeholder="根据教师查询"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="manager">
        <el-input
          v-model="search.manager"
          placeholder="根据学管查询"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchData"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
          >添加</el-button
        >
        <el-button @click="resetform('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="classs" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="班级名称"> </el-table-column>
      <el-table-column
        prop="teacher_id"
        label="授课教师"
        :formatter="formatTeacher"
      >
      </el-table-column>
      <el-table-column prop="manager_id" label="学管" :formatter="formatManger">
      </el-table-column>
      <el-table-column prop="stage" label="课程阶段"> </el-table-column>

      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)">
            编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="编辑班级" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        status-icon
        ref="classForm"
        label-width="100px"
        label-position="right"
        :model="updateClass"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="updateClass.name"></el-input>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher_id">
          <el-select
            v-model="updateClass.teacher_id"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="option in teacherOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学管教师" prop="manager_id">
          <el-select
            v-model="updateClass.manager_id"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="option in managerOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程阶段" prop="stage">
          <el-input
            v-model="updateClass.stage"
            placeholder="请编辑课程阶段"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            updateClass._id == null
              ? addData('classForm')
              : updateDate('classForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import classApi from "@/api/class.js";
import userApi from "@/api/user.js";
export default {
  data() {
    return {
      classs: [],
      currentPage: 1,
      size: 5,
      total: 0,
      //收集行内表单数据
      search: {
        teacher: "",
        manager: "",
      },
      //查询条件对象,
      searchMap: {
        teacher_id: "",
        manager_id: "",
      },
      userAll: [],
      teacherOptions: [],
      managerOptions: [],
      dialogFormVisible: false,
      updateClass: {
        _id: null,
        name: "b",
        teacher_id: "",
        manager_id: "",
        stage: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "班级名称必须填写",
            trigger: "blur",
          },
        ],
        teacher_id: [
          {
            required: true,
            message: "请选择教师",
            trigger: "blur",
          },
        ],
        manager_id: [
          {
            required: true,
            message: "请选择教师",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchClass();
    this.getUserList();
  },

  components: {},

  methods: {
    handleEdit(id) {
      this.handleAdd();
      classApi.getById(id).then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.updateClass = res.data;
        }
      });
    },
    handleDelete(id) {
this.$confirm('确定删除这条信息麻？','提示',{
  confirmButtonText:"确定",
  cancelButtonText:'取消',
  type:'warning'
}).then(()=>{
  classApi.deleteById(id).then(response=>{
    const res=response.data
    if(res.status==0)
    {
      this.$message({
        type:"success",
        message:'删除班级成功'
      })
      this.size=5;
      this.currentPage=1;
      this.fetchClass();
    }
  }).catch(err=>{})
})

    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchClass();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchClass();
    },
    fetchClass() {
      classApi
        .getClassList(this.currentPage, this.size, this.searchMap)
        .then((response) => {
          const res = response.data;
          if (res.status == 0) {
            this.classs = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    searchData() {
      this.currentPage = 1;
      if (this.search.teacher || this.search.manager) {
        const resTeacher =
          this.userAll.find((item) => item.name == this.search.teacher) || {};
        const resManager =
          this.userAll.find((item) => item.name == this.search.manager) || {};
        this.searchMap.teacher_id = resTeacher._id || "";
        this.searchMap.manager_id = resManager._id || "";
      } else {
        this.searchMap.teacher_id = "";
        this.searchMap.manager_id = "";
      }

      this.fetchClass();
    },
    resetform(formName) {
      this.$refs[formName].resetFields();
    },
    getUserList() {
      userApi.getUserAll().then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.userAll = res.data;
          this.userAll.map((item) => {
            if (item.role_id == "625e800cccb036dbe656b817") {
              this.teacherOptions.push(item);
            } else if (item.role_id == "625e82a6ccb036dbe656b891") {
              this.managerOptions.push(item);
            }
          });
        }
      });
    },
    formatTeacher(row, column, cellValue, index) {
      const teacher = this.userAll.find((item) => item._id == cellValue) || {};

      return teacher.name;
    },
    formatManger(row, column, cellValue, index) {
      const manager = this.userAll.find((item) => item._id == cellValue) || {};
      return manager.name;
    },
    handleAdd() {
      this.updateClass = {
        _id: null,
        teacher_id: "",
        manager_id: "",
        stage: "",
        name: "b",
      };
      (this.dialogFormVisible = true),
        this.$nextTick(() => {
          this.$refs["classForm"].resetFields();
        });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classApi.add(this.updateClass).then((response) => {
            const res = response.data;
            if (res.status == 0) {
              this.$message({
                message: "添加班级成功",
                type: "success",
              });
              this.fetchClass();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    updateDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classApi.update(this.updateClass).then((response) => {
            const res = response.data;
            if (res.status == 0) {
              this.$message({
                message: "更新班级成功",
                type: "success",
              });
              this.fetchClass();
              this.dialogFormVisible = false;
              this.updateClass = {
                _id: null,
                teacher_id: "",
                manager_id: "",
                stage: "",
                name: "b",
              };
            }
          });
        } else {
          return false;
        }
      });
    },
   
  },
};
</script>

<style scoped>
</style>