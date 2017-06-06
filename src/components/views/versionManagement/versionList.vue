<template>
    <div class="versionList">
      <el-breadcrumb separator=">" class="bread-title">
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
<!--         <el-button @click="getVersionTypeList()">查询</el-button>
        <el-button @click="debug()">debug</el-button> -->
    </el-breadcrumb>
    <div class="retrieval  criteria Style">
      <el-form :model="orderForm" ref="orderForm"  label-width="120px" class="query" style="text-align:left">
        <el-row type="flex" class="row-bg" justify="right">
              <el-col :span="8">
                <el-form-item label="版本类型：" prop="versionType">
                  <el-select  size="small" v-model="orderForm.versionType"  placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in versionTypeList"
                      :key="item.id"
                      :label="item.versionTypeName"
                      :value="item.id"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="版本号：" prop="versionName">
                  <el-select size="small" v-model="orderForm.versionName"  placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in versionAllList"
                      :label="item.versionName"
                      :value="item.versionName"
                      >
                    </el-option>
                  </el-select>
<!--                   <el-autocomplete size="small" :maxlength="parseInt(100)"
                    class="inline-input"
                    v-model="orderForm.versionName"
                    :fetch-suggestions="queryVersionSearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleVersionSelect"
                  ></el-autocomplete> -->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="版本状态：" prop="versionStatus">
                    <el-select size="small" v-model="orderForm.versionStatus" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="启用" value=1></el-option>
                      <el-option label="上线" value=2></el-option>
                      <el-option label="锁定" value=3></el-option>
                      <el-option label="挂起" value=4></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
        </el-row>

    <el-row type="flex" class="row-bg" justify="right">
      <el-col :span="16">
            <el-col :span="12">
                <el-form-item label="项目经理：" prop="projectManagement">
                  <el-col :span="20">
<!--                     <el-select  size="small" v-model="orderForm.projectManagement"  placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                          v-for="item in userList"
                          :label="item.userName"
                          :value="item.userName"
                          >
                        </el-option>
                    </el-select> -->
                    <el-autocomplete size="small" :maxlength="parseInt(100)"
                      class="inline-input"
                      v-model="orderForm.projectManagement"
                      :fetch-suggestions="queryProjector"
                      placeholder="请输入内容"
                      :trigger-on-focus="false"
                      @select="handleProjectSelect"
                    ></el-autocomplete>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="产品经理：" prop="prodcutManagement">
