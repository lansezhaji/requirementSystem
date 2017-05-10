<template>
  <div class="rvSide">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">需求管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" style="margin-left:40px;" @click="toRequirementManagement">需求管理</el-menu-item>
          <el-menu-item index="1-2" class="sideBar" @click="toPropertyManagement">属性管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">版本管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1" style="margin-left:40px;" @click="toVersionList">版本列表</el-menu-item>
          <el-menu-item index="2-2" class="sideBar" @click="toVersionManagement">版本类型管理</el-menu-item>
          <el-menu-item index="2-1" style="margin-left:40px;" @click="toVersion">版本号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">审批管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1" style="margin-left:40px;">我发起的</el-menu-item>
          <el-menu-item index="3-2" class="sideBar">我审批的</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">人员管理</el-menu-item>
      <el-menu-item index="4">我的账号</el-menu-item>
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
   /**
    * 统计按钮
    */    
   toRequirementManagement() {
    // this.$http.get('http://localhost:3003/users').then(({data})=>{
    //   console.log(data)
    // })
    this.$router.push({
      name:'requirementManagement'
    })
   },
   toPropertyManagement() {
    this.$router.push({
      name:'propertyManagement'
    })
   },
   toVersionList(){
    this.$router.push({
      name:'versionList'
    })
   },
   toVersionManagement(){
    this.$router.push({
      name:'versionPropertyManagement'
    })
   },
   toVersion() {
     this.$router.push({
      name:'versionManagement'
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
  margin-left: 40px;
 }
 .rvSide .el-submenu__title {
  font-size: 20px;
 }
</style>