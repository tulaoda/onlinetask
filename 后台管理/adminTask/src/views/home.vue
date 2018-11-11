
<template>
  <el-container>
    <div class="left-slider">
      <mySlider :isCollapse="isCollapse"></mySlider>
    </div>
    <div class="right-main">
      <myHeader @collapseFun="handelCollapse"></myHeader>

      <el-main>
        <router-view></router-view>
      </el-main>
    </div>

  </el-container>

</template>

<style lang="scss" scoped>
.el-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width:auto;
  display: flex;
  .left-slider {
    width: auto;
  }
  .right-main {
    flex: 1;
    position: relative;
    .el-main {
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>


<script>
import myHeader from "@/components/layout/header.vue";
import mySlider from "@/components/layout/slider.vue";

export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handelCollapse(val) {
      this.isCollapse = val;
      console.log(val);
    }
  },
  components: {
    myHeader,
    mySlider
  }
};
</script>