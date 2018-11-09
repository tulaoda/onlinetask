
<template>
  <div class="taskUpload">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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

      <el-form-item label="任务图片">
        <el-upload action="api/upload" name="picture" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
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
        totalNo: ""
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.taskUpload {
  width: 500px;
  margin: 20px;
}
</style>
