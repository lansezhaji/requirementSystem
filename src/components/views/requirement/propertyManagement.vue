<template>
  <div class="propertyManagement">
     <el-breadcrumb separator=">" class="bread-title retrieval  criteria">
		  <el-breadcrumb-item>属性管理</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="listStyle">
		<el-row type="flex" class="row-bg" justify="right">
		  	<el-col :span="12">
			  <el-row>
			  <el-col :span="4">
					<span>需求属性：</span>
				</el-col>
			    <el-col :span="14">
					<el-input size="small" v-model="requiremenProperty"></el-input>
				</el-col>
			    <el-col :span="6">
					<el-button type="primary" size="small" @click="Search">搜索</el-button>
				</el-col>
			  </el-row>
			</el-col>
		  <el-col :span="12"></el-col>
		</el-row>

		<el-row type="flex" class="row-bg" justify="right">
			<el-col :span="12">
			<div class="RPList">
				<ul>
					<li v-for="(value, key, index) in requiremenPropertyList" @click="check(index)">{{value}}</li>
				</ul>
			</div>
			</el-col>
			<el-col :span="12"></el-col>
		</el-row>
	</div>
	<div class="listStyle" style="margin-top:20px;">
		<el-row type="flex" class="row-bg" justify="right">
			<el-col :span="12">
			  <el-row>
			  <el-col :span="4">
					<span>需求属性：</span>
				</el-col>
			    <el-col :span="14">
					<el-input size="small" v-model="requiremenProperty"></el-input>
				</el-col>
			    <el-col :span="6">
					<el-button type="primary" size="small" @click="addProperty">添加属性</el-button>
				</el-col>
			  </el-row>

			 	<el-row type="flex" class="row-bg" justify="right">
					<el-col :span="24">

					
							<div class="btnStyle">
								<el-button type="text">修改</el-button>
								<el-button type="text">删除</el-button>
							</div>
							<p class="propertyText">一级属性</p>
						<div class="RPList">
							<ul>
								<li v-for="(value, key, index) in requiremenPropertyList"  @click="check(index)">{{value}}</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="12">
				 <el-row>
				  <el-col :span="4">
						<span>需求属性：</span>
					</el-col>
				    <el-col :span="14">
						<el-input size="small" v-model="requiremenProperty"></el-input>
					</el-col>
				    <el-col :span="6">
						<el-button type="primary" size="small" @click="addProperty">添加属性</el-button>
					</el-col>
				  </el-row>

				 	<el-row type="flex" class="row-bg" justify="right">
						<el-col :span="24">
						<div class="btnStyle">
								<el-button type="text">修改</el-button>
								<el-button type="text">删除</el-button>
							</div>
							<p class="propertyText">二级属性</p>
							<div class="RPList">
								<ul>
									<li v-for="(value, key, index) in requiremenPropertyList" @click="check(value,key,index)">{{value}}</li>
								</ul>
							</div>
						</el-col>
					</el-row>
			</el-col>
		</el-row>

	</div>
  </div>
</template>

<script>
  export default {
    name: 'propertyManagement',
    data: function() {
      return {
        requiremenProperty:'',
        requiremenPropertyList:[
        	'需求状态','功能模块','功能类型','产品平台','五个属性'
        ]
      }
    },
    methods:{
    	Search() {

    	},
    	//选中数据
    	check(value,key,index) {
    		var that = this;
    		console.log(index)
	      	// $(".RPList ul li").removeClass('selected');
	      	$(".RPList ul li:eq("+index+")").addClass = 'aa';
	      	console.log($(".RPList ul li:eq("+index+")"))
    	},
    	addProperty() {

    	}
    }
  }
</script>

<style lang="less">
  .propertyManagement .listStyle{
	text-align:left;
	margin-left:20px;
  }
  .aa{
  	color:red;
  }
  .selected{background:red;}
  .propertyManagement .RPList{
	border: 1px solid #d8e2ef;
	margin-top: 10px;
	height:180px;
	overflow:auto;
	ul{
		padding:8px 16px;
		li{
			padding: 4px;
			list-style-type: none;
		}
		li:hover{
			background: #e5e9f2;
		}
	}
}
.propertyManagement .btnStyle {
	float:right;
	 margin-top: 10px;
	 margin-right: 20px;
}
.propertyManagement .propertyText{
	font-weight: bold;
}
</style>