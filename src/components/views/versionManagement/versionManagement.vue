  <template>
      
  <div class="versionManagement">
    <el-breadcrumb separator=">" class="bread-title retrieval  criteria">
        <el-breadcrumb-item>版本号管理</el-breadcrumb-item>
        <el-breadcrumb-item>版本号列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--             <el-button @click="getVersionTypeList()">查询</el-button>
        <el-button @click="debug()">debug</el-button> -->
    <div class="retrieval  criteria Style">
  	<el-form :model="form" label-width="160px">
  	<el-row class="row-bg" justify="right" style="margin-top:20px;"> 
      	<el-col :span="6">
	      	<el-form-item label="版本号状态：" style="text-align:left">
				 <el-select size="small" v-model="form.versionStatus" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="上线" value="2"></el-option>
            <el-option label="锁定" value="3"></el-option>
            <el-option label="挂起" value="4"></el-option>
				  </el-select>
			</el-form-item>
  		</el-col>
  		<el-col :span="6" >
        <el-form-item label="版本号：" style="text-align:left">
          <el-input  size="small" v-model="form.versionName"></el-input>
        </el-form-item>
  		</el-col>
      <el-col :span="6" >
        <el-form-item label="版本类型：" style="text-align:left">
          <el-select v-model="form.versionType">
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
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="planeOnlineDateSecond" style="text-align:left">
                        <el-date-picker
                        v-model="form.planeOnlineDateSecond" size="small"
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
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="actualOnlineDateSecond" style="text-align:left">
                        <el-date-picker
                        v-model="form.actualOnlineDateSecond" size="small"
                        type="date"
                        placeholder="选择日期"
                        >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
              </el-col>
        </el-row>
  	 <div style="text-align:center;">
        <el-button type="primary" @click="getVersionList()">查询</el-button>
      </div>
  	</el-form>
    </div>
<!-- 编辑栏 -->
      <el-row style="margin-top:20px;">
        <el-col :span="4">
          <el-button type="text" @click="addDialogVisible = true"><i class="el-icon-plus"></i>新增</el-button>
          <el-dialog
            title="新增版本号"
            :visible.sync="addDialogVisible"
            size="tiny" >
            <el-form :model="addForm" label-width="150px" ref="addForm">
              <el-form-item label="版本类型：" style="text-align:left" >
                <el-select size="small" v-model="addForm.versionType" placeholder="请选择">
                    <el-option :label="type.versionTypeName" :value="type.id" v-for="type in versionTypeList"></el-option>
                </el-select>
              </el-form-item>  
              <el-form-item label="版本号：" >
                <el-col :span="16">
                  <el-input v-model="addForm.versionName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="版本号状态：" style="text-align:left">
                 <el-select size="small" v-model="addForm.versionStatus" placeholder="请选择">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="上线" value="2"></el-option>
                    <el-option label="锁定" value="3"></el-option>
                    <el-option label="挂起" value="4"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="计划上线时间：" style="text-align:left" >
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
        </el-col>
        <el-col :span="20" style="text-align: right;">
           <el-button type="text"  @click="changeVersionStatus(1)">启用</el-button>
           <el-button type="text"  @click="changeVersionStatus(2)">上线</el-button>
           <el-button type="text"  @click="changeVersionStatus(3)">锁定</el-button>
           <el-button type="text" style="margin-right:60px;" @click="changeVersionStatus(4)">挂起</el-button>
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
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="deleteVersionDialog(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="pageChange"
        :current-page.sync="returnData.currentPage"
        :page-size="5"
        layout="total, prev, pager, next"
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
          versionStatus:'',
          planeOnlineDateFirst:'',
          planeOnlineDateSecond:'',
          actualOnlineDateFirst:'',
          actualOnlineDateSecond:'',
          curPage:"1",
          size: "3"
        },
        returnData : "",//返回数据
        versionTypeList : [],//版本类型列表
        versionList: [ ],
        multipleSelection: [],
        addDialogVisible:false,
        deleteDialogVisible:false,
        addForm:{
          versionType : '',
          versionName : '',
          planTime : '',
          versionStatus: '1'
        },
        deleteForm:{
           versionType: '',
           version:'',
           time:""
        }
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
              id : "",
              versionName : this.addForm.versionName,
              versionTypeId : this.addForm.versionType,
              versionStatus : this.addForm.versionStatus,
              planTime  : this.addForm.planTime

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
          if (this.multipleSelection.length <=0) {
             this.$message.error('请先购选选择版本');
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
            var url = '/api/dlmanagementtool/version/updateStatus';
            this.$http.post(url,reqData).then(({
                data,
                ok,
                statusText
            }) => {
                  if (ok && data.status == '0') {
                      that.$message.success("修改成功");
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
       * 翻页
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
      pageChange : function(val){
        this.form.curPage = val;
        this.getVersionList(val)
      },
    },
    beforeRouteEnter: function (to,from,next) {
        next(vm => {
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