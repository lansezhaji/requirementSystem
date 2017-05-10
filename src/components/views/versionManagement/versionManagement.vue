<template>
  <div class="versionManagement">
    <div class="retrieval  criteria Style">
  	<el-form :model="form" label-width="160px">
  	<el-row class="row-bg" justify="right" style="margin-top:20px;"> 
      	<el-col :span="12">
	      	<el-form-item label="版本号状态：">
				 <el-select size="small" v-model="form.versionStatus" placeholder="请选择">
				    <el-option
				      v-for="item in versionOptions"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</el-form-item>
  		</el-col>
  		<el-col :span="12">
        <el-form-item label="版本号状态：">
          <el-input style="width:50%;" size="small" v-model="form.version"></el-input>
        </el-form-item>
  		</el-col>
    </el-row>
  	  
<el-row type="flex" class="row-bg" justify="right">
           <el-col :span="12">  
                <el-form-item label="计划上线时间：" >
                   <el-col :span="12">
                      <el-form-item prop="planeOnlineDateFirst">
                         <el-date-picker size="small"
                        v-model="form.planeOnlineDateFirst"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="planeOnlineDateSecond">
                        <el-date-picker
                        v-model="form.planeOnlineDateSecond" size="small"
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
                        v-model="form.actualOnlineDateFirst"
                        type="date"
                        placeholder="选择日期"
                       >
                      </el-date-picker>
                      </el-form-item>
                    </el-col>
                   
                    <el-col :span="12">
                      <el-form-item prop="actualOnlineDateSecond">
                        <el-date-picker
                        v-model="form.actualOnlineDateSecond" size="small"
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
        <el-button type="primary">查询</el-button>
      </div>
  	</el-form>
    </div>

    <div class="retrieval  criteria Style" style="margin-top:20px;">
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
          label="版本号"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
          prop="address"
          label="计划上线时间"
          show-overflow-tooltip>
          </el-table-column>
           <el-table-column
          prop="address"
          label="实际上线时间"
          show-overflow-tooltip>
        </el-table-column>
         <el-table-column
          prop="address"
          label="版本号状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
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
          versionStatus:'',
          planeOnlineDateFirst:'',
          planeOnlineDateSecond:'',
          actualOnlineDateFirst:'',
          actualOnlineDateSecond:'',
        },
        
        versionOptions:[
        {name:'启用', value:'S01'},
        {name:'停用', value:'S02'},
        {name:'锁定', value:'S03'},
        ],
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
      handleSelectionChange() {

      }
    }
  }
</script>

<style lang="less">
  .versionManagement {

  }
</style>