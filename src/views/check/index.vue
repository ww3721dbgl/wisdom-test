<template>

  <div class="app-container1">
    <div class="tab-container">
      <el-tabs style="margin-top:5px;"
               type="border-card">
        <el-tab-pane label="工时">
          <working-hours-pane />
        </el-tab-pane>
        <el-tab-pane label="及时率">
          <timely-rate-pane />
        </el-tab-pane>
        <el-tab-pane label="偏差率">
          <deviation-rate-pane />
        </el-tab-pane>
        <el-tab-pane label="检验记录单复打">
          <record-pane />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import workingHoursPane from './components/WorkingHoursPane'//工时
import deviationRatePane from './components/DeviationRatePane'//偏差率
import recordPane from './components/RecordPane'
import timelyRatePane from './components/TimelyRatePane'//及时率

export default {
  name: '样品检验',
  components: {
    workingHoursPane,
    deviationRatePane,
    recordPane,
    timelyRatePane
  },
  directives: { waves },
  data() {
    return {
      count: 10,
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

      if (columnIndex == 10) {
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
    stateClassNameNo({ row, columnIndex }) {
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex == 8) {
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
    stateClassNameDetection({ row, columnIndex }) {
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex == 7) {
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
    stateClassNameQuality({ row, columnIndex }) {
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex == 9) {
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

<style lang="scss" >
.el-table-frame {
  .el-table {
    .el-table__header th {
      background-color: #d8dad7;
      color: #000;
    }
    // .el-table__body td {
    //   background-color: #fff;
    // }
    // th.is-leaf {
    //   border-bottom: 1px solid #a8aaa9;
    // }
    // td {
    //   border-bottom: 1px solid #a8aaa9;
    // }
  }
  //   .el-table--border th,
  //   .el-table--border td {
  //     border-right: 1px solid #a8aaa9;
  //   }
  //   .el-table--group,
  //   .el-table--border {
  //     border: 1px solid #a8aaa9;
  //   }
}
</style>

<style lang="scss" scoped>
.app-container1 {
  padding: 20px 0;
}
.app-container {
  padding: 0 0 20px 0;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  margin-right: 10px;
  color: #889aa4;
  vertical-align: middle;
  width: 40px;
  display: inline-block;
}
</style>