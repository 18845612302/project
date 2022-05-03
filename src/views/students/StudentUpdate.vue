<template>
  <div class="student-update">
    <el-button
      icon="el-icon-arrow-left"
      @click="$router.push('/student')"
      circle
    ></el-button>
    <el-form
      :model="updateStudent"
      ref="studentForm"
      label-width="100px"
      label-position="right"
      style="width: 100%; height: 100%"
      class="update-form"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="updateStudent.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="updateStudent.gender" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in genderOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在学校" prop="school">
        <el-autocomplete
          class="inline-input"
          v-model="updateStudent.school"
          :fetch-suggestions="querySearchSchool"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-autocomplete
          class="inline-input"
          v-model="updateStudent.major"
          :fetch-suggestions="querySearchMajor"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="年级" prop="garde">
        <el-select v-model="updateStudent.grade" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in gradeOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-select v-model="updateStudent.education" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in educationOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习方向" prop="direction">
        <el-select v-model="updateStudent.direction" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in directionOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="id_number">
        <el-input v-model="updateStudent.id_number"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="updateStudent.phone"></el-input>
      </el-form-item>
      <el-form-item label="家长姓名" prop="parent">
        <el-input v-model="updateStudent.parent"></el-input>
      </el-form-item>
      <el-form-item label="家长联系方式" prop="parent_phone">
        <el-input v-model="updateStudent.parent_phone"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        <el-input v-model="updateStudent.address"></el-input>
      </el-form-item>
      <el-form-item label="qq号" prop="qq">
        <el-input v-model="updateStudent.qq"></el-input>
      </el-form-item>
      <el-form-item label="所在班级" prop="class">
        <el-select v-model="updateStudent.class" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in classOptions"
            :key="index"
            :label="option.name"
            :value="option.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学时间" prop="admission_date">
        <el-date-picker
          v-model="updateStudent.admission_date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="授课教师" prop="teacher_id">
        <el-select v-model="updateStudent.teacher_id" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in teacherOptions"
            :key="index"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学管" prop="manager_id">
        <el-select v-model="updateStudent.manager_id" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in managerOptions"
            :key="index"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="照片" prop="pictures">
        <el-upload
          :action="baseApi + '/manage/img/upload'"
          list-type="picture-card"
          :auto-upload="true"
          :file-list="fileList"
          name="image"
          accept="image/*"
          :on-change="handleChange"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <vue-tinymce v-model="updateStudent.note" :setting="setting" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="
            updateStudent._id == null
              ? addData('studentForm')
              : updateData('studentForm')
          "
          >确定</el-button
        >
        <el-button v-if=" updateStudent._id == null
             " @click="reset('studentForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="pictureDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import userApi from "@/api/user.js";
import classApi from "@/api/class.js";
import schoolApi from "@/api/school.js";
import majorApi from "@/api/major.js";

export default {
  data() {
    const validateIdNumber = (rule, value, callback) => {
      value = value.trim();
      const pwdReg =
        /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (value === "") {
        callback(new Error("请输入身份证号"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("请输入正确得身份证号"));
      } else {
        callback();
      }
    };
    const validateIdPhone = (rule, value, callback) => {
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
        name: [{ required: true, message: "请写姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        direction: [
          { required: true, message: "请选择学习方向", trigger: "blur" },
        ],
        id_number: [
          { validator: validateIdNumber, trigger: ["blur", "change"] },
        ],
        phone: [
          {
            required: true,
            validator: validateIdPhone,
            trigger: ["blur", "change"],
          },
        ],
        class: [{ required: true, message: "请选择所在班级", trigger: "blur" }],
        teacher_id: [
          { required: true, message: "请选择授课教师", trigger: "blur" },
        ],
        manager_id: [
          { required: true, message: "请选择学管", trigger: "blur" },
        ],
      },
      setting: {
        menubar: false,
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars imagetools",
        language: "zh_CN",
        height: 350,
      },

      baseApi: process.env.VUE_APP_BASE_API,
      baseUrl: process.env.VUE_APP_SERVICE_URL,
      updateStudent: {
        _id: null,
        name: "",
        gender: "",
        school: "",
        major: "",
        grade: "",
        education: "",
        direction: "",
        id_number: "",
        phone: "",
        parent: "",
        address: "",
        qq: "",
        class: "",
        admission_date: "", //入学时间
        teacher_id: "",
        manager_id: "",
        pictures: [], //照片列表
        note: "", //备注
      },
      //性别列表
      genderOptions: [
        { type: 0, name: "男" },
        { type: 1, name: "女" },
      ],
      //学校列表
      schoolOptions: [],
      //专业列表
      majorOptions: [],
      //年纪列表
      gradeOptions: [
        {
          type: "1",
          name: "大一",
        },
        {
          type: "2",
          name: "大二",
        },
        {
          type: "3",
          name: "大三",
        },
        {
          type: "4",
          name: "大四",
        },
        {
          type: "5",
          name: "在读大学生",
        },
      ],
      educationOptions: [
        {
          type: "1",
          name: "专科",
        },
        {
          type: "2",
          name: "本科",
        },
        {
          type: "3",
          name: "硕士",
        },
        {
          type: "4",
          name: "其他",
        },
      ],
      directionOptions: [
        {
          type: "1",
          name: "web前端",
        },
        {
          type: "2",
          name: "JAVA",
        },
        {
          type: "0",
          name: "UI/UE",
        },
        {
          type: "0",
          name: "C/C++",
        },
      ],
      //班级列表
      classOptions: [],
      //教师列表
      teacherOptions: [],
      //学管列表

      managerOptions: [],
      //查看大图的地址
      dialogImageUrl: "",
      //大图是否显示
      pictureDialogVisible: false,
      //所有已上传得图片数组
      fileList: [
        /* uid:
  url:
  name:
  status:
   */
      ],
      userAll: [],
      //查看大图下载删除
      disabled: false,
    };
  },

  components: {},
  mounted() {
    this.getUserList();
    this.getClassList();
    this.getSchoolList();
    this.getMajorList();
    this.getStudent();
  },

  methods: {
    reset(formName)
    {
this.$refs[formName].resetFields()
    },
    querySearchSchool(queryString, cb) {
      var schoolOptions = this.schoolOptions;
      var results = queryString
        ? schoolOptions.filter(this.createFilter(queryString))
        : schoolOptions;
      cb(results);
    },
    querySearchMajor(queryString, cb) {
      var majorOptions = this.majorOptions;
      var results = queryString
        ? majorOptions.filter(this.createFilter(queryString))
        : majorOptions;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.indexOf(queryString) == 0;
      };
    },
    //查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.pictureDialogVisible = true;
    },
    handleDownload(file) {
      // console.log(this.fileList);
    },
    /* 文件状态发生改变了，提娜佳，上传成功，上传失败都会被调用 
file:当前上传得文件
fileList:所有已上传文件列表
*/
    handleChange(file, fileList) {
      if (file.status == "success") {
        const result = file.response;
        if (result.status == 0) {
          const { name, url } = result.data;
          file = fileList[fileList.length - 1];
          file.name = name;
          file.url = url;
        }
      }
      this.fileList = fileList;
    },
    //删除图片
    handleRemove(file, fileList) {
      studentApi.reqDeleteImg(file.name).then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.fileList.splice(this.fileList.indexOf(file.name));
        }
      });
    },
    //获取所有用户列表
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
    //获取班级列表
    getClassList() {
      classApi.getClassAll().then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.classOptions = res.data;
        }
      });
    },
    //获取学校列表
    getSchoolList() {
      schoolApi.getSchoolAll().then((response) => {
        const res = response.data;

        if (res.status == 0) {
          this.schoolOptions = res.data;
          const arr = res.data;

          for (let i = 0; i < arr.length; i++) {
            this.schoolOptions[i].value = arr[i].schoolname;
            this.schoolOptions[i]._id = arr[i]._id;
          }
        }
      });
    },
    getMajorList() {
      majorApi.getMajorAll().then((response) => {
        const res = response.data;

        if (res.status == 0) {
          this.majorOptions = res.data;

          const arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            this.majorOptions[i].value = arr[i].name;
            this.majorOptions[i]._id = arr[i]._id;
          }
        }
      });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.updateStudent.pictures = this.getImgs();
          studentApi.add(this.updateStudent).then((response) => {
            const res = response.data;
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "创建学员信息成功",
              });
              this.$router.replace("/student");
            }
          });
        } else {
          return false;
        }
      });
    },
    updateData(formName) {
this.$refs[formName].validate(valid=>{
  if(valid)
  {
this.updateStudent.pictures=this.getImgs();
studentApi.update(this.updateStudent).then(response=>{
  const res=response.data;
  if(res.status==0)
  {
    this.$message({
      message:'修改学员信息成功',
      type:"success"
    })
    this.$router.replace('/student')
  }
})
  }else{
    return false
  }
})


    },
    getImgs() {
      return this.fileList.map((item) => {
        item.name;
      });
    },
    getStudent() {
      const { _id } = this.$route.params;
      if (_id != -1) {
        studentApi.getById(_id).then((response) => {
          const res = response.data;
          if (res.status == 0) {
            this.updateStudent = res.data;
            const { pictures } = res.data;
            this.fileList = pictures.map((img, index) => ({
              uid: -index,
              name: img,
              status: "success",
              url: this.baseUrl + "/upload" + "img",
            }));
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.student-update {
  padding: 20px;
}
.el-form {
  margin-top: 20px;
}
.el-input {
  width: 30%;
}
</style>