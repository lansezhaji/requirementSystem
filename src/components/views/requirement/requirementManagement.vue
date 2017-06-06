<template>
  <div class="requirementManagement ">
  <el-breadcrumb separator=">" class="bread-title">
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-button @click="initQueryData()">查询</el-button>
        <el-button @click="debug()">debug</el-button>
        
      </el-breadcrumb-item>
  </el-breadcrumb>
    <div class="retrieval  criteria Style">
  	<el-form :model="orderForm" ref="orderForm"  label-width="160px" class="query">
    	<el-row >
        <el-col :span="18">
          <el-col :span="8">
          <el-form-item label="功能类型：" prop="functionType">
            <el-select v-model="orderForm.functionType" size="small"  placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in functionModuleFirst"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="负责人：" prop="responsibleUserName">
              <el-autocomplete size="small" :maxlength="parseInt(100)"
                  class="inline-input"
                  v-model="orderForm.responsibleUserName"
                  :fetch-suggestions="queryUser"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleUserSelect"
                ></el-autocomplete>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="需求进度：" prop="requirementStatus">
            <el-select  size="small" v-model="orderForm.requirementStatus"  placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in requirementStatusOption"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="功能分类：" prop="functionModuleFirst">
              <el-select  size="small" v-model="orderForm.functionModuleFirst"  placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in functionalTypeOption"
                  :label="item.name"
                  :value="item.id"
                  
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="8">
          <el-form-item label="需求规划：" prop="requirementPlan">
            <el-select size="small" v-model="orderForm.requirementPlan"  placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in requirementPlanOption"
                  :label="item"
                  :value="item"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="需求名称:" prop="requirementName">
            <el-autocomplete size="small" :maxlength="parseInt(100)"
                  class="inline-input"
                  v-model="orderForm.requirementName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                ></el-autocomplete>
          </el-form-item>
          </el-col>        
        </el-col>
    	  	<el-col :span="6">
    	  	<el-form-item label="功能平台：" prop="productPlatform">
				<el-select size="small" v-model="orderForm.productPlatform" multiple placeholder="请选择">
				    <el-option
				      v-for="item in functionalPlatformOption"
				      :label="item.name"
				      :value="item.id"
				      >
				    </el-option>
				  </el-select>
		  	</el-form-item>
    		</el-col>
			
    	</el-row>
    	</el-form>
      <div style="text-align:center;">
        <el-button type="primary" @click="queryRequeryList()">搜索</el-button>
        <el-button type="primary" @click="resetForm('orderForm')">重置</el-button>
      </div>
	</div>
  <div class="retrieval  criteria Style" style="margin-top:20px;">
    <el-row>
      <el-col :span="4" >
        <el-button type="text" @click="toAdd"><i class="el-icon-plus"></i>新增</el-button>
        <el-button type="text" :disabled="groupEdit" @click="dialogDeleteVisible = true">删除</el-button>
        <el-button type="text" :disabled="groupEdit" @click="batchModifyRequire">批量编辑</el-button>
      </el-col>
      <el-col :span="20" style="text-align: right;">
         <el-button type="text" :disabled="groupEdit" @click="exportSelectRequire">导出选择需求</el-button>
        <el-button type="text" @click="exportAllRequire">导出全部需求</el-button>
      </el-col>
    </el-row>

    <!-- 删除提示框 -->
  <el-dialog title="提示" v-model="dialogDeleteVisible" size="tiny">
  <span>您确定要<span style="color:red;font-size:18px;">删除</span>选择的需求？</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="deleteRequirList">确 定</el-button>
    <el-button @click="dialogDeleteVisible = false">取 消</el-button>
  </span>
</el-dialog>

