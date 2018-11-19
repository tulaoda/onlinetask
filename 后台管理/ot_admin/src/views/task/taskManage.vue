<template>
  <div>
    <el-table :data="tableData5" class="table-content" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="点击预览">
              <span v-for="(value,index) in props.row.taskImgs" v-bind:key="index">

                <img :src="value.url" @click="DialogVisible(value.url)" />

              </span>
            </el-form-item>
            <el-form-item label="文案">
              <span>{{props.row.article}}</span>
            </el-form-item>
          </el-form>

        </template>
      </el-table-column>
      <el-table-column label="任务编号" prop="taskId">
      </el-table-column>
      <el-table-column label="任务名称" prop="name">
      </el-table-column>
      <el-table-column label="佣金" prop="commission">
      </el-table-column>
      <el-table-column label="任务总量" prop="totalNo">
      </el-table-column>
      <el-table-column label="剩余数量" prop="remainNo">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.state==0?'已发布':'已结束' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini">
            <router-link :to='{name:"taskDetail", params:{ id:scope.row.taskId } }'> 查看领取详情</router-link>
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData5,scope.row.taskId)">删除</el-button>
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
.table-content {
  min-height: 620px;
}
img {
  width: 100px;
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
      centerDialogVisible: false,
      tableData5: [],
      tmpImg: "",
      total: 0
    };
  },
  created() {
    this.findAllTask(1);
  },

  methods: {
    findAllTask(page) {
      let that = this;
      this.$ajax
        .get("/task/findAllTaskNoState", {
          params: {
            // state: "1",
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
      this.findAllTask(val);
    },
    handleDelete(index, row, taskId) {
      console.log(taskId);
      let that = this;
      this.$ajax
        .get("/task/deleteTask", {
          params: {
            taskId: taskId
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            row.splice(index, 1); //删掉该行
            const h = that.$createElement;
            that.$notify.success({
              title: "提示",
              message: h("i", { style: "color: teal" }, "任务删除成功")
            });
            // location.reload();
          } else {
            const h = that.$createElement;
            that.$notify.success({
              title: "提示",
              message: h(
                "i",
                { style: "color: teal" },
                "任务已经领取，不能删除"
              )
            });
          }
        });
    }
  }
};
</script>

