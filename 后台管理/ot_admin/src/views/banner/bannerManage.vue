<template>
  <div>
    <div class="item">

      <el-button type="primary" @click="dialogTableVisible = true">上传<i class="el-icon-upload el-icon--right"></i></el-button>

    </div>
    <el-table :data="tableData5" class="table-content" :stripe="true">
      <el-table-column label="编号" prop="id">
      </el-table-column>
      <!-- <el-table-column label="顺序" prop="imgOrder">
      </el-table-column> -->
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <img :src="scope.row.imgUrl" @click="DialogVisible(scope.row.imgUrl)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData5,scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog title="" :visible.sync="centerDialogVisible" width="50%" center>
      <img :src="tmpImg" class="dialogImg" /></el-dialog>

    <el-dialog title="图片上传" :visible.sync="dialogTableVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
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
            <el-button type="primary" @click="submitForm('form')" class="upload-btn">上传</el-button>
            <!-- <el-button @click="resetForm('form')">重置</el-button> -->
          </el-form-item>
        </div>

      </el-form>
    </el-dialog>

  </div>

</template>

<style lang="scss" scoped>
.container {
  padding-left: 50px;
}
.item {
  text-align: left;
}
// .el-button--primary {
//   width: 40px;
// }

.upload-btn {
  width: 148px;
}
.el-form-item__content {
  margin-left: 0 !important;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand > div {
  width: 100%;
  .el-form-item {
    margin-bottom: 0;
  }
}
.table-content {
  box-sizing: border-box;
  min-height: 620px;
}
img {
  width: 200px;
  margin: 5px;
}
.el-form-item__content {
  width: 800px;
}

.dialogImg {
  width: 100%;
}
a {
  color: #000;
  text-decoration: none;
}
</style>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false, //图片放大
      dialogTableVisible: false, //上传显示
      tableData5: [],
      tmpImg: "",
      total: 0,
      form: {
        taskImgs: []
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    this.findAllTask();
  },

  methods: {
    findAllTask() {
      let that = this;
      this.$ajax.get("/banner/listBanner", {}).then(function(res) {
        console.log(res.data);
        console.log(res.data.content);
        that.tableData5 = res.data.content;
        that.total = res.data.total;
      });
    },
    DialogVisible(item) {
      this.tmpImg = item;
      this.centerDialogVisible = true;
    },

    //图片上传相关
    submitForm(formName) {
      var that = this;
      this.$ajax.get("/banner/addBanner", { params: this.form }).then(res => {
        if ((res.data.code = 200)) {
          const h = this.$createElement;
          this.$notify.success({
            title: "提示",
            message: h("i", { style: "color: teal" }, "上传成功")
          });
          location.reload();
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
    },
    handleDelete(index, row, id) {
      console.log(id);
      let that = this;
      this.$ajax
        .get("/banner/deleteBanner", {
          params: {
            id: id
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            row.splice(index, 1); //删掉该行
            const h = that.$createElement;
            that.$notify.success({
              title: "提示",
              message: h("i", { style: "color: teal" }, "图片删除成功")
            });
            // location.reload();
          } else {
            const h = that.$createElement;
            that.$notify.success({
              title: "提示",
              message: h("i", { style: "color: teal" }, "系统错误")
            });
          }
        });
    }
  }
};
</script>

