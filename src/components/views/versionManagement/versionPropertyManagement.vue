<template>
  <div class="versionProperty">
    <el-breadcrumb separator=">" class="bread-title">
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
        <el-breadcrumb-item>版本类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="retrieval  criteria Style">
    	<el-row>
	      <el-col :span="5">
	        <el-button type="text" @click="dialogAddVisible = true"><i class="el-icon-plus"></i>新增</el-button>
	        <el-button type="text" @click="dialogEditVisible = true">编辑</el-button>
	      </el-col>
	      <el-col :span="19" style="text-align: right;">
	         <el-button type="text" style="margin-right:60px;" @click="dialogDeleteVisible = true">删除</el-button>
	      </el-col>
	    </el-row>

<el-dialog
    title="请确认是否删除"
    v-model="dialogDeleteVisible"
    size="tiny"
    >
        <div>
          <span>版本类型：</span><span>{{deleteForm.versionType}}</span>
        </div>
        <div>
           <span>备注：</span><span >{{deleteForm.comment}}</span>
        </div>
       
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogDeleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="toDelete">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog
    title="新增版本类型"
    v-model="dialogAddVisible"
    size="tiny"
    >
    <el-form :model="addForm">
      <el-form-item label="版本类型：">
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
    <el-form :model="editForm">
      <el-form-item label="版本类型：">
        <el-input v-model="editForm.versionType"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="editForm.comment"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="toEdit">确 定</el-button>
    </span>
  </el-dialog>

		<el-table
		    ref="multipleTable"
		    :data="tableData3"
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
		      <template scope="scope">{{ scope.row.date }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="版本类型"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址"
		      show-overflow-tooltip>
		    </el-table-column>
		  </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'versionPropertyManagement',
    data: function() {
      return {
        addForm:{ //新增的表单数据
          versionType:'',
          comment:''
        },
        editForm:{
          versionType:'',
          comment:''
        },
        deleteForm:{
          versionType:'Web',
          comment:'交易系统'
        },
        dialogDeleteVisible:false,
        dialogAddVisible:false,
        dialogEditVisible:false,
         tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    methods:{
    	toAdd() {
        this.dialogAddVisible = false
    	},
      toDelete() {
        this.dialogDeleteVisible = false
      },
      toEdit() {
          this.dialogEditVisible = false
      },
    	handleSelectionChange() {

    	}
    }
  }
</script>

<style lang="less">
  .versionProperty {

  }
</style>