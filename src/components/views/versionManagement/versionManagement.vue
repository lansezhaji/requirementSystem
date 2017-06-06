  <template>
      
  <div class="versionManagement">
    <el-breadcrumb separator=">" class="bread-title retrieval  criteria">
        <el-breadcrumb-item>版本号管理</el-breadcrumb-item>
        <el-breadcrumb-item>版本号列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--             <el-button @click="getVersionTypeList()">查询</el-button>
        <el-button @click="debug()">debug</el-button> -->
    <div class="retrieval  criteria Style">
  	<el-form :model="form" label-width="160px" ref="versionManagement">
  	<el-row class="row-bg" justify="right" style="margin-top:20px;"> 
      	<el-col :span="6">
	      	<el-form-item label="版本号状态：" style="text-align:left" prop="versionStatus">
    				 <el-select size="small" v-model="form.versionStatus" placeholder="请选择">
                <el-option label="全部" value="0" ></el-option>
                <el-option label="启用" value="1"></el-option>
                <el-option label="上线" value="2"></el-option>
                <el-option label="锁定" value="3"></el-option>
                <el-option label="挂起" value="4"></el-option>
    				  </el-select>
    			</el-form-item>
  		</el-col>
  		<el-col :span="6" >
        <el-form-item label="版本号：" style="text-align:left" prop="versionName">
          <el-autocomplete size="small" :maxlength="parseInt(100)"
                class="inline-input"
                v-model="form.versionName"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
        </el-form-item>
  		</el-col>
      <el-col :span="6" >
        <el-form-item label="版本类型：" style="text-align:left" prop="versionType">
          <el-select v-model="form.versionType">
            <el-option label="" value="">全部</el-option>
            <el-option v-for="type in versionTypeList" :label="type.versionTypeName" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  	  
<el-row type="flex" class="row-bg" justify="right">
           <el-col :span="12">  
                   <el-col :span="12">
                      <el-form-item prop="planeOnlineDateFirst" style="text-align:left" label="计划上线时间：">
                         <el-date-picker size="small"
                        v-model="form.planeOnlineDateFirst"
                        type="date"
                        :picker-options="pickerOptions1"
                        @change="datePicker1change"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="planeOnlineDateSecond" style="text-align:left" label-width="0px">
                        <el-date-picker
                        v-model="form.planeOnlineDateSecond" 
                        size="small"
                        :picker-options="pickerOptions2"
                        @change="datePicker2change"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
              </el-col>
              <el-col :span="12">
                   <el-col :span="12">
                      <el-form-item prop="actualOnlineDateFirst" style="text-align:left" label="实际上线时间：" >
                         <el-date-picker size="small"
                        v-model="form.actualOnlineDateFirst"
                        type="date"
                        :picker-options="pickerOptions3"
                        @change="datePicker3change"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="actualOnlineDateSecond" style="text-align:left" label-width="0px">
                        <el-date-picker
                        v-model="form.actualOnlineDateSecond" size="small"
                        type="date"
                        :picker-options="pickerOptions4"
                        @change="datePicker4change"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
              </el-col>
        </el-row>
  	 <div style="text-align:center;">
        <el-button type="primary" @click="getVersionList()">查询</el-button>
        <el-button type="primary" @click="resetForm('versionManagement')">重置</el-button>
      </div>
  	</el-form>
    </div>
