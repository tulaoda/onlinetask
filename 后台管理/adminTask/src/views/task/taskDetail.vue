<template>
  <div>

    <el-table :data="tableData5" border>
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
      <el-table-column label="用户id" prop="openId">
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
            <el-tag size="medium">{{ scope.row.state==0?'未提交':'待审核' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看任务详情</el-button> -->
          <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">审核通过</el-button>
          <el-button type="warning" size="mini" @click="handleDelete(scope.$index, scope.row)">审核驳回</el-button>
        </template>
      </el-table-column>

    </el-table>
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
      tmpImg: ""
    };
  },
  created() {
    this.findAllTask(this.$route.params.id);
    // console.log(this.$route.params.id);
  },

  methods: {
    findAllTask(taskID) {
      let that = this;
      this.$ajax
        .get("/taskOrder/taskOrderByTaskId", {
          params: {
            taskID: taskID,
            page: "1",
            pageSize: "100"
          }
        })
        .then(function(res) {
          console.log(res.data);
          console.log(res.data.content);
          that.tableData5 = res.data.content;
        });
    },
    DialogVisible(item) {
      this.tmpImg = item;
      this.centerDialogVisible = true;
    }
  }
};
</script>

