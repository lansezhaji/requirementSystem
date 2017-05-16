<template>
  <div class="propertyManagement">
     <el-breadcrumb separator=">" class="bread-title retrieval  criteria">
		  <el-breadcrumb-item>属性管理</el-breadcrumb-item>
	</el-breadcrumb>
	<el-form :rules="rules" ref="propertyForm" :model="propertyForm">
		<div class="listStyle">
			<el-row type="flex" class="row-bg" justify="right">
			  	<el-col :span="11">
				  <el-row>
				  <el-col :span="4">
						<span>需求属性：</span>
					</el-col>
				    <el-col :span="8">
						<el-input size="small" v-model="newRequiremenProperty"></el-input>
					</el-col>
				    <el-col :offset="1" :span="6">
						<el-button type="primary" size="small" @click="Search(index)">搜索</el-button>
					</el-col>
				  </el-row>
				</el-col>
			  <el-col :span="11" ></el-col>
			</el-row>

			<el-row type="flex" class="row-bg" justify="right" style="border-bottom:1px dashed gray;padding-bottom:30px">
				<el-col :span="11">
				<div class="RPList">
					<ul>
						<li v-for="(item,index) in requiremenPropertyList"
						 @click="getFirstProperty(item.id)"
						 :class="requirementActive(item.id)"
						 >{{item.name}}</li>
					</ul>
				</div>
				</el-col>
				<el-col :span="11"></el-col>
			</el-row>
		</div>
		<div class="listStyle" style="margin-top:20px;">
			<el-row type="flex" class="row-bg" justify="right">
				<el-col :span="11">
				  <el-row>
				  <el-col :span="4">
						<span>需求属性：</span>
					</el-col>
				    <el-col :span="8">
				    	<el-form-item prop="newFirstProperty">
				    		<el-input size="small" v-model="propertyForm.newFirstProperty" :disabled="!requirementIndex"></el-input>
				    	</el-form-item>
						
					</el-col>
				    <el-col :span="6" :offset="1">
						<el-button type="primary" size="small" @click="addProperty(1)" :disabled="!propertyForm.newFirstProperty">添加属性</el-button>
					</el-col>
				  </el-row>

				 	<el-row type="flex" class="row-bg" justify="right">
						<el-col :span="24">

						
								<el-row class="btnStyle">
									<el-button type="text" v-if="!firstProperyModify " @click="firstProperyModify = true" :disabled="!firstReqIndex">修改</el-button>
									<el-button type="text" v-if="firstProperyModify " @click="saveFirstProperty" :disabled="!firstReqIndex">保存</el-button>
									<el-button type="text" v-if="firstProperyModify " @click="firstProperyModify = false" :disabled="!firstReqIndex">取消</el-button>
									<el-button type="text" @click="deleteFirstVisiable = true" :disabled="!firstReqIndex">删除</el-button>
									<el-dialog
									  title="提示"
									  :visible.sync="deleteFirstVisiable"
									  size="tiny" >
									  <span>确定要删除该属性么？</span>
									  <span slot="footer" class="dialog-footer">
									    <el-button type="primary" @click="deleteFirstProperty">确 定</el-button>
									    <el-button @click="deleteFirstVisiable = false">取 消</el-button>
									  </span>
									</el-dialog>
								</el-row>
								<p class="propertyText">一级属性</p>
							<div class="RPList">
								<ul>
									<li v-for="(item,index) in firsetPropertyList"
										 @click="getSecondProperty(item.id)"
										 :class="firstReqActive(item.id)"
										 >
										 
										 <span v-if="(firstReqIndex == item.id) && firstProperyModify">
										 	<el-input type="small"  v-model="item.name"></el-input>
										 </span >
										 <span v-else>{{item.name}}</span>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<!-- 二级属性开始 -->
				<el-col :span="11" :offset="1">
					 <el-row>
					  <el-col :span="4">
							<span>需求属性：</span>
						</el-col>
					    <el-col :span="8">
					    <el-form-item prop="newSecondProperty">
				    		<el-input size="small"  v-model="propertyForm.newSecondProperty" :disabled="!firstReqIndex"></el-input>
				    	</el-form-item>
							
						</el-col>
					    <el-col :span="6" :offset="1">
							<el-button type="primary" size="small" @click="addProperty(2)" :disabled="!propertyForm.newSecondProperty">添加属性</el-button>
						</el-col>
					  </el-row>

					 	<el-row type="flex" class="row-bg" justify="right">
							<el-col :span="24">
							<div class="btnStyle">
									<el-button type="text" v-if="!secondProperyModify" @click="secondProperyModify =true" :disabled="!secondReqIndex">修改</el-button>
									<el-button type="text" v-if="secondProperyModify" @click='saveSecondProperty' :disabled="!secondReqIndex">保存</el-button>
									<el-button type="text" v-if="secondProperyModify" @click='secondProperyModify = false' :disabled="!secondReqIndex">取消</el-button>
									<el-button type="text" @click="deleteSecondProperty" :disabled="!secondReqIndex">删除</el-button>
									<el-dialog
									  title="提示"
									  :visible.sync="deleteSecondVisiable"
									  size="tiny" >
									  <span>确定要删除该属性么？</span>
									  <span slot="footer" class="dialog-footer">
									    <el-button type="primary" @click="deleteSecondProperty">确 定</el-button>
									    <el-button @click="deleteSecondVisiable = false">取 消</el-button>
									  </span>
									</el-dialog>
								</div>
								<p class="propertyText">二级属性</p>
								<div class="RPList">
									<ul>
										<li v-for="(item,index) in secondPropertyList"
										 @click="choseSecondProperty(item.id)"
										 :class="secondReqActive(item.id)"
										 >
										 
										 <span v-if="(secondReqIndex == item.id) && secondProperyModify">
										 	<el-input type="small"  v-model="item.name"></el-input>
										 </span >
										 <span v-else>{{item.name}}</span>
									</li>
									</ul>
								</div>
							</el-col>
						</el-row>
				</el-col>
			</el-row>

		</div>
	</el-form>
  </div>
