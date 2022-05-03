<template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">login</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import login from "@/api/login";
import memoryUtils from "@/utils/memoryUtils.js";
import storageUtils from "@/utils/storageUtils.js";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      value = value.trim();
      const length = value && value.length;
      const pwdReg = /^[a-zA-Z0-9_]+$/;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (length < 4 || length > 12) {
        callback(new Error("长度在4到13个字符之间"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("请输入正确的字符"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            validator: validateUsername,
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  components: {},

  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(this.form.username, this.form.password);

          var result = await login.login(this.form.username, this.form.password);

          result = result.data;
          let token = result.token;
          
          let a = await login.heihei(token);
          console.log(a);
          if (result.status === 0) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            const user = result.data;
            console.log(result);
            storageUtils.saveUser(user);
            memoryUtils.user = user;
            this.$router.replace("/");
          }
        } else {
          // this.$message({
          //   message:"密码错误",
          //   type:'success'
          // })
          return false;
        }
      });
    },
  },
};
</script>

 <style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #303133;
}
.login-title {
  text-align: center;
  color: #303133;
}
</style> 