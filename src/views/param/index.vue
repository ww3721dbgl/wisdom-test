<template>
  <div class="btn-container">
    <ul class="btn-ul">
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">物料等级</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">样品规模</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">方法类别</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">送样地点</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;letter-spacing:0.5em;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">状&nbsp;态</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">物料规格</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">检项名称</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">方法属性</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">年历管理</el-button>
        </div>
      </li>
      <div class="clear"></div>
    </ul>
    <!-- 物料等级弹框 -->
        <el-dialog title="参数设定"
               width="40%"
               :visible.sync="dialogAddVisible">

        <div>
          <div>
            <span style="color:#878989">规格名称：</span>
            <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
            <el-button class="filter-btn-item"
                   size="mini"
                   style="margin-left: 10px;width: 80px;"
                   type="primary"
                   icon="el-icon-edit"
                   @click="handleCreate">
          新增
        </el-button>
          </div>
          
          <div class="el-dialog-table">
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      fit
                      height="150px"
                      size="mini"
                      highlight-current-row
                      style="width: 100%;"
                      :cell-style="stateClassName"
                      @sort-change="sortChange">

               <el-table-column label="日期"
                               prop="no"
                               align="center">
              </el-table-column>
              <el-table-column label="规格名称"
                               prop="name"
                               align="center">
              </el-table-column>
              <el-table-column label="操作"
                               prop="edit"
                               align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: '送检',
  data(){
    return{
    dialogAddVisible: false,
    dialogStatus:'',
    list: [
        { no: '2019-12-22', timestamp: 1580980988, name: '山梨酸钾', edit: '编辑 删除' },
        { no: '2019-12-22', timestamp: 1580980988, name: '山梨酸钾', edit: '编辑 删除' },
        { no: '2019-12-22', timestamp: 1580980988, name: '山梨酸钾', edit: '编辑 删除' },
        { no: '2019-12-22', timestamp: 1580980988, name: '山梨酸钾', edit: '编辑 删除' },
        { no: '2019-12-22', timestamp: 1580980988, name: '山梨酸钾', edit: '编辑 删除' }
      ],
      searchParam: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+date'
      }
    }
  },
  methods: {
      handleCreate() {
      this.dialogStatus = 'create'
      this.dialogAddVisible = true
      
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-container{
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
}
.btn-ul{
  list-style-type:none;
  width: 100%;
}
.btn-ul li{
  width: 20%;
  float: left;
  margin-top: 50px;
}
.clear {clear: both;}

</style>
