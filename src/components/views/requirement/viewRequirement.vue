<template>
  <div class="addRequirement">
  	<div style="float:right;">
		<el-button type="primary">复制</el-button>
  		<el-button type="primary" @click="toEdit">编辑</el-button>
	</div>
    <el-breadcrumb separator=">" class="bread-title retrieval  criteria">
		  <el-breadcrumb-item>需求管理</el-breadcrumb-item>
		  <el-breadcrumb-item>需求详情</el-breadcrumb-item>
	</el-breadcrumb>
		
	<div class="Style">
		<p class="baseStyle">需求基本信息：</p>
  
	  <el-row type="flex"  justify="right" >
	    <el-col :span="18">
			<el-row type="flex" class="row-bg" justify="right">
				<el-col :span="12">
					<p class="viewP">需求名称:{{requirementName}}</p>
				</el-col>
				<el-col :span="6">
					<p class="viewP">提出方：{{Proposer}}</p>
				</el-col>
				<el-col :span="6">
					<p class="viewP">提出时间：{{proposerDate}}</p>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="right">
				<el-col :span="12">
					<p class="viewP">需求包名称:{{PakgeName}}</p>
				</el-col>
				<el-col :span="6">
					<p class="viewP">负责人：{{ResponsePerson}}</p>
				</el-col>
				<el-col :span="6">
					
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="right">
				<el-col :span="12">
					<p class="viewP">产品平台:{{functionalPlatform}}</p>
				</el-col>
				<el-col :span="6">
					<p class="viewP">需求规划：{{ResponsePerson}}</p>
				</el-col>
				<el-col :span="6">
					
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="right">
				<el-col :span="12">
					<p class="viewP">功能模块:{{functionModule}}</p>
				</el-col>
				<el-col :span="6">
					<p class="viewP">需求启动：{{requirementStart}}</p>
				</el-col>
				<el-col :span="6">
					
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="right">
				<el-col :span="12">
					<p class="viewP">功能类型:{{functionType}} 	<span v-if="ifBUG">(<a href="">{{functionTypeNum}}</a>)</span></p>
				</el-col>
				<el-col :span="6">
					<p class="viewP">创建时间：{{functionTypeDate}}</p>
				</el-col>
				<el-col :span="6">
					
				</el-col>
			</el-row>

			<div class="viewP">
				<span>优先级别：</span>
				<el-radio-group v-model="PRadio">
				    <el-radio :label="1">1</el-radio>
				    <el-radio :label="2">2</el-radio>
				    <el-radio :label="3">3</el-radio>
				    <el-radio :label="4">4</el-radio>
				    <el-radio :label="5">5</el-radio>
				    <el-radio :label="6">6</el-radio>
				</el-radio-group>
			</div>
			<p class="viewP">需求进度：{{requirementStatus}}</p>
			<el-row >
				<el-col :span="9">
						<p class="viewP">完成时间：{{completedTime}}</p>
					</el-col>
					<el-col :span="15">
						<p class="viewP">评审时间：{{reviewTime}}</p>
					</el-col>
			</el-row>
			<p class="viewP">需求背景：{{RqBack}}</p>
			<p class="viewP">需求描述：{{Rqdescription}}</p>
			<p class="viewP">需求备注：{{RqNote}}</p>
		</el-col>
		<el-col class="projectRight" :span="6">
		<div class="projectBase">
			<span style="text-align:left;font-weight:bold;">所属项目信息：</span>
			<el-button type="text" >复制信息</el-button>
		</div>
		<el-row >
		  	<el-col :span="9">
				<p class="viewP">版本类型：{{versionType}}</p>
			</el-col>
			<el-col :span="15">
				<p ><a href="" style="text-align: left;display:block;">版本号：{{versionNum}}</a></p>
			</el-col>
		</el-row>
		<p class="viewP">项目分支名：{{featureName}}</p>
		<p class="viewP">项目负责人：{{projectProposer}}</p> 
		<p class="viewP">其他成员：{{otherProjectProposer}}</p> 
		<p class="viewP">启动时间：{{startDate}}</p> 
		
				<el-row >
				<el-col :span="9">
						<p class="viewP">计划转测时间：{{planeTime}}</p>
					</el-col>
					<el-col :span="15">
						<p class="viewP">实际转测时间：{{ActualTime}}</p>
					</el-col>
				</el-row>
				<el-row >
				<el-col :span="9">
						<p class="viewP">计划QA时间：{{planeQATime}}</p>
					</el-col>
					<el-col :span="15">
						<p class="viewP">实际QA时间：{{ActualQATime}}</p>
					</el-col>
				</el-row>
				<el-row >
				<el-col :span="9">
						<p class="viewP">计划上线时间：{{planeUPTime}}</p>
					</el-col>
					<el-col :span="15">
						<p class="viewP">实际上线时间：{{ActualUPTime}}</p>
					</el-col>
				</el-row>
		</el-col>
	</el-row>
			
	
	</div>

  
  </div>
</template>

<script>
  export default {
    name: 'addRequirement',
    data: function() {
      return {
        	ifBUG:false, //是否是BUG修复时显示
        	requirementName:'红包统计报表增加导出功能及增加终端店地域字段功能(WEB交易、运营)',
        	PakgeName:'', //需求包名称
        	Proposer: '市场部-河北市场', //提出人
        	proposerMarket:'', //提出人给的市场？
        	proposerDate:'： 2016-10-15', //提出时间
        	ResponsePerson:'', //负责人员
        	checked:[],
        	functionalPlatform:'', //产品平台
        	functionModule:'',//功能模块
        	requirementStart:'',
        	functionTypeDate:'', //功能类型创建时间
        	functionType:'', //功能类型
        	functionTypeNum:'',
        	PRadio:1, //优先级别-----可以先判断 是否有值，然后将其他的禁用
        	requirementStatus:'', //需求进度
        	completedTime:'',
			reviewTime:'',
        	RqBack:'' ,//需求背景
        	Rqdescription:'', //需求描述
        	RqNote:'', //需求备注
       		versionType:'web',
       		versionNum:'release -2017.01',
       		featureName:'feature_pandora',
       		projectProposer:'张虎',
       		otherProjectProposer:'何苗、陈思宇、姜粟',
       		startDate:'2016-12-01 ',
       		planeTime:'', //计划转测时间
       		ActualTime:'',
       		planeQATime:'',
       		ActualQATime:'',
       		planeUPTime:'',
       		ActualUPTime:'',
      }
    },
    methods: {
    	handleCheckedCitiesChange(value) {
    		console.log(value)
    	},
    	goBack() {
    		this.$router.go(-1)
    	},
    	toEdit() {
    		let that = this;
	        that.$router.push({
	          name:'addRequirement',
	          query:{
	            addType:'assign'
	          }
	        })
    	}
    }
  }
</script>

<style lang="less">
  .addRequirement {

  }
  .addRequirement .bread-title{
	font-size: 18px;
	margin-bottom: 20px;
	margin-left: 20px;
  }
  .addRequirement .projectBase {
  	margin-top: -35px;
  	text-align: left;
  }
   .addRequirement .projectBase.el-button{
   	margin-left: 100px;   
   }
  .addRequirement .viewP{
  	text-align: left;
  }
  .addRequirement .projectRight{
	border-left: 1px solid red;
	padding: 5px;
  }
</style>