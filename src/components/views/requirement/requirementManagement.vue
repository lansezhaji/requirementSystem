<template>
  <div class="requirementManagement ">
  <el-breadcrumb separator=">" class="bread-title">
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>
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
				      :value="item.value"
				      >
				    </el-option>
				  </el-select>
		  	</el-form-item>
    		</el-col>
			<el-col :span="6">
				<el-form-item label="功能类型：">
					<el-select v-model="orderForm.functionType" size="small"  placeholder="请选择">
					    <el-option
					      v-for="item in functionalTypeOption"
					      :label="item.name"
					      :value="item.value"
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
					      :value="item.value"
					      >
					    </el-option>
					  </el-select>
				</el-form-item>
    		</el-col>
        <el-col :span="6">
        <el-form-item label="需求进度：">
          <el-select  size="small" v-model="orderForm.requirementStatus"  placeholder="请选择">
              <el-option
                v-for="item in requirementStatusOption"
                :label="item.name"
                :value="item.value"
                >
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
    	</el-row>
    	<el-row type="flex" class="row-bg" justify="right" style="margin-top:20px;">
    	  	<el-col :span="8">
    	  	<el-form-item label="功能分类：">
          <el-cascader
            :options="functionModuleFirstOption"
            v-model="orderForm.functionModuleFirst"
            @change="cascaderChange">
          </el-cascader>
		  	</el-form-item>
    		</el-col>
			<el-col :span="8">
				<el-form-item label="需求规划：">
					<el-select size="small" v-model="orderForm.requirementPlan"  placeholder="请选择">
					    <el-option
					      v-for="item in requirementPlanOption"
					      :label="item.value"
					      :value="item.value"
					      >
					    </el-option>
					  </el-select>
				</el-form-item>
    		</el-col>
    		<el-col :span="8">
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
        <el-button type="primary" @click="Search">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </div>
	</div>
  <div class="retrieval  criteria Style" style="margin-top:20px;">
    <el-row>
      <el-col :span="5">
        <el-button type="text" @click="toAdd"><i class="el-icon-plus"></i>新增</el-button>
        <el-button type="text" @click="dialogDeleteVisible = true">删除</el-button>
        <el-button type="text" :disabled="groupEdit" @click="bulkEditVisible = true">批量编辑</el-button>
      </el-col>
      <el-col :span="19" style="text-align: right;">
         <el-button type="text">导出选择需求</el-button>
        <el-button type="text">导出全部需求</el-button>
      </el-col>
    </el-row>

    <!-- 删除提示框 -->
  <el-dialog title="提示" v-model="dialogDeleteVisible" size="tiny">
  <span>您确定要<span style="color:red;font-size:18px;">删除</span>选择的需求？</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogDeleteVisible = false">确 定</el-button>
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
    <el-button type="primary" @click="Search">确 定</el-button>
    <el-button @click="bulkEditVisible = false">取 消</el-button>
  </span>
