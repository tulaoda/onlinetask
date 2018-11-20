
<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <h1>OnlineTask后台管理</h1>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input v-model="ruleForm.passwd" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        passwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.name == "admin" &&
            this.ruleForm.passwd == "111111"
          ) {
            let user = {
              name: this.ruleForm.name,
              passwd: this.ruleForm.passwd,
              auth: true
            };
            this.setUser(user);
            this.$router.push({ path: "/user/user" });
          } else {
            this.$notify.info({
              title: "温馨提示",
              message: "账号或密码错误"
              //   type: "warning"
            });
            // location.reload();
            this.resetForm("ruleForm");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("./../assets/login.jpg") no-repeat;
  background-size: cover;
  background-position: 0 -220px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 400px;
    border-radius: 20px;
    padding: 20px 30px 20px 30px;
    background: rgba(225, 225, 225, 0.8);
    .el-button {
      width: 100%;
    }
  }
}
</style>
