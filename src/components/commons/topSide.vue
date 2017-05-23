<!-- 上边栏 -->
<template>
	<el-row class="topSide">
		<el-col :span="16" :offset="2">
			<h2>
				丹露需求及项目管理系统
			</h2> 
		</el-col>
		<el-col :span="6">
			<el-col  class="toptitle">
				<span>欢迎您：</span>
				<span>{{this.$store.state.user.tocken}}</span>
				<el-button type="default" class="logout" @click="logout()">退出登录</el-button>
			</el-col>
		</el-col>
	</el-row>
</template>

<script>
  export default {
    name: 'rvSide',
    data: function() {
      return {
        
      }
    },
   methods: {
   		logout :function(){
   			this.$store.commit('logout');
   		}
    }
  }
</script>

<style >
	.topSide{
		background: #eee;
	}
	.toptitle{
		line-height: 30px;
		margin-top: 20px;
	}
	.logout{
		background-color: rgba(0,0,0,0);
		border:1px solid white;
		color: green;
	}
</style>