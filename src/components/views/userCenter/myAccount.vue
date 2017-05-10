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
						<el-button type="primary">搜索</el-button>
					</el-form-item>
				</el-col>
			</el-form>
			<!-- 用户列表 -->
			
		</el-row>
		<el-row class="content">
			  <el-table :data="tableData" stripe style="width: 100%;text-align:center">
				    <el-table-column prop="date" label="序号" width="180" > </el-table-column>
				    <el-table-column prop="date" label="账号" width="180" > </el-table-column>
				    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
				    <el-table-column prop="address" label="管理需求"> </el-table-column>
				    <el-table-column prop="address" label="管理版本"> </el-table-column>
				    <el-table-column prop="address" label="管理人员"> </el-table-column>
				    <el-table-column prop="address" label="状态"> </el-table-column>
				    <el-table-column prop="address" label="操作">
				    </el-table-column>
			  </el-table>
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

				}
			}
			return data
		},
		methods:{

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