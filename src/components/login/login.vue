<template>
	<el-row class="bg" type="flex" justify="center">
		<el-col :span="10" :offset = "10" id="loginFrame"> 
			<el-row style="text-align:left;margin-left:100px">
				<h1>丹露需求及项目管理系统</h1>
			</el-row>
			<el-form label-width="150px" :model="loginForm" :rules="rules" ref="loginForm" style="text-align:left">
				<el-form-item label="账户：" prop="account" >
					<el-input v-model="loginForm.account" class="login-item"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input v-model="loginForm.password" type="password" class="login-item"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="login()">登录</el-button>
	  				<el-checkbox v-model="isDisplayBg">加载背景</el-checkbox>
				</el-form-item>				
			</el-form>
			
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
    			account : "majun@danlu.com",
    			password:"majun123"
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

   					// that.$store.state.user.tocken = 'sld8e(Dl2'
   					var reqData = {
   						userName : that.loginForm.account,
   						userPassword : that.loginForm.password,
   					}
   					// var url = process.env.API_ROOT + 'dlmanagementtool/login/loginin';
   					var url = '/api/dlmanagementtool/login/loginin';
		            this.$http.post(url,reqData).then(({
		                data,
		                ok,
		                statusText
		            }) => {
		                if (ok && data.status == '0') {
		                	that.$store.state.user.token = data.data.token;
		                	that.$store.state.user.name = data.data.userName;
		                	that.$message.success(data.msg);
						    localStorage.setItem("token",data.data.token);
						    localStorage.setItem("name",data.data.userName);
						    // 判断用户权限
						    if (data.data.requireAdmin) {
				    	        that.$router.push({
						          name:'requirementManagement' 
						        })
						    }else{
						    	that.$router.push({
						          name:'versionList' 
						        })
						    }
		                } else {
		                	that.$message.error(data.msg);
		                }
		            });
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
	.login-item{
		text-align: left;
		max-width: 300px;
	}
	#background{
	  width: 100%;
	  min-height: 700px;
	  z-index: -1;
	}
	#checkbox{
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
</style>