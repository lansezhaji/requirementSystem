<template>
  <div class="rvSide">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">需求管理</template>
        <el-menu-item-group>
          <el-menu-item index="propertyManagement" class="sideBar"  @click="router('propertyManagement')">需求管理</el-menu-item>
          <el-menu-item index="versionPropertyManagement" class="sideBar"  @click="router('versionPropertyManagement')">属性管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">版本管理</template>
        <el-menu-item-group>
          <el-menu-item index="versionList" class="sideBar"  @click="router('versionList')">版本列表</el-menu-item>
          <el-menu-item index="requirementManagement" class="sideBar"  @click="router('requirementManagement')">版本类型管理</el-menu-item>
          <el-menu-item index="versionManagement" class="sideBar"  @click="router('versionManagement')">版本号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">审批管理</template>
        <el-menu-item-group>
          <el-menu-item index="myApprove" class="sideBar"  @click="router('myApprove')">我发起的</el-menu-item>
          <el-menu-item index="myExamined" class="sideBar"  @click="router('myExamined')">我审批的</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="userManage" @click="router('userManage')"> 人员管理</el-menu-item>

      <el-menu-item index="myAccount" @click="router('myAccount')">我的账号</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'rvSide',
    data: function() {
      return {
        
      }
    },
   methods: {
    router(name){
      this.$router.push({
        name:name
      })
    },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style >
  .rvSide {
    width: 100%;
    height: 100%;
  }
 .rvSide .sideBar {
    font-size: 14px;
    color: #666;
    line-height: 20px;
    text-align: right;
 }
 .rvSide .el-submenu__title {
  font-size: 16px;
 }
</style>