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
    	<el-row type="flex" class="row-bg" justify="right">
    	  	<el-col :span="6">
    	  	<el-form-item label="功能平台：">
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
			<el-col :span="6">
				<el-form-item label="功能类型：">
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
    		<el-col :span="6">
				<el-form-item label="负责人：">
					<el-select  size="small" v-model="orderForm.responsibleUserId"  placeholder="请选择">
					    <el-option
					      v-for="item in responsibleUserIdOption"
					      :label="item.name"
					      :value="item.id"
					      >
					    </el-option>
					  </el-select>
				</el-form-item>
    		</el-col>
        <el-col :span="6">
        <el-form-item label="需求进度：">
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
    	</el-row>
    	<el-row type="flex" class="row-bg" justify="right" style="margin-top:20px;">
    	  	<el-col :span="6">
    	  	<el-form-item label="功能分类：">
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
			<el-col :span="6">
				<el-form-item label="需求规划：">
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
    		<el-col :span="6">
				<el-form-item label="需求名称:" >
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
        <el-button type="text" @click="dialogDeleteVisible = true">删除</el-button>
        <el-button type="text" :disabled="groupEdit" @click="bulkEditVisible = true">批量编辑</el-button>
      </el-col>
      <el-col :span="20" style="text-align: right;">
         <el-button type="text" @click="exportSelectRequire">导出选择需求</el-button>
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
 <el-dialog title="批量编辑需求" v-model="bulkEditVisible">
 <el-row>
  <el-col :span="12">
     <el-select v-model="bulkEditFirstValue" placeholder="请选择">
        <el-option
          v-for="item in bulkEditFirstOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
  </el-col>
  <el-col :span="12">
     <el-select v-model="bulkEditSecondValue" placeholder="请选择">
        <el-option
          v-for="item in bulkEditSecondOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
  </el-col>
 </el-row>
 
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="initQueryData">确 定</el-button>
    <el-button @click="bulkEditVisible = false">取 消</el-button>
  </span>
</el-dialog>
<!-- 表格 -->
    	<el-table @sort-change="sortChange"
    :data="tableData.data"
    border @selection-change="handleSelectionChange"
    style="width: 100%;text-align:left">
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
      min-width="180">
        <template scope="scope">
            {{scope.row.functionModuleFirstName}}  /{{scope.row.functionModuleSecondName}}
        </template>
    </el-table-column>
        <el-table-column label="功能平台" style="font-size:12px;">
          <el-table-column v-for="it in functionalPlatformOption" 
            :label="it.name" 
            min-width="58">
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
          min-width="200">
        </el-table-column>

        <el-table-column
          prop="priority"
          label="优先级"
          min-width="40" >
        </el-table-column>

         <el-table-column
          prop="requirementPlan"
          label="需求规划"
          min-width="80">
        </el-table-column>

        <el-table-column
          prop="requirementStart"
          label="需求启动"
          min-width="80">
        </el-table-column>

        <el-table-column
          prop="responsibleUserName"
          label="负责人"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="requirementStatusName"
          label="需求进度"
          min-width="100">
        </el-table-column>

        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="viewDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
  
  </el-table>

<!--    <el-pagination :current-page="parseInt(tableData.currentPage)" style="float:right;" 
                  @current-change="pageChange"  :total="tableData.totalCount" @
                 layout="total, prev, pager, next, jumper" >
    </el-pagination>    -->
    <el-pagination
      @current-change="pageChange"
      :current-page.sync="tableData.currentPage"
      :page-size="5"
      layout="total, prev, pager, next"
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
          requirementStatus: '',
          functionModuleFirst:'', //功能一级分级
          functionModuleSecond:'',
          requirementPlan:'', //需求规划
          requirementName:'',
          curPage:'',
          size:'',
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
        requirementPlanOption:[ ]
        
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
            size : 5,
            data:[{ 
                productPlatformId : this.orderForm.productPlatform.toString(),
                functionTypeId : this.orderForm.functionType,
                // this.orderForm.responsibleUserId,                               --------------------暂时没写
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
      } ,
      /**
       * [bulkEdit 搜索]
       * @return {[type]} [description]
       */
      bulkEdit() {

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
          this.$http.get(url).then(({
              data,
              ok,
              statusText
          }) => {
              if (ok && data.status == '0') {
                  that.$message.success("导出成功！");
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
       * 导出全部需求
       * @return {[type]} [description]
       */
      exportAllRequire: function(){
          var that = this;
          var url = "/api/dlmanagementtool/requirement/exportAllExcel"
          this.$http.get(url).then(({
              data,
              ok,
              statusText
          }) => {
              if (ok && data.status == '0') {
                  that.$message.success("导出成功");
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
       pageChange : function(val){
        this.orderForm.curPage = val;
          this.queryRequeryList(val)
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
        this.orderForm.sellerName = item.companyName;
        let reqData = {
         Money:'',
        Date:'', //这里最好换个变量名 date是js保留字
        Ratio:''

        }
        this.$http.post('http://ip:port/loan/profit', reqData).then(({data})=>{
          //data就是你想要的 数据
          console.log(data)
        })
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
      querySearch :function(queryString, call) {
        var that = this;
        //此处去请求后端的数据
        that.fuzzyList='';
        let reqData = {
          companyName:queryString
        }
//         that.$http.post('/dladmin/present/getBizNameList.html',reqData,{emulateJSON:true}
// ).then( ({data,ok,statusText}) => {
//            if (ok && !data.status) {
//             that.fuzzyList = data;
//              // 调用 callback 返回建议列表的数据
//             that.fuzzyList.forEach(function (item, index) {
//               item.value=item.companyName
//             })
//             call(that.fuzzyList);
//           }else{
//              this.$message({
//                       message: data.msg,
//                       type: 'warning'
//                     });
//           }
//         })

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
</style>