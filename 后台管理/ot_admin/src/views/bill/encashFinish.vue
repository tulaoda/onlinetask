<template>
  <div>

    <el-table :data="tableData5" border class="table-content">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="正在提现金额">
              <span>{{ props.row.user.encashing }}</span>
            </el-form-item>
            <el-form-item label="账户余额">
              <span>{{ props.row.user.balance }}</span>
            </el-form-item>
          </el-form>
        </template>

      </el-table-column>
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="用户姓名" prop="user.name">
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
      <!-- <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateState(scope.$index, scope.row.id,1)">提现完成</el-button>
          <el-button type="warning" size="mini" @click="handleUpdateState(scope.$index, scope.row.id,2)">提现驳回</el-button>
        </template>
      </el-table-column> -->

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
      stateMsg: ["提现中", "提现通过", "提现失败"],
      remarks: "", //提现不通过原因
      total: 0
    };
  },
  created() {
    this.findBillByState(1, 1);
    // console.log(this.$route.params.id);
  },

  methods: {
    findBillByState(state, page) {
      let that = this;
      this.$ajax
        .get("/bill/findBillByState", {
          params: {
            state: state,
            page: page,
            pageSize: "10"
          }
        })
        .then(function(res) {
          console.log(res.data.data);
          that.tableData5 = res.data.data.bill;
          that.total = res.data.data.total;
        });
    },
    DialogVisible(item) {
      this.tmpImg = item;
      this.centerDialogVisible = true;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.findBillByState(1, val);
    },
    handleUpdateState(index, id, state) {
      let that = this;
      switch (state) {
        //提现通过
        case 1:
          this.$ajax
            .get("/bill/updateBillState", {
              params: {
                id: id,
                state: state
              }
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
          //提现拒绝
          // case 3:
          //   this.$prompt("请输入驳回原因", {
          //     confirmButtonText: "确定",
          //     cancelButtonText: "取消",
          //     inputErrorMessage: "邮箱格式不正确"
          //   })
          //     .then(({ value }) => {
          //       that.remarks = value;

          //       this.$ajax
          //         .post("/taskOrder/updateOrderState", {
          //           taskOrderId: taskOrderId,
          //           state: state,
          //           remarks: that.remarks
          //         })
          //         .then(function(res) {
          //           if (res.data.code == 200) {
          //             that.$message({
          //               type: "success",
          //               message: "更新成功"
          //             });
          //           }
          //           console.log(res);
          //         });
          //     })
          //     .catch(() => {
          //       // this.$message({
          //       //   type: "info",
          //       //   message: "取消"
          //       // });
          //     });

          console.log(state);
          break;
      }
    }
  }
};
</script>

