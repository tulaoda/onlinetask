<template>
  <el-table :data="tableData5" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <!-- <el-form-item label="用户id">
            <span>{{ props.row.id }}</span>
          </el-form-item> -->
          <el-form-item label="用户openId">
            <span>{{ props.row.openid }}</span>
          </el-form-item>
        </el-form>  
      </template>
    </el-table-column>
      <el-table-column label="ID" prop="id">
    </el-table-column>
    <el-table-column label="姓名" prop="name">
    </el-table-column>
    <el-table-column label="收货人" prop="address">
    </el-table-column>
    <el-table-column label="电话" prop="telephone">
    </el-table-column>
    <el-table-column label="地址" prop="address">
    </el-table-column>
    <el-table-column label="支付宝号" prop="alipay">
    </el-table-column>
    <el-table-column label="微信号" prop="wechat">
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData5: []
    };
  },
  created() {
    this.findAllUser();
  },
  methods: {
    findAllUser(state) {
      let that = this;
      this.$ajax
        .get("/user/findAllUser", {
          //   params: {
          //     page: "1",
          //     pageSize: "100"
          //   }
        })
        .then(function(res) {
          console.log(res.data);
          that.tableData5 = res.data.data;
        });
    }
  }
};
</script>
