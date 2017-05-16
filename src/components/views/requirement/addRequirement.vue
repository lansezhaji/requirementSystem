<template>
  <div class="addRequirement Style">
    <p>基本信息</p>
  
  <el-form :model="formData" :rules="rules" ref="formData" label-width="150px">
	  <el-row type="flex" class="row-bg" justify="right">
	    <el-col :span="12">
			<el-form-item label="需求名称：" prop="requirementName">
				<el-col :span="18">
					<el-input size="small" v-model="formData.requirementName" placeholder="最大长度为50个字符"></el-input>
				</el-col>
				
			</el-form-item>
		</el-col>
		<el-col :span="6">
		
			<el-form-item label="提出方：">
				<el-row type="flex" class="row-bg" justify="right">
					<el-col :span="12">
						<el-form-item>
							<el-select  size="small" v-model="formData.Proposer" multiple placeholder="请选择">
							    <el-option
							      v-for="item in ProposerOption"
							      :label="item.name"
							      :value="item.value"
							      >
							    </el-option>
							  </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<el-input size="small" v-model="formData.proposerMarket" :maxlength="parseInt(10)"></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			</el-form-item>

		</el-col>

		<el-col :span="4">
			<el-form-item label="提出时间：">
				<el-date-picker
			      v-model="formData.proposerDate"
			      size="small"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			</el-form-item>
		</el-col>
	  </el-row>

	<el-row type="flex" class="row-bg" justify="right">
	  	<el-col :span="12">
			<el-form-item label="需求包名称：">
				<el-col :span="18">
					<el-input size="small" v-model="formData.PakgeName" placeholder="最大长度为50个字符"></el-input>
				</el-col>
			</el-form-item>
		</el-col>
		<el-col :span="6" style="text-align:left">
			<el-form-item label="负责人员：" prop="Proposer">
				<el-select  size="small" v-model="formData.Proposer" multiple placeholder="请选择">
				    <el-option
				      v-for="item in ProposerOption"
				      :label="item.name"
				      :value="item.value"
				      >
				    </el-option>
				  </el-select>
			</el-form-item>
		</el-col>
	</el-row>
	<el-row type="flex" class="row-bg" justify="right">
	  	<el-col :span="12">
			<el-form-item label="产品平台：">
				<el-checkbox-group v-model="formData.checked" @change="handleCheckedCitiesChange" style="text-align:left">
					<el-checkbox v-for="item in checkList" :label="item.value">{{item.name}}</el-checkbox>
  				</el-checkbox-group>
			</el-form-item>
		</el-col>
		<el-col :span="6" style="text-align:left">
			<el-form-item label="需求规划：">
				<el-select  size="small" v-model="formData.Proposer" multiple placeholder="请选择">
				    <el-option
				      v-for="item in ProposerOption"
				      :label="item.name"
				      :value="item.value"
				      >
				    </el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-row>
	<el-row type="flex" class="row-bg" justify="left">
	  	<el-col :span="12">
			<el-form-item label="功能模块：">
				<el-row type="flex" class="row-bg" justify="left">
						<el-col :span="12" style="text-align:left">
							<el-form-item>
								<el-select  size="small" v-model="formData.functionModule" multiple placeholder="请选择">
							    <el-option
							      v-for="item in functionModuleOption"
							      :label="item.name"
							      :value="item.value"
							      >
							    </el-option>
							</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12" style="text-align:left">
							<el-form-item>
								<el-select  size="small" v-model="formData.functionModule" multiple placeholder="请选择">
								    <el-option
								      v-for="item in functionModuleOption"
								      :label="item.name"
								      :value="item.value"
								      >
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
				</el-row>
				</el-form-item>
		</el-col>
		<el-col :span="8" style="text-align:left">
			<el-form-item label="需求启动：">
				<el-select  size="small" v-model="formData.Proposer" multiple placeholder="请选择" >
				    <el-option
				      v-for="item in functionModuleOption"
				      :label="item.name"
				      :value="item.value"
				      >
				    </el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-row>
	
	<el-form-item label="功能类型：">
	  <el-col :span="24">
	  	<el-row type="flex" class="row-bg" justify="left">
	  	  	<el-col :span="12" style="text-align:left">
				<el-radio-group v-model="formData.FRadio">
				    <el-radio :label="1">新增功能</el-radio>
				    <el-radio :label="2">功能改进</el-radio>
				    <el-radio :label="3">界面友好性</el-radio>
				    <el-radio :label="4">运营需求</el-radio>
				    <el-radio :label="5">接口需求</el-radio>
				    <el-radio :label="6">Bug修复</el-radio>
				  </el-radio-group>
	  		</el-col>
