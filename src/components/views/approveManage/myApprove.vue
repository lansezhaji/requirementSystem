<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<h3>我发起的</h3>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="content">
			<el-form label-width="150px" ref="approveForm" :model="approveForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="审批单号：" class="userMessage" prop="approveNo">
							<el-col :span="16">
								<el-input v-model="approveForm.approveNo"></el-input>	
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="需求名称：" class="userMessage" prop="requireName">		
							<el-autocomplete size="small" :maxlength="parseInt(100)"
				                class="inline-input"
				                v-model="approveForm.requireName"
				                :fetch-suggestions="querySearch"
				                placeholder="请输入内容"
				                :trigger-on-focus="false"
				                @select="handleSelect"
				              ></el-autocomplete>		
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审批类型：" class="userMessage" prop="approveType">
							<el-select v-model="approveForm.approveType">
								<el-option label="全部" value=""></el-option>
								<el-option label="入版申请" value=1></el-option>
								<el-option label="修改项目信息" value=2></el-option>
							</el-select>						
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="版本类型：" class="userMessage" prop="versionType">
							<el-select v-model="approveForm.versionType" @change="getVersionList">
								<el-option label="全部" value=""></el-option>
								<el-option :label="type.versionTypeName" :value="type.id" v-for="type in initData.versionTypeList"></el-option>
							</el-select>				
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="选择版本号：" class="userMessage" prop="approveVersion">
							<el-select v-model="approveForm.approveVersion">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="type in versionList" :label="type.versionName" :value="type.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审批状态：" class="userMessage" prop="approveStatus">
							<el-select v-model="approveForm.approveStatus">
								<el-option label="全部" value=""></el-option>
								<el-option label="等待审批" value=1></el-option>
								<el-option label="通过" value=2></el-option>
								<el-option label="驳回" value=3></el-option>
								<el-option label="撤回" value=4></el-option>
							</el-select>						
						</el-form-item>
					</el-col>
					
					
					<el-col :span="8" v-if="!pageFlage">
						<el-form-item label="申请人：" class="userMessage" prop="approvePersion">
							<el-select  size="small" v-model="approveForm.approvePersion"  placeholder="请选择">
					            <el-option label="全部" value=""></el-option>
							    <el-option
							      v-for="item in userList"
							      :label="item.userName"
							      :value="item.id"
							      >
							    </el-option>
							</el-select>				
						</el-form-item>
					</el-col>	
						
					<el-col :span="8">
						<el-form-item label="产品经理：" class="userMessage" prop="responsibleUserId">
							<el-select  size="small" v-model="approveForm.responsibleUserId"  placeholder="请选择">
					            <el-option label="全部" value=""></el-option>
							    <el-option
							      v-for="item in userList"
							      :label="item.userName"
							      :value="item.id"
							      >
							    </el-option>
							</el-select>			
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="申请时间：" class="userMessage" prop="approveTime">
							<el-col :span="10" class="time">
								<el-date-picker
							      v-model="approveForm.createStartTime"
							      width="100px"
							      :picker-options="pickerOptions1"
                                  @change="datePicker1change"
							      placeholder="选择日期">
							    </el-date-picker>	
							</el-col>
							<el-col :span="1">
								-
							</el-col>
							<el-col :span="10" class="time">
								<el-date-picker
							      v-model="approveForm.createEndTime"
							      :picker-options="pickerOptions2"
                                  @change="datePicker2change"
							      placeholder="选择日期">
							    </el-date-picker>
							</el-col>
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
		<el-row type="flex" justify="left" v-if="pageFlage" style="margin-top:20px">
				<el-col :span="2">
					<router-link to="/createApprove">
						<el-button  type="text">+发起新的审批</el-button>
					</router-link>
				</el-col>
		</el-row>
		<el-row class="content">
			<el-table :data="returnData.data" stripe style="width: 100%;text-align:left;" label-width="150px">
				    <el-table-column prop="applyCode" label="审批单号" min-width="120px" > </el-table-column>
				    <el-table-column prop="applyType" label="审批类型" min-width="120px" >
						<template scope="scope">
							{{getApplyType(scope.row.applyType)}}
						</template>
				    </el-table-column>
				    <el-table-column prop="createTimeStr" label="申请时间" min-width="150px"> </el-table-column>
				    <el-table-column prop="updateTimeStr" label="最后审批时间" min-width="150px"> </el-table-column>
				    <el-table-column prop="userName" label="申请人" min-width="100px" v-if="!pageFlage" show-overflow-tooltip> </el-table-column>
				    <el-table-column prop="versionTypeId" label="版本类型" min-width="100px" show-overflow-tooltip>
				    	<template scope="scope">
				    		{{filterVertionType(scope.row.versionTypeId)}}
				    	</template>
				    </el-table-column>
				    <el-table-column prop="versionName" label="版本号" min-width="120px" show-overflow-tooltip> </el-table-column>
				    <el-table-column prop="projectName" label="需求名称" min-width="200px" show-overflow-tooltip>
				    	<template scope="scope">
				    		{{getRequireName(scope.row)}}
				    	</template>
				    </el-table-column>
				    <el-table-column prop="projectUserName" label="产品经理" min-width="100px" show-overflow-tooltip> </el-table-column>
				    <el-table-column prop="applyStatus" label="审批状态" min-width="100px" >
				    	<template scope="scope" >
				    		<el-col :class="applyStatusClass(scope.row.applyStatus)">
				    			{{filterApplyStatus(scope.row.applyStatus)}}
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="address" label="操作" min-width="140px" fixed="right">
				    	<template scope="scope">
				    		<el-row v-if="pageFlage">
				    			<el-col  style="text-align:center" :span="12">
			    					<router-link v-if="scope.row.applyType == 1" :to="{ name: 'approveDetail', query: {id:scope.row.id}}">
										<el-button type="text">查看</el-button>
									</router-link>
									<router-link v-else :to="{ name: 'approveModify', query: {id:scope.row.id,applyUuid:scope.row.applyUuid}}">
										<el-button type="text">查看</el-button>
									</router-link>
			    				</el-col>
			    				<el-col :span="12" style="text-align:center" v-if="scope.row.applyStatus == 1">
				    				<el-button type="text" @click="recalReplay(scope.row.id,false)">撤回</el-button>
				    			</el-col>
				    		</el-row>
				    		<el-row v-else>
					    		<el-col :span="8" style="text-align:center" v-if="scope.row.applyStatus == 1">
				    				<el-button type="text" @click="handelApprove(scope.row,true)">同意</el-button>
				    			</el-col>
				    			<el-col :span="8" style="text-align:center" v-if="scope.row.applyStatus == 1">
				    				<el-button type="text" @click="handelApprove(scope.row,false)">驳回</el-button>
				    			</el-col>
				    			<el-col :span="8" style="text-align:center">
				    				<router-link v-if="scope.row.applyType == 1" :to="{ name: 'approveDetail', query: {id:scope.row.id,applyUuid:scope.row.applyUuid}}">
										<el-button type="text">查看</el-button>
									</router-link>
									<router-link v-else :to="{ name: 'approveModify', query: {id:scope.row.id,applyUuid:scope.row.applyUuid}}">
										<el-button type="text">查看</el-button>
									</router-link>
				    			</el-col>	
				    		</el-row>
			    			
				    	</template>
				    </el-table-column>
			  </el-table>
			  	<el-dialog
				  title="提示"
				  :visible.sync="approveDialogVisible"
				  size="tiny" >
				  <el-form label-width="50px">
				  	<el-form-item style="text-align:left">
				  		您确定要<span style="font-size:16px;color:red">{{handelForm.idea}}</span>该需求项目的审批申请？
				  	</el-form-item>
				  	<el-form-item>
				  		<el-input
						  type="textarea"
						  :autosize="{ minRows: 2, maxRows: 4}"
						  :maxlength="50"
						  placeholder="可在此添加备注，50字以内"
						  v-model="handelForm.comment">
						</el-input>
				  	</el-form-item>
				  </el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="approveDialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="updateApprove">确 定</el-button>
				  </span>
				</el-dialog>
			  	<el-pagination
					@current-change="pageChange"
					:current-page.sync="approveForm.curPage"
					:page-size="approveForm.size"
					layout="total, prev, pager, next"
					:total="returnData.totalCount">
			    </el-pagination> 
		</el-row>
	</el-row>
