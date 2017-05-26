<template>
  <div id="app">
    
    <el-row v-if="this.$store.state.user.token">
      <el-col>
          <top-side></top-side>
      </el-col>
      <el-col :span="3" >
        <rv-side></rv-side>
      </el-col>

      <el-col :span="21" style="padding:20px">
          <router-view></router-view>
      </el-col>
    </el-row>
    <login v-else >
    </login>
    
  </div>
</template>

<script>
import login from './components/login/login'
import rvSide from 'commons/rvSide'
import topSide from 'commons/topSide'
export default {
  name: 'app',
  components: {
    rvSide,
    login,
    topSide
  },
  data:function(){
      var data = {
        isLogin : false, // 暂时没使用
      }
      return data
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}


</style>
