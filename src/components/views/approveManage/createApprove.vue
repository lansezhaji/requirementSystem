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
		<el-row class="content">
			<el-row class="history title" >
				申请内容：
			</el-row>
			<el-form label-width="150px" >
				<el-row>
					<el-form-item label="审批类型：" class="userMessage">
						<el-col v-if="isEditMode">
							<el-radio-group v-model="approveForm.approveType" >
								<el-radio label="01">入版申请</el-radio>
								<el-radio label="02">修改项目信息</el-radio>
							</el-radio-group>	
						</el-col>
						<el-col v-else>
							{{approveForm.approveType}}
						</el-col>				
					</el-form-item>
					<el-form-item label="项目名称：" class="userMessage" >
						<el-col :span="8">
							<el-input v-model="approveForm.approveName"></el-input>	
						</el-col>
					</el-form-item>
					<el-form-item label="项目分支：" class="userMessage">
						<el-col :span="8">
							<el-input v-model="approveForm.approveBranch"></el-input>	
						</el-col>
					</el-form-item>
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
					<el-col :span="8">
						<el-form-item label="启动时间：">
							<el-date-picker
						      v-model="approveForm.approveStart"
						      type="daterange"
						      placeholder="选择日期范围">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="计划转测时间：">
							<el-date-picker
						      v-model="approveForm.approveTest"
						      type="daterange"
						      placeholder="选择日期范围">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="计划QA时间：">
							<el-date-picker
						      v-model="approveForm.approveQA"
						      type="daterange"
						      placeholder="选择日期范围">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-form-item label="项目经理：" class="userMessage" >
						<el-col :span="8">
							<el-input v-model="approveForm.productManage"></el-input>	
						</el-col>
					</el-form-item>
					<el-form-item label="项目其他成员：" class="userMessage" >
						<el-col :span="16">
							<el-input v-model="approveForm.productManage"></el-input>	
						</el-col>
					</el-form-item>
					<el-col :span="6">
						<el-form-item label="申请入版类型：">
							<el-select v-model="approveForm.versionType">
								<el-option label="WEB" value="01"></el-option>
								<el-option label="APP" value="02"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="选择版本号：">
							<el-select v-model="approveForm.approveVersion">
								<el-option label="release-v2017.10" value="01"></el-option>
								<el-option label="release-v2017.13" value="02"></el-option>
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
						<el-button @click="queryMyApprove" type="primary">提交</el-button>
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
					
					approveType : "01", //审批类型
					approveName : "中心化改造", //审批名称
					approveBranch : "2017.13",//审批分支
					approveContent : [{
						title:"中心化改造项目",
						productManage : "夏瑞",
						bugzId : "10026"
					},{
						title:"",
						productManage : "夏瑞",
						bugzId : "10026"
					}],
					approveStart : [],//审批启动时间
					approveTest : [],//项目转测时间
					approveQA : [],//项目过QA时间
					comment:"123",//备注内容
					versionType : "02",
					requireName : "zhong",
					approveTime : [],
					approveVersion : "01",
					productManage : "张虎",
				},
				tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '1518 弄'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          address: '1517 弄'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          address: '1519 弄'
		        }, {
		          date: '2016-05-03',
		          name: '王小虎',
		          address: '弄'
		        }],
				rules:{
					// approveName : [{
					// 	required:true,message:"该项为必填项",trigger:'blur'
					// }],
					// approveBranch:[{
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
			/**
			 * 搜索我发起的审批
			 * @return {[type]} [description]
			 */
			queryMyApprove : function(){

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