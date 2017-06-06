<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<h3>人员管理</h3>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="content">
			<!-- 查询条件 -->
			<el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
				<el-col :span="5">
					<el-form-item label="账号：">
						<el-autocomplete size="small" :maxlength="parseInt(100)"
		                  class="inline-input"
		                  v-model="userForm.account"
		                  :fetch-suggestions="querySearch"
		                  placeholder="请输入内容"
		                  :trigger-on-focus="false"
		                  @select="handleSelect"
		                ></el-autocomplete>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="姓名：">
						<el-autocomplete size="small" :maxlength="parseInt(100)"
		                  class="inline-input"
		                  v-model="userForm.userName"
		                  :fetch-suggestions="queryNameSearch"
		                  placeholder="请输入内容"
		                  :trigger-on-focus="false"
		                  @select="handleNameSelect"
		                ></el-autocomplete>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="状态：">
						<el-select v-model="userForm.userStatus">
							<el-option label="全部" value="2"></el-option>
							<el-option label="启用" value="1"></el-option>
							<el-option label="停用" value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item >
						<el-col><el-checkbox v-model="userForm.requireAdmin" label="具有管理需求权限"></el-checkbox></el-col>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item >
						<el-col><el-checkbox v-model="userForm.versionAdmin" label="具有管理版本权限"></el-checkbox></el-col>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item >
						<el-col><el-checkbox v-model="userForm.memberAdmin" label="具有管理人员权限"></el-checkbox></el-col>
						
					</el-form-item>
				</el-col>
				<el-col >
					<el-form-item >
						<el-button type="primary" @click="queryUserList()">搜索</el-button>
					</el-form-item>
				</el-col>
			</el-form>
			<!-- 用户列表 -->
			
		</el-row>
		<el-row class="content">
			  <el-table :data="returnData.data" stripe style="width: 100%;text-align:left" >
				    <el-table-column  label="序号" style="text-align:center" >
				    	<template scope="scope">
				    		<el-col >
				    			{{scope.row.id}}
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="account" label="账号"  > </el-table-column>
				    <el-table-column prop="userName" label="姓名" > </el-table-column>
				    <el-table-column  label="管理需求" >
				    	<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			<i :class="checkStatus(scope.row.requireAdmin)"></i>
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="versionAdmin" label="管理版本" >
						<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			<i :class="checkStatus(scope.row.versionAdmin)"></i>
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="memberAdmin" label="管理人员" >
						<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			<i :class="checkStatus(scope.row.memberAdmin)"></i>
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column  label="状态" >
				    	<template scope="scope">
				    		<el-col >
				    			{{getUserStatus(scope.row.userStatus)}}
				    		</el-col>
				    	</template>

				    </el-table-column>
				    <el-table-column  label="操作" >
				    	<template  scope="scope">
				    		<el-tooltip content="当前用户暂无编辑权限" placement="top" :disabled="memberAdmin">
				    			<el-button type="text" @click="editUserMessage(scope.row)" :disabled="!memberAdmin">编辑</el-button>
				    		</el-tooltip>
				    	</template>
				    </el-table-column>
			  </el-table>
			  <el-dialog title="编辑账户" :visible.sync="editDialogVisible" size="tiny" >
				  <el-form label-width="150px">
				  	<el-form-item label="账户：" style="text-align:left">
				  		{{EditForm.account}}
				  	</el-form-item>
				  	<el-form-item label="姓名：" style="text-align:left">
				  		<el-col :span="12">
				  			<el-input v-model="EditForm.userName"></el-input>
				  		</el-col>
				  	</el-form-item>
				  	<el-form-item label="权限：" style="text-align:left">
				  		<el-col><el-checkbox label="具有管理需求权限" v-model="EditForm.requireAdmin"></el-checkbox></el-col>
						<el-col><el-checkbox label="具有管理版本权限" v-model="EditForm.versionAdmin"></el-checkbox></el-col>
						<el-col><el-checkbox label="具有管理人员权限" v-model="EditForm.memberAdmin"></el-checkbox></el-col>
				  	</el-form-item>
				  	<el-form-item label="状态：" style="text-align:left">
						<el-select v-model="EditForm.userStatus">
							<el-option label="启用" value="1"></el-option>
							<el-option label="停用" value="0"></el-option>
						</el-select>
					</el-form-item>
				  </el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="updateUserInfo">保 存</el-button>
				    <el-button type="default" @click="editDialogVisible = false">取 消</el-button>
				  </span>
				</el-dialog>
		      <el-pagination
		        @size-change="sizeChange"
		        @current-change="pageChange"
		        :current-page="returnData.currentPage"
		        :page-sizes="[10, 25, 50, 100]"
		        :page-size="userForm.size"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="returnData.totalCount">
		      </el-pagination>  
		</el-row>
	</el-row>


