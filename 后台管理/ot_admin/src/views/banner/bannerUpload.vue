
<template>
  <div class="taskUpload">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div class="container">
        <el-form-item label="">
          <el-upload action="api/upload" name="picture" ref="upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">上传</el-button>
          <!-- <el-button @click="resetForm('form')">重置</el-button> -->
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // name: "",
        // commission: "",
        // article: "",
        // totalNo: "",
        taskImgs: []
      },
      // rules: {
      //   name: [
      //     { required: true, message: "请输入任务名称", trigger: "blur" },
      //     { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
      //   ],
      //   commission: [
      //     { required: true, message: "请输入任务佣金", trigger: "blur" },
      //     { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" }
      //   ],
      //   article: [
      //     { required: true, message: "请输入文案", trigger: "blur" },
      //     {
      //       min: 3,
      //       max: 500,
      //       message: "长度在 3 到 500 个字符",
      //       trigger: "blur"
      //     }
      //   ],
      //   totalNo: [
      //     { required: true, message: "请输入任务总量", trigger: "blur" },
      //     { min: 1, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" }
      //   ]
      // },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ajax
            .get("/task/createTask", { params: this.form })
            .then(res => {
              if ((res.data.code = 200)) {
                const h = this.$createElement;
                this.$notify.success({
                  title: "提示",
                  message: h("i", { style: "color: teal" }, "任务发布成功")
                });

                console.log(that);
                that.$refs[formName].resetFields();
                setTimeout(() => {
                  this.$router.push("taskManage");
                }, 2000);
              } else {
                const h = this.$createElement;
                this.$notify({
                  title: "提示",
                  message: h(
                    "i",
                    { style: "color: teal" },
                    "任务发布失败，请联系管理员"
                  )
                });
              }
              console.log(res);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.form.taskImgs = this.form.taskImgs.filter(
        item => item != file.response.url
      );
      console.log(this.form.taskImgs);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(file, fileList) {
      console.log(file.url);
      this.form.taskImgs.push(file.url);
      this.$message("图片上传成功");
      console.log(this.form.taskImgs);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 300px;
}
</style>
