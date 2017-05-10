<template>
  <div id="app">
    
    <el-row>
      <el-col :span="3">
        <rv-side></rv-side>
      </el-col>
      <el-col :span="21">
          <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import rvSide from 'commons/rvSide'
export default {
  name: 'app',
  components: {
    rvSide
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
  margin-top: 60px;
}
</style>