</template>
<script >
	export default{
		data : function(){
			var data = {
				userForm:{
					account:"",
					userName : "",
					userStatus:"2",
					requireAdmin : false,
					versionAdmin : false,
					memberAdmin : false,
					curPage : 1 ,
					size : 10
				},
				associateList:[],
				associateNameList:[],
				memberAdmin : false,//具有修改人员的权限
				returnData: {
					totalCount : 1
				},
				EditForm : {
					account:"",
					userName : "",
					userStatus:1,
					requireAdmin : false,
					versionAdmin : false,
					memberAdmin : false,
				},
				editDialogVisible : false,
				rules:{

				}
			}
			return data
		},
		methods:{
			queryUserList : function(){
				var that = this;

				var reqData = {
					curPage : that.userForm.curPage,
					size : that.userForm.size,
					data:[{
						account 		: that.userForm.account,
						userName	 		: that.userForm.userName,
						requireAdmin	: that.userForm.requireAdmin ? 1 : 0,
						versionAdmin	: that.userForm.versionAdmin ? 1 : 0,
						memberAdmin		: that.userForm.memberAdmin ? 1 : 0,
						userStatus		: parseInt(that.userForm.userStatus),						
					}]
 				}
				var url = "/api/dlmanagementtool/user/searchUserListInPage"
					this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
	                	this.returnData =  data.data;
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
			 * 检查用户权限
			 * @return {[type]} [description]
			 */
			checkStatus :function(value){
				if (value) {
					return 'el-icon-check'
				};
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
			 * 编辑用户信息
			 * @return {[type]} [description]
			 */
			editUserMessage: function(row){

				this.EditForm.id = row.id;
				this.EditForm.account = row.account;
				this.EditForm.userName = row.userName;
				this.EditForm.requireAdmin  = row.requireAdmin == 1 ;
				this.EditForm.memberAdmin = row.memberAdmin == 1;
				this.EditForm.versionAdmin = row.versionAdmin== 1;
				this.EditForm.userStatus = row.userStatus.toString();
				this.editDialogVisible = true;
			},
			/**
			* 翻页
			* @param  {[type]} val [description]
			* @return {[type]}     [description]
			*/
			pageChange : function(val){
				this.userForm.curPage = val;
				this.queryUserList(val)
			},
			sizeChange : function(val){
				this.userForm.size = val;
				this.queryUserList()
			},
        	/**
		       * 模糊查询
		       */
		       querySearch(queryString, cb) {
		              var that = this;
		              that.associateList = [];

		              var url = "/api/dlmanagementtool/user/fuzzyQueryUser";
		              var reqData = {
		                  account: queryString,
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
		                          restaurant.value = item.account;
		                          restaurant.id = item.id;
		                          that.associateList.push(restaurant);
		                      })
		                      cb(that.associateList);
		                  }
		              });

		          },
		           queryNameSearch(queryString, cb) {
		              var that = this;
		              that.associateNameList = [];

		              var url = "/api/dlmanagementtool/user/fuzzyQueryUser";
		              var reqData = {
		                  userName: queryString,
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
		                          restaurant.value = item.userName;
		                          restaurant.id = item.id;
		                          that.associateNameList.push(restaurant);
		                      })
		                      cb(that.associateNameList);
		                  }
		              });

		          },
		          handleSelect : function(val) {
			        	this.userForm.account = val.value
			      },
			      handleNameSelect : function(val) {
			        	this.userForm.userName = val.value
			      },
			/**
			 * 更新用户信息
			 * @return {[type]} [description]
			 */
			updateUserInfo : function(){
				var that = this;
				var url = "/api/dlmanagementtool/user/updateUser"
				var reqData = {
					id : this.EditForm.id,
					userName : this.EditForm.userName,
					requireAdmin : this.EditForm.requireAdmin ? 1 : 0,
					versionAdmin : this.EditForm.versionAdmin ? 1 : 0,
					memberAdmin : this.EditForm.memberAdmin ? 1 : 0,
					userStatus : parseInt(this.EditForm.userStatus) 
				}
				this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
	                	that.$message.success(data.msg);
	                	this.editDialogVisible = false;
	                	that.queryUserList();
	                }else if (data.status == -2 || data.status == -3) {
	                  	this.$store.commit('logout');
   						localStorage.setItem("token","");
   						this.$message.error("登录信息已经失效，请重新登录");
	                  }  else {
	                  that.$message.error(data.msg);
	                }
	            });
			},
		},
	    beforeRouteEnter: function (to,from,next) {
	        next(vm => {
	            vm.queryUserList();
	            vm.memberAdmin = (localStorage.getItem("memberAdmin")=='1' ? true : false);
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
	
</style>