</template>

<script>
  export default {
    name: 'propertyManagement',

    data: function() {
	var requireNameValid = (rule, value, callback) => {
		if (!value) {
		  callback();
		} else {
			var url = '/api/dlmanagementtool/property/checkNameRepeat';
			var reqData = {
				name : value
			}
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0' && !data.data) {
                	this.$message.success('该名称可用');
                	callback();
                } else {
                  	callback(new Error('需求名称已存在'));
                }
            });
		}
	}
      return {
      	requirementIndex : 1,
      	firstReqIndex : "",
      	propertyForm:{
	      	newFirstProperty : "",//新增一级属性
	      	newSecondProperty : "",//新增二级属性      		
      	},
      	firstProperyModify : false , //编辑模式
      	deleteFirstVisiable : false, //删除弹窗
        newRequiremenProperty:'', 
        requiremenPropertyList:[
        	{name:'需求状态',id:1},
        	{name:'功能模块',id:2},
        	{name:'功能类型',id:3},
        	{name:'产品平台',id:4},
        	{name:'提出人'  ,id:5},
        ],
        firsetPropertyList : [], //一级属性列表
        //二级属性
        secondPropertyList : [], //二级属性列表
        secondReqIndex : 1,
        
        secondProperyModify : false , //编辑模式
        deleteSecondVisiable : false,//删除二级属性弹窗

        rules : {
        	newFirstProperty : [
	            {  max: 40, message: '40字符以内', trigger: 'blur,change' },
	            { validator : requireNameValid , trigger: 'blur' }
	        ],
	        newSecondProperty : [
	        {  max: 40, message: '40字符以内', trigger: 'blur,change' },
	        { validator : requireNameValid , trigger: 'blur' }]
        }
      }
    },
    methods:{
    	debug:function(){
	        debugger
	    },
    	Search() {

    	},
    	/**
    	 * 属性是否激活状态
    	 * @return {[type]} [description]
    	 */
    	requirementActive : function(index){
    		return this.requirementIndex == index ? 'active' : ''
    	},
    	/**
    	 * 一级属性是否激活状态
    	 * @return {[type]} [description]
    	 */
    	firstReqActive : function(index){
    		return this.firstReqIndex == index ? 'active' : ''
    	},
    	/**
    	 * 二级属性是否激活状态
    	 * @return {[type]} [description]
    	 */
    	secondReqActive : function(index){
    		return this.secondReqIndex == index ? 'active' : ''
    	},
    	/**
    	 * 添加属性
    	 */
    	addProperty:function(level){
    		var that = this;
    		var parentId = ""
    		var name = ""
    		if (level ==1) {
    			name = this.propertyForm.newFirstProperty
    		}else if (level ==2) {
    			parentId = this.firstReqIndex
    			name = this.propertyForm.newSecondProperty
    		};
            var reqData = {
              type : this.requirementIndex,
              level : level,
              parentId : parentId,
              name : name
            }
            var url = '/api/dlmanagementtool/property/save';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                	this.$message.success('新增属性成功')
                    // that.firsetPropertyList = data.data
                    
                    if (level == 1) {
                    	that.propertyForm.newFirstProperty = ""
                    	that.getFirstProperty(that.requirementIndex);
                    }else{
                    	that.propertyForm.newSecondProperty = ""
                    	that.getSecondProperty(that.firstReqIndex);
                    }
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	/**
    	 * 获取一级属性
    	 * @return {[type]} [description]
    	 */
    	getFirstProperty : function(index){
            var that = this;
            if (this.firstProperyModify) {
            	this.$message.error('您当前还有未保存修改');
            	return false;
            };
            this.requirementIndex = index;
            var reqData = {
              type : index,
              level : 1
            }
            var url = '/api/dlmanagementtool/property/list';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                    that.firsetPropertyList = data.data
                    that.firstReqIndex = "";
                    that.secondReqIndex = "";
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	/**
    	 * 修改一级属性
    	 * @return {[type]} [description]
    	 */
    	saveFirstProperty : function(){
    		var that = this;
    		this.firstProperyModify = false;
    		var modifyName = "";
    		this.firsetPropertyList.forEach(function(item){
    			if (item.id == that.firstReqIndex) {
    				modifyName = item.name
    			};
    		})
            var reqData = {
				type: this.requirementIndex,
				level: 1,
				parentId: "",
				name: modifyName,
				id : this.firstReqIndex
            }
            var url = '/api/dlmanagementtool/property/save';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                	that.$message.success("修改成功");
                    that.getFirstProperty(that.requirementIndex);
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	/**
    	 * 删除一级属性
    	 * @return {[type]} [description]
    	 */
    	deleteFirstProperty : function(){
    		var that = this;
    		this.firstProperyModify = false;
            var reqData = {
				id : this.firstReqIndex
            }
            var url = '/api/dlmanagementtool/property/delete';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                	that.$message.success("删除成功");
                	that.deleteFirstVisiable = false;
                    that.getFirstProperty(that.requirementIndex);
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	/**
    	 * 获取二级属性
    	 * @return {[type]} [description]
    	 */
    	getSecondProperty : function(index){
			var that = this;
			if (this.firstProperyModify) {
            	return false;
            };
            this.firstReqIndex = index;
            var reqData = {
				"type": this.requirementIndex,
				"parentId": this.firstReqIndex,
            }
            var url = '/api/dlmanagementtool/property/list';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                    that.secondPropertyList = data.data
                    that.secondReqIndex = "";
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	/**
    	 * 二级属性被选中状态
    	 * @return {[type]} [description]
    	 */
    	choseSecondProperty : function(index){
    		this.secondReqIndex = index;
    	},


    	/**
    	 * 保存二级属性修改
    	 * @return {[type]} [description]
    	 */
    	saveSecondProperty : function(){
    		var that = this;
    		
    		var modifyName = "";
    		this.secondPropertyList.forEach(function(item){
    			if (item.id == that.secondReqIndex) {
    				modifyName = item.name
    			};
    		})
            var reqData = {
				type: this.requirementIndex,
				level: 2,
				parentId: this.firstReqIndex,
				name: modifyName,
				id : this.secondReqIndex
            }
            var url = '/api/dlmanagementtool/property/save';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                	that.$message.success("修改成功");
                	that.secondProperyModify = false;
                    that.getSecondProperty(that.firstReqIndex);
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	/**
    	 * 删除二级属性
    	 * @return {[type]} [description]
    	 */
    	deleteSecondProperty : function(){
    		var that = this;
    		
            var reqData = {
				id : this.secondReqIndex
            }
            var url = '/api/dlmanagementtool/property/delete';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                	that.$message.success("删除成功");
                	that.deleteSecondVisiablee = false;
                	this.secondProperyModify = false;
                    that.getSecondProperty(that.firstReqIndex);
                } else {
                  that.$message.error(data.msg);
                }
            });
    	},
    	//选中数据
    	check(value,key,index) {
    		var that = this;
    		console.log(index)
	      	// $(".RPList ul li").removeClass('selected');
	      	$(".RPList ul li:eq("+index+")").addClass = 'aa';
	      	console.log($(".RPList ul li:eq("+index+")"))
    	},
    },
    filters:{

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
	height:220px;
	overflow:auto;
	border-radius: 5px;
	ul{
		padding:8px 16px;
		li{
			padding: 4px;
			border-radius: 2px;
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
.active{
	background:  lightgray;
}

</style>