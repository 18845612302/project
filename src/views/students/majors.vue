<template>
  <div>
    <div style="margin-top: 20px" class="btn_box">
      <el-button type="primary" @click="handleAdd">添加专业</el-button>
    </div>
    <el-table :data="majors" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="专业名称"> </el-table-column>
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
    <el-dialog title="编辑专业" :visible.sync="majorFormVisible" width="500px">
      <el-form
        status-icon
        ref="majorForm"
        label-width="100px"
        label-position="right"
        :model="major"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="major.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="majorFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            major._id == null ? addData('majorForm') : updateDate('majorForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import majorApi from "@/api/major.js";
export default {
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "专业名称必须输入",
            trigger: ["blur", "change"],
          },
        ],
      },
      majors: [],
      size: 5,
      currentPage: 1,
      total: 0,
      major: {
        _id: null,
        name: "",
      },
      majorFormVisible: false,
    };
  },

  components: {},
  mounted() {
    this.fetchMajors();
  },

  methods: {
    handleAdd() {
      this.majorFormVisible = true;
      this.$nextTick(() => {
        this.$refs["majorForm"].resetFields();
      });
    },
    handleEdit(id) {
      this.handleAdd();
      majorApi.getById(id).then((responsse) => {
        const res = responsse.data;
        if (res.status == 0) {
          this.major = res.data;
        }
      });
    },
    handleDelete(id) {
this.$confirm("确定删除这条记录麻？","提示",{
  confirmButtonText:'确定',
  cancelButtonText:'取消',
  type:'warning'
}).then(()=>{
  majorApi.deleteById(id).then(responsse=>{
    const res=responsse.data;
    if(res.status==0)
    {
      this.$message({
        message:'删除专业成功',
        type:'success'
      })
      this.fetchMajors();
    }
  })
}).catch(()=>{
  
})

    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchMajors();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchMajors();
    },
    fetchMajors() {
      majorApi.getMajorList(this.currentPage, this.size).then((responsse) => {
        const res = responsse.data;

        if (res.status == 0) {
          this.majors = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          majorApi.add(this.major).then((response) => {
            const res = response.data;

            if (res.status == 0) {
              this.$message({
                message: "添加专业成功",
                type: "success",
              });
              this.fetchMajors();
              this.majorFormVisible = false;
            } else {
              return false;
            }
          });
        }
      });
    },
    updateDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          majorApi.update(this.major).then(response=>{
            const res=response.data;
            
            if(res.status==0)
            {
              this.$message({
                message:"编辑专业信息成功",
                type:'success',
              })
              this.fetchMajors();
              this.majorFormVisible=false;
              this.major._id=null
            }

          })
        } else {
          console.log("aaaa");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>