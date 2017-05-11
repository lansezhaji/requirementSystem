<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<h3>我的账号</h3>
			</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="content">
			<el-form label-width="150px">
				<el-col :span="10">
					<el-form-item label="账号：" class="userMessage">
						<span >tanjunyi</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="密码：" class="userMessage">
						<span >******</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="姓名：" class="userMessage">
						<span >谭军一</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="角色：" class="userMessage">
						<span >产品部总经理</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="状态：" class="userMessage">
						<span >启用</span>						
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="创建时间：" class="userMessage">
						<span >2016-7-4</span>						
					</el-form-item>

				</el-col>				
			</el-form>

		</el-row>
		
		<el-row class="content">
			<el-row class="history title" >
				登录历史记录：
			</el-row>
			<el-row v-for="item in loginHistory" class="history">
				<el-col :span="6">{{item.date}}</el-col>
				<el-col :span="16">{{item.address}}</el-col>
			</el-row>
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
				loginHistory: [{
		          date: '2016-05-02 19:12:23',
		          name: '王小虎',
		          address: '成都市区高新区'
		        }, {
		          date: '2016-05-02 19:12:23',
		          name: '王小虎',
		          address: '绵阳市'
		        }, {
		          date: '2016-05-02 19:12:23',
		          name: '王小虎',
		          address: '广元朝天区'
		        }, {
		          date: '2016-05-02 19:12:23',
		          name: '王小虎',
		          address: '东海省乐山呼叫中心'
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