<!-- 批量编辑对话框 -->
 <el-dialog title="批量编辑需求" v-model="bulkEditVisible" size="tiny">
 <el-form>
  <el-form-item v-for="(item,index) in batchForm">
      <el-col :span="8">
         <el-select v-model="item.typeId" @change="batchTypeSelect(index)">
           <el-option :value="type.id" :label="type.name" v-for="type in item.typeList"></el-option>
         </el-select>
      </el-col>
      <el-col :span="4">
        更新为：
      </el-col>
      <el-col :span="12">
      <!-- 需求规划 -->
        <el-select v-model="item.value" placeholder="请选择" v-if="item.typeId==1">
            <el-option :value="type" :label="type" v-for="type in item.list"></el-option>
        </el-select>
        <el-select v-model="item.value" placeholder="请选择" v-if="item.typeId==2">
            <el-option :value="type.id" :label="type.name" v-for="type in item.list"></el-option>
        </el-select>
        <el-select v-model="item.value" placeholder="请选择" v-if="item.typeId==3">
            <el-option :value="type.id" :label="type.userName" v-for="type in item.list"></el-option>
        </el-select>
        <el-select v-model="item.value" placeholder="请选择" v-if="item.typeId==4">
            <el-option :value="type" :label="type" v-for="type in item.list"></el-option>
        </el-select>
      </el-col>    
  </el-form-item>

 </el-form>

 
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="batchModify()">确 定</el-button>
    <el-button @click="bulkEditVisible = false">取 消</el-button>
  </span>
