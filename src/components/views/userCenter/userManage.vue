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
				<el-col :span="6">
					<el-form-item label="账号：">
						<el-input v-model="userForm.account"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="姓名：">
						<el-input v-model="userForm.account"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="状态：">
						<el-select v-model="userForm.userStatus">
							<el-option label="启用" value="01"></el-option>
							<el-option label="停用" value="02"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item >
						<el-col><el-checkbox label="具有管理需求权限"></el-checkbox></el-col>
						<el-col><el-checkbox label="具有管理版本权限"></el-checkbox></el-col>
						<el-col><el-checkbox label="具有管理人员权限"></el-checkbox></el-col>
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
			  <el-table :data="tableData" stripe style="width: 100%;text-align:left" >
				    <el-table-column prop="id" label="序号"  > </el-table-column>
				    <el-table-column prop="userName" label="账号"  > </el-table-column>
				    <el-table-column prop="name" label="姓名" > </el-table-column>
				    <el-table-column  label="管理需求" >
				    	<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			<i :class="checkStatus(scope.requireAdmin)"></i>
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="versionAdmin" label="管理版本" >
						<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			<i :class="checkStatus(scope.versionAdmin)"></i>
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="memberAdmin" label="管理人员" >
						<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			<i :class="checkStatus(scope.memberAdmin)"></i>
				    		</el-col>
				    	</template>
				    </el-table-column>
				    <el-table-column  label="状态" >
				    	<template scope="scope">
				    		<el-col style="color:#2fa6ff" >
				    			{{scope.userStatus | userStatus}}
				    		</el-col>
				    	</template>

				    </el-table-column>
				    <el-table-column  label="操作" >
				    	<template  scope="scope">
				    		<el-button type="text" @click="editUserMessage(scope.id)">编辑</el-button>
				    	</template>
				    </el-table-column>
			  </el-table>
			  <el-dialog title="编辑账户" :visible.sync="editDialogVisible" size="tiny" >
				  <el-form label-width="150px">
				  	<el-form-item label="账户：" style="text-align:left">
				  		wangguohao@danlu.com
				  	</el-form-item>
				  	<el-form-item label="权限：" style="text-align:left">
				  		<el-col><el-checkbox label="具有管理需求权限"></el-checkbox></el-col>
						<el-col><el-checkbox label="具有管理版本权限"></el-checkbox></el-col>
						<el-col><el-checkbox label="具有管理人员权限"></el-checkbox></el-col>
				  	</el-form-item>
				  	<el-form-item label="状态：" style="text-align:left">
						<el-select v-model="userForm.userStatus">
							<el-option label="启用" value="01"></el-option>
							<el-option label="停用" value="02"></el-option>
						</el-select>
					</el-form-item>
				  </el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
				  </span>
				</el-dialog>
			  <el-pagination  layout="prev, pager, next" :total="50"> </el-pagination>
		</el-row>
	</el-row>


</template>
<script >
	export default{
		data : function(){
			var data = {
				userForm:{
					account:"",
					userStatus:"01",
				},
				tableData: [ ],
				editDialogVisible : true,
				rules:{

				}
			}
			return data
		},
		methods:{
			queryUserList : function(){
				var that = this;
				var reqData = {
					userName 		: "",
					name	 		: "",
					requireAdmin	: "",
					versionAdmin	: "",
					memberAdmin		: "",
					userStatus		: "",
 				}
				// var url = "/api/dlmanagementtool/user/searchUserList"
				var url = "/api/dlmanagementtool/user/viewUsers"
					this.$http.post(url,reqData).then(({
	                data,
	                ok,
	                statusText
	            }) => {
	                if (ok && data.status == '0') {
	                	this.tableData =  data.data;
	                } else {
	                  that.$message.error(data.msg);
	                }
	            });
			},
			/**
			 * 检查用户权限
			 * @return {[type]} [description]
			 */
			checkStatus :function(value){
				if (!value) {
					return 'el-icon-check'
				};
			},
			/**
			 * 编辑用户信息
			 * @return {[type]} [description]
			 */
			editUserMessage: function(id){

			}
		},
		filters:{
			userStatus :function(userType){
				return userType == '0' ? '停用' : '启用'
			}
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