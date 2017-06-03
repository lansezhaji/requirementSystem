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
				<span>{{name}}</span>
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
        name : localStorage.getItem("name")
      }
    },
   methods: {
   		logout :function(){
   			

			var url = '/api/dlmanagementtool/login/logout';
            this.$http.get(url).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                	this.$store.commit('logout');
   					localStorage.setItem("token","");
   					this.$message.success('注销成功');
                } else {
                	that.$message.error(data.msg);
                }
            });


   			
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