<template>
	<el-row class="bg" type="flex" justify="center">
		<el-col :span="10" :offset = "8" id="loginFrame"> 
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
					<el-button type="primary" @click="login()">登录</el-button>
				</el-form-item>				
			</el-form>
			<el-col id="checkbox">
	  			<el-checkbox v-model="isDisplayBg">加载背景</el-checkbox>
			</el-col>
		</el-col>
		<el-col v-if="isDisplayBg">
			<iframe id="background" src="http://www.jq22.com/js/a5.html"></iframe> 
		</el-col>
		
	</el-row>
</template>

<script>
  export default {
    name: 'rvSide',
    data: function() {
    	var data  ={
    		isDisplayBg : false,
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
   		login : function(){
   			var that = this;
   			this.$refs['loginForm'].validate((valide)=>{
   				if (valide) {
   					that.$store.state.user.tocken = 'sld8e(Dl2'
   				}
   			})
   		}
    }
  }
</script>

<style >

	#loginFrame{
		margin-top: 100px;
		position: absolute;
		top: 0;
		left: 0;
		color: gray;
	}
	#background{
	  width: 100%;
	  height: 600px;
	  z-index: -1;
	}
	#checkbox{
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
</style>