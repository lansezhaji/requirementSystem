<template>
	<el-row class="bg" type="flex" justify="center">
		<el-col :span="10" :offset = "10" id="loginFrame"> 
			<el-row style="text-align:left;margin-left:100px">
				<h1>丹露需求及项目管理系统</h1>
			</el-row>
			<el-form label-width="150px" :model="loginForm" :rules="rules" ref="loginForm" style="text-align:left">
				<el-form-item label="账户：" prop="account" >
					<el-input v-model="loginForm.account" class="login-item" placeholder="请输入LDAP账号"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input v-model="loginForm.password" type="password" class="login-item"></el-input>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="login()" :disabled="!loginForm.account||!loginForm.password">登录</el-button>
	  				<el-checkbox v-model="isDisplayBg">加载背景</el-checkbox>
				</el-form-item>				
			</el-form>
		    <el-dialog
	            title="请完善您的个人信息："
	            :visible.sync="userUpdateDialog"
	            size="tiny" >
				<el-form label-width="150px" :model="userForm" :rules="rules" ref="userForm" style="text-align:left">
					<el-form-item label="登录账户：" style="text-align:left" required>
		                <el-col>
		                  {{userForm.account}}
		                </el-col>
		              </el-form-item>  
					<el-form-item label="真实姓名：" prop="trueName" >
						<el-input v-model="userForm.trueName" class="login-item"></el-input>
					</el-form-item>
					<el-form-item label="用户角色：" style="text-align:left" required>
		                {{userForm.role}}
		            </el-form-item>			
				</el-form>
	            
	            <span slot="footer" class="dialog-footer">
	              <el-button @click="userUpdateDialog = false">取 消</el-button>
	              <el-button type="primary" @click="updateUserInfo()">保 存</el-button>
	            </span>
	        </el-dialog>
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
    			account : "",
    			password:""
    		},
    		userUpdateDialog : false,
    		userForm : {
    			account : "",
    			trueName : "",
    			role : ""
    		},
    		rules:{
    			account:[
    				{required:true,message:"请输入用户名",trigger:'blur'}
    			],
    			password:[
    				{ required: true, message: '请输入密码', trigger: 'blur' },
    			],
    			trueName:[
    				{ required: true, message: '请输入您的真实姓名', trigger: 'blur' },
    			],
    			
    		}
    	}
      return data
    },
   	methods: {
   		login : function(){
   			var that = this;
   			this.$refs['loginForm'].validate((valide)=>{
   				if (valide) {
   					var reqData = {
   						account : that.loginForm.account,
   						userPassword : that.loginForm.password,
   					}
   					var url = '/api/dlmanagementtool/login/loginin';
		            this.$http.post(url,reqData).then(({
		                data,
		                ok,
		                statusText
		            }) => {
		                if (ok && data.status == '0') {
		                	// 判断是否初始化了姓名信息
		                	if (data.data.userName) {
			                	that.$store.state.user.token = data.data.token;
			                	that.$store.state.user.userName = data.data.account;
			                	that.$message.success(data.msg);
							    localStorage.setItem("token",data.data.token);
							    localStorage.setItem("superAdmin",data.data.superAdmin);
							    localStorage.setItem("memberAdmin",data.data.memberAdmin);
							    localStorage.setItem("versionAdmin",data.data.versionAdmin);
							    localStorage.setItem("requireAdmin",data.data.requireAdmin);
							    localStorage.setItem("userName",data.data.userName);		                		
							    localStorage.setItem("account",data.data.account);		                		
							    localStorage.setItem("userId",data.data.id);		                		
		                	}else{
		                		this.userForm.account = data.data.account
		                		this.userForm.role = data.data.role
		                		this.userForm.id = data.data.id
		                		localStorage.setItem("token",data.data.token);
		                		this.userUpdateDialog = true;
		                	}

						    // 判断用户权限
						    if (data.data.requireAdmin) {
				    	        that.$router.push({
						          userName:'requirementManagement' 
						        })
						    }else{
						    	that.$router.push({
						          userName:'versionList' 
						        })
						    }
		                } else {
		                	that.$message.error(data.msg);
		                }
		            });
   				}
   			})
   		},
   		/**
   		 * 保存用户基本信息
   		 * @return {[type]} [description]
   		 */
   		updateUserInfo : function(){
   			this.$refs['userForm'].validate((valide)=>{
   				if (valide) {
					var that = this;
					var url = "/api/dlmanagementtool/user/updateUserName"
					var reqData = {
						id : this.userForm.id,
						userName : this.userForm.trueName
					}
					this.$http.post(url,reqData).then(({
		                data,
		                ok,
		                statusText
		            }) => {
		                if (ok && data.status == '0') {
		                	that.userUpdateDialog = false;
		                	that.login();
		                }else {
		                  that.$message.error(data.msg);
		                }
		            });   					
   				};
   			})

   		},
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