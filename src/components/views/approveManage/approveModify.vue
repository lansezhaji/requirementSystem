<template>
	<el-row>
		<el-breadcrumb separator="/">
<!-- 			<el-breadcrumb-item>
				<h3>审批管理</h3>
			</el-breadcrumb-item> -->
			<el-breadcrumb-item>
				<h3>发起申请</h3>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-col :span="17">
			<el-row class="content">
				<el-row class="history title" >
					申请内容：
				</el-row>
				<el-form label-width="150px" >
					<el-row>
						<el-form-item label="审批类型：" class="userMessage">
							<el-col >
								{{getApproveType(approveNewDetail.applyType)}}
							</el-col>				
						</el-form-item>
						<el-form-item label="项目名称：" class="userMessage" >
							<el-col :span="8">
								{{approveNewDetail.projectName}}
							</el-col>
						</el-form-item>
						<el-form-item label-width="0" class="userMessage" >
							<el-row style="border-top:1px dashed gray"></el-row>
						</el-form-item>
						<el-row>
							<el-col :span="12">
								<el-row type="flex" justify="center">
									<el-col :span="6">
										<h3>修改前</h3>
									</el-col>
								</el-row>
								<el-form-item label="版本类型：" class="userMessage">
									{{approveOrgDetail.versionTypeName}}
								</el-form-item>
								<el-form-item label="版本号：" class="userMessage" >
										<el-col >
											{{approveOrgDetail.versionName}}
										</el-col>
								</el-form-item>
								<el-form-item label="需求内容：" class="userMessage" >
										<el-col v-for="require in approveOrgDetail.requirementInfos">
											{{require.requirementName}}
										</el-col>
								</el-form-item>
								<el-form-item label="启动时间：">
									<el-col style="text-align:left">
										{{approveOrgDetail.startTimeStr}}
									</el-col>
								</el-form-item>
								<el-form-item label="计划转测时间：">
									<el-col style="text-align:left">
										{{approveOrgDetail.testTimeStr}}
									</el-col>
								</el-form-item>
								<el-form-item label="计划QA时间：">
									<el-col style="text-align:left">
										{{approveOrgDetail.qaTimeStr}}
									</el-col>
								</el-form-item>
								
								<el-form-item label="开发负责人：" class="userMessage" >
									<el-col :span="8">
											{{approveOrgDetail.projectUserName}}
									</el-col>
								</el-form-item>
								<el-form-item label="项目其他成员：" class="userMessage" >
									<el-col :span="16">
										{{approveOrgDetail.projectOthers}}
									</el-col>
								</el-form-item>
								<el-form-item label="备注：" class="userMessage" >
									<el-col :span="16">
										{{approveOrgDetail.remark}}
									</el-col>
								</el-form-item>
								
							</el-col>
			<!-- 修改后 -->
							<el-col :span="12">
								<el-row type="flex" justify="center">
									<el-col :span="6">
										<h3>修改后</h3>
									</el-col>
								</el-row>
								<el-form-item label="版本类型：" class="userMessage">
									<el-col :class="getCompareClass('versionTypeName')">
										{{approveNewDetail.versionTypeName}}
									</el-col>
								</el-form-item>
								<el-form-item label="版本号：" class="userMessage" >
									<el-col :class="getCompareClass('versionName')">
										{{approveNewDetail.versionName}}
									</el-col>
								</el-form-item>
								<el-form-item label="需求内容：" class="userMessage" >
										<el-col v-for="(require,index) in approveNewDetail.requirementInfos" :class="compareProjectName(index)">
											{{require.requirementName}}
										</el-col>
								</el-form-item>
								<el-form-item label="启动时间：">
									<el-col style="text-align:left" :class="getCompareClass('startTimeStr')">
										{{approveNewDetail.startTimeStr}}
									</el-col>
								</el-form-item>
								<el-form-item label="计划转测时间：" >
									<el-col style="text-align:left" :class="getCompareClass('testTimeStr')">
										{{approveNewDetail.testTimeStr}}
									</el-col>
								</el-form-item>
								<el-form-item label="计划QA时间：">
									<el-col style="text-align:left" :class="getCompareClass('qaTimeStr')">
										{{approveNewDetail.qaTimeStr}}
									</el-col>
								</el-form-item>
								
								<el-form-item label="开发负责人：" class="userMessage" >
									<el-col :span="8" :class="getCompareClass('projectUserName')">
											{{approveNewDetail.projectUserName}}
									</el-col>
								</el-form-item>
								<el-form-item label="项目其他成员：" class="userMessage" >
									<el-col :span="16" :class="getCompareClass('projectOthers')">
										{{approveNewDetail.projectOthers}}
									</el-col>
								</el-form-item>
								<el-form-item label="备注：" class="userMessage" >
									<el-col :span="16" :class="getCompareClass('remark')">
										{{approveNewDetail.remark}}
									</el-col>
								</el-form-item>
								
							</el-col>

						</el-row>
						
										
					</el-row>		
				</el-form>
			</el-row>			
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


</template>
<script >
	export default{
		data : function(){
			var data = {
				approveId : "",
				applyUuid: "",
				approveOrgDetail : {},
				approveNewDetail : {},
				approveHistory : {}
			}
			return data
		},
		methods:{
			/**
			* 获取版本类型列表
			* @return {[type]} [description]
			*/
			getApproveDetail : function(){
	            var that  = this;
	            var url = "/api/dlmanagementtool/apply/modifyComparedInfo"
	            var reqData = {
	            	id : parseInt(this.approveId),
	            	applyUuid : this.applyUuid
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
	                	that.approveOrgDetail = data.data[1] || ""
	                    that.approveNewDetail = data.data[0] || ""

	                }else if (data.status == -2 || data.status == -3) {
	                  	this.$store.commit('logout');
   						localStorage.setItem("token","");
   						this.$message.error("登录信息已经失效，请重新登录");
	                  }  else {
	                    that.$message.error(data.msg);
	                }
	            });
			},
			getApproveType : function(type){
				var typeArray = ['','入版申请','项目信息修改'];
				return typeArray[type]
			},
			getCompareClass : function(name){
				if (this.approveOrgDetail[name] != this.approveNewDetail[name]) {
					return 'diff'
				};					
			},
			compareProjectName : function(index){
				if (this.approveOrgDetail.requirementInfos[index].requirementName != this.approveNewDetail.requirementInfos[index].requirementName) {
					return 'diff'
				};	
			},
			/**
			 * 时间转换
			 * @param  {[type]} time [description]
			 * @return {[type]}      [description]
			 */
			getTime : function(time){
				var timeStr = new Date(time);
				return timeStr.toLocaleString();
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
			/**
			 * 清空表单
			 * @return {[type]} [description]
			 */
			clearForm : function(){

			}
		},
		beforeRouteEnter: function(to, from, next) {
        next(vm => {
        		vm.approveId = vm.$route.query.id
        		vm.applyUuid = vm.$route.query.applyUuid
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
	.diff{
		color: red;
	}
</style>