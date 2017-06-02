<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<h3>我发起的审批申请</h3>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row >
			<el-col :span="16" class="content">
				<el-row class="history title" >
					申请内容：
				</el-row>
				<el-form label-width="150px" style="text-align:left"  ref="approveDetail" >
					<el-row >
						<el-col>
							<el-form-item label="审批类型：" class="userMessage" prop="applyType" required>
								<el-col >
									{{approveType(approveDetail.applyType)}}
								</el-col>				
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="项目名称：" class="userMessage" prop="projectName">
								{{approveDetail.projectName}}
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="项目分支：" class="userMessage" prop="projectBranch">
								<el-col :span="8">
									{{approveDetail.projectBranch}}
								</el-col>
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="需求内容：" class="userMessage" >
								<el-row v-for="require in approveDetail.requirementInfos">
									<el-col :span="12">
										{{require.requirementName}}
									</el-col>
									<el-col :span="6">
										<span>产品经理：</span>
										{{require.responsibleUserName}}
									</el-col>
									<el-col :span="6" v-if="require.functionBugId">
										<span>Bugzilla ID：</span>
										{{require.functionBugId}}
									</el-col>
								</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="启动时间：" prop="startTime" required>
								<el-col>
									{{approveDetail.createTimeStr}}
								</el-col>
								
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="计划转测时间：" prop="testTime" required>
								{{approveDetail.testTimeStr}}
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="计划QA时间：" prop="qaTime" required>
								{{approveDetail.qaTimeStr}}
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="项目经理：" class="userMessage"  prop="projectUserName">
								<el-col :span="8">
									{{approveDetail.projectUserName}}
								</el-col>
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="项目其他成员：" class="userMessage" prop="projectOthers">
								<el-col :span="15">
									{{approveDetail.projectOthers}}
								</el-col>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="申请入版类型：" prop="versionTypeId">
								{{approveDetail.versionTypeName}}
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="选择版本号：" prop="versionId">
								{{approveDetail.versionName}}
							</el-form-item>
						</el-col>

						<el-col :span="16">
							<el-form-item label="备注内容：" class="userMessage">
								{{approveDetail.remark}}		
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-col>
			<el-col :span="6"  class="content">
				<el-row class="history title" >
					审批记录：
				</el-row>
				<el-col style="text-align:left">
					<ul>
						<li v-for="list in approveHistory">
							{{getTime(list.operateTime)}}
							{{list.operateUserName}}
							{{list.operateComment}}
							<el-col v-if="list.applyComment" style="margin-left:20px">
								审批说明：{{list.applyComment}}
							</el-col>
							
						</li>
					</ul>
				</el-col>
			</el-col>
			
		</el-row>
		<el-row style="margin-top:30px">
			<el-button @click="returnLastPage">返回</el-button>
		</el-row>
	</el-row>


</template>
<script >
	export default{
		data : function(){
			var data = {
				approveId : "",
				approveDetail : {},
				approveHistory : []
			}
			return data
		},
		methods:{
			debug:function(){
		        debugger
	      	},
			/**
			* 获取版本类型列表
			* @return {[type]} [description]
			*/
			getApproveDetail : function(){
	            var that  = this;
	            var url = "/api/dlmanagementtool/apply/detail"
	            var reqData = {
	            	id : parseInt(this.approveId)
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
	                    that.approveDetail = data.data
	                }else if (data.status == -2 || data.status == -3) {
	                  	this.$store.commit('logout');
   						localStorage.setItem("token","");
   						this.$message.error("登录信息已经失效，请重新登录");
	                  }  else {
	                    that.$message.error(data.msg);
	                }
	            });
			},
			/**
			* 获取审批记录
			* @return {[type]} [description]
			*/
			getApproveHistory : function(){
	            var that  = this;
	            var url = "/api/dlmanagementtool/apply/applyLog"
	            var reqData = {
	            	applyId : parseInt(this.approveId)
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
	                    that.approveHistory = data.data
	                }else if (data.status == -2 || data.status == -3) {
	                  	this.$store.commit('logout');
   						localStorage.setItem("token","");
   						this.$message.error("登录信息已经失效，请重新登录");
	                  }  else {
	                    that.$message.error(data.msg);
	                }
	            });
			},
			approveType : function(type){
				if (parseInt(type) ==1) {
					return "入版申请"
				}else{
					return "修改项目信息"
				}
			},
			getTime : function(time){
				var timeStr = new Date(time);
				return timeStr.toLocaleString();
			},
			/**
			 * 返回上一页
			 * @return {[type]} [description]
			 */
			returnLastPage :function(){
				this.$router.go(-1)
			}

		},

		beforeRouteEnter: function(to, from, next) {
        	next(vm => {
        		vm.approveId = vm.$route.query.id 
        		vm.getApproveDetail();
        		vm.getApproveHistory();
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