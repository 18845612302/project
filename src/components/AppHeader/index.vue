<template>
  <!-- 头部左侧logo标题 -->
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">学生管理系统</span>
    </a>
   
    <!-- 头部右侧下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 日期与天气 -->
    <span class="date-weather">
      <span class="date">{{ currentTime }}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="weather"
        ><i :class="wea_img"></i>&nbsp;{{ wea }}&nbsp;{{ tem_day }}/{{
          tem_night
        }}</span
      >
    </span>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="userForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="userForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="userForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')"
            >提交</el-button
          >
          <el-button @click="$refs['userForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { reqWeather } from "@/api/jsonp.js";
import { formateDate } from "@/utils/dateUtils.js";
import memoryUtils from "@/utils/memoryUtils.js";
import storageUtils from "@/utils/storageUtils";
import userApi from "@/api/user.js";
export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      value = value.trim();
      if (value == "") {
        callback(new Error("原密码不能为空"));
      } else {
        userApi.checkPwd(this.user._id, value).then((response) => {
          const res = response.data;

          if (res.status == 0) {
            callback();
          } else {
            callback(new Error(res.msg));
          }
        });
      }
    };
    const validatePass = (rule, value, callback) => {
      value = value.trim();
      if (value == "") {
        callback(new Error("原密码不能为空"));
      } else if (value !== this.userForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      user: memoryUtils.user,
      currentTime: formateDate(Date.now()),
      tem_day: "",
      tem_night: "",
      wea: "",
      wea_img: "",
      userForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" },
        ],
        pass: [{ required: true, message: "原密码不能为空", trigger: "blur" }],
        checkPass: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: ["blur", "change"] },
        ],
      },
      dialogFormVisible: false,
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi
            .updatePwd(this.user._id, this.userForm.checkPass)
            .then((response) => {
              const res = response.data;
              this.$message({
                message: res.msg,
                type: res.status == 0 ? "success" : "error",
              });
              if(res.status==0)
              {
                this.handeleLogout();
                this.dialogFormVisible=false;
              }
            });
        } else {
          return false; 
        }
      });
    },
    getWeather() {
      reqWeather("上饶").then((res) => {
        const { tem1, tem2, wea, wea_img } = res;

        const weaImgs = {
          xue: "el-icon-light-rain",
          lei: "el-icon-lightning",
          shachen: "el-icon-sunrise",
          wu: "el-icon-cloudy-and-sunny",
          binbao: "el-icon-light-rain",
          yun: "el-icon-cloudy",
          yu: "el-icon-cloudy",
          yin: "el-icon-cloudy",
          qing: "el-icon-sunny",
        };
        this.wea_img = weaImgs[wea_img];
        this.tem_day = tem1;
        this.tem_night = tem2;
        this.wea = wea;
        //  console.log(this.wea);
      });
    },
    getTime() {
      setInterval(() => {
        this.currentTime = formateDate(Date.now());
      }, 1000);
    },
    handlePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].resetFields();
      });
    },
    handeleLogout()
    {
 memoryUtils.user = {};
          storageUtils.removeUser();
          this.$router.replace("/login");
          //推出
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          this.handlePwd();
          break;
        case "b":
         this.handeleLogout()
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getWeather();
    this.getTime();
  },
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0px 10px 0px 0px;
}
.company {
  color: white;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.date-weather {
  float: right;
  color: white;
  margin-right: 30px;
  font-size: 12px;
}
</style>