<!-- 编辑栏 -->
      <el-row style="margin-top:20px;">
        <el-col :span="2">
          <el-button type="text" @click="addVersion"><i class="el-icon-plus"></i>新增</el-button>
          <el-dialog
            title="新增版本号"
            :visible.sync="addDialogVisible"
            size="tiny" >
            <el-form :model="addForm" label-width="150px" ref="addForm">
              <el-form-item label="版本类型：" style="text-align:left" prop="versionTypeName">
                <el-select size="small" v-model="addForm.versionType" placeholder="请选择">
                    <el-option :label="type.versionTypeName" :value="type.id" v-for="type in versionTypeList"></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="版本号：" prop="versionName">
                <el-col :span="16">
                  <el-input v-model="addForm.versionName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="版本号状态：" style="text-align:left" prop="versionStatus">
                 <el-select size="small" v-model="addForm.versionStatus" placeholder="请选择">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="上线" value="2"></el-option>
                    <el-option label="锁定" value="3"></el-option>
                    <el-option label="挂起" value="4"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="计划上线时间：" style="text-align:left" prop="planTime">
                    <el-date-picker
                      v-model="addForm.planTime"
                      align="right"
                      type="datetime"
                      placeholder="选择日期" >
                    </el-date-picker>
              </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="createVersion">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="编辑版本号"
            :visible.sync="editDialogVisible"
            size="tiny" >
            <el-form :model="editForm" label-width="150px" ref="addForm">
              <el-form-item label="版本类型：" style="text-align:left" prop="versionTypeName">
                <el-select size="small" v-model="editForm.versionType" placeholder="请选择">
                    <el-option :label="type.versionTypeName" :value="type.id" v-for="type in versionTypeList"></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="版本号：" prop="versionName">
                <el-col :span="16">
                  <el-input v-model="editForm.versionName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="版本号状态：" style="text-align:left" prop="versionStatus" v-if="false">
                 <el-select size="small" v-model="editForm.versionStatus" placeholder="请选择">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="上线" value="2"></el-option>
                    <el-option label="锁定" value="3"></el-option>
                    <el-option label="挂起" value="4"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="计划上线时间：" style="text-align:left" prop="planTime">
                    <el-date-picker
                      v-model="editForm.planTime"
                      align="right"
                      type="datetime"
                      placeholder="选择日期" >
                    </el-date-picker>
              </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateVersion">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="您正在停用以下版本，请填入相关信息"
            :visible.sync="updateStatusToOnlineDialog"
            size="tiny" >
            <el-form :model="editForm" label-width="150px" ref="addForm" style="text-align:left">
              <el-form-item label="版本类型：" style="text-align:left" prop="versionTypeName">
                <el-select size="small" v-model="onLineForm.versionType" placeholder="请选择" disabled>
                    <el-option :label="type.versionTypeName" :value="type.id" v-for="type in versionTypeList"></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="版本号：" prop="versionName">
                {{onLineForm.versionName}}
              </el-form-item>
              <el-form-item label="实际上线时间：" style="text-align:left" prop="planTime">
                    <el-date-picker
                      v-model="onLineForm.truthTime"
                      align="right"
                      type="datetime"
                      placeholder="选择日期" >
                    </el-date-picker>
              </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
              <el-button @click="updateStatusToOnlineDialog = false">取 消</el-button>
              <el-button type="primary" @click="changeVersionStatus(1)" :disabled="!onLineForm.truthTime">确 定</el-button>
            </span>
          </el-dialog>

        </el-col>
        <el-col :span="22" style="text-align: right;">
           <el-button type="text" :disabled="multipleSelection.length<=0"  @click="changeVersionStatus(0)">启用</el-button>
           <!-- <el-button type="text" :disabled="multipleSelection.length<=0"  @click="changeVersionStatus(1)">上线</el-button> -->
           <el-button type="text" :disabled="multipleSelection.length<=0"  @click="changeVersionStatus(2)">锁定</el-button>
           <el-button type="text" :disabled="multipleSelection.length<=0" style="margin-right:60px;" @click="changeVersionStatus(3)">挂起</el-button>
        </el-col>
      </el-row>
    <div class="retrieval  criteria Style" >
    <el-table
        ref="multipleTable"
        :data="versionList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          width="120">
          <template scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          prop="versionTypeId"
          label="版本类型"
          width="180">
          <template scope="scope">
            <el-col>
              {{getVersionType(scope.row)}}
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
          prop="versionName"
          label="版本号"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
          prop="planTimeStr"
          label="计划上线时间"
          show-overflow-tooltip>
          </el-table-column>
           <el-table-column
          prop="truthTimeStr"
          label="实际上线时间"
          show-overflow-tooltip>
        </el-table-column>
         <el-table-column
          prop="versionStatus"
          label="版本号状态"
          show-overflow-tooltip>
          <template scope="scope">
              <el-col>
                {{versionTypeStatus(scope.row)}}
              </el-col>
          </template>
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text" @click="editVersion(scope.row)">编辑</el-button>
              <el-button type="text" @click="onlineVersion(scope.row)">上线</el-button>
              <el-button type="text" @click="deleteVersionDialog(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table> 
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="returnData.currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="returnData.totalCount">
      </el-pagination> 
          <el-dialog
            title="确定删除版本信息？"
            :visible.sync="deleteDialogVisible"
            size="tiny" >
            <el-form :model="deleteForm" label-width="150px" ref="addForm">
              <el-form-item label="版本类型：" style="text-align:left" >
                <el-col>
                  {{deleteForm.versionType}}
                </el-col>
              </el-form-item>  
              <el-form-item label="版本号：" style="text-align:left">
                {{deleteForm.version}}
              </el-form-item>
              <el-form-item label="计划上线时间：" style="text-align:left">
                {{deleteForm.time}}
              </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteVersion()">确 定</el-button>
            </span>
          </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'versionManagement',
    data: function() {
      return {  
        form:{
          version:'',
          versionType:'',
          versionStatus:'0',
          versionName : '',
          planeOnlineDateFirst:'',
          planeOnlineDateSecond:'',
          actualOnlineDateFirst:'',
          actualOnlineDateSecond:'',
          curPage:1,
          size: 10
        },
        returnData : "",//返回数据
        versionTypeList : [],//版本类型列表
        versionList: [ ],
        multipleSelection: [],
        addDialogVisible:false,
        editDialogVisible : false,
        deleteDialogVisible:false,
        updateStatusToOnlineDialog : false,//停用弹窗
        addForm:{
          versionType : '',
          versionName : '',
          planTime : '',
          versionStatus: '1'
        },
        editForm:{
          id : '',
          versionType : '',
          versionName : '',
          planTime : '',
          versionStatus: '1'
        },
        onLineForm:{
          versionType : '',
          versionName : '',
          truthTime   : ''
        },
        deleteForm:{
           versionType: '',
           version:'',
           time:""
        },
        associateList:[],//联想列表
        // 时间插件选项
        pickerOptions1: { },
        pickerOptions2: { },
        pickerOptions3: { },
        pickerOptions4: { },
      }
    },
    methods:{
      debug:function(){
          debugger
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
       * 获取版本号列表
       * @return {[type]} [description]
       */
      getVersionList : function(){
            var that = this;
            var url = '/api/dlmanagementtool/version/list';

            
            var reqData ={
              versionTypeId     : parseInt(that.form.versionType) || null,
              versionName     : that.form.versionName || null,
              versionStatus   : parseInt(that.form.versionStatus) || null,
              planTimeStart   : that.getLocalTime(that.form.planeOnlineDateFirst,0),
              planTimeEnd     : that.getLocalTime(that.form.planeOnlineDateSecond,1),
              truthTimeStart  : that.getLocalTime(that.form.actualOnlineDateFirst,0),
              truthTimeEnd    : that.getLocalTime(that.form.actualOnlineDateSecond,1),
              curPage         : that.form.curPage.toString(),
              size            : that.form.size.toString()

            }
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.returnData = data.data
                      that.versionList= data.data.data;
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
       * 新增版本
       * @return {[type]} [description]
       */
      createVersion:function(){
            var that = this;
            var url = '/api/dlmanagementtool/version/save';
            var reqData ={
              id : null,
              versionName : this.addForm.versionName,
              versionTypeId : parseInt(this.addForm.versionType) || null,
              versionStatus : parseInt(this.addForm.versionStatus) || null,
              planTime  : this.addForm.planTime.valueOf()

            }
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.$message.success("保存成功");
                      that.addDialogVisible = false;
                      that.getVersionList();
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
       * 模糊查询版本号
       */
       querySearch(queryString, cb) {
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
           * [handleSelect 联想匹配函数选中]
           * @param  {[type]} item [description]
           * @return {[type]}      [description]
           */
          handleSelect:function(item) {
              this.form.versionName = item.value;
          },
      editVersion : function(row){
        this.editForm.id = row.id;
        this.editForm.versionName = row.versionName;
        this.editForm.versionType = row.versionTypeId;
        this.editForm.versionStatus = row.versionStatus.toString();
        this.editForm.planTime = row.planTime;

        this.editDialogVisible = true;
      },
      /**
       * 上线
       * @param  {[type]} row [description]
       * @return {[type]}     [description]
       */
      onlineVersion : function(row){
        this.onLineForm.id = row.id;
        this.onLineForm.versionName = row.versionName;
        this.onLineForm.versionType = row.versionTypeId;
        this.onLineForm.truthTime = ""
        this.updateStatusToOnlineDialog = true;
      },
      updateVersion : function(){
            var that = this;
            var url = '/api/dlmanagementtool/version/save';
            var reqData ={
              id : this.editForm.id,
              versionName : this.editForm.versionName,
              versionTypeId : parseInt(this.editForm.versionType) || null,
              versionStatus : parseInt(this.editForm.versionStatus) || null,
              planTime  : this.editForm.planTime ? this.editForm.planTime.valueOf() : ""

            }
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.$message.success("保存成功");
                      that.editDialogVisible = false;
                      that.getVersionList();
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
       * 重置表单
       * @param  {[type]} formName [description]
       * @return {[type]}          [description]
       */
      resetForm :function(formName) {
          this.$refs[formName].resetFields();
          this.form.planeOnlineDateFirst = "";
          this.form.planeOnlineDateSecond = "";
          this.form.actualOnlineDateFirst = "";
          this.form.actualOnlineDateSecond = "";
      } ,
      addVersion : function(){
        this.addForm.versionName = "";
        this.addForm.versionType = "";
        this.addForm.versionStatus = "";
        this.addForm.planTime = "";
        this.addDialogVisible = true
      },
      deleteVersionDialog:function(row){
          this.deleteForm.versionType = this.getVersionType(row)
          this.deleteForm.version = row.versionName
          this.deleteForm.time = row.planTimeStr
          this.deleteForm.id = row.id
          this.deleteDialogVisible = true;
      },
      /**
       * 删除版本
       * @return {[type]} [description]
       */
      deleteVersion:function(row){
          var that = this;

            var url = '/api/dlmanagementtool/version/delete?ids='+that.deleteForm.id.toString();
            this.$http.get(url).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.deleteDialogVisible = false;
                      that.$message.success("删除成功");
                      that.getVersionList();
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
       * 处理多选
       * @return {[type]} [description]
       */
      handleSelectionChange(val) {
          this.multipleSelection = val
      },
      /**
       * 批量修改更改版本状态
       * @return {[type]} [description]
       */
      changeVersionStatus : function(type){
          var that = this;
          if (type !=1 && this.multipleSelection.length <=0) {
             this.$message.error('请先选择版本');
             return false
          }
          var ids = []
          this.multipleSelection.forEach(function(item){
              ids.push(item.id);
          })
          var reqData = {
              ids : ids.toString(),
              versionStatus : type
          }
          if (type == 1) {
            reqData = {
              id : that.onLineForm.id,
              truthTime : that.onLineForm.truthTime.valueOf()
            }
          };
          var urlArr = [
            '/api/dlmanagementtool/version/updateStatusToUsing',
            '/api/dlmanagementtool/version/updateStatusToOnline',
            '/api/dlmanagementtool/version/updateStatusToLocking',
            '/api/dlmanagementtool/version/updateStatusToHangup',
          ]
            var url = urlArr[type]
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.$message.success("修改成功");
                      that.getVersionList();
                      that.updateStatusToOnlineDialog = false
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
        this.form.curPage = val;
        this.getVersionList(val)
      },
      sizeChange : function(val){
          this.form.size = val;
          this.getVersionList()
      },
    },
    beforeRouteEnter: function (to,from,next) {
        next(vm => {
            if (vm.$route.query.typeId ) {
              vm.form.versionType = vm.$route.query.typeId;
            }
            vm.getVersionTypeList();
            vm.getVersionList();
        }); 
    }
  }
</script>

<style lang="less">
  .versionManagement {

  }
</style>