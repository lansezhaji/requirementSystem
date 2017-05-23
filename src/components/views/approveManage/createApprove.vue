<template>
	<el-row>
		<el-breadcrumb separator="/">
<!-- 			<el-breadcrumb-item>
				<h3>审批管理</h3>
			</el-breadcrumb-item> -->
			<el-breadcrumb-item>
				<h3>发起申请</h3>
			</el-breadcrumb-item>
			<el-button @click="getUserInfo()">查询</el-button>
        	<el-button @click="debug()">debug</el-button>
		</el-breadcrumb>
		<el-row class="content">
			<el-row class="history title" >
				申请内容：
			</el-row>
			<el-form label-width="150px" style="text-align:left">

				<el-row >
					<el-col>
						<el-form-item label="审批类型：" class="userMessage">
							<el-col v-if="isEditMode">
								<el-radio-group v-model="approveForm.applyType" >
									<el-radio  :label="1" >入版申请</el-radio>
									<el-radio  :label="2" >修改项目信息</el-radio>
								</el-radio-group>	
							</el-col>
							<el-col v-else>
								{{approveForm.applyType}}
							</el-col>				
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目名称：" class="userMessage" >
							<el-col :span="8">
								<el-input v-model="approveForm.projectName"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目分支：" class="userMessage">
							<el-col :span="8">
								<el-input v-model="approveForm.projectBranch"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="需求内容：" class="userMessage" >
							<el-row v-for="content in approveForm.approveContent">
								<el-col :span="8">
									<el-input v-model="content.title"></el-input>	
								</el-col>
								<el-col :span="3" :offset="1" >
									<span>产品经理：</span>
									<span>{{content.productManage}}</span>
								</el-col>
								<el-col :span="4" :offset="1">
									<span>Bugzilla ID：</span>
									<span>{{content.bugzId}}</span>
								</el-col>
								<el-col :span="4">
									<el-button type="primary" size="small">增加需求</el-button>
									<el-button type="default" size="small">删除</el-button>
								</el-col>
							</el-row>
							
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="启动时间：">
							<el-col>
								<el-date-picker
							      v-model="approveForm.startTime"
							      type="datetime"
							      placeholder="选择时间">
							    </el-date-picker>	
							</el-col>
							
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="计划转测时间：">
							<el-date-picker
						      v-model="approveForm.testTime"
						      type="datetime"
						      placeholder="选择时间">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="计划QA时间：">
							<el-date-picker
						      v-model="approveForm.qaTime"
						      type="datetime"
						      placeholder="选择时间">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目经理：" class="userMessage" >
							<el-col :span="8">
								<el-input v-model="approveForm.productManage"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目其他成员：" class="userMessage" >
							<el-col :span="16">
								<el-input v-model="approveForm.projectOthers"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="申请入版类型：">
							<el-select v-model="approveForm.versionTypeId" @change="getVersionList">
					            <el-option v-for="type in versionTypeList" :label="type.versionTypeName" :value="type.id"></el-option>
					        </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="选择版本号：">
							<el-select v-model="approveForm.versionId">
								<el-option v-for="type in versionList" :label="type.versionName" :value="type.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="16">
						<el-form-item label="备注内容：" class="userMessage">
							<el-input
							  type="textarea"
							  :rows="3"
							  placeholder="请输入内容"
							  v-model="approveForm.comment">
							</el-input>			
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :span="2">
						<el-button @click="updateApproveInfo" type="primary">提交</el-button>
					</el-col>
				</el-row>			
			</el-form>

		</el-row>

	</el-row>


</template>
<script >
	export default{
		data : function(){
			var data = {
				pageFlage : false,//false :表示我发起的申请，true表示我审批的
				isEditMode : true, //是否是编辑模式哦
				approveForm:{
					
					applyType : 1, //审批类型
					projectName : "中心化改造", //审批名称
					projectBranch : "2017.13",//审批分支
					approveContent : [{
						title:"中心化改造项目",
						productManage : "夏瑞",
						bugzId : "10026"
					},{
						title:"",
						productManage : "夏瑞",
						bugzId : "10026"
					}],
					startTime : [],//审批启动时间
					testTime : [],//项目转测时间
					qaTime : [],//项目过QA时间
					comment:"123",//备注内容
					requireName : "zhong",
					approveTime : [],
					versionTypeId : "01",
					versionId :"",
					productManage : "张虎",
					projectOthers : "其他成员",//
				},
				tableData: [ ],
				versionTypeList : [],//版本类型列表
				versionList : [],//版本号列表
				rules:{
					// projectName : [{
					// 	required:true,message:"该项为必填项",trigger:'blur'
					// }],
					// projectBranch:[{
					// 	required:true,message:"该项为必填项",trigger:'blur'
					// }],
					// productManage:[{
					// 	required:true,message:"该项为必填项",trigger:'blur'
					// }]
				}
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
			getVersionTypeList : function(){
			    var that  = this;
			    var url = "/api/dlmanagementtool/versiontype/list"
			    this.$http.get(url).then(({
			        data,
			        ok,
			        statusText
			    }) => {
			        if (ok && data.status == '0') {
			            
			            that.versionTypeList = data.data
			        } else {
			            that.$message.error(data.msg);
			        }
			    });
			},
			/**
			 * 获取版本号列表
			 * @return {[type]} [description]
			 */
			getVersionList : function(){
	            var that = this;
			    that.approveForm.versionId = "";
	            var url = '/api/dlmanagementtool/version/list';
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
	                      that.versionList= data.data.data;
	                    } else {
	                      that.$message.error(data.msg);
	                  }
	            });
			},
			/**
			 * 搜索我发起的审批
			 * @return {[type]} [description]
			 */
			updateApproveInfo : function(){
				console.log(this.approveForm);
				var reqData =  {
				     applyType: this.approveForm.applyType,
				     projectName: this.approveForm.projectName,
				     projectBranch: this.approveForm.projectBranch,
				     requirementIds: "1,2",
				     startTime: this.approveForm.startTime,
				     testTime: this.approveForm.testTime,
				     qaTime: this.approveForm.qaTime,
				     projectUserId: null,
				     projectUserName: "张虎",
				     projectOthers: "陈思宇，王国豪",
				     versionTypeId: 1,
				     versionId: 2,
				     remark: "备注"
				}
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
        		vm.getVersionTypeList();
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