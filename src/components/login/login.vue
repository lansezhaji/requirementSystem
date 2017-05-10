<template>
	<el-row class="bg">
		<el-col :span="8" :offset = "10"> 
			<el-row>
				<h1>丹露需求及项目管理系统</h1>
			</el-row>
			<el-form label-width="150px" :model="loginForm" :rules="rules" ref="loginForm">
				<el-form-item label="账户：" prop="account">
					<el-input v-model="loginForm.account"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input v-model="loginForm.password" type="password"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary">登录</el-button>
				</el-form-item>				
			</el-form>
		
		</el-col>

	</el-row>
</template>

<script>
  export default {
    name: 'rvSide',
    data: function() {
    	var data  ={
    		loginForm : {
    			account : "tanjunyi",
    			password:"12345"
    		},
    		rules:{
    			account:[
    				{required:true,message:"请输入用户名",trigger:'blur'}
    			],
    			password:[
    				{ required: true, message: '请输入密码', trigger: 'blur' },
    			]
    		}
    	}
      return data
    },
   	methods: {

    }
  }
</script>

<style >
	.bg{
		margin-top: 200px;
		/*background-color: lightgray;*/
	}
</style>