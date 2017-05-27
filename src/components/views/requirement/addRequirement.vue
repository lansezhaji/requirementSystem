<template>
  <div class="addRequirement Style">
    <el-row>
    	<el-col :span="16">
    		<h3>基本信息</h3>
    	</el-col>
    	<el-col :span="8">
    		<el-button type="primary" size="small" @click="copyRequirement">复制</el-button>
    		<el-button type="primary" size="small" @click="isEditMode = true">编辑</el-button>
    	</el-col>
    </el-row>
<!--   		<el-button @click="initDatas()">查询</el-button>
        <el-button @click="debug()">debug</el-button> -->
    <el-row>
    <el-col :span="16">
	  <el-form :model="formData" :rules="rules" ref="formData" label-width="200px">
		  <el-row >
		    <el-col :span="16">
				<el-form-item label="需求名称：" prop="requirementName">
					<el-col  v-if="isEditMode">
						<el-input size="small" v-model="formData.requirementName" :maxlength="parseInt(50)" placeholder="最大长度为50个字符"></el-input>
					</el-col>
					<el-col  v-else style="text-align:left">
						{{requireDetail.requirementName }}
					</el-col>
				</el-form-item>
			</el-col>
				<el-col :span="16">
						<el-col :span="16"  style="text-align:left">
							<el-form-item label="提出方：">
								<el-select  size="small" v-model="formData.Proposer" v-if="isEditMode" placeholder="请选择">
								    <el-option
								      v-for="item in initData.Proposer"
								      :label="item.name"
								      :value="item.id"
								      >
								    </el-option>
								  </el-select>
								<el-col :span="16" v-else>
									{{requireDetail.proposeDeptName}} - {{requireDetail.proposeUserName}}
								</el-col>
							</el-form-item>
						</el-col>
						
						<el-col :span="8" v-if="isEditMode">
							<el-form-item label-width="0px">
								<el-input size="small" v-model="formData.proposerMaker" :maxlength="parseInt(10)"></el-input> 
							</el-form-item>
						</el-col>
				</el-col>	
				<el-col :span="24">
					<el-form-item label="提出时间：" style="text-align:left">
						<el-col v-if="isEditMode" >
							<el-date-picker
						      v-model="formData.proposeTime"
						      size="small"
						      type="date"
						      placeholder="选择日期"
						      >
						    </el-date-picker>
						</el-col>
						<el-col v-else>
							{{requireDetail.proposeTimeStr}}
						</el-col>
					</el-form-item>
				</el-col>			


			
		  	<el-col :span="16">
				<el-form-item label="需求包名称：" prop="PakgeName" >
					<el-col  v-if="isEditMode">
						<el-input size="small" v-model="formData.PakgeName" placeholder="最大长度为50个字符" :maxlength="parseInt(50)"></el-input>
					</el-col>
					<el-col  v-else style="text-align:left">
						{{requireDetail.packageName}}
					</el-col>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="需求进度：" style="text-align:left" prop="requireProgress" required>
					<el-col v-if="isEditMode">
						<el-select v-model="formData.requireProgress">
							<el-option :value="item.id" :label="item.name" v-for="item in initData.requireProgress"></el-option>
						</el-select>					
					</el-col>
					<el-col v-else>
						{{requireDetail.requirementStatusName}}
					</el-col>
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align:left">
				<el-form-item label="负责人员：" prop="ResponsePerson" required >
					<el-col v-if="isEditMode">
						<el-select  size="small" v-model="formData.ResponsePerson" placeholder="请选择">
							<el-option
						      v-for="item in ProposerOption"
						      :label="item.name"
						      :value="item.value"
						      >
						    </el-option>
						
					  	</el-select>
					</el-col>
				    <el-col v-else>
				    	{{requireDetail.responsibleUserName}}
				    </el-col>
				</el-form-item>
			</el-col>
		  	<el-col :span="20">
				<el-form-item label="产品平台：" prop="productPlat" required>
					<el-col v-if="isEditMode">
						<el-checkbox-group  v-model="formData.productPlat" style="text-align:left">
							<el-checkbox v-for="item in initData.productPlatCheck" :label="item" >{{item}}</el-checkbox>
		  				</el-checkbox-group>	
					</el-col>
					<el-col v-else style="text-align:left">
						{{requireDetail.productPlatformName}}
					</el-col>
					
				</el-form-item>
			</el-col>
		  	<el-col :span="16">
					<el-row type="flex" class="row-bg" justify="left">
							<el-col :span="16" style="text-align:left">
								<el-form-item label="功能模块：" prop="firstFunctionModule" required>
									<el-col v-if="isEditMode">
										<el-select  size="small" v-model="formData.firstFunctionModule" placeholder="请选择" @change="getSecondFunction">
										    <el-option
										      v-for="item in initData.firstFunctionModule"
										      :label="item.name"
										      :value="item.id"
										      >
										    </el-option>
										</el-select>	
									</el-col>
									
									<el-col v-else style="text-align:left">
										{{requireDetail.functionModuleFirstName}} - {{requireDetail.functionModuleSecondName}}
									</el-col>
								</el-form-item>
							</el-col>
							<el-col :span="8" style="text-align:left">
								<el-form-item label-width="0px">
									<el-col v-if="isEditMode">
										<el-select  size="small" v-model="formData.secondFunctionModule" placeholder="请选择">
										    <el-option
										      v-for="item in initData.secondFunctionModule"
										      :label="item.name"
										      :value="item.id" >
										    </el-option>
										</el-select>
									</el-col>
								</el-form-item>
							</el-col>
					</el-row>
			</el-col>
			<el-col :span="12" style="text-align:left" >
				<el-form-item label="需求规划：" prop="requirementPlan" required>
					<el-col v-if="isEditMode">
						<el-select  size="small" v-model="formData.requirementPlan" placeholder="请选择">
						    <el-option
						      v-for="item in initData.requirementList"
						      :label="item"
						      :value="item"
						      >
						    </el-option>
						</el-select>	
					</el-col>
					<el-col v-else style="text-align:left">
						{{requireDetail.requirementPlan}}
					</el-col>
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align:left">
				<el-form-item label="需求启动：" >
					<el-col v-if="isEditMode">
						<el-select  size="small" v-model="formData.requireStart" placeholder="请选择" >
						    <el-option
						      v-for="item in initData.requirementList"
						      :label="item"
						      :value="item"
						      >
						    </el-option>
						</el-select>
					</el-col>
					<el-col v-else>
						{{requireDetail.requirementStart}}
					</el-col>
				</el-form-item>
			</el-col>
		</el-row>
		<el-col :span="24">
			<el-form-item label="功能类型：" prop="FRadio" required>
		  	  	<el-col :span="16" style="text-align:left" v-if="isEditMode">
					<el-radio-group v-model="formData.functionType">
					    <el-radio :label="item.id"  v-for="item in initData.functionTypeList">{{item.name}}</el-radio>
					</el-radio-group>
		  		</el-col>
		  		<el-col v-else :span="16" style="text-align:left">
		  			{{requireDetail.functionTypeName}}
		  		</el-col>
		  		<el-col :span="8" v-if="formData.functionType == '9' ">
		  			<el-col :span="8">
		  				<span>Bug ID :</span>
		  			</el-col>
		  			<el-col :span="8">
		  				<el-input v-model="formData.bugID"></el-input>
		  			</el-col>
					
		  		</el-col>
		  	</el-form-item>	
		</el-col>


			<el-col :span="24" style="text-align:left">
				<el-form-item label="优先级别：" prop="priority" required>
					<el-col v-if="isEditMode">
						<el-radio-group v-model="formData.priority">
						    <el-radio :label="1">1</el-radio>
						    <el-radio :label="2">2</el-radio>
						    <el-radio :label="3">3</el-radio>
						    <el-radio :label="4">4</el-radio>
						    <el-radio :label="5">5</el-radio>
						    <el-radio :label="6">6</el-radio>
						</el-radio-group>					
					</el-col>
					<el-col v-else>
						{{requireDetail.priority}}
					</el-col>
				</el-form-item>	
			</el-col>
			<el-col :span="20" style="text-align:left">
				<el-form-item label="完成时间：" prop="completionTime">
					<el-col v-if="isEditMode">
						<el-date-picker
					      v-model="formData.completionTime"
					      type="date"
					      placeholder="选择日期"
					      >
					    </el-date-picker>					
					</el-col>
					<el-col v-else style="text-align:left">
						{{requireDetail.finishTimeStr}}
					</el-col>
				 </el-form-item>	
	    	</el-col>
	    	<el-col :span="20" style="text-align:left">
				<el-form-item label="评审时间：" prop="approveTime" >
					<el-col v-if="isEditMode">
						<el-date-picker
					      v-model="formData.approveTime"
					      type="date"
					      placeholder="选择日期"
					      >
					    </el-date-picker>					
					</el-col>
					<el-col v-else style="text-align:left">
						{{requireDetail.reviewTimeStr}}
					</el-col>
				 </el-form-item>	
	    	</el-col>
		    <el-col :span="18">
				<el-form-item label="需求背景：" prop="RqBack" style="text-align:left">
					<el-col v-if="isEditMode">
						<el-input :maxlength="parseInt(100)" v-model="formData.RqBack" type="textarea"></el-input>
					</el-col>
					<el-col v-else>
						{{requireDetail.requirementBackground}}
					</el-col>
				</el-form-item>	
			</el-col>
		    <el-col :span="18">
				<el-form-item label="需求描述：" prop="Rqdescription" style="text-align:left">
					<el-col v-if="isEditMode">
						<el-input :maxlength="parseInt(100)" v-model="formData.Rqdescription" type="textarea"></el-input>
					</el-col>
					<el-col v-else>
						{{requireDetail.requirementDisplay}}
					</el-col>	
				</el-form-item>	
			</el-col>
		    <el-col :span="18">
				<el-form-item label="需求备注：" prop="RqNote" style="text-align:left">
					<el-col v-if="isEditMode">
						<el-input :maxlength="parseInt(100)" v-model="formData.RqNote" type="textarea"></el-input>
					</el-col>
					<el-col v-else>
						{{requireDetail.requirementRemark}}
					</el-col>
				</el-form-item>	
			</el-col>

	  </el-form>
	  </el-col>
		<el-col :span="8" style="border-left:1px dashed lightgray">
			<el-form label-width="120px" style="text-align:left">
				<el-col :span="16">
					<el-form-item>
						<h3>项目所属信息</h3>
					</el-form-item>
	    			
	    		</el-col>
	    		<el-row>
	    			<el-col :span="12" style="text-align:left">
	    				<el-form-item label="版本类型：">
	    					{{requireDetail.requirementDisplay}}
	    				</el-form-item>
	    			</el-col>
	    			<el-col :span="12" style="text-align:left">
	    				<el-form-item label="版本号：">
	    					{{requireDetail.versionName}}
	    				</el-form-item>
	    			</el-col>
	    		</el-row>
	    		<el-col>
	    			<el-form-item label="项目分支：" >
	    				{{requireDetail.branchName}}
	    			</el-form-item>
	    		</el-col>	
	    		<el-col>
	    			<el-form-item label="其他成员：" >
	    				何苗，陈思宇，张可可
	    			</el-form-item>
	    		</el-col>	
	    		<el-col>
	    			<el-form-item label="启动时间：" >
	    				2017-05-31 
	    			</el-form-item>
	    		</el-col>
	    		<el-row>
	    			<el-col :span="12">
		    			<el-form-item label="计划转测时间：" >
		    				2017-05-31 
		    			</el-form-item>
		    		</el-col>	
		    		<el-col :span="12">
		    			<el-form-item label="实际转测时间：" >
		    				2017-05-31 
		    			</el-form-item>
		    		</el-col>	
	    		</el-row>
	    		<el-row>
	    			<el-col :span="12">
		    			<el-form-item label="计划QA时间：" >
		    				2017-05-31 
		    			</el-form-item>
		    		</el-col>	
		    		<el-col :span="12">
		    			<el-form-item label="实际QA时间：" >
		    				2017-05-31 
		    			</el-form-item>
		    		</el-col>	
	    		</el-row>	
	    		<el-row>
	    			<el-col :span="12">
		    			<el-form-item label="计划上线时间：" >
		    				2017-05-31 
		    			</el-form-item>
		    		</el-col>	
		    		<el-col :span="12">
		    			<el-form-item label="实际上线时间：" >
		    				2017-05-31 
		    			</el-form-item>
		    		</el-col>	
	    		</el-row>	
