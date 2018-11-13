<template>
  <div>

    <el-table :data="tableData5">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">
            <router-link :to='{name:"taskDetail", params:{ id:scope.row.taskId } }'> 查看任务详情</router-link>
          </el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
      tmpImg: ""
    };
  },
  created() {
    this.findAllTask();
  },

  methods: {
    findAllTask(state) {
      let that = this;
      this.$ajax
        .get("/task/findAllTask", {
          params: {
            state: "1",
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