</template>
<script >
	export default{
		data : function(){
			var data = {
				pageFlage : true,//true :表示我发起的申请，false表示我审批的
				approveForm:{
					approveNo:"",
					approveType : "",
					versionType : "",
					requireName : "",
					createStartTime : "",
	            	createEndTime   : "",
					approveStatus : "",
					approveVersion : "",
					approvePersion : "",
					responsibleUserId : "",
					curPage : 1,
					size : 10,
				},
				versionList : [],//版本号列表
				userList : [],
				initData : {
					versionTypeList : []
				},
				returnData : {
					totalCount : 1,
				},
				rules:{

				},
				approveDialogVisible : false,//审批弹窗控制
				handelForm : {
					agree: false,
					idea : "",
					pass : false
				},
				// 时间插件选项
				pickerOptions1: { },
            	pickerOptions2: { },
			}
			return data
		},
		methods:{
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
		                    that.initData.versionTypeList = data.data
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
		       * [bulkEdit 搜索]
		       * @return {[type]} [description]
		       */
		      getUserList : function(userName){
		        var that = this;

		        var reqData = {
		          curPage : 1,
		          size : 5,
		          data:[{
		            userName    : userName || "",      
		          }]
		        }
		        var url = "/api/dlmanagementtool/user/searchUserListInPage"
		          this.$http.post(url,reqData).then(({
		                  data,
		                  ok,
		                  statusText
		              }) => {
		                  if (ok && data.status == '0') {
		                    this.userList =  data.data.data;
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
			queryMyApprove : function(){
	            var that = this;
	            if (this.pageFlage) {
	            	var url = '/api/dlmanagementtool/apply/proposedApply';
	            }else{
	            	var url = '/api/dlmanagementtool/apply/approvedApply';
	            }
	            var reqData ={
	            	applyCode 		: this.approveForm.approveNo || null, //单号
	            	applyType 		: this.approveForm.approveType || null, //审批类型
	            	requirementName : this.approveForm.requireName.trim() || null ,//需求名称
	            	userId 			: parseInt(this.approveForm.approvePersion)||null,
	            	createStartTime : this.approveForm.createStartTime,
	            	createEndTime   : this.approveForm.createEndTime,
	            	applyStatus 	: parseInt(this.approveForm.approveStatus) ,//状态
	            	versionId 		: parseInt(this.approveForm.approveVersion) || null,
	            	responsibleUserId : parseInt(this.approveForm.responsibleUserId) || null,
	            	versionTypeId 	: parseInt(this.approveForm.versionType) || null ,
	              	curPage         : this.approveForm.curPage,
	              	size            : this.approveForm.size
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                  if (ok && data.status == '0') {
	                      that.returnData= data.data;
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
			    that.approveForm.approveVersion = "";
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
			 * 过滤审批类型
			 * @return {[type]} [description]
			 */
			getApplyType : function(type){
				if (parseInt(type) == 1) {
					return "入版申请"
				}else{
					return "修改项目信息"
				}
			},
		        /**
		       * 模糊查询
		       */
		       querySearch(queryString, cb) {
		              var that = this;
		              that.associateList = [];

		              var url = "/api/dlmanagementtool/requirement/fuzzyQueryRequirement";
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
		                          that.associateList.push(restaurant);
		                      })
		                      cb(that.associateList);
		                  }
		              });

		          },
		    /**
		       * [handleSelect 联想匹配函数选中]
		       * @param  {[type]} item [description]
		       * @return {[type]}      [description]
		       */
		      handleSelect:function(item) {
		          this.approveForm.requireName = item.value;
		      },
			/**
			 * 过滤版本类型
			 * @return {[type]} [description]
			 */
			filterVertionType  : function(type){
				var typeName = ""
				this.initData.versionTypeList.forEach(function(item){
					if (type == item.id) {
						typeName = item.versionTypeName
					};
				})
				return typeName
			},
			applyStatusClass : function(status){
				var classArray = ['','wait','pass','refuse','recall'];
				return classArray[status];
			},
			/**
			 * 过滤审批状态
			 * @return {[type]} [description]
			 */
			filterApplyStatus : function(status){
				var applyArray = ['','等待审批','通过','驳回','撤回'];
				return applyArray[status];
			},
			/**
			 * 获取需求名称
			 * @return {[type]} [description]
			 */
			getRequireName : function(row){
				var requrementName = [];
				if (row.requirementInfos.length >0) {
					row.requirementInfos.forEach(function(item){
						requrementName.push(item.requirementName)
					})
				}
				return requrementName.toString();
			},
			/**
	         * 时间插件--时间区间限制
	         * @param  {[type]} val [description]
	         * @return {[type]}     [description]
	         */
	        datePicker1change : function(val) {
	            let endDate = new Date(val);
	            this.pickerOptions2 = {
	                disabledDate(time) {
	                    return time.getTime() <  endDate - 2.88e7;
	                }
	            };
	        },
	        datePicker2change : function(val) {
	            let endDate = new Date(val);
	            this.pickerOptions1 = {
	                disabledDate(time) {
	                    return time.getTime() >  endDate - 2.88e7;
	                }
	            };
	        },
			/**
			 * 更新审批状态
			 * @return {[type]} [description]
			 */
			updateApprove : function(){
	            var that = this;
	            if (this.handelForm.pass) {
	            	var url = '/api/dlmanagementtool/apply/pass';
	            }else{
	            	var url = '/api/dlmanagementtool/apply/refuse';
	            }
	            var reqData ={
	            	id 		: this.handelForm.id,
	              	comment : this.handelForm.comment,
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                  if (ok && data.status == '0') {
	                      that.$message.success(data.msg);
	                      that.approveDialogVisible = false;
	                      that.queryMyApprove();
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
			 * 撤回
			 * @return {[type]} [description]
			 */
			recalReplay : function(id){
	            var that = this;
	            var url = '/api/dlmanagementtool/apply/recall';
	            var reqData ={
	            	id 		: id,
	            }
	            this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                  if (ok && data.status == '0') {
	                      that.$message.success(data.msg);
	                      that.approveDialogVisible = false;
	                      that.queryMyApprove();
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
				this.$refs['approveForm'].resetFields();
				this.approveForm.createStartTime = "";
				this.approveForm.createEndTime = "";
			},
			pageChange : function(val){
				this.approveForm.curPage = val;
				this.queryMyApprove(val)
			},
			/**
			 * 处理审批申请
			 * @return {[type]} [description]
			 */
			handelApprove : function(row,flag){
				this.handelForm.id = row.id
				this.handelForm.idea = flag ? "同意" : "驳回"
				this.handelForm.pass = flag
				this.handelForm.comment = ""
				this.approveDialogVisible = true
			}
		},
		beforeRouteEnter: function(to, from, next) {
        next(vm => {
        		vm.pageFlage = vm.$route.name == 'myApprove' 
        		vm.getVersionTypeList();
        		vm.queryMyApprove();
        		vm.getUserList();
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
	.wait{
		background-color: orange;
		text-align: center;
	}
	.pass{
		background-color: #8bc34a ;
		text-align: center;
	}
	.refuse{
		background-color: red;
		text-align: center;
	}
	.recall {
		background-color: gray;
		color: white;
		text-align: center;
	}
	.el-date-editor.el-input{
		max-width: 150px ;
	}
</style>