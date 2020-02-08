<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchParam.no"
                placeholder="检验号"
                style="width: 150px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-date-picker v-model="searchParam.startTime"
                      type="date"
                      style="width: 150px;"
                      class="filter-item"
                      placeholder="录入-开始时间">
      </el-date-picker>

      <el-date-picker v-model="searchParam.startTime"
                      type="date"
                      style="width: 150px;"
                      class="filter-item"
                      placeholder="录入-结束时间">
      </el-date-picker>

      <el-select v-model="searchParam.guige"
                 placeholder="结果录入"
                 clearable
                 style="width: 150px"
                 class="filter-item">
        <el-option v-for="item in guigeOptions"
                   :key="item"
                   :label="item"
                   :value="item" />
      </el-select>

      <el-button class="filter-item"
                 type="primary"
                 style="width: 120px;"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="tab-container">
      <el-tabs style="margin-top:5px;"
               type="border-card">
        <el-tab-pane label="我的任务">
          <span slot="label">我的任务
            <el-badge :value="count" /></span>
          <div class="app-my-task-container">
            <el-row>
              <el-col :span="24">
                <div>
                  <el-input placeholder="检验单号"
                            style="width: 200px;"
                            class="filter-item" />
                </div>
              </el-col>
            </el-row>
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassName"
                      @sort-change="sortChange">
              <el-table-column label="检验单号"
                               prop="no"
                               align="center"
                               width="150">

                <template slot-scope="{row}">
                  <span>{{ row.no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请人"
                               align="center"
                               width="100">

                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送检时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="物料编码"
                               width="120px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品名称"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品规格"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品等级"
                               align="center"
                               width="80px">

                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送样地点"
                               align="center"
                               width="120px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检项数"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="结果录入"
                               align="center"
                               width="200px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="录入时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="状态"
                               prop="state"
                               width="80px"
                               align="center">
                <template slot-scope="{row}">
                  <span style="color:#fff">{{state[row.state]}}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>0"
                        :total="total"
                        :page.sync="searchParam.page"
                        :limit.sync="searchParam.limit"
                        @pagination="getList" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待领任务">
          <div class="app-pending-task-container">
            <el-row>
              <el-col :span="24"
                      style="text-align: right;">
                <div>
                  <el-button class="filter-item"
                             style="margin-left: 10px;width: 120px;"
                             type="success"
                             icon="el-icon-edit"
                             @click="handleCreate">
                    批量领检
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassName"
                      @sort-change="sortChange">

              <el-table-column type="selection"
                               align="center"
                               width="55">
              </el-table-column>

              <el-table-column label="检验号"
                               prop="no"
                               align="center"
                               width="150"
                               :class-name="getSortClass('no')">

                <template slot-scope="{row}">
                  <span>{{ row.no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请人"
                               align="center"
                               width="100">

                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送检时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品规格"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品等级"
                               align="center"
                               width="80px">

                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送样地点"
                               align="center"
                               width="120px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="结果录入"
                               align="center"
                               width="200px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="录入时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检项数"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作"
                               align="center"
                               width="120"
                               class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <el-button type="success"
                             size="mini"
                             @click="handleModifyStatus(row,'draft')">
                    领检
                  </el-button>

                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>0"
                        :total="total"
                        :page.sync="searchParam.page"
                        :limit.sync="searchParam.limit"
                        @pagination="getList" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: '检效管理',
  components: { Pagination },directives: { waves },
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
      dialogFormVisible: false,
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
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex ==11) {
        switch (row.state) {
          case 1:
            return 'background: #909399;'
          case 2:
            return 'background: #f56c6c;'
          case 3:
          case 4:
          case 5:
            return 'background: #E6A23C;'
          case 6:
            return 'background: #67c23a;'
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
      this.dialogFormVisible = true
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
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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