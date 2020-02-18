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
                     @click="handleGrade">物料等级</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleScale">样品规模</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCategory">方法类别</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleAddress">送样地点</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;letter-spacing:0.5em;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleState">状&nbsp;态</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleSpecifications">物料规格</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleName">检项名称</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleProperty">方法属性</el-button>
        </div>
      </li>
      <li>
        <div class="btn-div">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 120px;height:40px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCalendar">年历管理</el-button>
        </div>
      </li>
      <div class="clear"></div>
    </ul>

    <!-- 物料等级弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogGradeVisible">
      <div class="dialog-title"><span style='color:#000'>物料等级</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>等级名称</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 100px;" />
        </div>
        <div class="el-dialog-item"
             style="margin-left: 10px;"><label>等级代码</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 100px;" />
        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>

        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

          <el-table-column label="日期"
                           prop="no"
                           align="center">
          </el-table-column>
          <el-table-column label="等级名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="等级代码"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 样品规模弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogScaleVisible">
      <div class="dialog-title"><span style='color:#000'>样品规模</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>等级名称</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 100px;" />
        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>

        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

          <el-table-column label="日期"
                           prop="no"
                           align="center">
          </el-table-column>
          <el-table-column label="规模名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 方法类别弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogCategoryVisible">
      <div class="dialog-title"><span style='color:#000'>方法类别</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>属性名称</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 100px;" />
        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>

        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

          <el-table-column label="日期"
                           prop="no"
                           align="center">
          </el-table-column>
          <el-table-column label="属性名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 送样地点弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogAddressVisible">
      <div class="dialog-title"><span style='color:#000'>送样地点</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>地点名称</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 100px;" />
        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>

        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

          <el-table-column label="日期"
                           prop="no"
                           align="center">
          </el-table-column>
          <el-table-column label="地点名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 状态弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogStateVisible">
      <div class="dialog-title"><span style='color:#000'>状态</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>等级名称</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 100px;" />
        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>

        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

          <el-table-column label="日期"
                           prop="no"
                           align="center">
          </el-table-column>
          <el-table-column label="规模名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 物料规格弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogSpecificationsVisible">
      <div class="dialog-title"><span style='color:#000'>物料规格</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label class="w3"
                 style="margin-right:-0.5em">申请号</label><label>：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 140px;" />

        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>
        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
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
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 检项名称弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogNameVisible">
      <div class="dialog-title"><span style='color:#000'>物料规格</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>检项名称：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 140px;" />

        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>
        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">
          <el-table-column label="检项名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 方法属性弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               class="el-dialog-param"
               :visible.sync="dialogPropertyVisible">
      <div class="dialog-title"><span style='color:#000'>方法属性</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">
        <div class="el-dialog-item"><label>属性名称：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 140px;" />

        </div>
        <div class="el-dialog-item"
             style="margin-left:10px;"><label>属性代码：</label>
          <el-input v-model="specifications.title"
                    size="mini"
                    style="width: 140px;" />

        </div>
        <div class="el-dialog-item">
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleCreate">新增</el-button>
        </div>
        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">
          <el-table-column label="日期"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="属性名称"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="属性代码"
                           prop="name"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              编辑
            </el-button> ·
            <el-button type="text"
                       @click="handleCheckSample(row)"
                       size='mini'>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 年历管理弹框 -->
    <el-dialog title="参数设定"
               width="40%"
               fullscreen
               class="el-dialog-param"
               :visible.sync="dialogCalendarVisible">
      <div class="dialog-title"><span style='color:#000'>年历管理</span></div>
      <el-divider></el-divider>
      <div class="el-div-container">

      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: '送检',
  data() {
    return {
      dialogSpecificationsVisible: false,
      dialogGradeVisible: false,
      dialogScaleVisible: false,
      dialogCategoryVisible: false,
      dialogAddressVisible: false,
      dialogStateVisible: false,
      dialogNameVisible: false,
      dialogPropertyVisible: false,
      dialogCalendarVisible: false,
      dialogStatus: '',
      specifications: {},
      list: [
        {
          no: '2019-12-22',
          timestamp: 1580980988,
          name: '山梨酸钾',
          edit: '编辑 删除'
        },
        {
          no: '2019-12-22',
          timestamp: 1580980988,
          name: '山梨酸钾',
          edit: '编辑 删除'
        },
        {
          no: '2019-12-22',
          timestamp: 1580980988,
          name: '山梨酸钾',
          edit: '编辑 删除'
        },
        {
          no: '2019-12-22',
          timestamp: 1580980988,
          name: '山梨酸钾',
          edit: '编辑 删除'
        },
        {
          no: '2019-12-22',
          timestamp: 1580980988,
          name: '山梨酸钾',
          edit: '编辑 删除'
        }
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
    },
    handleSpecifications() {
      this.dialogSpecificationsVisible = true
    },
    handleGrade() {
      this.dialogGradeVisible = true
    },
    handleScale() {
      this.dialogScaleVisible = true
    },
    handleCategory() {
      this.dialogCategoryVisible = true
    },
    handleAddress() {
      this.dialogAddressVisible = true
    },
    handleState() {
      this.dialogStateVisible = true
    },
    handleName() {
      this.dialogNameVisible = true
    },
    handleProperty() {
      this.dialogPropertyVisible = true
    },
    handleCalendar() {
      this.dialogCalendarVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-container {
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
}
.btn-ul {
  list-style-type: none;
  width: 100%;
}
.btn-ul li {
  width: 20%;
  float: left;
  margin-top: 50px;
}
.clear {
  clear: both;
}
</style>
