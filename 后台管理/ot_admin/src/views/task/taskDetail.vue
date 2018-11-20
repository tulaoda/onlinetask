<template>
  <div>

    <el-table :data="tableData5" border class="table-content">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="任务开始截图">
              <img :src="props.row.startImg==null?'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541939857744&di=6e449d864da4a48e4041ab524073c957&imgtype=0&src=http%3A%2F%2Fwww.corp001.com%2Ftemplates%2Fdefault%2Fshop%2Fimages%2Ferrors.jpg':props.row.startImg" @click="DialogVisible(props.row.startImg)" alt="暂无" />
            </el-form-item>
            <el-form-item label="任务结束截图">
              <img :src="props.row.endImg==null?'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541939857744&di=6e449d864da4a48e4041ab524073c957&imgtype=0&src=http%3A%2F%2Fwww.corp001.com%2Ftemplates%2Fdefault%2Fshop%2Fimages%2Ferrors.jpg':props.row.endImg" @click="DialogVisible(props.row.endImg)" alt="暂无" />
            </el-form-item>
          </el-form>
        </template>

      </el-table-column>
      <el-table-column label="id" prop="taskOrderId">
      </el-table-column>
      <el-table-column label="用户姓名" prop="user.name">
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.remarks==null?'暂无':scope.row.remarks}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ stateMsg[scope.row.state] }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看任务详情</el-button> -->
          <el-button type="primary" size="mini" @click="handleUpdateState(scope.$index, scope.row.taskOrderId,2)">审核通过</el-button>
          <el-button type="warning" size="mini" @click="handleUpdateState(scope.$index, scope.row.taskOrderId,3)">审核驳回</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">
      <el-pagination background layout="prev, pager, next" :page-size="8" :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="" :visible.sync="centerDialogVisible" width="50%" center>
      <img :src="tmpImg" class="dialogImg" /></el-dialog>
  </div>
</template>

<style lang="scss" scoped>
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
img {
  width: 100px;
  margin: 5px;
}
.el-form-item__content {
  width: 800px;
}
.table-content {
  min-height: 620px;
}

.dialogImg {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      tableData5: [],
      tmpImg: "",
      stateMsg: ["未提交", "审核中", "审核通过", "审核失败"],
      remarks: "", //审核不通过原因
      taskID: "",
      total: 0
    };
  },
  created() {
    this.findAllTask(this.$route.params.id, 1);
    // console.log(this.$route.params.id);
  },

  methods: {
    findAllTask(taskID, page) {
      let that = this;
      that.taskID = taskID;
      this.$ajax
        .get("/taskOrder/taskOrderByTaskId", {
          params: {
            taskID: taskID,
            page: page,
            pageSize: "8"
          }
        })
        .then(function(res) {
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
    handleCurrentChange(val) {
      console.log(val);
      this.findAllTask(taskID, val);
    },
    handleUpdateState(index, taskOrderId, state) {
      let that = this;
      switch (state) {
        //审核通过
        case 2:
          this.$ajax
            .post("/taskOrder/updateOrderState", {
              taskOrderId: taskOrderId,
              state: state
            })
            .then(function(res) {
              console.log(res);
              if (res.data.code == 200) {
                that.$message({
                  type: "success",
                  message: "更新成功"
                });
              }
            });

          break;
        //审核拒绝
        case 3:
          this.$prompt("请输入驳回原因", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputErrorMessage: "邮箱格式不正确"
          })
            .then(({ value }) => {
              that.remarks = value;

              this.$ajax
                .post("/taskOrder/updateOrderState", {
                  taskOrderId: taskOrderId,
                  state: state,
                  remarks: that.remarks
                })
                .then(function(res) {
                  if (res.data.code == 200) {
                    that.$message({
                      type: "success",
                      message: "更新成功"
                    });
                  }
                  console.log(res);
                });
            })
            .catch(() => {
              // this.$message({
              //   type: "info",
              //   message: "取消"
              // });
            });

          console.log(state);
          break;
      }
    }
  }
};
</script>

