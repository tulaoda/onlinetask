
<template>
  <div class="taskUpload">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div class="container">

        <div class="left">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="佣金" prop="commission">
            <el-input v-model="form.commission"></el-input>
          </el-form-item>
          <el-form-item label="任务总量" prop="totalNo">
            <el-input v-model="form.totalNo"></el-input>
          </el-form-item>
          <el-form-item label="文案" prop="article">
            <el-input type="textarea" v-model="form.article" rows="8"></el-input>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="任务图片">
            <el-upload action="api/upload" name="picture" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        commission: "",
        article: "",
        totalNo: "",
        taskImgs: []
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" }
        ],
        commission: [
          { required: true, message: "请输入任务佣金", trigger: "blur" },
          { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" }
        ],
        article: [
          { required: true, message: "请输入文案", trigger: "blur" },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur"
          }
        ],
        totalNo: [
          { required: true, message: "请输入任务总量", trigger: "blur" },
          { min: 1, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" }
        ]
      },
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
                console.log(that)
                that.$refs[formName].resetFields();
                that.handleRemove()
              }
              else{
                 const h = this.$createElement;
                this.$notify({
                  title: "提示",
                  message: h("i", { style: "color: teal" }, "任务发布失败，请联系管理员")
                });
              }
              console.log(res);
            });
          // alert("submit!");
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
      console.log(this.form.taskImgs);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  margin: 50px;
  .right {
    margin: 0 100px;
  }
}
</style>
