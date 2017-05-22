<template>
    <div class="versionList">
      <el-breadcrumb separator=">" class="bread-title">
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
        <el-button @click="getVersionTypeList()">查询</el-button>
        <el-button @click="debug()">debug</el-button>
    </el-breadcrumb>
    <div class="retrieval  criteria Style">
      <el-form :model="orderForm" ref="orderForm"  label-width="120px" class="query" style="text-align:left">
        <el-row type="flex" class="row-bg" justify="right">
              <el-col :span="8">
                <el-form-item label="版本类型：">
                  <el-select  size="small" v-model="orderForm.version"  placeholder="请选择">
                    <el-option
                      v-for="item in versionTypeList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="版本号：">
                  <el-select size="small" v-model="orderForm.versionNum"  placeholder="请选择">
                    <el-option
                      v-for="item in versionList"
                      :key="item.id"
                      :label="item.versionName"
                      :value="item.id"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="版本状态：">
                  <el-select size="small" v-model="orderForm.versionStatus"  placeholder="请选择">
                    <el-option
                      v-for="item in versionStatusOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
        </el-row>

    <el-row type="flex" class="row-bg" justify="right">
              <el-col :span="8">
                <el-form-item label="项目经理：">
                  <el-input size="small" v-model="orderForm.projectManagement"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="产品经理：">
                  <el-select size="small" v-model="orderForm.prodcutManagement"  placeholder="请选择">
                    <el-option
                      v-for="item in prodcutManagementOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                 <el-form-item label="项目成员：">
                  <el-input size="small" v-model="orderForm.projectMember"></el-input>
                </el-form-item>
              </el-col>
        </el-row>
        
         <el-row type="flex" class="row-bg" justify="right">
              <el-col :span="12">
                <el-form-item label="项目分支：">
                  <el-col :span="12">
                    <el-input size="small" v-model="orderForm.projectFeature"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
             
              <el-col :span="12">
                 <el-form-item label="需求名称：">
                  <el-col :span="12">
                    <el-input size="small" v-model="orderForm.requirementName"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
        </el-row>

         <el-row type="flex" class="row-bg" justify="right">
           <el-col :span="12">  
                <el-form-item label="计划转测时间：" >
                   <el-col :span="12">
                      <el-form-item prop="planeTransfDateFirst">
                         <el-date-picker size="small"
                        v-model="orderForm.planeTransfDateFirst"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="planeTransfDateSecond">
                        <el-date-picker
                        v-model="orderForm.planeTransfDateSecond" size="small"
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
                   <el-col :span="12">
                      <el-form-item prop="planeQADateFirst">
                         <el-date-picker size="small"
                        v-model="orderForm.planeQADateFirst"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="planeQADateSecond">
                        <el-date-picker
                        v-model="orderForm.planeQADateSecond" size="small"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="right">
           <el-col :span="12">  
                <el-form-item label="计划上线时间：" >
                   <el-col :span="12">
                      <el-form-item prop="planeOnlineDateFirst">
                         <el-date-picker size="small"
                        v-model="orderForm.planeOnlineDateFirst"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="planeOnlineDateSecond">
                        <el-date-picker
                        v-model="orderForm.planeOnlineDateSecond" size="small"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实际上线时间：" >
                   <el-col :span="12">
                      <el-form-item prop="actualOnlineDateFirst">
                         <el-date-picker size="small"
                        v-model="orderForm.actualOnlineDateFirst"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="actualOnlineDateSecond">
                        <el-date-picker
                        v-model="orderForm.actualOnlineDateSecond" size="small"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
        </el-row>

      <div style="text-align:center;">
        <el-button type="primary" @click="getVersionList()">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </div>
      </el-form> 
    </div>


    <div class="retrieval  criteria Style" style="margin-top:20px;">
       <el-table
    :data="versionList" border
    style="width: 100%;text-align:left">
    <el-table-column type="expand">
      <template scope="props">
          <el-row style="text-align:left">
            <el-form >
            <el-col :span="23">
              <el-row >
                <el-col :span="3" >
                  <strong>项目基本信息：</strong>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="项目名称：">
                      Pandora
                  </el-form-item>
                  <el-form-item label="项目经理：">
                      莎姐
                  </el-form-item>
                  <el-form-item label="启动时间：" style="border-bottom:1px dashed lightgray">
                      2016/9/12
                  </el-form-item>
                </el-col>
                <el-col :span="17">
                  <el-form-item label="项目分支：">
                      feature_pandora
                  </el-form-item>
                  <el-form-item label="项目成员：">
                      王国豪，何苗，陈思宇
                  </el-form-item>
                  <el-form-item style="border-bottom:1px dashed lightgray">
                      <el-col :span="6">
                        <strong>计划转测时间：</strong>
                        <span>2017-05-12</span>
                      </el-col>
                      <el-col :span="6">
                        <strong>实际转测时间：</strong>
                        <span>2017-05-12</span>
                      </el-col>
                      <el-col :span="6">
                        <strong>计划QA时间：</strong>
                        <span>2017-05-12</span>
                      </el-col>
                      <el-col :span="6">
                        <strong>实际QA时间：</strong>
                        <span>2017-05-12</span>
                      </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <strong>需求信息：</strong>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="需求名称：">
                      中心化改造
                  </el-form-item>
                  <el-form-item label="需求包名称：">
                      中心化改造包名称
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="产品经理：">
                      夏瑞
                  </el-form-item>
                  <el-form-item label="产品经理：">
                      夏瑞
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="1">
              <el-button>编辑</el-button>
            </el-col>
            </el-form>
          </el-row>
          <!-- <table>
            <th>1</th>
            <td>
              <tr><strong>项目基本信息</strong></tr>
              <tr><strong>需求信息</strong></tr>
            </td>
            <td>
              <tr>项目名称</tr>
              <tr>项目经理</tr>
              <tr>启动时间</tr>
              <tr>需求名称</tr>
              <tr>需求包名称</tr>
            </td>
          </table> -->
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
        @current-change="pageChange"
        :current-page.sync="returnData.currentPage"
        :page-size="5"
        layout="total, prev, pager, next"
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
          version:'',
          versionNum:'',
          versionStatus:'',
          planeTransfDateFirst:'',
          planeTransfDateSecond:'',
          planeQADateFirst:'',
          planeQADateSecond:'',
          projectManagement:'',//项目经理
          prodcutManagement:'', //产品经理
          projectMember:'',
          planeOnlineDateFirst:'',
          planeOnlineDateSecond:'',
          actualOnlineDateFirst:'',
          actualOnlineDateSecond:'',
          projectFeature:'',
          requirementName:'',
          curPage : "1",
          size : "5"

        },
        returnData : {
          currentPage  : 1,
          totalCount : 45
        },//版本列表所有返回数据
        versionList : [],//版本号列表
        tableData3: [ ],
        versionTypeList:[ ],
        versionNumOption:[ ],
        versionStatusOption:[ ],
        prodcutManagementOption:[ ]
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
                } else {
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
                } else {
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
              // versionType     : that.form.versionStatus,
              // versionName     : that.form.versionName,
              // versionStatus   : that.form.versionStatus,
              // planTimeStart   : that.form.planeOnlineDateFirst,
              // planTimeEnd     : that.form.planeOnlineDateSecond,
              // truthTimeStart  : that.form.actualOnlineDateFirst,
              // truthTimeEnd    : that.form.actualOnlineDateSecond,
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
                    } else {
                      that.$message.error(data.msg);
                  }
            });
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
       * 获取版本号状态
       * @param  {[type]} row [description]
       * @return {[type]}     [description]
       */
      versionTypeStatus: function(row){
        var statusArray = ['','启用','上线','锁定','挂起'] ;
        return statusArray[row.versionStatus]
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
    },
    beforeRouteEnter: function (to,from,next) {
        next(vm => {
            vm.getVersionList();
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
</style>