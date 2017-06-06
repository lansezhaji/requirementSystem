<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<h3>我的账号</h3>
			</el-breadcrumb-item>
<!--         <el-button @click="getUserInfo()">查询</el-button>
        <el-button @click="debug()">debug</el-button> -->
		</el-breadcrumb>
		<el-row class="content">
			<el-form label-width="150px">
				<el-col :span="10">
					<el-form-item label="账号：" class="userMessage">
						<span >{{userForm.userName}}</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="密码：" class="userMessage">
						<span >******</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="姓名：" class="userMessage">
						<span >{{userForm.name}}</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="角色：" class="userMessage">
						<span >{{userForm.role}}</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="状态：" class="userMessage">
						<span >{{getUserStatus(userForm.userStatus)}}</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="创建时间：" class="userMessage">
						<span >{{getCreateTime(userForm.createTime)}}</span>						
					</el-form-item>

				</el-col>				
			</el-form>

		</el-row>
		
<!-- 		<el-row class="content">
			<el-row class="history title" >
				登录历史记录：
			</el-row>
			<el-row v-for="item in loginHistory" class="history">
				<el-col :span="6">{{item.date}}</el-col>
				<el-col :span="16">{{item.address}}</el-col>
			</el-row>
		</el-row> -->

	</el-row>


</template>
<script >
	export default{
		data : function(){
			var data = {
				userForm:{
					account:"",
					userStatus:1,
					createTime : 123
				},
				loginHistory: [ ],
				rules:{

				}
			}
			return data
		},
		methods:{
			debug:function(){
		        debugger
	      	},
			/**
			 * 获取用户基本信息
			 * @return {[type]} [description]
			 */
			getUserInfo : function(){
		        var that = this;
	            var url = '/api/dlmanagementtool/user/getUserInfo';
	            var reqData = {
	            	id : parseInt(localStorage.getItem("userId"))
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                  if (ok && data.status == '0') {
	                      that.userForm = data.data;
	                    }else if (data.status == -2 || data.status == -3) {
	                  	this.$store.commit('logout');
   						localStorage.setItem("token","");
   						this.$message.error("登录信息已经失效，请重新登录");
	                  } else {
	                      that.$message.error(data.msg);
	                  }	
	            });
			},
			/**
			 * 获取用户状态
			 * @param  {[type]} state [description]
			 * @return {[type]}       [description]
			 */
			getUserStatus : function(state){
				return state ? '启用' : '停用'
			},
			/**
			 * 获取创建时间
			 * @return {[type]} [description]
			 */
			getCreateTime : function(timeT){
				if (timeT) {
					var time = new Date(timeT);
					return time.toLocaleString();
				};
			}
		},
		beforeRouteEnter: function (to,from,next) {
	      next(vm => {
	        vm.getUserInfo();
	      });
	    }
	}
</script>
<style>
	.content{
		margin-left: 20px;
		margin-top: 20px;
	    padding: 20px;
	    border: 1px solid #d1dbe5;
	    border-radius: 4px;
	    background-color: #fff;
	    overflow: hidden;
	}
	.userMessage{
		text-align: left;
	}
	.history{
		line-height: 40px;
	}
	.history:hover{
		background-color: #eee;
	}
	.title{
		text-align:left;
		margin-bottom:30px;
		padding-left: 20px;
		background-color: #efefef;
		border-radius: 3px;
	}
</style>