</el-dialog>
<!-- 表格 -->
    	<el-table @sort-change="sortChange"
    :data="tableData.list"
    border @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column
      type="selection"
      min-width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="序号"
      min-width="100">
    </el-table-column>
    <el-table-column
      prop="functionModuleFirst"
      label="功能分类"
      min-width="100">
    </el-table-column>
    <el-table-column label="功能平台" style="font-size:12px;">
          <el-table-column v-for="it in nameTest" 
            :label="it.name" 
            min-width="58">
            <template scope="scope">
              <i class="textSize el-icon-check"></i>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="functionType"
          label="功能类型"
          min-width="100">
        </el-table-column>
      
       <el-table-column
          prop="requirementName"
          label="需求名称"
          min-width="200">
        </el-table-column>

        <el-table-column
          prop="priority"
          label="优先级"
          min-width="100">
        </el-table-column>

         <el-table-column
          prop="requirementPlan"
          label="需求规划"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="requirementStart"
          label="需求启动"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="responsibleUserName"
          label="负责人"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="requirementStatus"
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

   <el-pagination :current-page="parseInt(orderForm.curPage)" style="float:right;" 
                  @current-change="pageChange"  :page-count="tableData.total" @
                 layout="total, prev, pager, next, jumper" >
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
          list:[],
          total:10
        },
        nameTest:[
        {name:'W-终', value:'1'},
        {name:'W-经', value:'1'},
        {name:'A-终', value:'1'},
        {name:'A-经', value:'1'},
        {name:'运营', value:'1'},
        {name:'运维', value:'1'},
        {name:'其他', value:'1'}
        ],
        //批量编辑的第一个值
        bulkEditFirstValue : '',
        bulkEditFirstOptions: [
          {name:'需求规划', value:'R1'},
          {name:'需求进度', value:'R2'},
          {name:'负责人', value:'R3'},
          {name:'优先级', value:'R4'},
        ],
        //批量编辑的第二个值
        bulkEditSecondValue : '',
        bulkEditSecondOptions: [
          {name:'需求规划', value:'R1'},
          {name:'需求进度', value:'R2'},
          {name:'负责人', value:'R3'},
          {name:'优先级', value:'R4'},
        ],
        ifSecond:false,
        functionalPlatformOption:[
        {name:'WEB终端店', value:'S01'},
        {name:'WEB经销商', value:'S02'},
        {name:'APP终端店', value:'S03'},
        {name:'APP终端店', value:'S04'},
        {name:'运营平台', value:'S05'}
        ],
        functionalTypeOption:[
        {name:'新增功能', value:'F01'},
        {name:'功能改进', value:'F02'},
        {name:'界面友好性', value:'F03'},
        {name:'Bug修复', value:'F04'},
        {name:'运营需求', value:'F05'},
        {name:'接口需求', value:'F06'}
        ],
        responsibleUserIdOption:[
        {name:'夏睿', value:'P01'},
        {name:'廖佳', value:'P02'},
        {name:'贾茗兮', value:'P03'},
        {name:'秦国舰', value:'P04'},
        {name:'房敏', value:'P05'}
        ],
        requirementStatusOption:[
        {name:'待讨论', value:'SS01'},
        {name:'待设计', value:'SS02'},
        {name:'需求中', value:'SS03'},
        {name:'需求完成', value:'SS04'},
        {name:'已评审', value:'SS05'},
        {name:'开发中', value:'SS06'},
        {name:'已发布', value:'SS07'},
        {name:'暂缓', value:'SS08'},
        {name:'拒绝', value:'SS09'},
        ],
        functionModuleFirstOption: [
        
        ],
        requirementPlanOption:[
          {name:'RP1704', value:'RP1704'},{name:'RP1705', value:'RP1705'},{name:'RP1706', value:'RP1706'},
        ]
        
      }
      
    },
     methods: {
      debug:function(){
        debugger
      },
      /**
       * [bulkEdit 搜索]
       * @return {[type]} [description]
       */
      bulkEdit() {

      },
       pageChange : function(val){
        this.orderForm.curPage = val;
          this.Search(val)
      },
      /**
       * [Search 搜索按钮的事件]
       */
      Search(index){
        let reqData = {
          productPlatform : this.orderForm.productPlatform.join(','),
          functionType : this.orderForm.functionType,
          responsibleUserId : this.orderForm.responsibleUserId,
          requirementStatus : this.orderForm.requirementStatus,
          functionModuleFirst : this.orderForm.functionModuleFirst,//功能一级分级
          // functionModuleSecond = this.orderForm.
          requirementPlan : this.orderForm.requirementPlan, //需求规划
          requirementName : this.orderForm.requirementName,
          curPage : index,
          size : this.orderForm.size
        }
        console.log(reqData)
        this.$http.get('http://localhost:3000/data_list',reqData).then(({data}) => {
          this.tableData.list = data;
          console.log(this.tableData.list)
        })
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
      cascaderChange(value) {
        console.log(value);
      },
      selectChane(value) {
        console.log(value)
        this.ifSecond = true
      },
      /**
       * [toAdd 跳转到新增需求---带有参数：]
       * @return {[type]} [description]
       */
      toAdd() {
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
      handleSelect(item) {
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
      viewDetail(req) {
        this.$router.push({
          name:'viewRequirement'
        })
      },
      handleSelectionChange(val) {
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
      querySearch(queryString, call) {
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
      getMockData() {
        this.$http.get('http://localhost:3000/functionModuleFirstOption').then(({data}) => {
          // console.log(data)
          this.functionModuleFirstOption = data;
        })
      },
      /**
       * [getRequirementPlanOption 获得需求规划的数据]
       * @return {[type]} [description]
       */
      getRequirementPlanOption(){
         this.$http.get('http://localhost:3000/functionModuleFirstOption').then(({data}) => {
          this.requirementPlanOption = data.map( function (item, index) {
            return {
              name:item,
              value: item
            }
          });
        })
      }
    },
    beforeRouteEnter: function (to,from,next) {
          next(vm => {
            vm.getMockData()
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