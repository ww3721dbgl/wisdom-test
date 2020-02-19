<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <div class="filter-item el-radio-timely-type">
          <el-radio-group size="mini"
                          v-model="radio1">
            <el-radio-button label="1"
                             style="margin-right: 15px; margin-left:15px;">

              小组
            </el-radio-button>
            <el-radio-button label="2"
                             style="margin-right: 15px;">

              个人
            </el-radio-button>
            <el-radio-button label="3"
                             style="margin-right: 15px;">

              样品
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-item">
          <span>时间:</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 100px;"></el-date-picker>
          <span>&nbsp;-</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 100px;"></el-date-picker>
        </div>
        <div class="filter-item filter-item-btn-search">
          <i class="el-icon-search"
             @click="handleFilter"></i>
        </div>
      </div>
    </div>
    <div class="el-table-frame">
      <div v-if="radio1 == 1">
        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  :summary-method="getSummaries"
                  :span-method="arraySpanMethod"
                  show-summary
                  size="mini"
                  fit
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

          <el-table-column label="组别"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="人数"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="检验数"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="延时数"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="及时率"
                           prop="hours"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
      <div v-else-if="radio1 == 2">

      </div>
      <div v-else>

      </div>
    </div>

  </div>
</template>

<script>
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'

export default {
  name: '样品检验',
  components: {},
  directives: { waves },
  data() {
    return {
      count: 10,
      tableKey: 0,
      list: [
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 1,
          hours: 1.1
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 2,
          hours: 1.2
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 3,
          hours: 1.4
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 4,
          hours: 1.1
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 5,
          hours: 1.2
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 6,
          hours: 1.1
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 1,
          hours: 1.1
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 2,
          hours: 1.4
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 3,
          hours: 1.1
        }
      ],
      radio1: 1,
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
    //   console.log(columnIndex)
    //   console.log('state', row.state)

      if (columnIndex == 11) {
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

<style lang="scss" >
.el-radio-timely-type {
  .el-radio-button__inner {
    border: 0px;
    background-color: #c0bebe;
    fill: #fff;
    color: #fff;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 4px;
  }
  .el-radio-button--mini .el-radio-button__inner {
    border-radius: 4px;
    padding: 0px 15px;
    font-size: 12px;
  }
}
.el-button-excel {
  .el-button--text {
    color: #2995d4;
  }
}
</style>

<style lang="scss" scoped>
.el-table-frame {
  margin: 0 20px 20px 20px;
}
</style>