<template>
  <el-header>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <div>

      <el-dropdown>
        <span>admin

          <i class="el-icon-caret-bottom"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </el-header>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      isCollapse: true
    };
  },
  watch: {
    isCollapse(val) {
      this.$emit("collapseFun", this.isCollapse);
    }
  },
  methods: {
    ...mapMutations(["clearUser"]),
    logout() {
      this.clearUser();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  .iconfont {
    font-size: 30px;
    color: #ffffff;
  }
}
</style>


