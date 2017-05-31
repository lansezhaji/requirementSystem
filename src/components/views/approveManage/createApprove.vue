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
			<el-form label-width="150px" style="text-align:left" :model="approveForm" ref="approveForm" :rules="rules">

				<el-row >
					<el-col>
						<el-form-item label="审批类型：" class="userMessage" prop="applyType" required>
							<el-col >
								<el-radio-group v-model="approveForm.applyType" @change="applyTypeChange" :disabled="disabled">
									<el-radio  :label="1" >入版申请</el-radio>
									<el-radio  :label="2" >修改项目信息</el-radio>
								</el-radio-group>	
							</el-col>			
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item v-if="approveForm.applyType == 1" label="项目名称：" class="userMessage" prop="projectName">
							<el-col :span="8" >
								<el-input v-model="approveForm.projectName"></el-input>	
							</el-col>
							
						</el-form-item>
						<el-form-item v-else label="项目名称：" class="userMessage" >
							<el-col >
								<el-select v-model="approveForm.projectId" @change="getProjectDetail">
									<el-option :label="req.projectName" :value="req.id" v-for=" req in requireLise"></el-option>
								</el-select>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目分支：" class="userMessage" prop="projectBranch">
							<el-col :span="8">
								<el-input v-model="approveForm.projectBranch"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="需求内容：" class="userMessage" required>
							<el-row v-for="(content,index) in approveForm.requirementInfos">
								<el-col :span="8">
									{{content.requirementName}}
								</el-col>
								<el-col :span="3" :offset="1" >
									<span>产品经理：</span>
									<span>{{content.responsibleUserName}}</span>
								</el-col>
								<el-col :span="4" :offset="1" v-if="content.functionBugId">
									<span>Bugzilla ID：</span>
									<span>{{content.functionBugId}}</span>
								</el-col>
								<el-col :span="4">
									<el-button type="default" size="small" @click="deleteRequireMent(index)">删除</el-button>
								</el-col>
							</el-row>
							<el-autocomplete v-model="approveForm.requirementName" 
							:fetch-suggestions="querySearch"  placeholder="最多60个字符" 
							:trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
							<el-button type="primary" size="small" @click="addRequireMent" :disabled="!approveForm.requireTemp">增加需求</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="启动时间：" prop="startTime" required>
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
						<el-form-item label="计划转测时间：" prop="testTime" required>
							<el-date-picker
						      v-model="approveForm.testTime"
						      type="datetime"
						      placeholder="选择时间">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="计划QA时间：" prop="qaTime" required>
							<el-date-picker
						      v-model="approveForm.qaTime"
						      type="datetime"
						      placeholder="选择时间">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目经理：" class="userMessage"  prop="projectUserName">
							<el-col :span="8">
								<el-input v-model="approveForm.projectUserName"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="项目其他成员：" class="userMessage" prop="projectOthers">
							<el-col :span="15">
								<el-input v-model="approveForm.projectOthers"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="申请入版类型：" prop="versionTypeId">
							<el-select v-model="approveForm.versionTypeId" @change="getVersionList">
					            <el-option v-for="type in versionTypeList" :label="type.versionTypeName" :value="type.id"></el-option>
					        </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="选择版本号：" prop="versionId">
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
							  v-model="approveForm.remark">
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
			var selectValidate = (rule, value, callback) => {
		        if (!value || value.toString() == '') {
		          	callback(new Error('该项目为必填项'));
		        }else{
		        	callback();
		        }

		    }
		     var requireNameValid = (rule, value, callback) => {
				if (!value || this.$route.query.id)  {
				  callback();
				} else {
					var url = '/api/dlmanagementtool/requirement/checkNameRepeat';
					var reqData = {
						requirementName : value
					}
		            this.$http.post(url,reqData).then(({ data, ok, statusText }) => {
		                if (ok && data.status == '0' && !data.data) {
		                	callback();
		                }else{
		                  	callback(new Error('暂时没写，记得调一下'));
		                }
		            });
				}
			}
			var data = {
				pageFlage : false,//false :表示我发起的申请，true表示我审批的
				// isEditMode : true, //是否是编辑模式哦
				disabled : false,
				approveForm:{
					
					applyType : 1, //审批类型
					projectId : "",//项目ID，仅在修改项目信息时需要
					projectName : "", //审批名称
					requirementName : "",//缓存需求名称
					requireTemp : "",
					projectBranch : "",//审批分支

					approveContent : [{
						title:"",
						productManage : "",
						bugzId : ""
					},{
						title:"",
						productManage : "",
						bugzId : ""
					}],
					startTime : "",//审批启动时间
					testTime : "",//项目转测时间
					qaTime : "",//项目过QA时间
					remark:"",//备注内容
					requireName : "",
					approveTime : [],
					versionTypeId : "",
					versionId :"",
					projectUserName : "",
					projectOthers : "",//
					requirementInfos : [ ],
				},
				tableData: [ ],
				versionTypeList : [],//版本类型列表
				versionList : [],//版本号列表
				rules:{
					applyType: [{
						validator:selectValidate,trigger:'blur'
					}],
					projectName: [{
						required:true,message:"该项为必填项",trigger:'blur'
					},{
						validator:requireNameValid ,trigger:'blur'
					}],
					projectBranch: [{
						required:true,message:"该项为必填项",trigger:'blur'
					}],
					startTime: [{
						validator:selectValidate,trigger:'blur'
					}],
					testTime: [{
						validator:selectValidate,trigger:'blur'
					}],
					qaTime: [{
						validator:selectValidate,trigger:'blur'
					}],
					projectUserName: [{
						required:true,message:"该项为必填项",trigger:'blur'
					}],
					projectOthers: [{
						required:true,message:"该项为必填项",trigger:'blur'
					}],
					versionTypeId: [{
						validator:selectValidate,trigger:'blur'
					}],
					versionId: [{
						validator:selectValidate,trigger:'blur'
					}],
				},
				requireLise : [] //需求列表
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
			 * 搜索我发起的审批
			 * @return {[type]} [description]
			 */
			updateApproveInfo : function(){
				var that  = this;
				this.$refs['approveForm'].validate(valide =>{
					if (valide) {
						var versionTypeName = ""
						that.versionTypeList.forEach(function(item){
							if (item.id == that.approveForm.versionTypeId) {
								versionTypeName = item.versionTypeName
							};
						})
						var versionName = ""
						that.versionList.forEach(function(item){
							if (item.id == that.approveForm.versionId) {
								versionName = item.versionName
							};
						})

						var projectName = ""
						if (that.approveForm.applyType == 1) {
							projectName = that.approveForm.projectName
						}else{
							that.requireLise.forEach(function(item){
								if (item.id == that.approveForm.projectId) {
									projectName = item.projectName
								};
							})							
						}

						if (projectName == "") {
							this.$message.error("项目名称不能为空");
							return false;
						};
						// 获取需求列表
						var requireIds = new Set();
						this.approveForm.requirementInfos.forEach(function(item){
							requireIds.add(item.id);
						})
						var requireArr = [];
						requireIds.forEach(function(item){
							requireArr.push(item)
						})
						if (requireArr.length<=0) {
							this.$message.error("请至少选择一个需求");
							return false;
						};
						var reqData =  {
							 id : (that.approveForm.applyType == 2) ? that.approveForm.projectId : "",
						     applyType: that.approveForm.applyType,
						     projectName : projectName,
						     projectBranch: that.approveForm.projectBranch,
						     requirementIds: requireArr.toString(),
						     startTime: that.approveForm.startTime,
						     testTime: that.approveForm.testTime,
						     qaTime: that.approveForm.qaTime,
						     // projectUserId: null,
						     projectUserName: that.approveForm.projectUserName,
						     projectOthers: that.approveForm.projectOthers,
						     versionTypeId: that.approveForm.versionTypeId,
						     versionTypeName : versionTypeName ,
						     versionId: that.approveForm.versionId,
						     versionName : versionName,
						     remark: that.approveForm.remark,
						}
						console.log(reqData);

					    var url = "/api/dlmanagementtool/apply/save"
					    this.$http.post(url,reqData).then(({
					        data,
					        ok,
					        statusText
					    }) => {
					        if (ok && data.status == '0') {
					            that.$message.success("保存成功");
					            that.$router.push({
					            	name : "myApprove"
					            });
				        }else if (data.status == -2 || data.status == -3) {
		                  	this.$store.commit('logout');
	   						localStorage.setItem("token","");
	   						this.$message.error("登录信息已经失效，请重新登录");
		                  }  else {
					            that.$message.error(data.msg);
					        }
					    });
					}else{
						this.$message.error('请先正确填写表单信息');
					}
				})
				
			},
			/**
			 * 清空表单
			 * @return {[type]} [description]
			 */
			clearForm : function(){
				this.$refs['approveForm'].resetFields();
			},
			/**
			 * 获取项目详细信息
			 * @return {[type]} [description]
			 */
			getProjectDetail : function(){
	            var that  = this;
	            var url = "/api/dlmanagementtool/apply/getApplyById"
	            var reqData = {
	            	id : this.approveForm.projectId
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
						that.approveForm.projectBranch = data.data.projectBranch;//审批分支
						that.approveForm.startTime = data.data.startTime;//审批启动时间
						that.approveForm.testTime = data.data.testTime;//项目转测时间
						that.approveForm.qaTime = data.data.qaTime;//项目过QA时间
						that.approveForm.remark=data.data.remark;//备注内容
						that.approveForm.requireName = data.data.requireName;
						that.approveForm.versionTypeId = data.data.versionTypeId;
						that.approveForm.projectUserName = data.data.projectUserName;
						that.approveForm.projectOthers = data.data.projectOthers;//
						that.approveForm.requirementInfos = data.data.requirementInfos;

						setTimeout(function(){
							that.approveForm.versionId =data.data.versionId;
						},500)
	                } else if (data.status == 1) {
	                	that.approveForm.projectBranch = "";
	                	that.approveForm.projectName = "";
						that.approveForm.startTime = "";
						that.approveForm.testTime = "";
						that.approveForm.qaTime = "";
						that.approveForm.remark="";
						that.approveForm.requireName = "";
						that.approveForm.versionTypeId = "";
						that.approveForm.projectUserName = "";
						that.approveForm.projectOthers = "";
						that.approveForm.requirementInfos = "";
	                    that.$message.error(data.msg);
	                }
	            });
			},
			/**
			 * 申请类型更改
			 * @return {[type]} [description]
			 */
			applyTypeChange : function(){
				var that = this;
				if (parseInt(this.approveForm.applyType) == 2) {

			          var url = "/api/dlmanagementtool/apply/getPassedProjects"
			          this.$http.get(url).then(({
			              data,
			              ok,
			              statusText
			          }) => {
			              if (ok && data.status == '0') {
			                  that.requireLise = data.data;
			              } else {
			                  that.$message.error(data.msg);
			              }
			          });
				}else{
						that.approveForm.projectBranch = "";
						that.approveForm.startTime = "";
						that.approveForm.testTime = "";
						that.approveForm.qaTime = "";
						that.approveForm.remark="";
						that.approveForm.requireName = "";
						that.approveForm.versionTypeId = "";
						that.approveForm.projectUserName = "";
						that.approveForm.projectOthers = "";
						that.approveForm.requirementInfos = "";
				}
			},
			/**
			 * 添加需求
			 */
			addRequireMent :function(){
				var that = this;
				var isRepeat = false;
				 //先判断是否重复
				 this.approveForm.requirementInfos.forEach(function(item){
				 	if (item.id == that.approveForm.requireTemp.id) {
				 		that.$message.error("该需求已经在列表中，请勿重复添加");
				 		isRepeat = true;
				 	};
				 })
				 if (!isRepeat) {
						// 加入列表
						this.approveForm.requirementInfos.push({
							id : that.approveForm.requireTemp.id,
							requirementName : that.approveForm.requireTemp.value,
							responsibleUserName:that.approveForm.requireTemp.proposeUserName,
							functionBugId : that.approveForm.requireTemp.functionBugId
						})
				 };

				that.approveForm.requirementName = "";
				that.approveForm.requireTemp = "";
			},
			/**
			 * 删除需求
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			deleteRequireMent : function(index){
				if (this.approveForm.requirementInfos.length>1) {
					this.approveForm.requirementInfos.splice(index,1);
				};
				
			},
			querySearchItem : function(index){
				console.log("1111"+index);
			},
			/**
	         * 使用店铺联想输入
	         * @param  {[type]}   queryString 输入的值
	         * @param  {Function} cb          即callback,传入筛选后的数组
	         * @return {[type]}               [description]
	         */
	        querySearch(queryString, cb) {
	            var that = this;
	            that.associateList = [];
	            this.approveForm.requireTemp = ""
	            var url = "/api/dlmanagementtool/requirement/fuzzyQueryFinishedRequirement";
	            var reqData = {
	                requirementName: queryString,
	            };

	            this.$http.post(url, reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == 0) {
	                	var list = data.data;
	                    list.forEach(function(item) {
	                        var restaurant = {};
	                        restaurant.value = item.requirementName;
	                        restaurant.id = item.id;
	                        restaurant.proposeUserName = item.proposeUserName;
	                        restaurant.functionBugId = item.functionBugId
	                        that.associateList.push(restaurant);
	                    })
	                    cb(that.associateList);
	                }
	            });

	        },
	        /**
	         * 联想选中
	         * @param  {[type]} item 选中的条目
	         */
	        handleSelect(item) {
	        	this.approveForm.requireTemp = item;
	        	console.log(item);
	        },
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