<!--                   <el-select size="small" v-model="orderForm.prodcutManagement"  placeholder="请选择">
                    <el-option
                      v-for="item in userList"
                      :label="item.userName"
                      :value="item.userName"
                      >
                    </el-option>
                  </el-select> -->
                  <el-autocomplete size="small" :maxlength="parseInt(100)"
                      class="inline-input"
                      v-model="orderForm.prodcutManagement"
                      :fetch-suggestions="queryProductor"
                      placeholder="请输入内容"
                      :trigger-on-focus="false"
                      @select="handleProductSelect"
                    ></el-autocomplete>
                </el-form-item>
              </el-col>
              
              <el-col :span="12">
                <el-form-item label="项目分支：" prop="projectFeature">
                  <el-col :span="20">
                    <el-input size="small" v-model="orderForm.projectFeature"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
             
              <el-col :span="12">
                 <el-form-item label="需求名称：" prop="requirementName">
                  <el-col :span="20">
                    <el-autocomplete size="small" :maxlength="parseInt(100)"
                        class="inline-input"
                        v-model="orderForm.requirementName"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                      ></el-autocomplete>
                  </el-col>
                </el-form-item>
              </el-col>
           <el-col :span="12">  
                <el-form-item label="计划转测时间：" >
                   <el-col :span="10">
                      <el-form-item  >
                         <el-date-picker size="small"
                        v-model="orderForm.planeTransfDateFirst"
                        :picker-options="pickerOptions1"
                        @change="datePicker1change"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item  >
                        <el-date-picker
                        v-model="orderForm.planeTransfDateSecond" size="small"
                        :picker-options="pickerOptions2"
                        @change="datePicker2change"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划 QA 时间：" >
                   <el-col :span="10">
                      <el-form-item >
                         <el-date-picker size="small"
                        v-model="orderForm.planeQADateFirst"
                        :picker-options="pickerOptions3"
                        @change="datePicker3change"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item >
                        <el-date-picker
                        v-model="orderForm.planeQADateSecond" size="small"
                        :picker-options="pickerOptions4"
                        @change="datePicker4change"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
           <el-col :span="12">  
                <el-form-item label="计划上线时间：" >
                   <el-col :span="10">
                         <el-date-picker size="small"
                        v-model="orderForm.planeOnlineDateFirst"
                        :picker-options="pickerOptions5"
                        @change="datePicker5change"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                    </el-col>
                   
                    <el-col :span="12">
                        <el-date-picker
                        v-model="orderForm.planeOnlineDateSecond" size="small"
                        :picker-options="pickerOptions6"
                        @change="datePicker6change"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                    </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实际上线时间：" >
                   <el-col :span="10">
                      <el-form-item >
                         <el-date-picker size="small"
                        v-model="orderForm.actualOnlineDateFirst"
                        :picker-options="pickerOptions7"
                        @change="datePicker7change"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item >
                        <el-date-picker
                        v-model="orderForm.actualOnlineDateSecond" size="small"
                        type="date"
                        :picker-options="pickerOptions8"
                        @change="datePicker8change"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
      </el-col>
            <el-col :span="8">
                 <el-form-item label="项目成员：" prop="projectMember">
                  <el-col :span="20">
                    <el-select
                        v-model="orderForm.projectMember"
                        multiple
                        filterable
                        remote
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                          v-for="item in userListTemp"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
        </el-row>

      <div style="text-align:center;">
        <el-button type="primary" @click="getVersionList()">搜索</el-button>
        <el-button type="primary" @click="resetForm('orderForm')">重置</el-button>
      </div>
      </el-form> 
    </div>


    <div class="retrieval  criteria Style" style="margin-top:20px;">
       <el-table
    :data="versionList" border
    style="width: 100%;text-align:left">
    <el-table-column type="expand" >
      <template scope="scope">
          <el-row style="text-align:left" v-for="(projectInfo,index) in scope.row.requirementApplies" v-if="scope.row.requirementApplies.length>0" class="projectInfo">
            <el-form >
              <el-col :span="1" style="line-height:100px;text-align:center">
                  {{projectInfo.id}}
              </el-col>
              <el-col :span="22">
                <el-row >
                  <el-col :span="3" style="line-height:100px;text-align:left">
                    <strong>项目基本信息：</strong>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="项目名称：">
                        {{projectInfo.projectName}}
                    </el-form-item>
                    <el-form-item label="项目经理：">
                        {{projectInfo.projectUserName}}
                    </el-form-item>
                    <el-form-item label="启动时间：" >
                        {{projectInfo.startTimeStr}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="项目分支：">
                        {{projectInfo.projectBranch}}
                    </el-form-item>
                    <el-form-item label="项目成员：">
                       {{projectInfo.projectOthers}}
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="12">
                          <strong>计划转测时间：</strong>
                          <span>{{projectInfo.planTestTimeStr}}</span>
                        </el-col>
                        <el-col :span="12">
                          <strong>实际转测时间：</strong>
                          <span>{{projectInfo.truthTestTimeStr}}</span>
                        </el-col>
                        <el-col :span="12">
                          <strong>计划QA时间：</strong>
                          <span>{{projectInfo.planQaTimeStr}}</span>
                        </el-col>
                        <el-col :span="12">
                          <strong>实际QA时间：</strong>
                          <span>{{projectInfo.truthQaTimeStr}}</span>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="border-top:1px dashed lightgray">
                    <el-col :span="3" style="line-height:30px;text-align:left">
                      <strong>需求信息：</strong>
                    </el-col >
                    <el-col :span="21">
                      <el-col v-for="require in projectInfo.requirementInfos" >
                        
                        <el-col :span="9">
                          <el-form-item label="需求名称：">
                              <el-button @click="viewDetail(require)" type="text">{{require.requirementName}}</el-button>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="产品经理：">
                              {{require.responsibleUserName}}
                          </el-form-item>
                        </el-col>
                      </el-col>                      
                    </el-col>
                
                </el-row>

              </el-col>
              <el-col :span="1">
                <el-tooltip content="当前用户暂无编辑权限" placement="top" :disabled="versionAdmin">
                    <el-button @click="editApprove(projectInfo.id)" :disabled="!versionAdmin">编辑</el-button>
                </el-tooltip>
              </el-col>
            </el-form>
          </el-row>
          <el-row v-else>
            暂无相关信息
          </el-row>
      </template>
    </el-table-column>
    <el-table-column
      label="版本序号"
      prop="id">
      <template scope="scope">{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column
      label="版本类型"
      prop="name">
      <template scope="scope">
            <el-col>
              {{getVersionType(scope.row)}}
            </el-col>
          </template>
    </el-table-column>
    <el-table-column
      label="版本号"
      prop="versionName">
    </el-table-column>
    <el-table-column
      label="版本状态"
      prop="desc">
      <template scope="scope">
              <el-col>
                {{versionTypeStatus(scope.row)}}
              </el-col>
          </template>
    </el-table-column>
    <el-table-column
      label="计划上线时间"
      prop="planTimeStr">
    </el-table-column>
    <el-table-column
      label="实际上线时间"
      prop="truthTimeStr">
    </el-table-column>
  </el-table>
      <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="returnData.currentPage"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="orderForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="returnData.totalCount">
    </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'versionList',
    data: function() {
      return {
        orderForm:{
          versionType:'',
          versionName:'',
          versionStatus:'',
          planeTransfDateFirst:'',
          planeTransfDateSecond:'',
          planeQADateFirst:'',
          planeQADateSecond:'',
          projectManagement:'',//项目经理
          prodcutManagement:'', //产品经理
          projectMember:[],
          planeOnlineDateFirst:'',
          planeOnlineDateSecond:'',
          actualOnlineDateFirst:'',
          actualOnlineDateSecond:'',
          projectFeature:'',
          requirementName:'',
          curPage : 1,
          size : 10

        },
        versionAdmin : false,//管理版本的权限
        returnData : {
          currentPage  : 1,
          totalCount : 0
        },//版本列表所有返回数据
        loading : false,
        userList : [],//人员列表
        associateReponser : [],
        associateProjector : [],
        userListTemp : [],
        versionList : [],//版本号列表
        versionAllList : [],//版本号列表
        tableData3: [ ],
        associateList : [],//联想查询版本号列表

        versionTypeList:[ ],
        versionNumOption:[ ],
        versionStatusOption:[ ],
        prodcutManagementOption:[ ],
        // 时间插件选项
        pickerOptions1: { },
        pickerOptions2: { },
        pickerOptions3: { },
        pickerOptions4: { },
        pickerOptions5: { },
        pickerOptions6: { },
        pickerOptions7: { },
        pickerOptions8: { },
      }
    },
    methods:{
      debug:function(){
          debugger
      },
      initData : function(type,callback){
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
       * 获取版本类型列表
       * @return {[type]} [description]
       */
      getVersionTypeList : function(){
            var that  = this;
            var url = "/api/dlmanagementtool/versiontype/list"
            this.$http.get(url).then(({
                data,
                ok,
                statusText
            }) => {
                if (ok && data.status == '0') {
                    that.versionTypeList = data.data
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
       * 获取人员列表
       * @param  {[type]} userName [description]
       * @return {[type]}          [description]
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
       * 获取版本号列表
       * @return {[type]} [description]
       */
       getVersionList : function(){
            var that = this;
            var url = '/api/dlmanagementtool/version/list';
            var reqData ={
              versionTypeId : that.orderForm.versionType || null,
              versionName : that.orderForm.versionName || null ,
              versionStatus : that.orderForm.versionStatus || null,
              projectUserName : that.orderForm.projectManagement || null,
              projectOthers : that.orderForm.projectMember.toString() || null,
              responsibleUserName  : that.orderForm.prodcutManagement || null,
              projectBranch : that.orderForm.projectFeature || null,
              requirementName : that.orderForm.requirementName || null,
              testTimeStart   : that.getLocalTime(that.orderForm.planeTransfDateFirst,0),
              testTimeEnd     : that.getLocalTime(that.orderForm.planeTransfDateSecond,1),
              planTimeStart   : that.getLocalTime(that.orderForm.planeOnlineDateFirst,0),
              planTimeEnd     : that.getLocalTime(that.orderForm.planeOnlineDateSecond,1),
              truthTimeStart  : that.getLocalTime(that.orderForm.actualOnlineDateFirst,0),
              truthTimeEnd    : that.getLocalTime(that.orderForm.actualOnlineDateSecond,1),
              qaTimeStart     : that.orderForm.planeQADateFirst || null,
              qaTimeEnd       : that.orderForm.planeQADateSecond || null,
              curPage         : that.orderForm.curPage.toString(),
              size            : that.orderForm.size.toString()
            }
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.returnData = data.data
                      that.versionList= data.data.data;
                      if (that.versionAllList.length<=0) {
                          that.versionAllList = that.versionList
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
        * 时间转换
        * @param  {[type]} time [description]
        * @return {[type]}      [description]
        */
       getLocalTime : function(time,endFlag){
                if (!time) {
                  return null
                } 
                var timeTemp = time.valueOf() + endFlag*(24 * 60 * 60 * 1000 - 1) + 8*60*60*1000;
                var localTime = new Date(timeTemp)

                var checkTime = function(i) {
                      if (i < 10) {
                          i = "0" + i
                      }
                      return i
                  }
                var ymdhis = "";
                ymdhis += checkTime(localTime.getUTCFullYear()) + "-";
                ymdhis += checkTime((localTime.getUTCMonth() + 1)) + "-";
                ymdhis += checkTime(localTime.getUTCDate());
                // if (isFull === true) {
                    ymdhis += " " + checkTime(localTime.getUTCHours()) + ":";
                    ymdhis += checkTime(localTime.getUTCMinutes()) + ":";
                    ymdhis += checkTime(localTime.getUTCSeconds());
                // }
                return ymdhis;
           },

       /**
       * 版本类型过滤
       * @return {[type]} [description]
       */
      getVersionType : function(row){
        var typeName = "111"
        this.versionTypeList.forEach(function(item){
            if (row.versionTypeId == item.id) {
              typeName = item.versionTypeName;
            };
        })
        return typeName;
      },
      /**
       * 重置表单
       * @param  {[type]} formName [description]
       * @return {[type]}          [description]
       */
      resetForm :function(formName) {
          this.$refs[formName].resetFields();
          this.orderForm.planeTransfDateFirst   = '';
          this.orderForm.planeTransfDateSecond  = '';
          this.orderForm.planeQADateFirst       = '';
          this.orderForm.planeQADateSecond      = '';
          this.orderForm.planeOnlineDateFirst   = '';
          this.orderForm.planeOnlineDateSecond  = '';
          this.orderForm.actualOnlineDateFirst  = '';
          this.orderForm.actualOnlineDateSecond = '';
      } ,
      /**
       * 模糊查询
       */
       queryProductor(queryString, cb) {
              var that = this;
              that.associateReponser = [];

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
                          that.associateReponser.push(restaurant);
                      })
                      cb(that.associateReponser);
                  }
              });

          },
          handleProductSelect : function(val){
              this.orderForm.responsibleUserId = val.id
          },
        queryProjector(queryString, cb) {
              var that = this;
              that.associateProjector = [];

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
                          that.associateProjector.push(restaurant);
                      })
                      cb(that.associateProjector);
                  }
              });

          },
          handleProjectSelect : function(val){
              this.orderForm.responsibleUserId = val.id
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
      /**
       * 编辑项目
       * @return {[type]} [description]
       */
      editApprove : function(id){
        this.$router.push({
          name:'createApprove',
          query:{
            "id":id
          }
        })
      },
      /**
       * 获取版本号状态
       * @param  {[type]} row [description]
       * @return {[type]}     [description]
       */
      versionTypeStatus: function(row){
        var statusArray = ['','启用','上线','锁定','挂起'] ;
        return statusArray[row.versionStatus]
      },
      /**
       * [remoteMethod description]
       * @param  {[type]} query [description]
       * @return {[type]}       [description]
       */
      remoteMethod :function(query) {
            if (query !== '') {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.userListTemp = this.userList.filter(item => {
                  return item.name.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              this.userListTemp = [];
            }
          },
        /**
       * 模糊查询版本号
       */
       queryVersionSearch(queryString, cb) {
              var that = this;
              that.associateList = [];

              var url = "/api/dlmanagementtool/version/fuzzyQueryVersion";
              var reqData = {
                  versionName: queryString,
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
                          restaurant.value = item.versionName;
                          restaurant.id = item.id;
                          that.associateList.push(restaurant);
                      })
                      cb(that.associateList);
                  }
              });

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
          /**
           * [handleSelect 联想匹配函数选中]
           * @param  {[type]} item [description]
           * @return {[type]}      [description]
           */
          handleSelect:function(item) {
              this.orderForm.requirementName = item.value;
          },

          handleVersionSelect:function(item) {
              this.orderForm.versionName = item.value;
          },

          /**
           * 时间插件--时间区间限制
           * @param  {[type]} val [description]
           * @return {[type]}     [description]
           */
          datePicker1change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions2 = {
                  disabledDate(time) {
                      return time.getTime() <  endDate - 2.88e7;
                  }
              };
          },
          datePicker2change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions1 = {
                  disabledDate(time) {
                      return time.getTime() >  endDate - 2.88e7;
                  }
              };
          },
          datePicker3change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions4 = {
                  disabledDate(time) {
                      return time.getTime() <  endDate - 2.88e7;
                  }
              };
          },
          datePicker4change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions3 = {
                  disabledDate(time) {
                      return time.getTime() >  endDate - 2.88e7;
                  }
              };
          },
          datePicker5change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions6 = {
                  disabledDate(time) {
                      return time.getTime() <  endDate - 2.88e7;
                  }
              };
          },
          datePicker6change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions5 = {
                  disabledDate(time) {
                      return time.getTime() >  endDate - 2.88e7;
                  }
              };
          },
          datePicker7change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions8 = {
                  disabledDate(time) {
                      return time.getTime() <  endDate - 2.88e7;
                  }
              };
          },
          datePicker8change : function(val) {
              let endDate = new Date(val);
              this.pickerOptions7 = {
                  disabledDate(time) {
                      return time.getTime() >  endDate - 2.88e7;
                  }
              };
          },
      /**
       * 翻页
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
      pageChange : function(val){
        this.orderForm.curPage = val;
        this.getVersionList(val)
      },
      sizeChange : function(val){
          this.orderForm.size = val;
          this.getVersionList()
      },
    },
    beforeRouteEnter: function (to,from,next) {
        next(vm => {
            vm.getUserList();
            vm.getVersionTypeList();
            vm.getVersionList();
            vm.versionAdmin = (localStorage.getItem('versionAdmin') == '1')
        }); 
    }
  }
</script>

<style lang="less">
  .versionList {

  }
   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .projectInfo{
    border-bottom: 1px solid gray;
    margin-top: 10px;
  }
  .projectInfo .el-form-item{
    margin-bottom: 0px;
  }
</style>