<!-- 	    		<el-col :span="16">
					<el-form-item>
						<h3>相关链接</h3>
					</el-form-item>
	    			
	    		</el-col>	
	    		<el-col >
	    			<el-form-item label="链接到SVN：" label-width="150px">
	    				<el-input value="http://www.baidu.com"></el-input>
	    			</el-form-item>
	    		</el-col>	
	    		<el-col >
	    			<el-form-item label="链接到Bugzilla：" label-width="150px">
	    				<el-input value="http://www.baidu.com"></el-input>
	    			</el-form-item>
	    		</el-col>	
	    		<el-col >
	    			<el-form-item label="链接到Redmine：" label-width="150px">
	    				<el-input value="http://www.baidu.com"></el-input>
	    			</el-form-item>
	    		</el-col> -->		
			</el-form>

		</el-col>
	</el-row>
		<el-row>
		 	<div style="text-align:center;">
	        	<el-button type="primary" @click="saveRequirement">保存</el-button>
	        	<el-button type="primary" @click="dialogKeepVisible=true">返回</el-button>
	      	</div>			
		</el-row>

		  <el-dialog title="提示" v-model="dialogKeepVisible" size="tiny" style="text-align:left">
		  		<p>您确定要返回需求列表？</p>
				<p>若如此将不保存您当前的填写结果</p>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="goBack">确 定</el-button>
		    <el-button @click="dialogKeepVisible = false">取 消</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'addRequirement',
    data: function() {
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
	                  	callback(new Error('需求名称已存在'));
	                }
	            });
			}
		}
      return {
      	isEditMode : true,
        formData:{
        	requirementName:'',//需求名称
        	PakgeName:'', //需求包名称
        	Proposer: '', //提出方
        	proposerMaker:'', //提出人给的市场？
        	productPlat : [],//产品平台
        	proposeTime:'', //提出时间
        	ResponsePerson:'', //负责人员
        	requirementPlan:"",
        	checked:[],
        	firstFunctionModule:'',//一级功能模块
        	secondFunctionModule : '',//二级功能模块
        	requireStart : "",//需求启动
        	priority : "",//优先级
        	bugID:'',
        	functionType:'',
        	requireProgress : "",//需求进度
        	completionTime:'', //完成时间
        	approveTime:'',
        	RqBack:'背景' ,//需求背景
        	Rqdescription:'描述', //需求描述
        	RqNote:'需求备注' //需求备注
        },
        // 初始化选框数据
        initData:{
        	Proposer : [],
        	productPlat : [],//产品平台
        	productPlatCheck : [],//产品平台多选框
        	requirementList:[],//需求规划列表
        	firstFunctionModule:[],//一级功能模块
        	secondFunctionModule:[],//二级功能模块
        	functionTypeList:[],//功能类型
        },
        // 需求详情
        requireDetail:{},
        dialogKeepVisible:false,
        ProposerOption:[
        	{name: '郭彩华', value:'guocaihua@danlu.com'},
        ],

        rules:{
        	requirementName:[
        		{required: true, message: '此项为必填', trigger: 'blur,change'},
        		{max: 50, message: '最大长度为50个字符', trigger: 'blur'},
        		{validator:requireNameValid ,trigger :'blur'}
        	],
        	// 负责人员
        	Proposer:[{
        		required: true, message: '此项为必填', trigger: 'blur,change'
        	}],
        	PakgeName:[
        		{required: true, message: '此项为必填', trigger: 'change,blur'}
        	],
        	productPlat:[{validator:selectValidate, trigger: 'change,blur'}],
        	firstFunctionModule:[{validator:selectValidate, trigger: 'change,blur'}],
        	requirementPlan:[{validator:selectValidate, trigger: 'change,blur'}],
        	ResponsePerson:[{validator:selectValidate, trigger: 'change,blur'}],
        	functionType:[{validator:selectValidate, trigger: 'change,blur'}],
        	priority:[{validator:selectValidate, trigger: 'change,blur'}],
        	requireProgress:[{validator:selectValidate, trigger: 'change,blur'}],
        	completionTime:[{validator:selectValidate, trigger: 'change,blur'}],
        	approveTime:[{validator:selectValidate, trigger: 'change,blur'}],

        }
      }
    },
    methods: {
    	debug:function(){
	        debugger
	    },
	    /**
	     * 复制需求
	     * @return {[type]} [description]
	     */
	    copyRequirement : function(){
	    	this.isEditMode = true;
	    	this.$route.query.id = "";
	    },
	    /**
	     * 获取需求规划
	     * @return {[type]} [description]
	     */
	    getRequirePlan : function(){
	    	
	    	var that = this;
            var url = '/api/dlmanagementtool/requirement/plans';
            this.$http.get(url).then(({
                data,
                ok,
                statusText
            }) => {
                	if (ok && data.status == '0') {
                    	that.initData.requirementList = data.data;
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
    	 * 初始化数据
    	 * @return {[type]} [description]
    	 */
    	initDatas:function(){
    		var that = this;
    		this.getRequirePlan();
            var reqData = {
              type : "",
              level : 1
            }
            var url = '/api/dlmanagementtool/property/list';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                    
                    if (data.data.length>0) {
                    	that.initData.requireProgress = [];
                    	that.initData.firstFunctionModule = [];
                    	that.initData.functionTypeList = [];
                    	that.initData.productPlat = [];
                    	that.initData.productPlatCheck = [];
                    	that.initData.Proposer = [];

                        data.data.forEach(function(item){
                            switch (item.type){
                            case 1 : 
                              that.initData.requireProgress.push(item);
                              break;
                            case 2 :
                              that.initData.firstFunctionModule.push(item);
                              break;
                            case 3 : 
                              that.initData.functionTypeList.push(item);
                              break;
                            case 4 : 
                              that.initData.productPlat.push(item);
                              that.initData.productPlatCheck.push(item.name);
                              break;
                            case 5 : 
                              that.initData.Proposer.push(item);
                              break;
                          }
                        })
                    };
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
    	 * 获取二级功能模块
    	 * @return {[type]} [description]
    	 */
    	getSecondFunction:function(){
			var that = this;
			if (!this.formData.firstFunctionModule) {
            	return false;
            };
            that.initData.secondFunctionModule = [];
            // that.formData.secondFunctionModule = "";
            var reqData = {
				type: 2,
				parentId: this.formData.firstFunctionModule,
				level : 2
            }
            var url = '/api/dlmanagementtool/property/list';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                    that.initData.secondFunctionModule  = data.data

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
    	 * 返回上一页
    	 * @return {[type]} [description]
    	 */
    	goBack() {
    		this.$router.go(-1)
    	},
    	/**
    	 * 根据是否是编辑页面，发出请求来对表单进行初始化赋值
    	 */
    	assignment() {
    		alert('这是编辑页')
    	},
    	Add() {
    		alert('这是新增页')
    	},

    	/**
    	 * 保存需求信息
    	 * @return {[type]} [description]
    	 */
    	saveRequirement : function(){
    		var that = this;
    		
    		this.$refs['formData'].validate((valide)=>{
    			if (valide) {
    				var requirementStatusName = "";
    				that.initData.requireProgress.forEach(function(item){
    					if (item.id == that.formData.requireProgress) {
    						requirementStatusName = item.name;
    					};
    				})
    				var productPlatArr = []; //通过name数组获取id
    				
    				that.formData.productPlat.forEach(function(name){
    					that.initData.productPlat.forEach(function(item){
    						if (name == item.name) {
    							productPlatArr.push(item.id);
    						};
    					})
    				})
    				var productPlatformId = productPlatArr.toString();
    				var functionTypeName = "";
    				that.initData.functionTypeList.forEach(function(item){
    					if (item.id == that.formData.functionType) {
    						functionTypeName = item.name;
    					};
    				})
    				var functionModuleFirstName = "";
    				that.initData.firstFunctionModule.forEach(function(item){
    					if (item.id == that.formData.firstFunctionModule) {
    						functionModuleFirstName = item.name;
    					};
    				})
    				var functionModuleSecondName = "";
    				that.initData.secondFunctionModule.forEach(function(item){
    					if (item.id == that.formData.secondFunctionModule) {
    						functionModuleSecondName = item.name;
    					};
    				})
    				var proposeDeptName = "";//提出方
    				that.initData.Proposer.forEach(function(item){
    					if (item.id == that.formData.Proposer) {
    						proposeDeptName = item.name;
    					};
    				})
    				var reqData = {
    					"id" : this.$route.query.id || "",
				        "requirementName": this.formData.requirementName,
				        "requirementStatusId": parseInt(this.formData.requireProgress), //需求进度
				        "requirementStatusName": requirementStatusName, //需求进度
				        "packageName": this.formData.PakgeName,
				        "proposeTime":this.formData.proposeTime.valueOf(),
				        "productPlatformId": productPlatformId ,//产品平台
				        "productPlatformName": this.formData.productPlat.toString(),//产品平台
				        "functionModuleFirstId": parseInt(this.formData.firstFunctionModule),
				        "functionModuleFirstName":functionModuleFirstName,
				        "functionModuleSecondId":  parseInt(this.formData.secondFunctionModule),
				        "functionModuleSecondName":functionModuleSecondName,
				        "functionTypeId": this.formData.functionType,
				        "functionTypeName": functionTypeName,
				        "priority": parseInt(this.formData.priority),
				        "finishTime": this.formData.completionTime.valueOf(),
				        "reviewTime": this.formData.approveTime.valueOf(),
				        "proposeDeptId": this.formData.Proposer,
				        "proposeDeptName": proposeDeptName,
				        "proposeUserName": this.formData.proposerMaker,
				        "responsibleUserName": this.formData.ResponsePerson,
				        "requirementBackground": this.formData.RqBack,
				        "requirementDisplay": this.formData.Rqdescription,
				        "requirementRemark": this.formData.RqNote,
				        "requirementPlan": this.formData.requirementPlan,
				        "requirementStart": this.formData.requireStart,
				    }
		            var url = '/api/dlmanagementtool/requirement/save';
		            this.$http.post(url,reqData).then(({
		                data,
		                ok,
		                statusText
		            }) => {
		                if (ok && data.status == '0') {
		                    that.$message.success("保存成功");
		                    that.$router.replace("/requirementManagement");
		                }else if (data.status == -2 || data.status == -3) {
		                  	this.$store.commit('logout');
	   						localStorage.setItem("token","");
	   						this.$message.error("登录信息已经失效，请重新登录");
		                  }  else {
		                  that.$message.error(data.msg);
		                }
		            });
    			}else{
    				that.$message.error('请先正确填写表单信息');
    			}
    		})
    	},





    	//  ---------------------------------------------   需求查看   ----------------------------------------------------
    	//  
    	//  
    	//  
    	
    	getRequireDetail : function(id){
    		var that = this;
    		var url = '/api/dlmanagementtool/requirement/detail';
    		var reqData = {
    			id : id
    		}
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                    // 填充需求详情数据
                    that.requireDetail =  data.data;
                    // 填充编辑数据
                    that.formData.requirementName =	that.requireDetail.requirementName //需求名称
				    that.formData.requireProgress = that.requireDetail.requirementStatusId//需求进度
				    that.formData.PakgeName  =  that.requireDetail.packageName
				    that.formData.proposeTime =  that.requireDetail.proposeTime
				    that.formData.firstFunctionModule = that.requireDetail.functionModuleFirstId
				    that.formData.secondFunctionModule =  that.requireDetail.functionModuleSecondId
				    that.formData.functionType =  that.requireDetail.functionTypeId
				    that.formData.priority =  that.requireDetail.priority
				    that.formData.completionTime =  that.requireDetail.finishTime
				    that.formData.approveTime =  that.requireDetail.reviewTime
				    that.formData.Proposer =  that.requireDetail.proposeDeptId
				    that.formData.proposerMaker =  that.requireDetail.proposeUserName
				    that.formData.ResponsePerson =  that.requireDetail.responsibleUserName
				    that.formData.RqBack =  that.requireDetail.requirementBackground
				    that.formData.Rqdescription  = that.requireDetail.requirementDisplay
				    that.formData.RqNote =  that.requireDetail.requirementRemark
				    that.formData.requirementPlan = that.requireDetail.requirementPlan
				    that.formData.requireStart =  that.requireDetail.requirementStart

				    that.formData.productPlat = that.requireDetail.productPlatformName.split(',');
				    that.getSecondFunction();
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},



    },
	beforeRouteEnter: function (to,from,next) {
      		next(vm => {
      			vm.initDatas();
         		if(vm.$route.query.addType =='add'){
         			vm.isEditMode = true;
         			// vm.Add();
         		}else if(vm.$route.query.addType =='assign'){
         			vm.isEditMode = false;
         			if (vm.$route.query.id) {
						vm.getRequireDetail(vm.$route.query.id);
         			}
         			
         		}else {
         			alert('error')
         		}
        	});
 	}
  }
</script>

<style lang="less">
  .addRequirement {

  }
</style>