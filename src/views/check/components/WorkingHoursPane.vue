<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="flex-row-space-between">
        <div>
          <div class="filter-item el-radio-type"
               style="margin-left:20px;">
            <el-radio-group size="mini"
                            v-model="radio1">
              <el-radio-button label="1">
                <svg-icon class="svg-icon"
                          icon-class="department" />
                部门
              </el-radio-button>
              <el-radio-button label="2">
                <svg-icon class="svg-icon"
                          icon-class="person" />
                个人
              </el-radio-button>
            </el-radio-group>
          </div>
          <div v-if="radio1 == 1"
               class="filter-item">
            <el-select v-model="searchParam.state"
                       size="mini"
                       clearable
                       style="width: 140px">
              <el-option v-for="item in stateOptions"
                         :key="item.key"
                         :label="item.label"
                         :value="item.label" />
            </el-select>
          </div>
          <div v-else
               class="filter-item">
            <el-input v-model="searchParam.no"
                      size="mini"
                      style="width: 140px;"
                      placeholder="请输入个人名称"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span>时间:</span>
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
          <div class="filter-item filter-item-btn-search">
            <i class="el-icon-search"
               @click="handleFilter"></i>
          </div>
        </div>
        <div class="el-button-excel">
          <el-button type="text">
            <svg-icon class="svg-icon"
                      icon-class="excel" /> 数据下载</el-button>
        </div>
      </div>
    </div>
    <div class="dialog-title"
         style="margin-top:10px"><span>威尔药业检验工时汇总表 · </span>
      <span v-if="radio1 == 1">部门</span>
      <span v-else>个人</span>
    </div>
    <div class="el-table-frame">
      <div v-if="radio1 == 1">
        <div class="flex-row-space-between"
             style="margin:15px 10px 5px 10px">
          <div class="el-grey-txt">部门：{{"分析室"}} </div>
          <div class="el-grey-txt">起止时间：{{"2019-01-01"}} 至 {{"2019-12-30"}}</div>
        </div>
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
                  style="width: 100%;margin-top:0px"
                  @sort-change="sortChange">

          <el-table-column label="名次"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="组别"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工时"
                           prop="hours"
                           align="center">

          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div class="flex-row-space-between"
             style="margin:15px 10px 5px 10px;justify-content:flex-start;">
          <div class="el-grey-txt">分析室·分析组·李卫公 </div>

          <div class="el-grey-txt"
               style="margin-left:30px;">{{"2019-01-01"}} 至 {{"2019-12-30"}}</div>
        </div>
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
                  style="width: 100%;margin-top:0px"
                  @sort-change="sortChange">
          <el-table-column label="日期"
                           prop="no"
                           align="center"
                           width="150">
            <template slot-scope="{row}">
              <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>

          <el-table-column label="检验号"
                           align="center"
                           width="100">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="样品属性"
                           width="150px"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="样品名称"
                           align="center"
                           width="150px">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="检项"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="工时"
                           prop="hours"
                           align="center">

          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'

export default {
  name: 'working-hours',
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
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 4,
          hours: 1.6
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 5,
          hours: 1.1
        },
        {
          no: 'T20190001',
          timestamp: 1580980988,
          name: '山梨酸钾',
          state: 6,
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
      formTypeOptions: [
        { label: '部门', key: 1 },
        { label: '个人', key: 2 }
      ],
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
    /**
     * 工时合计
     */
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            var r1, r2, m
            const value = Number(curr)
            if (!isNaN(value)) {
              try {
                r1 = prev.toString().split('.')[1].length
              } catch (e) {
                r1 = 0
              }
              try {
                r2 = curr.toString().split('.')[1].length
              } catch (e) {
                r2 = 0
              }
              m = Math.pow(10, Math.max(r1, r2))
              return Math.round(prev * m + curr * m) / m
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    /** 合计列合并 */
    arraySpanMethod(/**{ row, rowIndex, columnIndex }**/) {
      //   console.log('row', row)
      //   console.log('rowIndex', rowIndex)
      //   console.log('rowIndex', columnIndex)
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
.el-radio-type {
  .el-radio-button__inner {
    border: 0px;
    background-color: #c0bebe;
    fill: #fff;
    color: #fff;
  }
  .el-radio-button--mini .el-radio-button__inner {
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
.svg-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.el-button-excel {
  .el-button {
    padding: 0 20px;
  }
  .svg-icon {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
}
</style>