<!-- 	  		<el-col :span="8">
				<el-input v-model="formData.bugID"></el-input>
	  		</el-col> -->
	  	</el-row>
	  	</el-col>
	  </el-form-item>	


	<el-row type="flex" class="row-bg" justify="left">
		<el-col :span="24" style="text-align:left">
			<el-form-item label="优先级别：">
				<el-radio-group v-model="formData.PRadio">
				    <el-radio :label="1">1</el-radio>
				    <el-radio :label="2">2</el-radio>
				    <el-radio :label="3">3</el-radio>
				    <el-radio :label="4">4</el-radio>
				    <el-radio :label="5">5</el-radio>
				    <el-radio :label="6">6</el-radio>
				  </el-radio-group>
			</el-form-item>	
		</el-col>
	</el-row>
	<el-row type="flex" class="row-bg" justify="left">
		<el-col :span="6" style="text-align:left">
			<el-form-item label="完成时间：" prop="date1">
				<el-date-picker
			      v-model="formData.date1"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			 </el-form-item>	
    	</el-col>
    	<el-col :span="6" style="text-align:left">
			<el-form-item label="评审时间：" prop="date2">
				<el-date-picker
			      v-model="formData.date2"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			 </el-form-item>	
    	</el-col>
	</el-row>
	 <el-row type="flex" class="row-bg" justify="left">
	    <el-col :span="18">
			<el-form-item label="需求背景：" prop="RqBack">
					<el-input :maxlength="parseInt(100)" v-model="formData.RqBack" type="textarea"></el-input>
			</el-form-item>	
		</el-col>
	  </el-row>
	   <el-row type="flex" class="row-bg" justify="left">
	    <el-col :span="18">
			<el-form-item label="需求描述：" prop="Rqdescription">
					<el-input :maxlength="parseInt(100)" v-model="formData.Rqdescription" type="textarea"></el-input>
			</el-form-item>	
		</el-col>
	  </el-row>
	   <el-row type="flex" class="row-bg" justify="left">
	    <el-col :span="18">
			<el-form-item label="需求备注：" prop="RqNote">
					<el-input :maxlength="parseInt(100)" v-model="formData.RqNote" type="textarea"></el-input>
			</el-form-item>	
		</el-col>
	  </el-row>
  </el-form>
	 <div style="text-align:center;">
        <el-button type="primary" @click="dialogKeepVisible=true">保存</el-button>
        <el-button type="primary" @click="goBack">返回</el-button>
      </div>
		  <el-dialog title="提示" v-model="dialogKeepVisible" size="tiny">
		  <p>您确定要返回需求列表？</p>
<p>若如此将不保存您当前的填写结果</p>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogKeepVisible = false">确 定</el-button>
		    <el-button @click="dialogKeepVisible = false">取 消</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'addRequirement',
    data: function() {
      return {
        formData:{
        	requirementName:'',
        	PakgeName:'', //需求包名称
        	Proposer: '', //提出人
        	proposerMarket:'', //提出人给的市场？
        	proposerDate:'', //提出时间
        	ResponsePerson:'', //负责人员
        	checked:[],
        	functionModule:'',//功能模块
        	bugID:'',
        	FRadio:'newFunc',
        	PRadio:'',
        	date1:'',
        	date2:'',
        	RqBack:'' ,//需求背景
        	Rqdescription:'', //需求描述
        	RqNote:'' //需求备注
        },
        dialogKeepVisible:false,
        checkList:[
        {name:'WEB终端店', value:'S01'},
        {name:'WEB经销商', value:'S02'},
        {name:'APP终端店', value:'S03'},
        {name:'APP终端店', value:'S04'},
        {name:'运营平台', value:'S05'}
        ],
        ProposerOption:[
        	{name: '市场部', value:'C1'},
        	{name: '运营部', value:'C2'}
        ],
        //功能模块
        functionModuleOption: [
        {name:'入口', value:'S1'},
        {name:'导购', value:'S2'},
        {name:'售卖管理', value:'S3'},
        {name:'营销', value:'S4'},
        {name:'交易', value:'S5'},
        {name:'订单', value:'S6'},
        {name:'支付', value:'S7'},
        {name:'金融', value:'S8'},
        {name:'用户', value:'S9'}
        ],
        rules:{
        	requirementName:[
        		{required: true, message: '此项为必填', trigger: 'blur,change'},
        		{max: 50, message: '最大长度为50个字符', trigger: 'blur'}
        	],
        	// 负责人员
        	Proposer:[{
        		required: true, message: '此项为必填', trigger: 'blur,change'
        	}],
        	PakgeName:[
        		{required: true, message: '此项为必填', trigger: 'change'}
        	],
        }
      }
    },
    methods: {
    	/**
    	 * 初始化数据
    	 * @return {[type]} [description]
    	 */
    	initDatas:function(){
    		var that = this;
            var reqData = {
              type : type,
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
                        data.data.forEach(function(item){
                            switch (item.type){
                            case 1 : 
                              that.requirementStatusOption.push(item);
                              break;
                            case 2 :
                              that.functionalTypeOption.push(item);
                              break;
                            case 3 : 
                              that.functionModuleFirst.push(item);
                              break;
                            case 4 : 
                              that.functionalPlatformOption.push(item);
                              break;
                            case 5 : 
                              that.responsibleUserIdOption.push(item);
                              break;
                          }
                        })
                    };
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	handleCheckedCitiesChange(value) {
    		console.log(value)
    	},
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
    	}
    },
	beforeRouteEnter: function (to,from,next) {
      		next(vm => {
         		if(vm.$route.query.addType =='add'){
         			vm.Add();
         		}else if(vm.$route.query.addType =='assign'){
         			vm.assignment()
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