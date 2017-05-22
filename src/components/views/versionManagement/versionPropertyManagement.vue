<template>
  <div class="versionProperty">
    <el-breadcrumb separator=">" class="bread-title">
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
        <el-breadcrumb-item>版本类型管理</el-breadcrumb-item>
<!--         <el-button @click="getVersionTypeList()">查询</el-button>
        <el-button @click="debug()">debug</el-button> -->
    </el-breadcrumb>
    <div class="retrieval  criteria Style">
    	<el-row>
	      <el-col :span="2">
	        <el-button type="text" @click="dialogAddVisible = true"><i class="el-icon-plus"></i>新增</el-button>
	        <!-- <el-button type="text" @click="dialogEditVisible = true">编辑</el-button> -->
	      </el-col>
	      <el-col :span="22" style="text-align: right;">
	         <el-button type="text" style="margin-right:60px;" @click="deleteVersionType">删除</el-button>
	      </el-col>
	    </el-row>

<el-dialog
    title="请确认是否删除"
    v-model="dialogDeleteVisible"
    size="tiny" style="text-align:left" >
        <div>
          <span>版本类型：</span><span>{{deleteForm.versionType}}</span>
        </div>
        <div>
           <span>备注：</span><span >{{deleteForm.comment}}</span>
        </div>
       
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogDeleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteFormReq()">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog
    title="新增版本类型"
    v-model="dialogAddVisible"
    size="tiny"
    >
    <el-form :model="addForm" label-width="150px" ref="addForm" :rules="rules">
      <el-form-item label="版本类型：" prop="versionType">
        <el-input v-model="addForm.versionType"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="addForm.comment"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="toAdd">确 定</el-button>
    </span>
  </el-dialog>

<el-dialog
    title="修改版本类型"
    v-model="dialogEditVisible"
    size="tiny"
    >
    <el-form :model="editForm" label-width="150px" ref="editForm" :rules="rules">
      <el-form-item label="版本类型：" prop="versionType">
        <el-input v-model="editForm.versionType"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="comment">
        <el-input type="textarea" v-model="editForm.comment"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="EditVersionType">确 定</el-button>
    </span>
  </el-dialog>
  <el-col >
    <el-table
        ref="multipleTable"
        :data="versionTypeTable"
        border
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          prop="id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="versionTypeName"
          label="版本类型"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          show-overflow-tooltip>
          <template scope="scope">
              <el-button type="text" size="small">
                查看
              </el-button>
              <el-button type="text" size="small" @click="toEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="text" size="small" @click="deleteVersionType(scope.row)">
                删除
              </el-button>
          </template>
        </el-table-column>
      </el-table>    
  </el-col>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'versionPropertyManagement',
    data: function() {
    //版本类型是否重复
    var versionNameValid = (rule, value, callback) => {
      if (!value || (this.editForm.versionTypeTemp == value) )  {
        callback();
      } else {
        var url = '/api/dlmanagementtool/versiontype/checkNameRepeat';
        var reqData = {
          versionTypeName : value
        }
        this.$http.post(url,reqData).then(({
            data,
            ok,
            statusText
        }) => {
            if (ok && data.status == '0' && !data.data) {
              callback();
            } else {
                callback(new Error('版本名称已存在'));
            }
        });
      }
    }
      return {
        addForm:{ //新增的表单数据
          versionType:'',
          comment:''
        },
        editForm:{
          versionType:'',
          versionTypeTemp:'', //缓存名称，如果不为当前
          comment:'',
          id : ''
        },
        deleteForm:{
          versionType:'',
          comment:''
        },
        dialogDeleteVisible:false,
        dialogAddVisible:false,
        dialogEditVisible:false,
         versionTypeTable: [],
        multipleSelection: [],
        rules:{
           versionType:[{
              required:true,message:"版本类型不能为空",trigger:'blur,change',

           },{
               validator:versionNameValid,trigger:'blur'
           }]
        },

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
                    that.versionTypeTable = data.data
                } else {
                    that.$message.error(data.msg);
                }
            });
      },
      /**
       * 新增版本类型
       * @return {[type]} [description]
       */
    	toAdd :function() {
        var that = this;
        
        this.$refs['addForm'].validate((valide)=>{
            if (valide) {
              var reqData =  {
                  versionTypeName: that.addForm.versionType,
                  remark: that.addForm.comment,
                  id : ""
               }
              var url = '/api/dlmanagementtool/versiontype/save';
              this.$http.post(url,reqData).then(({
                  data,
                  ok,
                  statusText
              }) => {
                  if (ok && data.status == '0') {
                      that.$message.success('保存成功');
                      that.getVersionTypeList();
                      that.dialogAddVisible = false
                  } else {
                    that.$message.error(data.msg);
                  }
              });
              
            }else{
              this.$message.error('请先正确填写表单信息');
            }
        })
        
    	},
      /**
       * 单个版本类型
       * @return {[type]} [description]
       */
      deleteVersionType:function(row){
          if (row.id) {
            this.deleteForm.versionType = row.versionTypeName
            this.deleteForm.comment = row.remark
            this.deleteForm.id = row.id
            this.dialogDeleteVisible = true
          }else{
            var versionListId = [];
            var versionListName = [];
            this.multipleSelection.forEach(function(item){
              versionListId.push(item.id);
              versionListName.push(item.versionTypeName);
            })
            if (versionListId.length>0) {
              this.deleteForm.id = versionListId.toString();
              this.deleteForm.versionType = versionListName.toString();
              this.dialogDeleteVisible = true
            };
            
          }

      },
      /**
       * 发送删除请求
       * @return {[type]} [description]
       */
      deleteFormReq:function(){
        var that = this;
          var url = '/api/dlmanagementtool/versiontype/delete?ids='+that.deleteForm.id;
          this.$http.get(url).then(({
              data,
              ok,
              statusText
          }) => {
              if (ok && data.status == '0') {
                  that.$message.success('删除成功');
                  that.getVersionTypeList();
                  that.dialogDeleteVisible = false
              } else {
                that.$message.error(data.msg);
              }
          });
      },
      /**
       * 编辑版本类型
       * @return {[type]} [description]
       */
      toEdit:function(row) {
          this.dialogEditVisible = true
          this.editForm.versionType = row.versionTypeName
          this.editForm.versionTypeTemp = row.versionTypeName
          this.editForm.comment = row.remark
          this.editForm.id = row.id
      },
      /**
       * 编辑保存版本类型
       */
      EditVersionType:function(){
        var that = this;
        
        this.$refs['editForm'].validate((valide)=>{
            if (valide) {
              var reqData =  {
                  versionTypeName: that.editForm.versionType,
                  remark: that.editForm.comment,
                  id : that.editForm.id
               }
              var url = '/api/dlmanagementtool/versiontype/save';
              this.$http.post(url,reqData).then(({
                  data,
                  ok,
                  statusText
              }) => {
                  if (ok && data.status == '0') {
                      that.$message.success('保存成功');
                      that.getVersionTypeList();
                      that.dialogEditVisible = false
                  } else {
                    that.$message.error(data.msg);
                  }
              });
              
            }else{
              this.$message.error('请先正确填写表单信息');
            }
        })
      },
      /**
       * 批量选中
       * @return {[type]} [description]
       */
    	handleSelectionChange:function(val) {
        this.multipleSelection = val
    	}
    },
    beforeRouteEnter: function (to,from,next) {
        next(vm => {
            vm.getVersionTypeList();
        }); 
    }
  }
</script>

<style lang="less">
  .versionProperty {

  }
</style>