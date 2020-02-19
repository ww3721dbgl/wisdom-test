<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <div class="filter-item">
          <span>申请号:</span>
          <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>方法编号:</span>
          <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>申请时间:</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 140px;"></el-date-picker>
          <span>&nbsp;-</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 140px;"></el-date-picker>
        </div>
      </div>

      <div class="flex-row-space-between">
        <div>
          <div class="filter-item">
            <span>申请人:</span>
            <el-input v-model="searchParam.applicant"
                      size="mini"
                      style="width: 100px;"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span>方法名称:</span>
            <el-input v-model="searchParam.name"
                      size="mini"
                      style="width: 100px;"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span>流程状态:</span>
            <el-select v-model="searchParam.state"
                       size="mini"
                       clearable
                       style="width: 100px">
              <el-option v-for="item in stateOptions"
                         :key="item.key"
                         :label="item.label"
                         :value="item.label" />
            </el-select>
          </div>
          <div class="filter-item filter-item-btn-search">
            <i class="el-icon-search"
               @click="handleFilter"></i>
          </div>
        </div>
        <div>
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="info"
                     icon="el-icon-delete"
                     @click="handleCreate">删除</el-button>
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCreate">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              size="mini"
              fit
              highlight-current-row
              style="width: 100%;"
              :cell-style="stateClassName"
              @sort-change="sortChange">
      <el-table-column type="selection"
                       align="center"
                       width="55"></el-table-column>

      <el-table-column label="申请时间"
                       width="150px"
                       prop="date"
                       sortable="custom"
                       align="center"
                       :class-name="getSortClass('date')">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人"
                       align="center"
                       width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请号"
                       prop="no"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="方法编号"
                       prop="no"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="方法名称"
                       prop="no"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态"
                       prop="state"
                       width="80px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{state[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="方法属性"
                       width="150px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工时"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="检验方法"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="检验记录"
                       width="120px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="补充说明"
                       width="120px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="120"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <label @click="handleUpdate(row)"
                 class="table-view">
            查看
          </label> ·
          <label @click="handleUpdate(row)"
                 class="table-view">
            修订
          </label> ·
          <label @click="handleUpdate(row)"
                 class="table-view">
            下载
          </label>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="searchParam.page"
                :limit.sync="searchParam.limit"
                @pagination="getList" />

    <el-dialog :visible.sync="dialogEditVisible"
               width="40%"
               title="修订·检验方法">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span style='color:#cb0000'>检验方法修订</span></div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>物料名称：</label>
              <span>{{"羟值"}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w3"
                     style="margin-right:-0.5em">申请号</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法依据：</label>
              <span>{{"国家药典2019"}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w2"
                     style="margin-right:-2em">部门</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法类别：</label>
              <span>{{"工业品"}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w3"
                     style="margin-right:-0.5em">申请人</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法名称：</label>
              <span>{{"磷酸钠羟值检验法"}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>申请时间： </label>
              <el-date-picker v-model="searchParam.time"
                              size="mini"
                              type="date"
                              style="width: 140px;">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"><label>方法编号：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法属性：</label>
              <span>{{"仪器"}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>工时：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>检验方法：</label>
            </div>
          </el-col>
          <el-col :span="12"
                  class="el-button-version">
            <div class="el-dialog-item el-form-right"><label>版本：</label>
              <el-select v-model="searchParam.guige"
                         size="mini"
                         clearable
                         style="width: 140px">
                <el-option v-for="item in guigeOptions"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"
                 style="">
              <el-input type="textarea"
                        maxlength="200"
                        :rows="2"
                        size="small"
                        placeholder="请输入200字内的描述"
                        v-model="textarea">
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"><label>补充说明：</label></div>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      size="small"
                      placeholder="请输入200字内的说明"
                      v-model="textarea">
            </el-input>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogAddVisible"
               width="40%"
               title="新增·检验方法">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>新增检验方法</span></div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>检项名称：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w3"
                     style="margin-right:-0.5em">申请号</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法依据：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w2"
                     style="margin-right:-2em">部门</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法类别：</label>
              <el-select v-model="searchParam.guige"
                         size="mini"
                         clearable
                         style="width: 140px">
                <el-option v-for="item in guigeOptions"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w3"
                     style="margin-right:-0.5em">申请人</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法名称：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />

            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>申请时间： </label>
              <el-date-picker v-model="searchParam.time"
                              size="mini"
                              type="date"
                              style="width: 140px;">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"><label>方法编号：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>方法属性：</label>
              <el-select v-model="searchParam.guige"
                         size="mini"
                         clearable
                         style="width: 140px">
                <el-option v-for="item in guigeOptions"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>

            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>工时：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item" style="height:20px;"><label>检验方法：</label>

            </div>
          </el-col>
          <el-col :span="12"
                  class="el-button-version">
            <div class="el-dialog-item el-form-right"><label>版本：</label>
              <el-select v-model="searchParam.guige"
                         size="mini"
                         clearable
                         style="width: 140px">
                <el-option v-for="item in guigeOptions"
                           :key="item"
                           :label="item"
                           :value="item" />
              </el-select>
            </div>
            <el-button :type="isCheckSelect? 'primary':'info'"
                       size="mini"
                       style="width: 16px; height:16px; min-height:16px;font-size:8px;margin:2px 10px; 0 0"
                       @click="checkStatus">
              正
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"
                 style="margin-bottom:0px;">
              <el-input type="textarea"
                        maxlength="200"
                        :rows="2"
                        size="small"
                        placeholder="请输入200字内的描述"
                        v-model="textarea">
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"
                 style="margin-top:10px;"><label>补充说明：</label></div>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      size="small"
                      placeholder="请输入200字内的说明"
                      v-model="textarea">
            </el-input>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: '检验方法',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 3 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 4 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 5 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 6 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 3 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 4 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 5 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 6 }
      ],
      total: 11,
      listLoading: true,
      searchParam: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+date'
      },
      row: [],
      isCheckSelect: false,
      guigeOptions: ['成品', '半成品'],
      state: [' ', '未送样', '待领检', '检验中', '复检中', '审核中', '完成'],
      stateOptions: [
        { label: '未送样', key: 1 },
        { label: '待领检', key: 2 },
        { label: '检验中', key: 3 },
        { label: '复检中', key: 4 },
        { label: '审核中', key: 5 },
        { label: '完成', key: 6 }
      ],
      calendarTypeOptions: {},
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogEditVisible: false,
      dialogAddVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 设置流程状态
     */
    stateClassName({ row, columnIndex }) {
    //   console.log(columnIndex)
    //   console.log('state', row.state)

      if (columnIndex == 6) {
        switch (row.state) {
          case 1:
            return 'color: #909399;'
          case 2:
            return 'color: #f56c6c;'
          case 3:
          case 4:
          case 5:
            return 'color: #E6A23C;'
          case 6:
            return 'color: #67c23a;'
        }
      }
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
      //   fetchList(this.searchParam).then(response => {
      //     this.list = response.data.items
      //     this.total = response.data.total

      //   })
    },
    handleFilter() {
      this.searchParam.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    checkStatus() {
      this.isCheckSelect = !this.isCheckSelect
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'date') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.searchParam.sort = '+date'
      } else {
        this.searchParam.sort = '-date'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          //   createArticle(this.temp).then(() => {
          //     this.list.unshift(this.temp)
          //     this.dialogFormVisible = false
          //     this.$notify({
          //       title: 'Success',
          //       message: 'Created Successfully',
          //       type: 'success',
          //       duration: 2000
          //     })
          //   })
        }
      })
    },
    handleUpdate(row) {
      console.log(row)

      this.dialogEditVisible = true
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          //   updateArticle(tempData).then(() => {
          //     const index = this.list.findIndex(v => v.id === this.temp.id)
          //     this.list.splice(index, 1, this.temp)
          //     this.dialogFormVisible = false
          //     this.$notify({
          //       title: 'Success',
          //       message: 'Update Successfully',
          //       type: 'success',
          //       duration: 2000
          //     })
          //   })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      console.log(pv)

      //   fetchPv(pv).then(response => {
      //     this.pvData = response.data.pvData
      //     this.dialogPvVisible = true
      //   })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(date) {
      const sort = this.searchParam.sort
      return sort === `+${date}` ? 'ascending' : 'descending'
    }
  }
}
</script>


<style lang="scss" >
.el-button-version {
  .el-button--mini {
    padding: 0;
  }
}
</style>


<style lang="scss" scoped>
.el-button-version {
  display: flex;
  flex-direction: row-reverse;
}
</style>
