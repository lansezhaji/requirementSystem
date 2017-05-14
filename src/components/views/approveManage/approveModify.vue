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
						<el-col >
							项目信息修改
						</el-col>				
					</el-form-item>
					<el-form-item label="项目名称：" class="userMessage" >
						<el-col :span="8">
							Marorder	
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
								WEB
							</el-form-item>
							<el-form-item label="版本号：" class="userMessage" >
									<el-col :span="8">
										release-v2017.0
									</el-col>
							</el-form-item>
							<el-form-item label="需求内容：" class="userMessage" >
									<el-col >
										是对方的酸辣粉就哦我了解的是否了解
									</el-col>
							</el-form-item>
							<el-form-item label="启动时间：">
								<el-col style="text-align:left">
									2017-03-10 17:23:33
								</el-col>
							</el-form-item>
							<el-form-item label="计划转测时间：">
								<el-col style="text-align:left">
									2017-03-10 15:23:11
								</el-col>
							</el-form-item>
							<el-form-item label="计划QA时间：">
								<el-col style="text-align:left">
									2017-03-10 15:23:11
								</el-col>
							</el-form-item>
							
							<el-form-item label="开发负责人：" class="userMessage" >
								<el-col :span="8">
									{{approveForm.productManage}}	
								</el-col>
							</el-form-item>
							<el-form-item label="测试负责任：" class="userMessage" >
								<el-col :span="8">
									王国豪
								</el-col>
							</el-form-item>
							<el-form-item label="发版负责任：" class="userMessage" >
								<el-col :span="8">
									谢星
								</el-col>
							</el-form-item>
							<el-form-item label="项目其他成员：" class="userMessage" >
								<el-col :span="16">
									何苗，陈思雨，张可可
								</el-col>
							</el-form-item>
							<el-form-item label="备注：" class="userMessage" >
								<el-col :span="16">
									因受到中心化影响，该项目暂时延迟
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
								APP
							</el-form-item>
							<el-form-item label="版本号：" class="userMessage" >
									<el-col :span="8">
										release-v2017.13
									</el-col>
							</el-form-item>
							<el-form-item label="需求内容：" class="userMessage" >
									<el-col >
										是对方的酸辣粉就哦我了解的是否了解
									</el-col>
							</el-form-item>
							<el-form-item label="启动时间：">
								<el-col style="text-align:left">
									2017-03-10 17:23:33
								</el-col>
							</el-form-item>
							<el-form-item label="计划转测时间：">
								<el-col style="text-align:left">
									2017-03-10 15:23:11
								</el-col>
							</el-form-item>
							<el-form-item label="计划QA时间：">
								<el-col style="text-align:left">
									2017-03-10 15:23:11
								</el-col>
							</el-form-item>
							
							<el-form-item label="开发负责人：" class="userMessage" >
								<el-col :span="8">
									{{approveForm.productManage}}	
								</el-col>
							</el-form-item>
							<el-form-item label="测试负责任：" class="userMessage" >
								<el-col :span="8">
									王国豪
								</el-col>
							</el-form-item>
							<el-form-item label="发版负责任：" class="userMessage" >
								<el-col :span="8">
									谢星
								</el-col>
							</el-form-item>
							<el-form-item label="项目其他成员：" class="userMessage" >
								<el-col :span="16">
									何苗，陈思雨，张可可
								</el-col>
							</el-form-item>
							<el-form-item label="备注：" class="userMessage" >
								<el-col :span="16">
									因受到中心化影响，该项目暂时延迟
								</el-col>
							</el-form-item>
							
						</el-col>

					</el-row>
					
									
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