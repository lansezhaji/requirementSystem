<template>
    <div class="versionList">
      <el-breadcrumb separator=">" class="bread-title">
        <el-breadcrumb-item>版本管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="retrieval  criteria Style">
      <el-form :model="orderForm" ref="orderForm"  label-width="120px" class="query">
        <el-row type="flex" class="row-bg" justify="right">
              <el-col :span="8">
                <el-form-item label="版本类型：">
                  <el-select  size="small" v-model="orderForm.version"  placeholder="请选择">
                    <el-option
                      v-for="item in versionOption"
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
                      v-for="item in versionNumOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
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
                      :value="item.value"
                      >
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
                  <el-input size="small" v-model="orderForm.projectFeature"></el-input>
                </el-form-item>
              </el-col>
             
              <el-col :span="12">
                 <el-form-item label="需求名称：">
                  <el-input size="small" v-model="orderForm.requirementName"></el-input>
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
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </div>
      </el-form> 
    </div>


    <div class="retrieval  criteria Style" style="margin-top:20px;">
       <el-table
    :data="tableData5" border
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
          <table  class="">
            <tbody>
               <tr>
                <th>项目基本信息</th>
                <td>{{tableData3[0].projectBaseMsg.projectNmae}}</td>
                <th>品牌名称</th>
                <td>{{tableData3.projectBaseMsg.projectNmae}}</td>
            </tr>
            </tbody>
          </table>
      </template>
    </el-table-column>
    <el-table-column
      label="版本序号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="版本类型"
      prop="name">
    </el-table-column>
    <el-table-column
      label="版本号"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="版本状态"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="计划上线时间"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="实际上线时间"
      prop="desc">
    </el-table-column>
  </el-table>
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
          requirementName:''

        },
        tableData3: [
        {
          projectBaseMsg:{//项目基本信息
            projectNmae:'Pandora', //项目名称
            projectManagement:'', //项目经理
            startDate:'', //启动时间
            projectFeature:'released-2017',
            projectMember:'王国豪、禾苗',
            planeOnlineDate:'2017/03',//计划转测时间
            actualOnlineDate:'',//实际转测时间
            planeTransfDate:'2017/4',//计划QA时间
            planeQADate:''//实际QA时间
          },
          //需求信息
          requirementMsg:[
          {requirementPackageName:'dasdasdasdsadas'},
          {requirementName:'dsadsadasdsadas'}
          ]
        }
        ],
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        versionOption:[
          {name:'全部', value:'all'},
          {name:'WEB', value:'S01'},
          {name:'iOS终端店', value:'S02'},
          {name:'iOS经销商', value:'S03'},
          {name:'Android终端店', value:'S04'},
          {name:'Android经销商', value:'S05'},
          {name:'其他', value:'S06'}
        ],
        versionNumOption:[
          {name:'全部', value:'all'},
          {name:'released-2017.11', value:'released-2017.11'},
          {name:'released-2017.12', value:'released-2017.12'},
          {name:'released-2017.13', value:'released-2017.13'},
          {name:'released-2017.14', value:'released-2017.14'},
          {name:'released-2017.15', value:'released-2017.15'},
            
        ],
        versionStatusOption:[
          {name:'全部', value:'all'},
          {name:'未上线', value:'S01'},
          {name:'已上线', value:'S01'},
        ],
        prodcutManagementOption:[
          {name:'贾茗兮', value:'S01'},
          {name:'夏睿', value:'S01'},
        ]
      }
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