</el-dialog>
<!-- 表格 -->
    	<el-table @sort-change="sortChange"
    :data="tableData.data"
    :stripe="true"
    border @selection-change="handleSelectionChange"
    class="requireClass" >
    <el-table-column
      type="selection"
      min-width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="序号"
      min-width="50">
    </el-table-column>
    <el-table-column
      prop="functionModuleFirst"
      label="功能分类"
      min-width="120">
        <template scope="scope">
            {{scope.row.functionModuleFirstName}}-{{scope.row.functionModuleSecondName}}
        </template>
    </el-table-column>
        <el-table-column label="功能平台" style="font-size:12px;">
          <el-table-column v-for="it in functionalPlatformOption" 
            :label="filterFunctionList(it.id)" 
            min-width="40">
            <template scope="scope" >
              <i :class="getProductCheck(scope.row.productPlatformId,it.id)"></i>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="functionTypeName"
          label="功能类型"
          min-width="100"
          >
        </el-table-column>
      
       <el-table-column
          prop="requirementName"
          label="需求名称"
          show-overflow-tooltip
          min-width="450">
        </el-table-column>

        <el-table-column
          prop="priority"
          label="优先级"
          min-width="60" >
          <template scope="scope" >
            <el-col style="text-align:center" >
              {{scope.row.priority}}
            </el-col>
          </template>
        </el-table-column>

         <el-table-column
          prop="requirementPlan"
          label="需求规划"
          show-overflow-tooltip
          min-width="80">
        </el-table-column>

        <el-table-column
          prop="requirementStart"
          label="需求启动"
          show-overflow-tooltip
          min-width="80">
        </el-table-column>

        <el-table-column
          prop="responsibleUserName"
          label="负责人"
          show-overflow-tooltip
          min-width="70">
        </el-table-column>

        <el-table-column
          prop="requirementStatusName"
          label="需求进度"
          min-width="80">
          <template scope="scope">
            <!-- <el-col :class="requireStatusClass(scope.row.requirementStatusName)"> -->
            <el-col >
              {{scope.row.requirementStatusName}}
            </el-col>
          </template>
        </el-table-column>

        <el-table-column
        fixed="right"
        label="操作"
        width="50">
        <template scope="scope">
          <el-button @click="viewDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
  
  </el-table> 
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="tableData.currentPage"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="orderForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.totalCount">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'requirementManagement',
    data: function() {
      return {
        dialogDeleteVisible: false, //删除按钮的弹框
        groupEdit:true, //批量编辑是否处于不可用状态
        //表单元素
        fuzzyList:[],
        bulkEditVisible:false, // 批量编辑的弹出框
        multipleSelection: [], //多选框选中的值
    		orderForm:{
    			productPlatform: [],
    			functionType: '',
          responsibleUserId: '',
          responsibleUserName : '',
          requirementStatus: '',
          functionModuleFirst:'', //功能一级分级
          functionModuleSecond:'',
          requirementPlan:'', //需求规划
          requirementName:'',
          curPage:'',
          size:10,
    		},
        tableData:{
          data:[],
          total:0
        },
        nameTest:[ ],
        //批量编辑的第一个值
        bulkEditFirstValue : '',
        bulkEditFirstOptions: [ ],
        //批量编辑的第二个值
        bulkEditSecondValue : '',
        bulkEditSecondOptions: [ ],
        ifSecond:false,
        functionalPlatformOption:[ ],
        functionalTypeOption:[ ],
        responsibleUserIdOption:[ ],
        requirementStatusOption:[ ],
        functionModuleFirst: [ ],
        requirementPlanOption:[ ],
        batchForm : [],
        userList : [],//用户列表
        associateList : [],//联想列表
        associateUserList : [],//联想列表
      }
      
    },
     methods: {
      debug:function(){
        debugger
      },
      // 初始化查询选相框
      initBase : function(type,callback){
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
       * 查询初始化数据，填充请求参数
       * @return {[type]} [description]
       */
      initQueryData : function(){
          var that = this;
          // 需求进度
          this.initBase();

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
                      that.requirementPlanOption = data.data;
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
       * 获取需求列表
       * @return {[type]} [description]
       */
      queryRequeryList : function(pageIndex){
          var that = this;
          var url = "/api/dlmanagementtool/requirement/list"
          var reqData = {
            curPage : pageIndex || 1,
            size : that.orderForm.size,
            data:[{ 
                productPlatformId : this.orderForm.productPlatform.toString(),
                functionTypeId : this.orderForm.functionType,
                responsibleUserId : this.orderForm.responsibleUserId, 
                requirementStatusId : this.orderForm.requirementStatus,
                functionModuleFirstId :this.orderForm.functionModuleFirst,//功能一级分级
                requirementPlan : this.orderForm.requirementPlan, //需求规划
                requirementName : this.orderForm.requirementName,
            }]
          }
          this.$http.post(url,reqData).then(({
              data,
              ok,
              statusText
          }) => {
              if (ok && data.status == '0') {
                  that.tableData = data.data;
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
           * 模糊查询
           */
           queryUser(queryString, cb) {
                  var that = this;
                  that.associateUserList = [];

                  var url = "/api/dlmanagementtool/user/fuzzyQueryUser";
                  var reqData = {
                      name: queryString,
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
                              restaurant.value = item.name;
                              restaurant.id = item.id;
                              that.associateUserList.push(restaurant);
                          })
                          cb(that.associateUserList);
                      }
                  });

              },
              handleUserSelect : function(val){
                  this.orderForm.responsibleUserId = val.id
              },
      /**
       * 校验是否被选中
       * @return {[type]} [description]
       */
      getProductCheck:function(id,funcId){
        funcId = funcId.toString();
        if (id.indexOf(funcId)>=0) {
          return 'textSize el-icon-check'
        }
        return ""
        
      },
      /**
       * 重置表单
       * @param  {[type]} formName [description]
       * @return {[type]}          [description]
       */
      resetForm :function(formName) {
          this.$refs[formName].resetFields();
          this.orderForm.responsibleUserId = ''
      } ,
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
       * 批量修改弹窗
       * @return {[type]} [description]
       */
      batchModifyRequire : function(){
        this.resetBatchForm();
        this.bulkEditVisible = true
      },
      /**
       * 批量操作选项
       * @return {[type]} [description]
       */
      batchTypeSelect : function(index){
        var that = this;
        //去除其他选项中的重复项
        this.batchForm.forEach(function(item,i){
            if (i != index) {
                item.typeList.forEach(function(type,order){
                      if (type.id == that.batchForm[index].typeId) {
                      item.typeList.splice(order,1);
                  };
                })
            };
        })
        // 填充选项列表
        switch(that.batchForm[index].typeId){

          case 1: this.batchForm[index].list = that.requirementPlanOption; //需求规划
                  break;
          case 2: this.batchForm[index].list = that.requirementStatusOption; //需求进度
                  break;
          case 3: this.batchForm[index].list = that.userList; 
                  break;
          case 4: this.batchForm[index].list = [1,2,3,4,5];
                  break;
        }
        
      },
      /**
       * 批量修改
       * @return {[type]} [description]
       */
      batchModify :function(){
        var that = this;
          var reqData = [];
         
          that.multipleSelection.forEach(function(require){
            var modifyObj = {
                id : require.id
            };
            that.batchForm.forEach(function(item){
              if (item.typeId ==1 && item.value) {  //需求规划
                modifyObj.requirementPlan = item.value
              }else if (item.typeId ==2 && item.value) { //需求进度
                modifyObj.requirementStatusId = item.value
                var requirementStatusName = ""
                that.requirementStatusOption.forEach(function(status){
                    if (modifyObj.requirementStatusId == status.id) {
                      requirementStatusName = status.name
                    };
                })
                modifyObj.requirementStatusName = requirementStatusName
              }else if (item.typeId ==3 && item.value) { //负责人
                modifyObj.responsibleUserId = item.value
                var userName = ""
                //遍历获取name 
                that.userList.forEach(function(user){
                    if (modifyObj.responsibleUserId == user.id) {
                        userName = user.userName
                        return 
                    };
                })
                modifyObj.responsibleUserName = userName
              }else if (item.typeId ==4 && item.value) { //优先级
                modifyObj.priority = item.value
              }
            })
            reqData.push(modifyObj)
          })
          console.log("批量修改："+reqData);
          var url = "/api/dlmanagementtool/requirement/batchEdit"
          this.$http.post(url,reqData).then(({
              data,
              ok,
              statusText
          }) => {
              if (ok && data.status == '0') {
                  that.$message.success("修改成功");
                  that.queryRequeryList();
                  that.bulkEditVisible = false;
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
       * 初始化批量操作表单
       * @return {[type]} [description]
       */
      resetBatchForm : function(){
          this.batchForm = [{
              typeList:[{id : 1 ,name :'需求规划'},{id : 2 ,name :'需求进度'},{id : 3 ,name :'负责人'},{id : 4 ,name :'优先级'}],
              typeId : "",
              list : [],
              value : "",
            },{
              typeList:[{id : 1 ,name :'需求规划'},{id : 2 ,name :'需求进度'},{id : 3 ,name :'负责人'},{id : 4 ,name :'优先级'}],
              typeId : "",
              list : [],
              value : "",
            },{
              typeList:[{id : 1 ,name :'需求规划'},{id : 2 ,name :'需求进度'},{id : 3 ,name :'负责人'},{id : 4 ,name :'优先级'}],
              typeId : "",
              list : [],
              value : "",
            },{
              typeList:[{id : 1 ,name :'需求规划'},{id : 2 ,name :'需求进度'},{id : 3 ,name :'负责人'},{id : 4 ,name :'优先级'}],
              typeId : "",
              list : [],
              value : "",
            }]
      },
      /**
       * 导出选择的需求
       * @return {[type]} [description]
       */
      exportSelectRequire: function(){
          var that = this;
          if(this.multipleSelection.length<=0){
            return false;
          }
          var selectListArr = [];
          this.multipleSelection.forEach(function(item){
              selectListArr.push(item.id)
          })
          var selectListStr = selectListArr.toString();
          var url = "/api/dlmanagementtool/requirement/exportExcel/"+selectListStr
          window.open(url);
      },
      /**
       * 导出全部需求
       * @return {[type]} [description]
       */
      exportAllRequire: function(){
          var that = this;
          var url = "/api/dlmanagementtool/export/exportAllExcel"
          window.open(url);
      },
      /**
       * 批量删除
       * @param  {[type]} row    [description]
       * @param  {[type]} column [description]
       * @return {[type]}        [description]
       */
      deleteRequirList : function(){
          var that = this;
          if(this.multipleSelection.length<=0){
            return false;
          }
          var selectListArr = [];
          this.multipleSelection.forEach(function(item){
              selectListArr.push(item.id)
          })
          var selectListStr = selectListArr.toString();
          var url = "/api/dlmanagementtool/requirement/delete?ids="+selectListStr
          this.$http.get(url).then(({
              data,
              ok,
              statusText
          }) => {
              if (ok && data.status == '0') {
                  that.dialogDeleteVisible = false;
                  that.queryRequeryList();
                  that.$message.success("删除成功！");
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
       * 翻页
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
       pageChange : function(val){
          this.orderForm.curPage = val;
          this.queryRequeryList(val)
      },
      sizeChange : function(val){
          this.orderForm.size = val;
          this.queryRequeryList()
      },
      filterFunctionList : function(id){
          var functionObj = {
              75 : "W-终",
              76 : "W-经",
              77 : "A-终",
              78 : "A-经",
              79 : "运营",
              109 : "运维",
              110 : "其他",
          }
          return functionObj[id]
      },
      /**
       * 根据优先级标注颜色
       * @param  {[type]} status [description]
       * @return {[type]}        [description]
       */
      priorityClass : function(status){
        var classArray = ['','first','second','third'];
        return classArray[status];
      },
      /**
       * [sortChange 排序---改变传给后端的值]
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
      sortChange: function(obj) {
          let that  = this;
          switch (obj.prop){
            case 'tradeCount':
              that.orderForm.sortName = 'num';
              
              break;
            case 'tradeAmt':
              that.orderForm.sortName = 'amt'
              
              break;
          }
        
        if(obj.order == "ascending"){
          that.orderForm.sortType = "asc";
        }else{
          that.orderForm.sortType = "desc";
        }
        that.orderForm.pageIndex = 1;
        that.queryData(1);
        },
      /**
       * [cascaderChange 二级联动触发的函数]
       * @return {[type]} [description]
       */
      cascaderChange : function(value) {
        console.log(value);
      },
      selectChane : function(value) {
        console.log(value)
        this.ifSecond = true
      },
      /**
       * [toAdd 跳转到新增需求---带有参数：]
       * @return {[type]} [description]
       */
      toAdd:function() {
        let that = this;
        that.$router.push({
          name:'addRequirement',
          query:{
            addType:'add'
          }
        })
      },
      /**
       * [handleSelect 联想匹配函数选中]
       * @param  {[type]} item [description]
       * @return {[type]}      [description]
       */
      handleSelect:function(item) {
          this.orderForm.requirementName = item.value;
      },
      /**
       * [viewDetail 查看详情]
       * @return {[type]} [description]
       */
      viewDetail : function(req) {
        this.$router.push({
          name:'addRequirement',
          query:{
            "addType":"assign",
            "id":req.id
          }
        })
      },
      handleSelectionChange : function(val) {
        this.multipleSelection = val;
        if(this.multipleSelection.length > 0){
          this.groupEdit = false;
        }else{
          this.groupEdit = true;
        }
        console.log(this.multipleSelection)
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
      //获得二级联动的mock
      getMockData :function() {
        this.$http.get('http://localhost:3000/functionModuleFirstOption').then(({data}) => {
          // console.log(data)
          this.functionModuleFirstOption = data;
        })
      },

    },
    beforeRouteEnter: function (to,from,next) {
      next(vm => {
        // vm.getMockData()
        vm.initQueryData();
        vm.getRequirePlan();
        vm.queryRequeryList();
        vm.getUserList();
      });
    }
  }
</script>

<style lang="less">
  .Style{
    margin-left: 20px;
    padding: 10px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    
  }
 .requirementManagement .textSize{
  font-size: 12px;
  color: green ;
 }
 .baseStyle{
  text-align: left;
  font-weight: bold;
 }
 .bread-title {
  margin-bottom: 20px;
  margin-left: 20px;
 }
 .bread-title .el-breadcrumb__item__inner{
  font-size: 18px;
  }
  .first{
    background-color: red ;
    color: white;
    text-align: center;
  }
  .second{
    background-color: orange;
    text-align: center;
  }
  .third {
    background-color: yellow;
    text-align: center;
  }
  .requireClass {
    width: 100%;
    text-align: left;
  }

  .el-table .cell, .el-table th>div{
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
</style>