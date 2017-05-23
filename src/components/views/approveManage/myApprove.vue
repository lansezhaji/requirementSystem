<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<h3>我发起的</h3>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="content">
			<el-form label-width="150px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="审批单号：" class="userMessage">
							<el-input v-model="approveForm.approveNo"></el-input>					
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审批类型：" class="userMessage">
							<el-select v-model="approveForm.approveType">
								<el-option label="全部" value="01"></el-option>
							</el-select>						
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="版本类型：" class="userMessage">
							<el-select v-model="approveForm.versionType">
								<el-option label="全部" value="01"></el-option>
							</el-select>				
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="需求名称：" class="userMessage">
							<el-input v-model="approveForm.requireName"></el-input>					
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="申请时间：" class="userMessage">
							<el-date-picker
						      v-model="approveForm.approveTime"
						      type="daterange"
						      placeholder="选择日期范围">
						    </el-date-picker>					
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审批状态：" class="userMessage">
							<el-select v-model="approveForm.approveStatus">
								<el-option label="全部" value="01"></el-option>
							</el-select>						
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="pageFlage">
						<el-form-item label="申请人：" class="userMessage">
							<el-input v-model="approveForm.approvePersion"></el-input>					
						</el-form-item>
					</el-col>	
					<el-col :span="8">
						<el-form-item label="版本号：" class="userMessage">
							<el-select v-model="approveForm.approveVersion">
								<el-option label="1.0.0" value="01"></el-option>
							</el-select>						
						</el-form-item>
					</el-col>	
					<el-col :span="8">
						<el-form-item label="产品经理：" class="userMessage">
							<el-select v-model="approveForm.productManage">
								<el-option label="夏瑞" value="01"></el-option>
							</el-select>				
						</el-form-item>
					</el-col>					
				</el-row>

				<el-row type="flex" justify="center">
					<el-col :span="2">
						<el-button @click="queryMyApprove" type="primary">搜索</el-button>
					</el-col>
					<el-col :span="2">
						<el-button @click="clearForm">重置</el-button>
					</el-col>
				</el-row>			
			</el-form>

		</el-row>
		
		<el-row class="content">
			<el-row type="flex" justify="left" v-if="!pageFlage">
				<el-col :span="3">
					<router-link to="/createApprove">
						<el-button type="/createApprove">+发起新的审批</el-button>
					</router-link>
				</el-col>
			</el-row>
			<el-table :data="returnData.data" stripe style="width: 100%;text-align:left" label-width="150px">
				    <el-table-column prop="applyCode" label="审批单号" min-width="180px" > </el-table-column>
				    <el-table-column prop="applyType" label="审批类型" min-width="150px" > </el-table-column>
				    <el-table-column prop="createTimeStr" label="申请时间" min-width="180px"> </el-table-column>
				    <el-table-column prop="updateUserName" label="最后审批时间" min-width="180px"> </el-table-column>
				    <el-table-column prop="applyUserName" label="申请人" min-width="180px"> </el-table-column>
				    <el-table-column prop="versionTypeId" label="版本类型" min-width="150px"> </el-table-column>
				    <el-table-column prop="versionId" label="版本号" min-width="180px"> </el-table-column>
				    <el-table-column prop="projectName" label="需求名称" min-width="180px"> </el-table-column>
				    <el-table-column prop="projectUserName" label="产品经理" min-width="150px"> </el-table-column>
				    <el-table-column prop="applyStatus" label="审批状态" min-width="150px"> </el-table-column>
				    <el-table-column prop="address" label="操作" min-width="100px"> </el-table-column>
			  </el-table>
		</el-row>

	</el-row>


</template>
<script >
	export default{
		data : function(){
			var data = {
				pageFlage : false,//false :表示我发起的申请，true表示我审批的
				approveForm:{
					approveNo:"",
					approveType : "",
					versionType : "",
					requireName : "",
					approveTime : [],
					approveStatus : "",
					approveVersion : "",
					approvePersion : "",
					productManage : ""
				},
				returnData : {},
				rules:{

				}
			}
			return data
		},
		methods:{
			/**
			 * 搜索我发起的审批
			 * @return {[type]} [description]
			 */
			queryMyApprove : function(){
	            var that = this;
			    that.approveForm.versionId = "";
	            var url = '/api/dlmanagementtool/apply/proposedApply';
	            var reqData ={
	            	versionTypeId 	: this.approveForm.versionTypeId,
	              	curPage         : 1,
	              	size            : 10
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                  if (ok && data.status == '0') {
	                      that.returnData= data.data;
	                    } else {
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
        		vm.pageFlage = vm.$route.name == 'myApprove' 

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